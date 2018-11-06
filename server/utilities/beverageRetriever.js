const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mongoose = require('mongoose');
const beverageSchema = require('../models/beverageModel');
const vinmonopolet = require('vinmonopolet');

// Connection URL
const url = 'mongodb://localhost:27017/';


// Use connect method to connect to the Server

    function unsafeWriteAllToDB(){
        MongoClient.connect(url, function(err, client) {
                assert.equal(null, err);

                let db = client.db("vinmonopolet_TEST");

                let i = 0;
                vinmonopolet
                    .stream.getProducts()
                    .on('data', function(product) {
                        i ++;
                        if(i%1000 === 0){
                            db.collection("sortiment_TEST").insertOne(product, function(err, res) {
                                if (err) throw err;
                            });
                        }

                    })
                    .on('end', function() {
                        console.log("Insterted " + i.toString() + " items.")
                        client.close();
                    });
            }
        )
    }
  // unsafeWriteAllToDB();


class beverageRetriever{
        constructor(){
            let connection = mongoose.createConnection('mongodb://localhost:27017/vinmonopolet');
            this.Beverage = connection.model('Beverage', beverageSchema, 'sortiment');
        }

    getAllFromDB(callback){
        this.Beverage.find( {},
        function (err, beverages) {
            callback(beverages)
        });
    }

}
// Available sorting modes: `price`, `name`, `relevance`
module.exports.beverageRetriever = beverageRetriever;
