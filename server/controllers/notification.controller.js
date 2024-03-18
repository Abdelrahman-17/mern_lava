import Notification from "../models/notification.model.js";
export const notificationData = async (req, res) => {
    const { id } = req.params;
    try {
        const allNotification = await Notification.find({ uid: id })
        // const allNotification = await Notification.find({})

        res.status(201).json(allNotification);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve Notification' });
    }
}
export const add_notification = async (req, res) => {
    const { uid, title, description, price, date } = req.body;
    try {
        await Notification.create({
            uid,
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
export const clear_notification = async (req, res) => {
    const { notificationId } = req.body;
    try {
        await Notification.deleteMany({ uid: notificationId });
        res.status(201).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete Notification' });
    }
}
