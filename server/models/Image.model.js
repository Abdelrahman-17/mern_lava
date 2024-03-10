const mongoose = require('mongoose')
const ImageDetailsScehma = new mongoose.Schema(
    // { image: String },
    // { collection: "ImageDetails", }
    {
        // image: {
        //     data: Buffer,
        //     contentType: String,
        // },
        image: {
            type: String,
            required: true,
        },
        uid: {
            type: String,
            required: true,
        },
        // image: {
        //     type: String,
        //     required: true,
        // },
        // type: {
        //     type: String,
        //     required: true,
        // },
        // data: {
        //     type: Buffer,
        //     required: true,
        // },
    }
);

const Image = mongoose.model("ImageDetails", ImageDetailsScehma);
module.exports = Image