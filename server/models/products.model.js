const mongoose = require('mongoose')
const ProductsSchema = new mongoose.Schema({
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
    // thumbnail: {
    //     type: String,
    //     required: true,
    // },
});

const Products = mongoose.model('products', ProductsSchema);
module.exports = Products