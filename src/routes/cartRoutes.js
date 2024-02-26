const { Router } = require("express");
const { addToCart, getCartDetails, updateCartProduct, removeFromCart } = require("../controller/cartController");
const authenticateUser = require("../middleware/auth");

const router = Router();

// Cart Management
router.get("/", authenticateUser, getCartDetails);

router.post("/add", authenticateUser, addToCart);

router.put("/update", authenticateUser, updateCartProduct);

router.delete("/remove/:productId", authenticateUser, removeFromCart);

module.exports = router;
