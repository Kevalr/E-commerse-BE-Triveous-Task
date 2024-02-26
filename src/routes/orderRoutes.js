const { Router } = require("express");
const { placeOrder, getOrderHistory, getOrderDetailsById } = require("../controller/orderController");

const router = Router();

router.post('/place', placeOrder);
router.get('/', getOrderHistory);
router.get('/:orderId', getOrderDetailsById);

module.exports = router;