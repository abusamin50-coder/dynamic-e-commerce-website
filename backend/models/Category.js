const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, {
    timestamps: true
});

// Use existing model if it exists, otherwise create a new one
const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

module.exports = Category;