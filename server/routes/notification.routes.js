import express from "express";
import { add_notification, notificationData, clear_notification } from "../controllers/notification.controller.js";
const router = express.Router();

router.post('/add-notification', add_notification);
router.get('/notificationData/:id', notificationData);
router.post('/clear-notification', clear_notification);

export default router