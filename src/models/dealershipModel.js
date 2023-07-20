const { getDb} =require("../helpers/database")

const Dealership = {
  save: function (name, location) {
    const db = getDb();
    return db.collection('dealerships').insertOne({ name, location });
  },

  getByCar: function (carId) {
    const db = getDb();
    return db.collection('dealerships').findOne({ 'cars.carId': carId });
  },

  getAllWithinRange: function (userLocation, range) {
    const db = getDb();
    return db.collection('dealerships')
      .find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: userLocation,
            },
            $maxDistance: range,
          },
        },
      })
      .toArray();
  }
};


module.exports = Dealership

