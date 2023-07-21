const DealershipSchema = require("../models/dealershipModel")

// Create a new dealership
exports.createDealership = async (req, res) => {
  const { email, name, location, password, dealership_info } = req.body;
  try {
    const dealershipData = {
      name: name,
      email: email,
      password: password,
      location: location,
      dealership_info:{dealership_info},
      cars: [],
      deals: [],
      sold_vehicles: [],
    };
    
    console.log(req.body)
    const dealership = await DealershipSchema.save(dealershipData);

    res.status(201).json(dealership);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// Get all dealerships
exports.getAllDealerships = async (req, res) => {
  try {
    const dealerships = await DealershipSchema.getAllDealerships();
    res.status(200).json(dealerships);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};


// Get a dealership by ID
exports.getDealershipById = async (req, res) => {
  const { dealershipId } = req.params;

  try {

    const dealership = await DealershipSchema.findById(dealershipId);
    if (!dealership) {
      return res.status(404).json({ message: "Dealership not found" });
    }

    res.json(dealership);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
