const { uploadFile } = require('../../../../services/Firebase/Storage/StorageUpload');
exports.updateProfile = async (req, res, next) => {
    const result = await uploadFile(req.file);
    res.status(200).json({ result })
}