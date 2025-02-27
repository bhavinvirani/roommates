require('dotenv').config({ path: './.env' });
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const dbConfig = require('../../config/database')[process.env.NODE_ENV];
const dbOptions = {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: "postgres",
  logging: false,
  ...(process.env.NODE_ENV === "production" && {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }),
};

let db = {};
let sequelize;

sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbOptions
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// sequelize.sync({ force: true }).then(() => {
//   console.log('Database & tables created!');
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
