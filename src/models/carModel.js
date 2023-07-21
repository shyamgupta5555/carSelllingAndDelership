// carSchema.js
const { ObjectId } = require('mongodb');
const { getDb } = require('../helpers/database.js');


const Car = {
  save: async function (car) {
    const db = getDb();
    const result = await db.collection('cars').insertOne(car);
    return result.insertedId;
  },

  findById: async function (id) {
    const db = getDb();
    return db.collection('cars').findOne({ _id:new ObjectId(id )});
  },

  getAllCars: async function () {
    const db = getDb();
    return db.collection('cars').find({}).toArray();
  },
};

module.exports = Car;


// {
//   _id: ObjectId,          // Automatically generated by MongoDB
//   car_id: String,         // Randomly generated
//   type: String,
//   name: String,
//   model: String,
//   car_info: Object        // Store additional fields as a JSON object
// }