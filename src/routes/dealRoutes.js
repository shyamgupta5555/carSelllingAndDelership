const router = require("express").Router()
const {dealOnCar} = require("../controllers/dealController");
const { authentication ,authorization } = require("../middleware/dealerAuthMiddleware");

router.post('/:dealershipId', authentication ,authorization, dealOnCar);
// router.get('/', getAllUsers);
// router.get('/:userId', getUserById);
// router.put('/:userId/vehicles', updateUserVehicles);

module.exports = router