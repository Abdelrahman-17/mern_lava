const mongoose = require('mongoose')
const ChatsSchema = new mongoose.Schema({
    senderId: {
        type: String,
        required: true,
    },
    receiverId: {
        type: String,
        required: true,
    },
    message: {
        type: Array,
        required: true,
    },
    // imageUrl: {
    //     type: String,
    //     required: true,
    // },
    timestamp: {
        type: String,
        // required: true
    }
});

const Chats = mongoose.model('chats', ChatsSchema);
module.exports = Chats