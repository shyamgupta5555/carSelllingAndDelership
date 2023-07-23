const DealershipSchema = require("../models/dealershipModel")
const bcrypt = require('bcryptjs');


// Create a new dealership
exports.createDealership = async (req, res) => {
  const { email, name, location, password, dealership_info } = req.body;
  try {
    const dealershipData = {
      name: name,
      email: email,
      password: await bcrypt.hash(password,10),
      location: location,
      dealership_info:{dealership_info},
      cars: [],
      deals: [],
      sold_vehicles: [],
    };
    
    const dealership = await DealershipSchema.save(dealershipData);

    res.status(201).json(dealership);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};



exports.login= async(req, res)=> {
  const { email, password } = req.body;
  try {
    const dealer = await DealershipSchema.findByEmail(email );
    if (!dealer) {
      return res.status(404).json({ message: 'User not found' });
    }
    const passwordMatch = bcrypt.compare(password, dealer.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken({ id : dealer._id });
    res.status(201).json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
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
