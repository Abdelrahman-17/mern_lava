const Testimonial = require("../models/testimonial.model");
const User = require("../models/user.model");
// const User = require('../models/user.model')
const send_testimonial = async (req, res) => {
    const { uid, firstname, lastname, email, phone, message, date, photoimage } = req.body;
    try {
        const oldUser = User.find({ email })
        if (!oldUser) {
            return res.json({ error: "User Exists" });
        }
        await Testimonial.create({
            _id, uid,
            firstname,
            lastname,
            email,
            phone,
            message,
            date,
            photoimage
            // photoimage:oldUser.phone,
        });
        res.send({ status: "Sending successful" });
    }
    catch (error) {
        res.send({ status: "Error Sending" });
    }
}
const testimonialData = async (req, res) => {
    // const { userID } = req.body;
    try {
        const allTestimonial = await Testimonial.find({})
        // const allTestimonial = await Testimonial.find({
        //     'senderId':
        //     {
        //         $in: [`${userID}`]
        //     }
        // });
        res.send({ status: "ok", data: allTestimonial });
    } catch (error) {
        res.send(error);
        // res.status(500).json({ message: 'Failed to retrieve Testimonial' });
    }
}
const clear_testimonial = async (req, res) => {
    const { selectedid } = req.body;
    try {
        await Testimonial.deleteMany({ 'senderId': { $in: `${selectedid}` } });

        res.send({ status: "Ok", data: "Deleted" });
    } catch (error) {
        res.send({ status: "Error", data: 'Failed to Clearing Testimonial' });
    }
}
module.exports = { send_testimonial, clear_testimonial, testimonialData }