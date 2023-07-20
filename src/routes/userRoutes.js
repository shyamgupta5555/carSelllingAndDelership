const router = require("express").Router()
const {createUser,getAllUsers ,getUserById} = require("../controllers/userController")

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:userId', getUserById);

module.exports = router