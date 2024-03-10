const mongoose = require('mongoose')
const BookingSchema = new mongoose.Schema({
    bookingamount: {
        type: Number,
        required: true,
    },
    bookingdate: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true,
    },
    bookingitem: {
        type: Array,
        required: true
    }
});

const Booking = mongoose.model('booking', BookingSchema);
module.exports = Booking