const firebase = require('firebase/app')
firebase.initializeApp(require('../Config/StorageConfig').firebaseConfig);

const { getStorage, ref, getDownloadURL, uploadBytes } = require('firebase/storage');
const storage = getStorage();
exports.uploadFile = (file) => {
    return new Promise(async (res, rej) => {
        const storageRef = ref(storage, file.originalname);
        uploadBytes(storageRef, file.buffer)
            .then(async (result) => res(await getDownloadURL(storageRef)))
            .catch(err => rej(err));
    });
}
exports.uploadFiles = (files) => {
    return new Promise(async (res, rej) => {
        const urls = [];
        for (let i = 0; i < files.length; i++) {
            const storageRef = ref(storage, file.originalname);
            const result = await uploadBytes(storageRef, file.buffer)
                .then(async (res) => await getDownloadURL(storageRef))
                .catch(err => null);
            if (result != null) {
                urls.push(result);
            }
        }


        return res(urls);
    });
}



