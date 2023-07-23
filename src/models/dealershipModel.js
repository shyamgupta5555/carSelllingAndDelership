const { ObjectId } = require('mongodb');
const { getDb } = require('../helpers/database.js');

const  DealershipSchema = {
  save : async function (dealership) {
    const db = getDb();
    const result = await db.collection('dealerships').insertOne(dealership);
    return result;
  },

  findByEmail: async function (email) {
    const db = getDb();
    return db.collection('dealerships').findOne({ dealership_email: email });
  },

  findById: async function (id) {
    const db = getDb();
    return db.collection('dealerships').findOne({ _id: new ObjectId(id) });
  },

  getAllDealerships: async function () {
    const db = getDb();
    return db.collection('dealerships').find({}).toArray();
  },

  addSolidCar : async function(){
    const db = getDb();
    return db.collection('dealerships').updateOne(
      { _id: dealershipId },
      { $addToSet: { cars: carId } }
    );;
  },
  
  addCarToDealership: async function (dealershipId, carId) {
    const db = getDb();
    return db.collection('dealerships').updateOne(
      { _id: dealershipId },
      { $addToSet: { cars: carId } }
    );
  },

  addDealToDealership: async function (dealershipId,car_id, dealId) {
    const db = getDb();
    return db.collection('dealerships').updateOne(
      { _id:new ObjectId(dealershipId )},
      { $addToSet: { deals: dealId ,cars:car_id} }
    );
  },

  getDealershipCars: async function (dealershipId) {
    const db = getDb();
    return db.collection('dealerships').findOne(
      { _id: dealershipId },
      { projection: { cars: 1, _id: 0 } }
    );
  },


  getDealershipDeals: async function (dealershipId) {
    const db = getDb();
    return db.collection('dealerships').findOne(
      { _id: dealershipId },
      { projection: { deals: 1, _id: 0 } }
    );
  },

  getSoldVehicles: async function (dealershipId) {
    const db = getDb();
    return db.collection('dealerships').findOne(
      { _id: dealershipId },
      { projection: { sold_vehicles: 1, _id: 0 } }
    );
  },

  addSoldVehicle: async function (dealershipId, vehicleId) {
    const db = getDb();
    return db.collection('dealerships').updateOne(
      { _id: dealershipId },
      { $addToSet: { sold_vehicles: vehicleId } }
    );
  },
};

module.exports = DealershipSchema;

