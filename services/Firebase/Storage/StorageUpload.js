const firebase = require('firebase/app')
firebase.initializeApp(require('../Config/StorageConfig').firebaseConfig);

const { getStorage, ref, getDownloadURL, uploadBytes, listAll, deleteObject } = require('firebase/storage');
const storage = getStorage();

function getPathStorageFromUrl(url) {
    const baseUrl = "https://firebasestorage.googleapis.com/v0/b/hafazni-476fb.appspot.com/o/";
    let imagePath = url.replace(baseUrl, "");

    const indexOfEndPath = imagePath.indexOf("?");

    imagePath = imagePath.substring(0, indexOfEndPath);
    imagePath = String(imagePath).split('%2F').join('/');

    return imagePath;
}

exports.deleteFile = (url) => {
    return new Promise(async (res, rej) => {
        const fileRef = ref(storage, getPathStorageFromUrl(url));
        deleteObject(fileRef).then(result => res(true))
            .catch(err => res(false));
    });
}

exports.uploadFile = (file, filePath, fileName) => {
    return new Promise(async (res, rej) => {
        const splt = file.originalname.split('.');
        const fName = `${fileName}.${splt.length == 0 ? "png" : splt[1]}`;
        const storageRef = ref(storage, `${filePath}`);
        //const result = await listAll(storageRef);
        const fileRef = ref(storage, `${filePath}/${fName}`);
        uploadBytes(fileRef, file.buffer)
            .then(async (result) => res(await getDownloadURL(fileRef)))
            .catch(async (err) => {

                rej(err)
            });
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



