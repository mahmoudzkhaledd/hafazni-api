const express = require('express');
const app = express();
require('dotenv').config();
const configDbConnection = require('./Configs/DB_Config');
const errorHandeler = require('./Error_Handeler/ErrorsHandelerModule');
const appRoute = require('./Features/AppRoutes');
const PORT = process.env.PORT;
// ./ServerConfigs/adminSKD.json
app.use(express.json());

configDbConnection();

app.use(appRoute);
app.all('*', (req, res, next) => {
    return res.status(404).json({
        "State": "Can't find this route !",
    });
});
const server = app.listen(PORT, () => {
    console.log(`listen to http://localhost:${PORT}/`)
});

app.use(errorHandeler);
process.on('unhandledRejection', (error) => {
    console.log(`Unhandeled Exeption ${error}`);
    process.exit(1)
});