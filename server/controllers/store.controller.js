const Orders = require('../models/orders.model')
// const User = require('../models/user.model')
const checkout = async (req, res) => {
    const { orderamount, orderdate, uid, orderitem } = req.body;
    try {
        await Orders.create({
            orderamount,
            orderdate,
            uid,
            orderitem,
        });
        res.send({ status: "Payment successful" });
    }
    catch (error) {
        res.send({ status: "Error Payment" });
    }
}
const ordersData = async (req, res) => {
    try {
        const orders = await Orders.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve Orders' });
    }
}
module.exports = { checkout, ordersData }