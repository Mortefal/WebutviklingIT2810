const mongoose = require('mongoose');

module.exports.categorySchema = {
    mainCategory: String,
    subCategories: []
};