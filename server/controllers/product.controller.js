import Accessories from "../models/acsseosries.model.js";
import Cars from "../models/cars.model.js";
import Services from '../models/services.model.js';



export const accessoriesData = async (req, res) => {
    try {
        const products = await Accessories.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve products' });
    }
}
export const add_accessory = async (req, res) => {
    try {
        const { title, description, price, ImageUrl } = req.body;
        const newAccessory = new Accessories({
            title, description, price, ImageUrl, itemquantity: 1, favourit: false
        });
        await newAccessory.save();
        res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create product' });
    }
};
export const edit_accessory = async (req, res) => {
    try {
        const { uid, name, description, bodyStyle, model, price, ImageUrl } = req.body;
        const oldCar = await Accessories.findOne({ _id: uid });
        if (!oldCar) {
            res.json({ error: "User is not Exists" });
        }
        await oldCar.updateOne({
            name, description, bodyStyle, model, price, ImageUrl
        });
        res.json({ message: 'Car Edited successfully' });
    } catch (error) {
        res.json({ message: 'Failed to Edite car' });
    }
}
export const delete_accessory = async (req, res) => {
    const { id } = req.params
    try {
        await Accessories.deleteOne({ _id: id })
        // await newProduct.save();
        res.status(201).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product' });
    }
};

export const carsData = async (req, res) => {
    try {
        const products = await Cars.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve products' });
    }
}
export const add_car = async (req, res) => {
    try {
        const { name, description, bodyStyle, model, price, ImageUrl, serviceprice } = req.body;
        const newCar = new Cars({
            name, description, bodyStyle, model, price, ImageUrl, serviceprice, itemquantity: 1, favourit: false, color: [
                "red",
                "green",
                "yellow",
                "blue",
                "black"
            ]
        });
        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create product' });
    }
};
export const edit_car = async (req, res) => {
    try {
        const { uid, name, description, bodyStyle, model, price, ImageUrl } = req.body;
        const oldCar = await Cars.findOne({ _id: uid });
        if (!oldCar) {
            res.json({ error: "User is not Exists" });
        }
        await oldCar.updateOne({
            name, description, bodyStyle, model, price, ImageUrl
        });
        res.json({ message: 'Car Edited successfully' });
    } catch (error) {
        res.json({ message: 'Failed to Edite car' });
    }
}
export const delete_car = async (req, res) => {
    const { id } = req.params
    try {
        await Cars.deleteOne({ _id: id })
        // await newProduct.save();
        res.status(201).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product' });
    }
};

export const servicesData = async (req, res) => {
    try {
        const products = await Services.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve products' });
    }
}
export const add_service = async (req, res) => {
    try {
        const { title, description, serviceprice, serviceduration } = req.body;
        const newProduct = new Services({
            title, description, serviceprice, serviceduration
        });
        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create product' });
    }
};
export const edit_Service = async (req, res) => {
    try {
        const { uid, title, description, serviceprice, serviceduration } = req.body;
        const oldCar = await Services.findOne({ _id: uid });
        if (!oldCar) {
            res.json({ error: "User is not Exists" });
        }
        await oldCar.updateOne({
            title, description, serviceprice, serviceduration
        });
        res.json({ message: 'Car Edited successfully' });
    } catch (error) {
        res.json({ message: 'Failed to Edite car' });
    }
}
export const delete_service = async (req, res) => {
    const { id } = req.params
    try {
        await Services.deleteOne({ _id: id })
        // await newProduct.save();
        res.status(201).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product' });
    }
};
