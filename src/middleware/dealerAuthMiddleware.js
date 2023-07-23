const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_SECRET;

exports.authentication = async (req, res, next) => {
  try {
    let header = req.headers["authorization"];
    if (!header)
      return res
        .status(400)
        .send({ status: false, message: "jwt must be provided" });
    jwt.verify(header, secret, (err, decoded) => {
      if (err)
        return res.status(401).send({ status: false, message: err.message });
      req.id = decoded.id;
      next();
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

exports.authorization = async (req, res, next) => {
  try {
    let id = req.id;
    let dealershipId = req.body.dealershipId;
    if (dealershipId !== id)
      return res
        .status(400)
        .send({ status: false, message: "user id not valid" });
    next();

  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
