const Booking = require('../models/booking.model')
// const User = require('../models/user.model')
const booking = async (req, res) => {
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
const bookingData = async (req, res) => {
    try {
        const booking = await Booking.find();
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve booking' });
    }
}
module.exports = { booking, bookingData }