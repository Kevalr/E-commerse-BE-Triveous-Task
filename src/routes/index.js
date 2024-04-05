const { Router } = require("express");
const authRoutes = require("./authRoutes");
const productRoutes = require("./productRoutes");
const cartRoutes = require("./cartRoutes");
const orderRoutes = require("./orderRoutes");
const authenticateUser = require("../middleware/auth");

const router = Router();

router.get("/checkDevice", (req, res) => {
    const userAgent = require("express-useragent");
    const DeviceDetector = require("node-device-detector");

    const detector = new DeviceDetector();

    const agent = req.headers['user-agent'];

    res.json({"device detector : ": detector.detect(agent), "useragent : ": userAgent.parse(agent)});

});
router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/cart", authenticateUser, cartRoutes);
router.use("/order", authenticateUser, orderRoutes);

module.exports = router;