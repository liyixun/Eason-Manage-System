/**
 * Created by eason on 17/8/6.
 */
var mongodbInfo = require('../assests/config').mongodbInfo;

var MongoClient = require('mongodb').MongoClient;
var dbData;

exports.connect = () => {
  return MongoClient.connect(mongodbInfo.url, (err, db) => {
    if (err) {
      console.error("Connect to MongoDB error:", err);
    } else {
      console.info("Connect to MongoDB successful");
    }
    dbData = db;
  });
};

exports.getDataDB = () => {
  return dbData;
};

exports.insertUserLoginRecord = function (insertData) {
  MongoClient.connect(mongodbInfo.url, (err, db) => {
    let collection = db.collection('UserLoginRecord');
    collection.insertOne(insertData, (err, result) => {
      db.close();
    });
  });
};

exports.findAllWarehouseType = async () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(mongodbInfo.url, (err, db) => {
      let collection = db.collection('WarehouseType');
      collection.find({}).toArray((err, docs) => {
        resolve(docs);
      });
    });
  });

};

exports.findAllWarehouseFloorType = async () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(mongodbInfo.url, (err, db) => {
      let collection = db.collection('WarehouseFloorType');
      collection.find({}).toArray((err, docs) => {
        resolve(docs);
      });
    });
  });
};

exports.queryWarehouse = async (params) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(mongodbInfo.url, (err, db) => {
      let collection = db.collection('Warehouse');
      collection.find(params).toArray((err, docs) => {
        resolve(docs);
      });
    });
  });
};
