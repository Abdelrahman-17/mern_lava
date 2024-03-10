const mongoose = require('mongoose')
const CarsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const Cars = mongoose.model('cars', CarsSchema);
module.exports = Cars