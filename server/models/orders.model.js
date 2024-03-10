const mongoose = require('mongoose')
const OrdersSchema = new mongoose.Schema({
    orderamount: {
        type: Number,
        required: true,
    },
    orderdate: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true,
    },
    orderitem: {
        type: Array,
        required: true
    }
});

const Orders = mongoose.model('orders', OrdersSchema);
module.exports = Orders