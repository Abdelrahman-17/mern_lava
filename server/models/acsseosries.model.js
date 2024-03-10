const mongoose = require('mongoose')
const AccessoriesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    favourit: {
        type: String,
        required: true,
    },
    itemquantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
});

const Accessories = mongoose.model('accessories', AccessoriesSchema);
module.exports = Accessories