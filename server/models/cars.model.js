import mongoose from "mongoose";
const CarsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    bodyStyle: {
        type: String,
        required: true
    },
    model: {
        type: Array,
        required: true,
    },
    price: {
        type: Number,
        required: true,

    },
    color: {
        type: Array,
        // required: true,
    },
    description: {
        type: String,
        required: true,
    },
    itemquantity: {
        type: Number,
        // required: true,
    },
    favourit: {
        type: Boolean,
        // required: true,
    },
    ImageUrl: {
        type: String,
        required: true,
    },
    serviceprice: {
        type: Number,
        required: true
    }

});
const Cars = mongoose.model('car', CarsSchema);
export default Cars
