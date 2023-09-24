const mongoose = require('mongoose');

module.exports = async function configDbConnection() {
    const url = process.env.MONGO_URL;
    mongoose.set("strictQuery", false);
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected To Database");
    });
   
    // await Plan.create({
    //     title: "asd",
    //     duration: 12,
    //     memorizerFrom: "33c1bb500c98f426a058bd95",
    //     preRequisites: [
    //         "asd",
    //         "qwe",
    //     ],
    //     price: 12.986,
    //     promoCode: [
    //         "33c1bb500c98f426a058bd95",
    //         "33c1bb500c98f426a058bd95",
    //         "33c1bb500c98f426a058bd95",
    //     ],
    //     afterDiscount: 9.88,
    // })
}