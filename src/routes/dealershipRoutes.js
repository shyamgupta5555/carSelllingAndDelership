const router = require("express").Router()
const {createDealership ,getAllDealerships , getDealershipById} = require("../controllers/dealershipController")


router.post('/', createDealership);
router.get('/', getAllDealerships);
router.get('/:dealershipId', getDealershipById);
module.exports = router
