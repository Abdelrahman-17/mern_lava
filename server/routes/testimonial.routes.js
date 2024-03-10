const express = require("express");
const { send_testimonial, testimonialData, clear_testimonial } = require("../controllers/testimonial.controller");

const router = express.Router();

router.post('/send-testimonial', send_testimonial);
router.post('/testimonialData', testimonialData);
router.post('/clear-testimonial', clear_testimonial);

module.exports = router