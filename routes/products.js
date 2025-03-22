const express = require("express");
const Product = require("../models/Product"); // Import Mongoose model
const router = express.Router();

// 🟢 CREATE a product (POST /api/products)
router.post("/", async (req, res) => {
    try {
        const { name, price, category } = req.body;
        if (!name || !price || !category) {
            return res.status(400).json({ message: "Please provide name, price, and category." });
        }

        const newProduct = new Product({ name, price, category });
        await newProduct.save(); // Save to MongoDB
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
});

// 🔵 READ all products (GET /api/products)
router.get("/", async (req, res) => {
    try {
        let query = {};

        // 🔎 Search by product name (case-insensitive)
        if (req.query.search) {
            query.name = { $regex: req.query.search, $options: "i" };
        }

        // 🔵 Filtering by category
        if (req.query.category) {
            query.category = req.query.category;
        }

        let productsQuery = Product.find(query);

        // 🔀 Sorting
        if (req.query.sort) {
            const sortParams = req.query.sort.split("_");
            const sortField = sortParams[0];
            const sortOrder = sortParams[1] === "asc" ? 1 : -1;
            productsQuery = productsQuery.sort({ [sortField]: sortOrder });
        }

        // 📄 Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        productsQuery = productsQuery.skip(skip).limit(limit);

        // Execute query
        const products = await productsQuery;
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




// 🟡 UPDATE a product (PUT /api/products/:id)
router.put("/:id", async (req, res) => {
    try {
        const { name, price, category } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, category },
            { new: true, runValidators: true } // Returns the updated document
        );

        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
});

// 🔴 DELETE a product (DELETE /api/products/:id)
router.delete("/:id", async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
});

module.exports = router;
