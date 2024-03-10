const mongoose = require('mongoose')
const NotificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        // type: Date,
        // default: Date.now
        type: String,
        required: true
    }
});

const Notification = mongoose.model('notification', NotificationSchema);
module.exports = Notification