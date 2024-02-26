const {
  isProductExistInCart,
  updateProduct,
  addProduct,
  removeProduct,
  getCartTotalAmount,
} = require("../services/cartService");
const cartService =  require("../services/cartService");
const { getProductDetails } = require("../services/productService");

const getCartDetails = async (req, res) => {
  try {
    const { userId } = req.decoded;

    const cartItems = await cartService.getCartDetails(userId);
    const cartTotalAmount = await getCartTotalAmount(userId);

    if (cartItems.rowCount) {
      res.json({
        cartItems: cartItems.rows,
        totalAmount: cartTotalAmount.rows[0]?.total_cart_amount,
      });
    } else {
      res.json({ message: "Your cart is empty, please add some products" });
    }
  } catch (error) {
    console.error("Error viewing cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addToCart = async (req, res) => {
  try {
    const { userId } = req.decoded;
    const { productId } = req.body;

    // Check if the product exists
    const product = await getProductDetails(productId);
    if (product.rows?.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the user already has the product in the cart
    const existingCartItem = await isProductExistInCart(userId, productId);

    if (existingCartItem.rows?.length > 0) {
      // Update the quantity if the product is already in the cart

      let result = await updateProduct(
        userId,
        productId,
        Number(existingCartItem.rows[0].quantity) + 1
      );
      if (result.rowCount) {
        return res
          .status(201)
          .json({ message: "Product updated to cart successfully" });
      }
    } else {
      // Insert the product into the cart if it's not already there

      let result = await addProduct(userId, productId);
      if (result.rowCount) {
        return res
          .status(201)
          .json({ message: "Product added to cart successfully" });
      }
    }

    return res
      .status(500)
      .json({ message: "Error While Adding Product To Cart" });
  } catch (error) {
    console.error("Error adding product to cart -", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateCartProduct = async (req, res) => {
  try {
    const { userId } = req.decoded;
    const { productId, quantity } = req.body;

    // Check if the product exists
    const product = await getProductDetails(productId);
    if (!product.rows || product.rows?.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    await updateProduct(userId, productId, quantity);
    return res.status(200).json({ message: "Product Quantity Updated" });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId } = req.decoded;
    const { productId } = req.params;

    // Check if the product exists
    const product = await getProductDetails(productId);
    if (!product.rows || product.rows?.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    let result = await removeProduct(userId, productId);

    if(result.rowCount) {
        res.json({ message: "Product removed from cart successfully" });
    } else {
        console.log(result);
        res.status(500).json({ message: "Error while removing product from the cart" });
    }
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getCartDetails,
  addToCart,
  updateCartProduct,
  removeFromCart,
};
