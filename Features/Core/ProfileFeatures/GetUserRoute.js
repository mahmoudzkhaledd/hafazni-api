const appRoute = require('express').Router();
const { loadUserById } = require('./GetUser/GetUserByIdService');
const { updateProfile, uploadPhoto, deletePhoto } = require('./UpdateProfile/UpdateProfile');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() })
    .single('filename');
appRoute.get('/:id', loadUserById);
appRoute.put('/profile/edit', updateProfile);

appRoute.route('/profile/edit/upload-photo')
    .delete(deletePhoto)
    .put(upload, uploadPhoto)
module.exports = appRoute;