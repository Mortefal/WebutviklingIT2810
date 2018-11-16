/*
* Here the routing happens, and which means urls after /beverages are assigned to functions.
*
* Currentlig there's three functions, all of which uses get.
* Were we to recieve user-specific data, this would be in a router.post(...).
*
* The user-generated data is recieved in /search, where names, if asked for, are stored in the history.
* */
let beverageRetriever = require('../utilities/beverageRetriever.js');
let express = require('express');
let router = express.Router();

const retriever = new beverageRetriever.beverageRetriever();

// This blindly returnes all the products in the DB (ca. 19.5k items)
router.get('/all', function(req, res, next) {
    retriever.getAllFromDB((doc) => res.json(doc));
});

// The search-call processes a query given by /search?<query> where <query> is a set of URL-parameters given by key=value
// and separated by &. Express will automatically convert these to a pure JS-object accessible via req.query.
router.get('/search', function(req, res) {
    retriever.getFromQuery((doc) => res.json(doc), req.query)
});

// Gives all the types of wine in the DB, formatted as [{mainCategory: String, subCategories: [String]}]
router.get('/types', function (req, res) {
    retriever.getTypes((doc) => res.json(doc))
});

// Returns all the searches as a json.
router.get('/history', (req, res) => {
    retriever.getSearches((doc) => res.json(doc));
})
module.exports = router;
