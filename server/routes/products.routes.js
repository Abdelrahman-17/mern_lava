import express from "express";
import { accessoriesData, add_accessory, delete_accessory, carsData, add_car, delete_car, servicesData, add_service, delete_service, edit_accessory, edit_car, edit_Service } from "../controllers/product.controller.js";
const router = express.Router();


router.get("/accessoriesData", accessoriesData);
router.post("/add-accessory", add_accessory);
router.put("/edit-accessory/:id", edit_accessory);
router.get("/delete-accessory/:id", delete_accessory);

router.get("/carsData", carsData);
router.post("/add-car", add_car);
router.put("/edit-car/:id", edit_car);
router.get("/delete-car/:id", delete_car);

router.get("/servicesData", servicesData);
router.post("/add-service", add_service);
router.put("/edit-service/:id", edit_Service);
router.get("/delete-service/:id", delete_service);

export default router