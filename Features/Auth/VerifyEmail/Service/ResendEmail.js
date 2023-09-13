const EmailVerification = require('../../../../Models/VerificationEmail');
const User = require('../../../../Models/User');
const configs = require("../../../../ServerConfigs/ServerConfigs.json");

const { sendVerificationEmail } = require('../../../../services/MailServices/mailServices');
const bcrypt = require('bcrypt');

async function sendEmail(user) {
    return new Promise(async (res, rej) => {
        const code = generateRandomNumber();
        const codeSalt = await bcrypt.genSalt();
        const hashedCode = await bcrypt.hash(`${code}`, codeSalt);
        await sendVerificationEmail(
            user.email,
            `${user.firstName} ${user.lastName}`,
            code,
            hashedCode,
            user._id,
            true,
        );
        return res(hashedCode);
    });
}
exports.resendEmail = async (req, res, next) => {
    const userId = res.locals.userModel.id;
    const user = await User.findById(userId, { email: 1, firstName: 1, lastName: 1 });
    if (user == null) {
        return res.status(402).json({ msg: "user not found !" });
    }
    const email = await EmailVerification.findOne({ userTo: userId });
    if (email == null) {
        const code = await sendEmail(user)
        const mail = await EmailVerification.findOneAndUpdate({}, {
            userTo: userId,
            code: code,
            resendTrails: configs.defaultSendTrails,
        }, { upsert: true, new: true, setDefaultsOnInsert: true })
            .catch(err => null);
        return res.sendStatus(200);
    }
    if (email.resendTrails - 1 < 0) {
        const updatedAt = new Date(email.updatedAt);
        const now = Date.now();
        const diff = (now - updatedAt) / (1000);
        if (diff >= configs.waitingBetweenEndTrails) {
            const code = await sendEmail(user);
            email.resendTrails = configs.defaultSendTrails;
            email.code = code;
            await email.save();
            return res.sendStatus(200);
        }
        return res.status(401).json({ time: (configs.waitingBetweenEndTrails - diff).toFixed(0) });
    }
    const updatedAt = new Date(email.updatedAt);
    const now = Date.now();
    const diff = (now - updatedAt) / (1000);
    if (diff < configs.waitingBetweenSends) {
        return res.status(405).json({
            time: (60 - diff).toFixed(0),
        });
    }
    const code = await sendEmail(user);
    email.code = code;
    email.resendTrails--;
    await email.save();
    return res.sendStatus(200);
}
function generateRandomNumber() {
    const val = Math.floor(100000 + Math.random() * 900000);
    return val;
}