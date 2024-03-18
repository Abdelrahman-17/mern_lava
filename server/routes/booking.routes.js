import express from "express";
import { booking, bookingData, bookingData_ID } from "../controllers/booking.controller.js";
const router = express.Router();

router.post('/booking', booking);
router.get('/bookingData', bookingData);
router.get('/bookingData/:id', bookingData_ID);

export default router