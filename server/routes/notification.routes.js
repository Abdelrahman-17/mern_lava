const express = require("express");
const { add_notification, notificationData, clear_notification } = require("../controllers/notification.controller");
const router = express.Router();

router.post('/add_notification', add_notification);
router.get('/notificationData/:id', notificationData);
router.post('/clear-notification', clear_notification);

module.exports = router