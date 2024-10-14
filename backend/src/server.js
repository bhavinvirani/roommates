require('dotenv').config({ path: './.env' });
const { sequelize } = require('./api/models');
const logger = require('./config/logger');
const app = require('./app');
const port = process.env.PORT || 8000;

const server = app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    logger.info('DB connection has been established successfully. 🎉');
    logger.info(`Server running on port ${port}... 🚀`);
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    process.exit(1);
  }
});

module.exports = server;