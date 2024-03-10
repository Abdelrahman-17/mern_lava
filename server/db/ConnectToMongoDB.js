const mongoose = require('mongoose');
const { database } = require('../config/keys');
const chalk = require('chalk');

module.exports = connectToMongoDB = async () => {
    try {
        // mongoose.set('useCreateIndex', true);
        await mongoose.connect(database.url)
        console.log("Connected to MongoDB ");
        // console.log(`${chalk.green('✓')} ${chalk.blue('Connected to MongoDB !')}`)

    } catch (error) {
        console.log("Error connecting to MongoDB", error.message);
    }
};

