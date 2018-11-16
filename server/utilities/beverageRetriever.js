const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const beverageSchema = require('../models/beverageModel');
const configData = require('../routeConfig.json');
// Connection URL

class beverageRetriever{

    constructor(collection='vinmonopolet'){
        this.url = configData.databseUrl;

        this.connection = mongoose.connect(this.url + collection);

        let bevSchema = new mongoose.Schema(beverageSchema);
        bevSchema.plugin(mongoosePaginate);
        this.Beverage = mongoose.model('Beverage', bevSchema, 'sortiment');

        let catSchema = new mongoose.Schema({
            mainCategory: String,
            subCategories: []
        });

        let searchSchema = new mongoose.Schema({
            name: String,
            date: Date,

        });

        this.Category = mongoose.model('Category', catSchema, 'kategorier');
        this.Search = mongoose.model('search', searchSchema, 'searches');

    }

    getAllFromDB(callback){
        this.Beverage.find( {} ,
        function (err, beverages) {
            callback(beverages)
        });
    }

    /* Used in /beverages/search?... */
    getFromQuery(callback, urlArgs){
        let preparedQuery = this.prepareQuery(urlArgs);
        let options = preparedQuery.options;
        let query = preparedQuery.query;

        //sort=price_+-1
        this.Beverage.paginate(query, options).then((result) => {
            callback(result.docs);
        }).catch((err) => {if (err) return console.log(err);});
        this.addSearchToDB(query);
    }

    getTypes(callback){
        this.Category.find({}).exec((err, result) => callback(result));
    }

    addSearchToDB(queryObject){
        if(Object.keys(queryObject).indexOf('name') >= 0){
            let newSearch = new this.Search({
                name: queryObject.name,
                date: Date.now()
            });
            newSearch.save((err) => {
                if (err) console.log(err);
            });
        }
    }

    // Finds all the searches and returns them.
    getSearches(callback){
        this.Search.find({}).exec((error, result) => callback(result));
    }
    /*
    * Utility to preprocess query to separate option such as page and query-parameters such as name
    * Return an object like {'options': options, 'query': query} where options and query are both objects ready to be
    * used in Model.find();
    *
    * Here's a lot of if-statements, however that is largely because most options need some special formatting to work.
    */
    prepareQuery(argsObject){
        let query = argsObject;
        let sortParam = {};
        let pageNumber = 1;
        let paginationSize = 20;

        // Check if sort is in keys:
        if (Object.keys(query).indexOf('sort') >= 0 ){

            let urlSortParam = query['sort'];
            if(urlSortParam.indexOf('_') >= 0){
                let sortList = urlSortParam.split('_');
                sortParam[sortList[0]] = parseInt(sortList[1], 10);
            }
            else{
                sortParam[urlSortParam] = -1;
            }
            delete query['sort'];
        }
        else{
            sortParam = {name: -1};
        }

        let queryKeys = Object.keys(query);
        // Handle two generic optioal arguments. If more than two, this should've been taken into another function.
        if (queryKeys.indexOf('page') >= 0 ){
            pageNumber = parseInt(query['page'], 10);
            delete query['page'];
        }
        if (queryKeys.indexOf('pagesize') >= 0 ){
            paginationSize = parseInt(query['pagesize'], 10);
            delete query['pagesize'];
        }

        if(queryKeys.indexOf('name') >= 0){
            let regexName = new RegExp(query['name'], 'i');
            query['name'] = regexName;
        }

        let options = {
            sort: sortParam,
            lean: true,
            page: pageNumber,
            limit: paginationSize
        };

        return {'options': options, 'query': query};
    }
}
// Available sorting modes: `price`, `name`, `relevance`
module.exports.beverageRetriever = beverageRetriever;
