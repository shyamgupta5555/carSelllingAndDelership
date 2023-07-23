const router = require("express").Router()
const {createUser,getAllUsers ,getUserById ,updateUserVehicles ,login } = require("../controllers/userController")
const {authentication ,authorization} =require("../middleware/authentication")

router.post('/', createUser);
router.post('/login', login);
router.get('/',authentication, getAllUsers);
router.get('/:userId',authentication ,authorization, getUserById);
router.put('/:userId/vehicles',authentication,authorization, updateUserVehicles);

module.exports = router