const mongoose = require('mongoose')
const ServicesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    serviceprice: {
        type: String,
        required: true,
    },
    serviceduration: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    serviceduration: {
        type: String,
        required: true,
    },
});

const Services = mongoose.model('services', ServicesSchema);
module.exports = Services