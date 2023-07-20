
const { getDb } = require('../helpers/database.js');

const User = {
  save: async function (name, email, password) {
    const db = getDb();
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      throw new Error('Email already exists');
      
    }
    return db.collection('users').insertOne({ name, email, password });
  },
  findByEmail: function (email) {
    const db = getDb ();
    return db.collection('users').findOne({ email });
  },
};

module.exports = User;
