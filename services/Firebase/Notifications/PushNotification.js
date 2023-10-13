const axios = require('axios');

exports.pushNotificationByDeviceId = (deviceId, title, body, data) => {
    return new Promise(
        async (res, rej) => {

            const headers = {
                'content-type': "application/json",
                "Authorization": `key=${process.env.SERVER_KEY}`,
            };
            const options = {
                to: deviceId,
                notification: {
                    title,
                    body,
                },
                data: data,
            };
            const stg = {
                url: 'https://fcm.googleapis.com/fcm/send',
                method: 'POST',
                data: options,
                headers,
            }
            const response = await axios(stg).catch(err => {

                return null;
            })


         
            // const response = await axios.post({
            //     url: 'https://fcm.googleapis.com/fcm/send',
            //     method: 'POST',
            // },
            //     options,
            //     headers,
            // ).catch((err) => {
            //     return res(err);
            // });

            return res(response);
        }
    );
}