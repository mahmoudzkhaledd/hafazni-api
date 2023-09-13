const User = require('../../../../Models/User');
const MemorizerData = require('../../../../Models/MemorizerData');
const config = require('../../../../ServerConfigs/ServerConfigs.json');
exports.searchMemroizer = async (req, res, next) => {
    let {
        countries,
        maxrating,
        readings,
        certificate,
        page
    } = req.query;
    const userModel = res.locals.userModel;
    const maxSearch = config.maxSearch;
    countries = countries || [];
    maxrating = Number(maxrating) || 5;
    if (readings != null) {
        readings = JSON.parse(readings);
    }
    page = Number(page) || 0;

    certificate = certificate == 'true';
    const options = {
        state: "accepted",
        // userId: { "$ne": userModel.id },
        rating: { "$lte": maxrating },
        certificant: { "$ne": null, },
        readings: { "$in": readings }
    };
    if (!certificate) {
        delete options.certificant;
    }
    if (readings == null || readings.length == 0) {
        delete options.readings;
    }
    
    const users = await MemorizerData.find(options)
        .skip(page * maxSearch)
        .limit(maxSearch)
        .populate('userId', { firstName: 1, lastName: 1, prifilePic: 1, })
    res.status(200).json({
        result: users,
    });
}