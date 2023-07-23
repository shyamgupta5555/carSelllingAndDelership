const { getDb } = require('../helpers/database.js');
const { ObjectId } = require('mongodb');

const Deal = {
  save: async function (deal) {
    const db = getDb();
    const result = await db.collection('deals').insertOne(deal);
    return result.insertedId;
  },

  findById: async function (dealId) {
    const db = getDb();
    return db.collection('deals').findOne({ deal_id: dealId });
  },

  getCarsByCarIds: async function (carIds) {
    const db = getDb();
    const objectIds = carIds.map((id) => ObjectId(id));
    return db.collection('deals').find({ car_id: { $in: objectIds } }).toArray();
  },
};

module.exports = Deal;



