import mongoose from "mongoose";
import keys from "../config/keys.js";
const { url } = keys.database

export async function ConnectToMongoDB() {
    try {
        // mongoose.set('useCreateIndex', true);
        await mongoose.connect(url)
        console.log("Connected to MongoDB ");
        // console.log(`${chalk.green('✓')} ${chalk.blue('Connected to MongoDB !')}`)

    } catch (error) {
        console.log("Error connecting to MongoDB", error.message);
    }
};

