const { removeProduct } = require("../services/cartService");
const {
  generateOrder,
  placeProductOrder,
  getUserOrderHistory,
  getOrderDetails,
} = require("../services/orderService");

const placeOrder = async (req, res) => {
  try {
    const { userId } = req.decoded;
    const { products } = req.body;

    if (!products?.length) {
      return res
        .status(200)
        .json({ message: "Please select some products to place order" });
    }

    // Check if the product exists
    const order = await generateOrder(userId);
    console.log(order.rows[0].id);
    if (order.rows?.length && order.rows[0].id) {
      for (const product of products) {
        let result = await placeProductOrder(
          order.rows[0].id,
          product.id,
          product.qty
        );
        if (result.rowCount) {
          await removeProduct(userId, product.id);
        }
      }
    }

    res.status(200).json({ message: "Order placed successfully!.." });
  } catch (error) {
    console.error("Error While Placing Order -", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrderHistory = async (req, res) => {
  try {
    const { userId } = req.decoded;
    let result = await getUserOrderHistory(userId);
    if(result.rows && result.rows.length) {
        return res.status(200).json({result: result.rows});
    } else {
        return res.status(200).json({message: "No orders found"});
    }
  } catch (error) {
    console.error("Error getting order history -", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrderDetailsById = async (req, res) => {
    try {
        const { orderId } = req.params;
        let result = await getOrderDetails(orderId);
        if(result.rows && result.rows.length) {
            return res.status(200).json({result: result.rows});
        } else {
            return res.status(200).json({message: "Unable to find this order"});
        } 
    } catch (error) {
        console.error("Error getting order details -", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = { placeOrder, getOrderHistory, getOrderDetailsById };
