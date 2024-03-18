import express from "express";
import { checkout, ordersData } from "../controllers/store.controller.js";
const router = express.Router();

router.post('/checkout', checkout);
router.get('/ordersData', ordersData);
export default router