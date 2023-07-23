const router = require("express").Router()
const {createDealership ,getAllDealerships , getDealershipById ,login} = require("../controllers/dealershipController")
const {authentication ,authorization} =require("../middleware/dealerAuthMiddleware")


router.post('/', createDealership);
router.post('/login', login);

router.get('/',authentication , getAllDealerships);
router.get('/:dealershipId',authentication,authorization, getDealershipById);
module.exports = router
