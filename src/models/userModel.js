
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
    return await db.collection('users').findOne({_id : new ObjectId(id)});;
  },

  findByEmail: async function (email) {
    const db = getDb();
    console.log(email)
    const d =  await db.collection('users').findOne({ email: email });
    return d

  },

  getAllUsers: async function () {
    const db = getDb();
    return db.collection('users').find({}).toArray();
  },

  updateUserVehicles: async function (userId, SoldVehicleId) {
    const db = getDb();
   const x = await db.collection('users').updateOne(
      { _id: userId },
      {  $addToSet: { vehicle_info: SoldVehicleId } }
    );
    return x
  },
};

module.exports = User;

