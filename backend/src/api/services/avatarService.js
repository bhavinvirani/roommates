const dotenv = require('dotenv').config();
const { User } = require('../models');
const {
  S3Client,
  GetObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const {
  CloudFrontClient,
  CreateInvalidationCommand,
} = require('@aws-sdk/client-cloudfront');
const { getSignedUrl } = require('@aws-sdk/cloudfront-signer');

// const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const cloudfrontDistributionId = process.env.CLOUDFRONT_DISTRIBUTION_ID;
const cloudFrontURL = process.env.CLOUDFRONT_URL;
const cloudFrontKeyPairId = process.env.CLOUDFRONT_KEY_PAIR_ID;
const cloudFrontPrivateKey = process.env.CLOUDFRONT_PRIVATE_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

const cloudfront = new CloudFrontClient({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
});

const uploadImage = async (username, photoID, filename, buffer, mimetype) => {
  if (photoID) {
    await deleteAvatarImage(photoID);
  }
  filename = `${username}-${filename}`;
  const upload = new Upload({
    client: s3,
    params: {
      Bucket: bucketName,
      Key: filename,
      Body: buffer,
      ContentType: mimetype,
    },
  });

  await upload.done();

  await User.update(
    {
      photoID: filename,
    },
    {
      where: {
        username: username,
      },
    }
  );

  return filename;
};

const addSignedUrl = async (users) => {
  for (const user of users) {
    if (!user.photoID) {
      continue;
    }
    //? From S3
    // const getObjectParams = {
    //   Bucket: bucketName,
    //   Key: user.photoID,
    // };
    // const command = new GetObjectCommand(getObjectParams);
    // const url = await getSignedUrl(s3, command, { expiresIn: 60 * 60 });

    //? From CloudFront
    // const url = cloudFrontURL + user.photoID;

    //? cloudfront signed url
    const url = getSignedUrl({
      url: cloudFrontURL + user.photoID,
      dateLessThan: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
      privateKey: cloudFrontPrivateKey,
      keyPairId: cloudFrontKeyPairId,
    });

    if (user.dataValues) {
      user.dataValues.signedUrl = url;
    } else {
      user.signedUrl = url;
    }
  }
  return users;
};

const getAvatarImage = async (username) => {
  const user = await User.findOne({
    where: { username: username },
  });
  if (!user) {
    return null;
  }
  return addSignedUrl([user]);
};

const deleteAvatarImage = async (photoID) => {
  const commandParams = {
    Bucket: bucketName,
    Key: photoID,
  };

  const command = new DeleteObjectCommand(commandParams);
  await s3.send(command);

  // Invalidate cloudFront cache
  const invalidationParams = {
    DistributionId: cloudfrontDistributionId,
    InvalidationBatch: {
      CallerReference: photoID,
      Paths: {
        Quantity: 1,
        Items: [`/${photoID}`],
      },
    },
  };

  const invalidationCommand = new CreateInvalidationCommand(invalidationParams);
  await cloudfront.send(invalidationCommand);

  await User.update(
    {
      photoID: null,
    },
    {
      where: {
        photoID: photoID,
      },
    }
  );
};

module.exports = {
  addSignedUrl,
  uploadImage,
  getAvatarImage,
  deleteAvatarImage,
};
