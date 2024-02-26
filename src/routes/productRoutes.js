const { Router } = require("express");
const { getAllCategories, getProductListByCategory, getProductDetails } = require("../controller/productController");
const router = Router();

router.get("/categoryList", getAllCategories);
router.get("/:id", getProductDetails);
router.post("/productsFromCategories", getProductListByCategory);

module.exports = router;