const router = require("express").Router()
const {createUser,getAllUsers ,getUserById ,updateUserVehicles} = require("../controllers/userController")

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.put('/:userId/vehicles', updateUserVehicles);

module.exports = router