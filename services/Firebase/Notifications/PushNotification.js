const admin = require('../Config/AdminConfig');
const FCM = require('fcm-node')
const fcm = new FCM(process.env.SERVER_KEY)

exports.pushNotification = (deviceId, title, body, data) => {
    return new Promise(async (res, rej) => {
        let message = {
            notification: {
                title: title,
                body: body,
            },
            token: deviceId,
        };
        const val = await admin.messaging().send(message);
        return res(val);
    });
}