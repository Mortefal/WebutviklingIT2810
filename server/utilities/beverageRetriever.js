const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const beverageSchema = require('../models/beverageModel');
const categorySchema = require('../models/categorySchema');
const vinmonopolet = require('vinmonopolet');
const configData = require('../routeConfig.json');
// Connection URL
const url = configData.databseUrl;


// Use connect method to connect to the Server

  function unsafeWriteAllToDB(){
      MongoClient.connect(url, function(err, client) {

              assert.equal(null, err);
              let db = client.db("vinmonopolet");
              let i = 0;

              let categories = [];
              for (category in cats){
                  tempObject = {
                      "mainCategory": category,
                      "subCategories": cats[category]
                  }
                  categories.push(tempObject);
              }

              db.collection('kategorier').insertMany(categories);

              client.close();
          }
      )
  }
// unsafeWriteAllToDB();


class beverageRetriever{
    constructor(){
        this.connection = mongoose.connect(url + 'vinmonopolet');

        let bevSchema = new mongoose.Schema(beverageSchema);
        bevSchema.plugin(mongoosePaginate);
        this.Beverage = mongoose.model('Beverage', bevSchema, 'sortiment');

        let catSchema = new mongoose.Schema({
            mainCategory: String,
            subCategories: []
        });
        this.Category = mongoose.model('Category', catSchema, 'kategorier');
    }

    getAllFromDB(callback){
        this.Beverage.find( {} ,
        function (err, beverages) {
            callback(beverages)
        });
    }

    /* Used in /beverages/search?... */
    getFromQuery(callback, urlArgs){
        //TODO: Get optional pagination, pagenumber and sort-order from urlArgs.
        let sortParam = {};

        let pageNumber = 1;
        let paginationSize = 20;



        // Check if sort is in keys:
        if (Object.keys(urlArgs).indexOf('sort') >= 0 ){

            let urlSortParam = urlArgs['sort'];
            if(urlSortParam.indexOf('_') >= 0){
                let sortList = urlSortParam.split('_');
                sortParam[sortList[0]] = parseInt(sortList[1], 10);
            }
            else{
                sortParam[urlSortParam] = -1;
            }
            delete urlArgs['sort'];
        }
        else{
            sortParam = {name: -1};
        }

        if (Object.keys(urlArgs).indexOf('page') >= 0 ){
            pageNumber = parseInt(urlArgs['page'], 10);
            delete urlArgs['page'];
        }
        if (Object.keys(urlArgs).indexOf('pagesize') >= 0 ){
            paginationSize = parseInt(urlArgs['pagesize'], 10);
            delete urlArgs['pagesize'];
        }

        let options = {
            sort: sortParam,
            lean: true,
            page: pageNumber,
            limit: paginationSize
        };
        console.log(options);

        //sort=price-desc
        this.Beverage.paginate(urlArgs, options).then((result) => {
            callback(result.docs);
        }).catch((err) => callback({}));

        // this.Beverage.find( urlArgs ,
        //     function (err, bev) {
        //         callback(bev.length);
        //     });
    }

    getTypes(callback){
        this.Category.find({}).exec((err, result) => callback(result));
    }

}
// Available sorting modes: `price`, `name`, `relevance`
module.exports.beverageRetriever = beverageRetriever;
