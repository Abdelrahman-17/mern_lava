import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import Chats from "../models/chats.model.js";
import Orders from '../models/orders.model.js';
import Booking from '../models/booking.model.js';
import Image from "../models/Image.model.js";
// const generateTokenAndSetCookie = require("../utils/generateToken.js");
import jwt from 'jsonwebtoken';
// const crypto = require("crypto");
import keys from "../config/keys.js";
const { secret, tokenLife } = keys.jwt;
const { host, port, mail, pass } = keys.nodemailer;
const { clientURL } = keys.app
import nodemailer from "nodemailer";



export const register = async (req, res) => {
    const { username, email, phoneNumber, password } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const oldEmail = await User.findOne({ email });
        if (oldEmail) {
            return res.json({ status: 'Email Exists' });
        }
        // const oldUser = await User.findOne({ username });
        // if (oldUser) {
        //     return res.json({ status: 'User Exists' });
        // }
        // const oldPhone = await User.findOne({ phoneNumber });
        // if (oldPhone) {
        //     return res.json({ status: 'phoneNumber Exists' });
        // }
        await User.create({
            fullname: "",
            username,
            email,
            phoneNumber,
            password: encryptedPassword,
            address: "",
            gender: "",
            photoimage: "",
        });

        res.json({ status: "ok" });
    }
    catch (error) {
        res.json({ status: error.message });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ error: "User Not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
        // generateTokenAndSetCookie(user._id, res);

        const token = jwt.sign({ email: user.email }, secret, {
            expiresIn: tokenLife,
        });
        if (user.__v === 0) {
            const key = Math.floor(Math.random() * 1000000 + 1)
            // const url = `http://localhost:5000/api/auth/jwt.verify/${token}`
            const url = `${clientURL}/otp?key=${key}&token=${token}`
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: host,
                port: port,
                secure: false,
                // pool: true,
                auth: {
                    // adarsh438tcsckandivali
                    user: mail,
                    pass: pass,
                },
            });
            const mailOptions = {
                to: email,
                subject: 'jwt.verify Account',
                html: `Click <a href = '${url}'>here</a> to confirm your email. with your key ${key}`
                // html: `Click <a href = '${url}'>here</a> to confirm your email. with your key `
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.json(error);
                }
                else {
                    res.json(`Email sent: ${email}` + info.response);
                }
            });
            return res.json({ status: "verfy your email first before login" });
            // res.redirect(`${url}`)
        }
        else {
            return res.json({ status: "ok", data: token });
        }

    }
    res.json({ status: "error", error: "InvAlid Password" });
}
export const verify = async (req, res) => {
    const { token } = req.params
    // Check we have an id
    if (!token) {
        return res.send({
            message: "Missing Token"
        });
    }

    // Step 1 -  jwt.verify the token from the URL
    let payload = null;
    try {
        payload = jwt.verify(token, secret);
        // res.json(payload)
    }
    catch (err) {
        return res.send(err);
    }
    try {
        // Step 2 - Find user with matching ID
        const user = await User.findOne({ email: payload.email }).exec();
        if (!user) {
            return res.send({
                message: "User does not exists"
            });
        }
        //     // Step 3 - Update user verification status to true
        // res.json(user)
        user.__v = 1;
        await user.save();
        return res.redirect(`${clientURL}/login?token=${token}`)
        // return res.send({
        //     message: "Account Verified"
        // });
    }
    catch (err) {
        return res.send(err);
    }
}
export const userData = async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, secret, (err, res) => {
            if (err) {
                return "token expired";
            }
            return res;
        });
        console.log(user);
        if (user == "token expired") {
            return res.send({ status: "error", data: "token expired" });
        }
        const useremail = user.email;
        User.findOne({ email: useremail })
            .then((data) => {
                res.send({ status: "ok", data: data });
            })
            .catch((error) => {
                res.send({ status: "error", data: error });
            });
    }
    catch (error) { }
};
export const forgot_password = async (req, res) => {
    const { email } = req.body;
    try {
        const oldUser = await User.findOne({ email });
        if (!oldUser) {
            return res.json({ status: "User Not Exists!!" });
        }
        // const secret = secret + oldUser.password;
        const token = jwt.sign({ email: oldUser.email }, secret, {
            expiresIn: tokenLife
        });
        const link = `${clientURL}/resetpassword/${oldUser._id}/${token}`;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: host,
            port: port,
            secure: false,
            // pool: true,
            auth: {
                // adarsh438tcsckandivali
                user: mail,
                pass: pass,
            },
        });
        const mailOptions = {
            from: mail,
            to: oldUser.email,
            subject: "Password Reset",
            text: link,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.json(error);
            }
            else {
                res.json(`Email sent: ${oldUser.email}` + info.response);
            }
        });
        // res.json({ status: "ok", link: link })
        res.json({ status: "ok", message: 'Check your Email message' })
    } catch (error) {
        res.json({ status: error })
    }
};
export const reset_password_id_token_get = async (req, res) => {
    const { id, token } = req.params;
    const oldUser = await User.findOne({ _id: id });
    try {
        if (!oldUser) {
            return res.json({ status: "User Not Exists!!" });
        }
        // const secret = secret + oldUser.password;
        const url = `${clientURL}/resetpassword/${id}/${token}`
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: host,
            port: port,
            secure: false,
            // pool: true,
            auth: {
                // adarsh438tcsckandivali
                user: mail,
                pass: pass,
            },
        });
        const mailOptions = {
            to: oldUser.email,
            subject: 'jwt.verify Account',
            html: `Click <a href = '${url}'>here</a> to reset ypur password.`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.json(error);
            }
            else {
                res.json(`Email sent: ${oldUser.email}` + info.response);
            }
        });
        return res.send({ status: "Check your email message" });
        // const verify = jwt.jwt.verify(token, secret);
        // res.render("index", { email: jwt.verify.email, status: "Not Verified" });
    } catch (error) {
        // console.log(error);
        res.send({ status: error.message });
    }
};
export const reset_password_id_token_post = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    const oldUser = await User.findOne({ _id: id });
    try {
        if (!oldUser) {
            return res.json({ status: "User Not Exists!!" });
        }
        // const secrett = secret + oldUser.password;
        const verify = jwt.verify(token, secret, (err, res) => {
            if (err) {
                return "token expired";
            }
            return res;
        });;
        if (verify == "token expired") {
            return res.send({ status: "error", data: "token expired" });
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        await User.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    password: encryptedPassword,
                },
            }
        );
        // res.render("index", { status: "verified" });
        res.send({ status: "Reset password successfully" });
        // res.render("index", { email: jwt.verify.email, status: "verified" });
    }
    catch (error) {
        // console.log(error);
        res.send({ status: error.message });
    }
};
export const getAllUsers = async (req, res) => {
    try {
        const allUser = await User.find({});
        res.send({ status: "ok", data: allUser });
    } catch (error) {
        console.log(error);
    }
};
export const getAllUsers_no_admin = async (req, res) => {
    try {
        const allUser = await User.find({ "email": { $nin: ["admin@gmail.com"] } });
        res.send({ status: "ok", data: allUser });
    } catch (error) {
        console.log(error);
    }
};
export const getAdmin = async (req, res) => {
    try {
        const allUser = await User.find({ "email": { $in: ["admin@gmail.com"] } });
        res.send({ status: "ok", data: allUser });
    } catch (error) {
        console.log(error);
    }
};
export const deleteUser = async (req, res) => {
    const { userid } = req.body;
    try {
        User.deleteOne({ _id: userid }, function (err, res) {
            console.log(err);
        });
        Chats.deleteMany({ senderId: userid }, function (err, res) {
            console.log(err);
        });
        Chats.deleteMany({ receiverId: userid }, function (err, res) {
            console.log(err);
        });
        Orders.deleteMany({ uid: userid }, function (err, res) {
            console.log(err);
        });
        Booking.deleteMany({ uid: userid }, function (err, res) {
            console.log(err);
        });
        res.send({ status: "Ok", data: "Deleted" });
    } catch (error) {
        console.log(error);
        res.send(error.message)
    }
};
export const upload_image = async (req, res) => {
    // const { base64 } = req.body;
    // const imageBuffer = Buffer.from(base64.data, "base64");
    const { image, uid } = req.body;
    try {

        await Image.create({
            image,
            uid
        })
        // await Image.create({ image: base64 });
        res.send({ Status: "ok" })

    } catch (error) {
        res.send({ Status: "error", data: error });
    }

    // const newImage = new Image({
    //   name: 'Uploaded Image',
    //   image: base64,
    // });

    // await newImage.save();
};
export const get_image = async (req, res) => {
    const { uid } = req.body;
    try {
        const image = await Image.findOne({ uid });
        res.send({ status: "ok", data: image });
    } catch (error) {
        res.send({ status: "error", data: error });
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const update_user_data = async (req, res) => {
    const { uid, email, username, phoneNumber, address, fullname, gender, photoimage } = req.body
    const oldUser = await User.findOne({ _id: uid });
    try {
        if (!oldUser) {
            return res.json({ error: "User is not Exists" });
        }
        // User.updateMany({email}, function (err, res) {
        //     console.log(err);
        // });
        await oldUser.updateOne({ email, username, phoneNumber, address, fullname, gender, photoimage })
        res.send({ status: "ok", data: "User is edit " });
    } catch (error) {
        res.send({ status: "error" });
    }

}

