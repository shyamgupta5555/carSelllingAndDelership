const Car = require("../models/carModel")

// Create a new car
exports.createCar = async (req, res) => {
  const { name, model, type, car_info } = req.body;

  try {
    const car = {  name: name, model: model,type: type, car_info:[car_info] };

    await Car.save(car);
    res.status(201).json(car);
  } catch (error) {
    return res.status(500).send({message :error.message})

  }
};

// Get all cars
exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.getAllCars();
    res.json(cars);
  } catch (error) {
    return res.status(500).send({message :error.message})

  }
};

// Get a car by ID
exports.getCarById = async (req, res) => {
  const { carId } = req.params;

  try {
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    return res.status(200).send({data :car})

  } catch (error) {
    return res.status(500).send({message :error.message})

  }
};
