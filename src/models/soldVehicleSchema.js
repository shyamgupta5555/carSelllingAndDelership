const { getDb } = require('../helpers/database.js');
const { ObjectId } = require('mongodb');

const SoldVehicles = {
  save: async function (soldVehicle) {
    const db = getDb();
    const result = await db.collection('sold_vehicles').insertOne(soldVehicle);
    return result.insertedId;
  },

  findById: async function (vehicleId) {
    const db = getDb();
    return db.collection('sold_vehicles').findOne({ vehicle_id: vehicleId });
  },

  getCarsByCarIds: async function (carIds) {
    const db = getDb();
    const objectIds = carIds.map((id) => ObjectId(id));
    return db.collection('sold_vehicles').find({ car_id: { $in: objectIds } }).toArray();
  },
};



module.exports = SoldVehicles;

// {
//   _id: ObjectId,          // Automatically generated by MongoDB
//   vehicle_id: String,     // Randomly generated
//   car_id: ObjectId,       // Reference to car document
//   vehicle_info: Object    // Store additional fields as a JSON object
// }