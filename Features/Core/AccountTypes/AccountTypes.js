const appRouter = require('express').Router();
const { accountTypeService } = require('./Service/AccountTypesService');
const { updateUserAccountType,
    updateMemorizerAccountType,
    removeUserAccountType,
    removeMemorizerAccountType,
    deleteMemorizerCertificate,
} = require('./Service/UpdateAccountType');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() })
    .single('filename');
appRouter.get('/', accountTypeService);
appRouter.delete('/certificate', deleteMemorizerCertificate);
appRouter.route('/user')
    .put(updateUserAccountType)
    .delete(removeUserAccountType);
appRouter.route('/memorizer')
    .put(upload, updateMemorizerAccountType)
    .delete(removeMemorizerAccountType);
module.exports = appRouter;