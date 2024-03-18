import mongoose from 'mongoose';
const AccessoriesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    itemquantity: {
        type: Number,
        required: true,
    },
    favourit: {
        type: Boolean,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    ImageUrl: {
        type: String,
        required: true,
    },
});

const Accessories = mongoose.model('accessories', AccessoriesSchema);
export default Accessories