const Notification = require("../models/notification.model");
const notificationData = async (req, res) => {
    const { id } = req.params;
    try {
        const allNotification = await Notification.find({ _id: id })
        res.status(201).json(allNotification);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve Notification' });
    }
}
const add_notification = async (req, res) => {
    const { title, description, price, date } = req.body;
    try {
        await Notification.create({
            title,
            description,
            price,
            date,
        });
        res.send({ status: "Notification added successful" });
    }
    catch (error) {
        res.send({ status: "Error Notification" });
    }
}
const clear_notification = async (req, res) => {
    const { NotificationId } = req.body;
    try {
        await Notification.deleteMany({ id: NotificationId });
        res.status(201).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete Notification' });
    }
}
module.exports = { notificationData, clear_notification, add_notification }
