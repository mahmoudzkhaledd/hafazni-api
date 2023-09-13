const firebase = require('firebase/app');
exports.configFirebase = () => {
    firebase.initializeApp(require('./Config/StorageConfig').firebaseConfig);
};
