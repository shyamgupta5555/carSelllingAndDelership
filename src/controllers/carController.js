const CarModel = require("../models/carModel")

// Create a new car
exports.createCar = async (req, res) => {
  const { make, model, year, dealershipId } = req.body;

  try {
    const car = new CarModel(make, model, year, dealershipId);
    await car.save();

    res.json(car);
  } catch (error) {
    return res.status(500).send({message :error.message})

  }
};

// Get all cars
exports.getAllCars = async (req, res) => {
  try {
    const cars = await CarModel.getAll();
    res.json(cars);
  } catch (error) {
    return res.status(500).send({message :error.message})

  }
};

// Get a car by ID
exports.getCarById = async (req, res) => {
  const { carId } = req.params;

  try {
    const car = await CarModel.getById(carId);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json(car);
  } catch (error) {
    return res.status(500).send({message :error.message})

  }
};
