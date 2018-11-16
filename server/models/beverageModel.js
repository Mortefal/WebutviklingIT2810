const mongoose = require('mongoose');
const mongoosePagination = require('mongoose-paginate');

const Schema = mongoose.Schema;

module.exports.beverageModel = {
    // Product code (ID)
    code: String,
    // Product name, usually with manufacturer name
    name: String,
    // Product type (Norwegian)
    productType: String,
    // Alcohol by volume
    abv: Number,
    // URL to the product detail page
    url: String,
    // Price per unit/container
    price: Number,
    // Price per liter
    pricePerLiter: Number,
    // Product images
    images: [{
        format: String,
        description: String,
        type: String,
        url: String,
        size: {maxWidth: Number, maxHeight: Number}
        }
    ],
    // EAN-13 barcode
    barcode: Number,
    // Container size in liters
    containerSize: Number,
    // Container type description (Norwegian)
    containerType: String,
    // Vintage (year)
    vintage: Number,
    // Type of cork (Norwegian)
    cork: String,
    // Product description, if any
    description: String,
    // Product summary, if any
    summary: String,
    // Brewing method (Norwegian)
    method: String,
    // Sulfates/tannins (scale 0 - 100, null means not specified)
    tannins: Number,
    // Fullness (scale: 0 - 100, null means not specified)
    fullness: Number,
    // Sweetness (scale: 0 - 100, null means not specified)
    sweetness: Number,
    // Freshness (scale: 0 - 100, null means not specified)
    freshness: Number,
    // Bitterness (scale: 0 - 100, null means not specified)
    bitterness: Number,
    // Product color description (Norwegian)
    color: String,
    // Product aroma description (Norwegian)
    aroma: String,
    // Product taste description (Norwegian)
    taste: String,
    // Description of how storable this product is (Norwegian)
    storable: String,
    // Array of appropriate food pairings (names in Norwegian)
    foodPairing: [
        {code: String, identifier: String, name: String}
    ],
    // Array of "raw materials". Unfortunately not as structured as one could have wanted.
    rawMaterial: [{
        id: String,
        name: String,
        percentage: Number
    }],
    // Grams of sugar per liter (null means not specified)
    sugar: Number,
    // Grams of acid per liter (null means not specified)
    acid: Number,
    // Whether this product is considered ecological
    eco: Boolean,
    // Whether this product is gluten free
    gluten: Boolean,
    // Whether this product is kosher
    kosher: Boolean,
    // Whether this product is "fair trade"-labeled
    fairTrade: Boolean,
    // Whether this product is produced in accordance to biodynamic agriculture methods
    bioDynamic: Boolean,
    // Product producer (brewery/wineyard etc)
    mainProducer: {
        code: String,
        name: String,
        url: String
    },
    // Product distributor
    distributor: String,
    // ID of product distributor
    distributorId: Number,
    // Product wholesaler
    wholesaler: String,
    // Categories this product is categorized under
    categories: [
        {code: String, name: String, url: String}
    ],
    // Main category for this product
    mainCategory: {
        code: String,
        name: String,
        url: String
    },
    // Subcategory for this product
    mainSubCategory: {
        code: String,
        name: String,
        url: String
    },
    // Main country this product was produced in
    mainCountry: {
        code: String,
        name: String,
        url: String
    },
    // District of country this product was produced in
    district: {
        code: String,
        name: String,
        url: String
    },
    // Subdistrict, if any
    subDistrict: String,
    // Store category between 1 and 7, or independent (Norwegian)
    storeCategory: String,
    // Product selection (Norwegian) (basis-, test-, parti- or bestillingsutvalget)
    productSelection: String,
    // Age limit to buy this product
    ageLimit: Number,

    // Not really sure what these fields mean, but they're part of the data returned, so...
    buyable: Boolean,
    deliveryTime: String,
    nrOfUsage: Number,
    availableForPickup: Boolean,
    averageRating: Number,
    stock: {stockLevel: Number, stockLevelStatus: String},
    status: String,
    expiredDate: String,
    purchasable: Boolean,
    newProduct: Boolean,
    numberOfReviews: Number
};