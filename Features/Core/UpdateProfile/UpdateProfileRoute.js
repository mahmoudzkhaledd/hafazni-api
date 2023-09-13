const appRoute = require('express').Router();
const multer = require('multer');
const { updateProfile } = require('./Service/UpdateProfile');
const config = require('../../../ServerConfigs/ServerConfigs.json');
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: config.maxFileSize } });

appRoute.post('/', upload.single('filename'), updateProfile);


module.exports = appRoute;