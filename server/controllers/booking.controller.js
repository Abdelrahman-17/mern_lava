import Booking from '../models/booking.model.js';
// const User = require('../models/user.model')
export const booking = async (req, res) => {
    const { bookingamount, bookingdate, uid, bookingitem } = req.body;
    try {
        await Booking.create({
            bookingamount,
            bookingdate,
            uid,
            bookingitem,
        });
        res.send({ status: "Payment successful" });
    }
    catch (error) {
        res.send({ status: "Error Payment" });
    }
}

export const bookingData = async (req, res) => {
    try {
        const booking = await Booking.find();
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve booking' });
    }
}
export const bookingData_ID = async (req, res) => {
    try {
        const { id } = req.params
        const booking = await Booking.find({ uid: id });
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve booking' });
    }
}