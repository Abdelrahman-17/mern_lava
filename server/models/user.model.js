import { EMAIL_PROVIDER, ROLES } from "../constants/index.js";
import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        required: () => {
            return this.provider !== 'email' ? false : true;
        },
        // unique: () => {
        // return this.provider !== 'email' ? false : true;
        // }
    },
    email: {
        type: String,
        required: () => {
            return this.provider !== 'email' ? false : true;
        },
        unique: () => {
            return this.provider !== 'email' ? false : true;
        }
    },
    phoneNumber: {
        type: String,
        required: () => {
            return this.provider !== 'email' ? false : true;
        },
        // unique: () => {
        // return this.provider !== 'email' ? false : true;
        // }
    },
    fullname: {
        type: String,
    },
    password: {
        type: String,
        required: () => {
            return this.provider !== 'Email' ? false : true;
        },
        // unique: () => {
        // return this.provider !== 'email' ? false : true;
        // },
    },
    // merchant: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Merchant',
    //     default: null
    // },
    provider: {
        type: String,
        required: true,
        default: EMAIL_PROVIDER.Email
    },
    googleId: {
        type: String
    },
    facebookId: {
        type: String
    },
    githubId: {
        type: String
    },
    address: {
        type: String,
    },
    gender: {
        type: String,
    },
    photoimage: {
        type: String
    },
    role: {
        type: String,
        default: ROLES.Member,
        enum: [ROLES.Admin, ROLES.Member, ROLES.Merchant]
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
});
const User = mongoose.model("users", UserSchema);
export default User