const router = require("express").Router()
const {dealOnCar} = require("../controllers/dealController")

router.post('/', dealOnCar);
// router.get('/', getAllUsers);
// router.get('/:userId', getUserById);
// router.put('/:userId/vehicles', updateUserVehicles);

module.exports = router