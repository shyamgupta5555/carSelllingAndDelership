const {DealershipModel }= require("../models/dealershipModel")

// Create a new dealership
exports.createDealership = async (req, res) => {
  const { name, location } = req.body;

  try {
    const dealership = new DealershipModel(name, location);
    await dealership.save();

    res.json(dealership);
  } catch (error) {
    return res.status(500).send({message :error.message})

  }
};

// Get all dealerships
exports.getAllDealerships = async (req, res) => {
  try {
    const dealerships = await DealershipModel.getAll();
    res.json(dealerships);
  } catch (error) {
    return res.status(500).send({message :error.message})

  }
};



// Get a dealership by ID
exports.getDealershipById = async (req, res) => {
  const { dealershipId } = req.params;

  try {
    const dealership = await DealershipModel.getById(dealershipId);

    if (!dealership) {
      return res.status(404).json({ message: 'Dealership not found' });
    }

    res.json(dealership);
  } catch (error) {
  return res.status(500).send({message :error.message})
  }
};
