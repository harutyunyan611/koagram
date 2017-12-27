const mongoose = require('mongoose');
const config = require('./config');
const bluebird = require('bluebird');

mongoose.connect(config.db, { useMongoClient: true });
mongoose.Promise = bluebird;

module.exports = mongoose;