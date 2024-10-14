const { statusCode } = require('../../config/constants');
const asyncWrapper = require('../../middlewares/asyncHandler');
const { successResponse } = require('../../utils/apiResponse');
const requestService = require('../services/requestService');
const avatarService = require('../services/avatarService');

const getAllRequests = asyncWrapper(async (req, res) => {
  let requests;
  if (req.query.to && req.query.from) {
    requests = await requestService.getRequestsByFromAndTo(
      req.query.to,
      req.query.from
    );
  } else if (req.query.from) {
    requests = await requestService.getRequestsBySender(req.query.from);
    requests = await avatarService.addSignedUrl(requests);
  } else if (req.query.to) {
    requests = await requestService.getRequestsByRecipient(req.query.to);
    requests = await avatarService.addSignedUrl(requests);
  } else {
    requests = await requestService.getAllRequests();
    requests = await avatarService.addSignedUrl(requests);
  }
  console.log("++++",requests);
  return successResponse(res, statusCode.SUCCESS, requests, 'Requests found', true);
});

const createRequest = asyncWrapper(async (req, res) => {
  const { from, to, message } = req.body;
  const request = await requestService.createRequest(from, to, message);
  return successResponse(res, statusCode.CREATED, request, 'Request created', true);
});

const deleteRequest = asyncWrapper(async (req, res) => {
  const { from, to } = req.query;
  await requestService.deleteRequest(from, to);
  return successResponse(res, statusCode.SUCCESS, null, 'Request deleted', true);
});

module.exports = {
  getAllRequests,
  createRequest,
  deleteRequest,
};
