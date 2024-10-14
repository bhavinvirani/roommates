const asyncWrapper = require("../../middlewares/asyncHandler");
const { successResponse } = require("../../utils/apiResponse");
const { statusCode } = require("../../config/constants");
const roommateService = require("../services/roommateService");
const avatarService = require("../services/avatarService");


const getRoommatesByUsername = asyncWrapper(async (req, res) => {
    const { username } = req.params;
    const users = await roommateService.getAllRoommates(username);
    const RoommatesWithAvatar = await avatarService.addSignedUrl(users.roommates);
    return successResponse(res, statusCode.SUCCESS, RoommatesWithAvatar, 'User found', true);
});

const addRoommate = asyncWrapper(async (req, res) => {
    const { person1, person2 } = req.body;
    const result = await roommateService.addRoommate(person1, person2);
    if(result.success && !result.success){
        return successResponse(res, statusCode.BAD_REQUEST, null, result.message, false);
    }
    return successResponse(res, statusCode.CREATED, null, 'Roommate added', true);
});



module.exports = {
    getRoommatesByUsername,
    addRoommate,
};