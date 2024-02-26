const { Router } = require("express");
const authRoutes = require("./authRoutes");
const productRoutes = require("./productRoutes");
const cartRoutes = require("./cartRoutes");
const orderRoutes = require("./orderRoutes");
const authenticateUser = require("../middleware/auth");

const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/cart", authenticateUser, cartRoutes);
router.use("/order", authenticateUser, orderRoutes);

module.exports = router;