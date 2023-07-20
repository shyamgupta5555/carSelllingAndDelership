const UserModel = require("../models/userModel");


// Create a new user
// exports.createUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const user = new UserModel(name, email, password);
//     await user.save();

//     res.json(user);
//   } catch (error) {
//     return res.status(500).send({message :error.message})

//   }
// };

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if(!name )return res.status(400).send({error :"required name"})
    if(!email)return res.status(400).send({error :"required email "})
    if(!password)return res.status(400).send({error :"required password"})

     UserModel.save(name, email, password)
      .then((result) => {
        let user = result
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

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAll();
    res.json(users);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  
  try {
    const { userId } = req.params;
    const user = await UserModel.getById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).send(user);

  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
