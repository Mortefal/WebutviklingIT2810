const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const beverageSchema = require('../models/beverageModel');
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

              setInterval(() => {
                  console.log("Inserted " + i.toString() + " items until now.")
              }, 1000);

              vinmonopolet
                  .stream.getProducts()
                  .on('data', function(product) {
                      if(1 === 1) {
                          i ++;
                          db.collection("sortiment").insertOne(product, function(err, res) {
                              if (err) throw err;
                          });
                      }
                  })
                  .on('end', function() {
                      console.log("Insterted " + i.toString() + " items.");
                      client.close();
                  });
          }
      )
  }
//  unsafeWriteAllToDB();


class beverageRetriever{
    constructor(){
        this.connection = mongoose.connect(url + 'vinmonopolet');
        let bevSchema = new mongoose.Schema(beverageSchema);
        bevSchema.plugin(mongoosePaginate);
        this.Beverage = mongoose.model('Beverage', bevSchema, 'sortiment');
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
        this.Beverage.find({}).distinct('productType', (e, a) => callback(a));
    }
}
// Available sorting modes: `price`, `name`, `relevance`
module.exports.beverageRetriever = beverageRetriever;
