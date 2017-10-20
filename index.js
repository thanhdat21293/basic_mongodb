const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/myproject';


MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  // insertDocuments(db, function() {
      // findDocuments(db, function() {
        db.close();
      // });
  // });
});

var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('test');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}




var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('test');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    assert.equal(2, docs.length);
    console.log("Found the following records");
    console.dir(docs);
    callback(docs);
  });
}