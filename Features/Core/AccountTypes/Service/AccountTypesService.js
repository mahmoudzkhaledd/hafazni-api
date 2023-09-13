const asyncHandeler = require('express-async-handler');
const UserData = require('../../../../Models/UserData');
const MemorizerData = require('../../../../Models/MemorizerData');

exports.accountTypeService = asyncHandeler(async (req, res, next) => {
    const userModel = res.locals.userModel;
    const userData =await UserData.findOne({ userId: userModel.id });
    const memorizerData =await MemorizerData.findOne({ userId: userModel.id })
    const jsonModel = {
        userData,
        memorizerData
    };
    res.status(200).json(jsonModel);
});