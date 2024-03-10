const Chats = require("../models/chats.model");
// const User = require('../models/user.model')
const installTimestamp = require('install-timestamp');
const ts = installTimestamp();
const add_chat = async (req, res) => {
    const { senderId, receiverId, message } = req.body;
    try {
        await Chats.create({
            senderId,
            receiverId,
            message,
            // imageUrl,
            timestamp: ts
        });
        res.send({ status: "Payment successful" });
    }
    catch (error) {
        res.send({ status: "Error Payment" });
    }
}
const chatsData = async (req, res) => {
    const { userid, selectedid } = req.body;
    try {
        const allChats = await Chats.find({ 'senderId': { $in: [`${userid}`, `${selectedid}`] }, 'receiverId': { $in: [`${userid}`, `${selectedid}`] } });
        res.send({ status: "ok", data: allChats });
    } catch (error) {
        res.send(error);
        // res.status(500).json({ message: 'Failed to retrieve chats' });
    }
}
const clear_chat = async (req, res) => {
    const { userid, selectedid } = req.body;
    try {
        await Chats.deleteMany({ 'senderId': { $in: [`${userid}`, `${selectedid}`] }, 'receiverId': { $in: [`${userid}`, `${selectedid}`] } });

        // Chats.deleteMany({ senderId: { $in: [userid, selectedid] } }, function (err, res) {
        //     console.log(err);
        // });
        // Chats.deleteMany({ senderId: { $nin: [userid, selectedid] } }, function (err, res) {
        //     console.log(err);
        // });
        res.send({ status: "Ok", data: "Deleted" });
    } catch (error) {
        res.send({ status: "Error", data: 'Failed to Clearing chats' });
    }
}
module.exports = { add_chat, chatsData, clear_chat }