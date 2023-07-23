const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const { generateToken } = require('../helpers/jwt');


const nameRegex = /^[A-Za-z\s]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^[a-zA-Z0-9]{5,}$/;

exports.createUser = async (req, res) => {
  let { name, email, password, location, vehicle_info ,user_info } = req.body;

  try {
    if (!name) return res.status(400).send({ error: "required name" });
    if (!email) return res.status(400).send({ error: "required email" });
    if (!password) return res.status(400).send({ error: "required password" });
    if (!location) return res.status(400).send({ error: "required location" });
    if (!nameRegex.test(name)) return res.send({ error: "name not valid" });
    if (!emailRegex.test(email)) return res.send({ error: "email not valid" });
    if (!passwordRegex.test(password))
      return res.send({ error: "password not valid" });

      const check = await User.findByEmail(email );
      if (!check) {
        return res.status(404).json({ message: 'User mail already exist use another mail ' });
      }
      password = await bcrypt.hash(password, 10);

 
      const user = {
        name :name ,
        email :email ,
        password :password,
        vehicle_info :[],
        user_info : ""
      }
    User.save(user)
      .then((result) => {
        let user = result;
        return res
          .status(201)
          .json({ message: "User created successfully", user });
      })
      .catch((error) => {
        return res.status(400).json({ error: error.message });
      });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};


exports.login= async(req, res)=> {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const passwordMatch = bcrypt.compare(password, user.password);
    console.log(passwordMatch)
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken({ userId: user._id });
    res.status(201).json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    User.getAllUsers()
      .then((result) => {
        const users = result;
        return res
          .status(200)
          .json({ message: "User get data successfully", users });
      })
      .catch((error) => {
        return res.status(400).json({ error: error.message });
      });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    let id = req.params.userId;
    id = id.toString();
    const user = await User.findById(id);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.updateUserVehicles = async (req, res) => {
  try {

    const { userId } = req.params;
    const { vehicles } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.updateUserVehicles(userId, vehicles);

    res.status(200).json({ message: "User vehicles updated successfully" });
  } catch (error) {
    console.error("Error updating user vehicles:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};






