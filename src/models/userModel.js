
const { getDb } = require('../helpers/database.js');
const { ObjectId } = require('mongodb');

const User = {
  save: async function (user) {
    const db = getDb();
    const result = await db.collection('users').insertOne(user);
    return result;
  },

  findById: async function (id) {
    const db = getDb();
    return db.collection('users').findOne({_id : new ObjectId(id)});;
  },

  findByEmail: async function (email) {
    const db = getDb();
    return db.collection('users').findOne({ email: email });
  },

  getAllUsers: async function () {
    const db = getDb();
    return db.collection('users').find({}).toArray();
  },

  updateUserVehicles: async function (userId, carId) {
    const db = getDb();
    return db.collection('users').updateOne(
      { _id: userId },
      { $push: { vehicle_info: carId } }
    );
  },
};

module.exports = User;

