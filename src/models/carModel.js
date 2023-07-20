
const  { getDb } = require("../helpers/database.js")

const Car = {
  save: function (make, model, year, dealershipId) {
    const db = getDb();
    return db.collection('cars').insertOne({ make, model, year, dealershipId });
  },

  getAll: function () {
    const db = getDb();
    return db.collection('cars').find().toArray();
  },

  getByDealership: function (dealershipId) {
    const db = getDb();
    return db.collection('cars').find({ dealershipId }).toArray();
  }
};


module.exports = Car