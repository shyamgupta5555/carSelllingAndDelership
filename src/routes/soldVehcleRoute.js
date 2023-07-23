const router = require("express").Router()
const { authentication ,authorization } = require("../middleware/authentication");
const  {soldCarUser} =require("../controllers/soldVehicleController")

router.post('/:userId', authentication ,authorization, soldCarUser);


module.exports = router