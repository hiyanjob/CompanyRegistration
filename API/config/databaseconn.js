// Configuring the database
const dbConfig = require('./database_config');
const mongoose = require('mongoose');

module.exports = async function () {
    try {
      await mongoose.connect(dbConfig.url,dbConfig.connection_management);
      console.log("Successfully connected to the database");
    } catch (error) {
      console.log('Could not connect to the database. Exiting now...', error);
      process.exit()
    }
  }