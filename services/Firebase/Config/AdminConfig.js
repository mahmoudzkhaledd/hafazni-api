var admin = require("firebase-admin");

var serviceAccount = require('../../../ServerConfigs/adminSKD.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
module.exports = admin; 