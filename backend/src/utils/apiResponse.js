class ApiResponse {
  constructor(success, data, message) {
    this.success = success;
    this.data = data;
    this.message = message;
  }
}

const successResponse = (res, statusCode, data, message = 'Success', success) => {
  const response = new ApiResponse(success, data, message);
  return res.status(statusCode).json(response);
};

const errorResponse = (res, statusCode, message = 'Error') => {
  const response = new ApiResponse(statusCode, null, message);
  return res.status(statusCode).json(response);
};

module.exports = {
  successResponse,
  errorResponse,
};
