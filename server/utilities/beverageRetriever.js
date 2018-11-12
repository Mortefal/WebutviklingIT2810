const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mongoose = require('mongoose');
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
    setUpConnection(){
        this.connection = mongoose.createConnection(url + 'vinmonopolet');
        this.Beverage = connection.model('Beverage', beverageSchema, 'sortiment');
    }
    closeConnection(){
        this.connection.close();
    }

    getAllFromDB(callback){
        this.setUpConnection();
        this.Beverage.find( {} ,
        function (err, beverages) {
            callback(beverages)
        });
        this.closeConnection();
    }

    getFromQuery(callback, query){
        this.setUpConnection();
        this.Beverage.find( query ,
            function (err, bev) {
                callback(bev);
            });
        this.closeConnection()
    }
}
// Available sorting modes: `price`, `name`, `relevance`
module.exports.beverageRetriever = beverageRetriever;
