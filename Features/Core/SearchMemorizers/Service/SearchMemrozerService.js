const User = require('../../../../Models/User');
const MemorizerData = require('../../../../Models/MemorizerData');
const config = require('../../../../ServerConfigs/ServerConfigs.json');
exports.searchMemroizer = async (req, res, next) => {
    let {
        countries,
        maxrating,
        readings,
        certificate,
        begin,
        end,
    } = req.query;
    const userModel = res.locals.userModel;
    const maxSearch = config.maxSearch;

    countries = (countries != null && countries != '[]') ? countries.slice(1, -1).split(', ') : null;

    maxrating = Number(maxrating) || 5;
    if (readings != null) {
        readings = JSON.parse(readings);
    }
    begin = Number(begin) || 0;
    end = Number(end) || 0;

    certificate = certificate == 'true';

    const options = {
        state: "accepted",
        userId: { "$ne": null },
        rating: { "$lte": maxrating },
        certificant: { $ne: null, },
        readings: { $in: readings },
        country: { $in: countries },
    };
    if (!certificate) {
        delete options.certificant;
    }
    if (readings == null || readings.length == 0) {
        delete options.readings;
    }

    if (countries == null || countries.length == 0) {
        delete options.country;
    }

    const users = await MemorizerData.find(options)
        .skip(begin)
        .limit(end - begin)
        .populate('userId', { firstName: 1, lastName: 1, profilePic: 1, });

    res.status(200).json({
        result: users,

    });
}