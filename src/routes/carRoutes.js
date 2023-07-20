const router = require("express").Router()
const {createCar,getAllCars,getCarById } = require("../controllers/carController")


router.post('/', createCar);
router.get('/', getAllCars);
router.get('/:carId', getCarById);

module.exports = router
