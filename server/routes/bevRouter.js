//import apiRetriever from "../utilities/apiRetriever";

let beverageRetriever = require('../utilities/beverageRetriever.js');
let express = require('express');
let router = express.Router();

const retriever = new beverageRetriever.beverageRetriever();
//router.get('/', function(req, res, next) {
//
//    res.json({"wine": "Lots of wine"});
//});
//

router.get('/all', function(req, res, next) {
    //Are you reeally sure you wanna do this?
    retriever.getAllFromDB((doc) => res.json(doc));
});
router.get('/search', function(req, res) {
    retriever.getFromQuery((doc) => res.json(doc), req.query)
});


module.exports = router;
