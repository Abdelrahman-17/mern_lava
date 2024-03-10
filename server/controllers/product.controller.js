const Accessories = require("../models/acsseosries.model.js");
const Cars = require("../models/cars.model.js");
const Products = require("../models/products.model.js");
const Services = require('../models/services.model.js')

const productsData = async (req, res) => {
    try {
        const products = await Products.find();
        res.status(201).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve products' });
    }
}
const add_product = async (req, res) => {
    try {
        const { title, price, brand, category, description, favourit, itemquantity } = req.body;
        const newProduct = new Products({
            title, price, brand, category, description, favourit, itemquantity
        });
        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create product' });
    }
};
const delete_product = async (req, res) => {
    const { id } = req.params
    try {
        await Products.deleteOne({ _id: id })
        // await newProduct.save();
        res.status(201).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product' });
    }
};

const accessoriesData = async (req, res) => {
    try {
        const products = await Accessories.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve products' });
    }
}
const add_accessory = async (req, res) => {
    try {
        const {
            title, price, brand, category, description, favourit, itemquantity, thumbnail } = req.body;
        const newProduct = new Accessories({
            title, price, brand, category, description, favourit, itemquantity, thumbnail
        });
        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create product' });
    }
};
const delete_accessory = async (req, res) => {
    const { id } = req.params
    try {
        await Accessories.deleteOne({ _id: id })
        // await newProduct.save();
        res.status(201).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product' });
    }
};

const carsData = async (req, res) => {
    try {
        const products = await Cars.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve products' });
    }
}
const add_car = async (req, res) => {
    try {
        const { name, price } = req.body;
        const newProduct = new Cars({ name, price });
        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create product' });
    }
};
const delete_car = async (req, res) => {
    const { id } = req.params
    try {
        await Cars.deleteOne({ _id: id })
        // await newProduct.save();
        res.status(201).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product' });
    }
};

const servicesData = async (req, res) => {
    try {
        const products = await Services.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve products' });
    }
}
const add_service = async (req, res) => {
    try {
        const { name, price } = req.body;
        const newProduct = new Services({ name, price });
        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create product' });
    }
};
const delete_service = async (req, res) => {
    const { id } = req.params
    try {
        await Services.deleteOne({ _id: id })
        // await newProduct.save();
        res.status(201).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product' });
    }
};
module.exports = { productsData, add_product, delete_product, accessoriesData, add_accessory, delete_accessory, carsData, add_car, delete_car, servicesData, add_service, delete_service }
