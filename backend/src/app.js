const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require('./middlewares/errorHandler');
const endpointNotFound = require('./middlewares/endpointNotFound');

const morgan = require('./config/morgan');
const { environment, clientHost } = require('./config/constants');
const cookieParser = require('cookie-parser');

const app = express();

// Log the request
if (
  process.env.NODE_ENV === environment.DEVELOPMENT ||
  process.env.NODE_ENV === environment.TEST
) {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}
// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
// app.use(xss())

// parse cookies
app.use(cookieParser());

// enable cors
app.use(
  cors({
    origin: clientHost,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Origin',
      'X-Requested-With',
      'Accept',
      'x-access-token',
    ],
    credentials: true,
    preflightContinue: false,
  })
);

// Serve static files
app.use('/public', express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/v1', require('./routes'));

app.use('*', errorHandler);
app.use(endpointNotFound);

module.exports = app;
