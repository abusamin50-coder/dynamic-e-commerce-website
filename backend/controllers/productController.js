const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.json(products);
    } catch (error) {
        console.error(`GetProducts Error: ${error.message}`);
        return res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            return res.json(product);
        } else {
            return res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(`GetProductById Error: ${error.message}`);
        // Handle invalid Mongoose ObjectIDs
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a product (Admin only)
// @route   POST /api/products
const createProduct = async (req, res) => {
    try {
        const { name, price, description, image, category, countInStock } = req.body;
        
        const product = new Product({
            name, price, description, image, category, countInStock
        });

        const createdProduct = await product.save();
        return res.status(201).json(createdProduct);
    } catch (error) {
        console.error(`CreateProduct Error: ${error.message}`);
        return res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update a product (Admin only)
// @route   PUT /api/products/:id
const updateProduct = async (req, res) => {
    try {
        const { name, price, description, image, category, countInStock } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.price = price || product.price;
            product.description = description || product.description;
            product.image = image || product.image;
            product.category = category || product.category;
            product.countInStock = countInStock || product.countInStock;

            const updatedProduct = await product.save();
            return res.json(updatedProduct);
        } else {
            return res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(`UpdateProduct Error: ${error.message}`);
        return res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a product (Admin only)
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            return res.json({ message: 'Product removed' });
        } else {
            return res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(`DeleteProduct Error: ${error.message}`);
        return res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { 
    getProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct 
};