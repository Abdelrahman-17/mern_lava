import { blue, green, red } from 'chalk';
import { genSalt, hash as _hash } from 'bcryptjs';

import setupDB from './db';
import { ROLES } from '../constants';
import User, { findOne } from '../models/user';

const args = process.argv.slice(2);
const email = args[0];
const password = args[1];

const seedDB = async () => {
    try {
        console.log(`${blue('✓')} ${blue('seed db started')}`);

        if (!email || !password) throw new Error('missing arguments');

        const user = new User({
            email,
            password,
            firstName: 'admin',
            lastName: 'admin',
            role: ROLES.Admin
        });

        const existingUser = await findOne({ email: user.email });
        console.log('existingUser', existingUser);
        if (existingUser) throw new Error('user collection is seeded!');

        const salt = await genSalt(10);
        const hash = await _hash(user.password, salt);
        user.password = hash;

        await user.save();

        console.log(`${green('✓')} ${green('seed db finished')}`);
    } catch (error) {
        console.log(
            `${red('x')} ${red('error while seeding database')}`
        );
        console.log(error);
        return null;
    }
};

(async () => {
    await setupDB().then(async () => {
        await seedDB();
    });
})();
