const endpoints = require('./endpoints');
const config = { ...require('./env'), endpoints };
module.exports = config;
