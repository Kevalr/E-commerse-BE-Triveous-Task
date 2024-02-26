const { Router } = require("express");
const { addToCart, getCartDetails, updateCartProduct, removeFromCart } = require("../controller/cartController");

const router = Router();

// Cart Management
router.get("/" , getCartDetails);

router.post("/add", addToCart);

router.put("/update", updateCartProduct);

router.delete("/remove/:productId", removeFromCart);

module.exports = router;
