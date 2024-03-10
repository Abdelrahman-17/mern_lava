const mongoose = require("mongoose");
const { ROLES, EMAIL_PROVIDER } = require('../constants/index');

// const UserSchema = new mongoose.Schema({
//     fullname: {
//         type: String,
//     },
//     username: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     phone: {
//         type: String,
//         required: true,
//         maxlength: 11,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 6,
//     },
//     // confpassword: {
//     //     type: String,
//     //     required: true,
//     //     minlength: 6,
//     // },
//     address: {
//         type: String,
//     },
//     gender: {
//         type: String,
//     },
//     photoimage: {
//         type: String,
//         // default: 'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg'
//         // required: true,
//         // unique: true,
//     },
//     // source: {
//     //     type: String,
//     //     required: [true, "source not specified"]
//     // },
//     // lastVisited: {
//     //     type: Date,
//     //     default: new Date()
//     // }

// });
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
            return this.provider !== 'email' ? false : true;
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
const User = mongoose.model('user', UserSchema)
module.exports = User