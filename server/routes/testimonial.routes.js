import express from "express";
import { send_testimonial, testimonialData, clear_testimonial } from "../controllers/testimonial.controller.js";

const router = express.Router();

router.post('/send-testimonial', send_testimonial);
router.post('/testimonialData', testimonialData);
router.post('/clear-testimonial', clear_testimonial);

export default router