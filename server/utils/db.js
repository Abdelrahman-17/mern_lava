require('dotenv').config();
import { green, blue } from 'chalk';
import { set, connect } from 'mongoose';

import keys from '../config/keys';
const { database } = keys;

const setupDB = async () => {
    try {
        // Connect to MongoDB
        set('useCreateIndex', true);
        connect(database.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
            .then(() =>
                console.log(`${green('✓')} ${blue('MongoDB Connected!')}`)
            )
            .catch(err => console.log(err));
    } catch (error) {
        return null;
    }
};

export default setupDB;