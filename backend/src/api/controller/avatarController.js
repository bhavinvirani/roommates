const { v4: UUIDV4 } = require('uuid');
const sharp = require('sharp');
const avatarService = require('../services/avatarService');
const { successResponse } = require('../../utils/apiResponse');
const { statusCode } = require('../../config/constants');

const uploadAvatar = async (req, res) => {
  const file = req.file;
  const username = req.query.username;
  const photoID = req.query.photoID;
  const fileName = UUIDV4();
  const buffer = await sharp(file.buffer)
    .resize({ height: 300, width: 300, fit: 'contain' })
    .toBuffer();
  const memeType = req.file.mimetype;

  await avatarService.uploadImage(username, photoID, fileName, buffer, memeType);
  const user = await avatarService.getAvatarImage(username);
  return successResponse(
    res,
    statusCode.CREATED,
    { photoID: user[0].photoID, signedUrl: user[0].dataValues.signedUrl },
    'Avatar uploaded',
    true
  );
};

module.exports = {
  uploadAvatar,
};
