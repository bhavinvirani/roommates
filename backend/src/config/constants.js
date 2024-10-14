const environment = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
};

const statusCode = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

const apiHost = 'http://localhost:8080';

const clientHost = 'http://localhost:3000';

const apiPort = process.env.PORT || 8080;

const jwtConfig = {
  secret: process.env.JWT_SECRET,
  saltRounds: 5,
  expiresIn: '1h',
  accessTokenExpiry: '15m',
  refreshTokenExpiry: '2d',
};

const sequelizeErrors = {
  UNIQUE_CONSTRAINT: 'SequelizeUniqueConstraintError',
  FOREIGN_KEY_CONSTRAINT: 'SequelizeForeignKeyConstraintError',
  DATABASE_ERROR: 'SequelizeDatabaseError',
  VALIDATION_ERROR: 'SequelizeValidationError',
  CONNECTION_REFUSED: 'SequelizeConnectionRefusedError',
  CONNECTION_TIMED_OUT: 'SequelizeConnectionTimedOutError',
  CONNECTION_ACCESS_DENIED: 'SequelizeAccessDeniedError',
  CONNECTION_HOST_NOT_FOUND: 'SequelizeHostNotFoundError',
  CONNECTION_HOST_NOT_REACHABLE: 'SequelizeHostNotReachableError',
  CONNECTION_INVALID_CONNECTION: 'SequelizeInvalidConnectionError',
  CONNECTION_CONN_LOST: 'SequelizeConnectionLostError',
}

module.exports = {
  environment,
  statusCode,
  apiHost,
  apiPort,
  jwtConfig,
  sequelizeErrors,
  clientHost,
};

// const environment = {
//     development: {
//         prefix: 'dev',
//         isProduction: false,
//         apiHost: 'http://localhost:3000',
//         apiPort: process.env.PORT || 3000
//     },
//     production: {
//         prefix: 'prod',
//         isProduction: true,
//         apiHost: 'http://localhost:3000',
//         apiPort: process.env.PORT || 3000
//     },
//     test: {
//         prefix: 'test',
//         isProduction: false,
//         apiHost: 'http://localhost:3000',
//         apiPort: process.env.PORT || 3000
//     }
// }[process.env.NODE_ENV || 'development'];
