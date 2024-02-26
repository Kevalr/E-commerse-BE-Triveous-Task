const execQuery = require("../config/db");

const isProductExistInCart = async (userID, productID) => {
  const queryText = `SELECT id, quantity FROM cart_item WHERE user_id = $1 and product_id = $2`;
  const queryParams = [userID, productID];
  return await execQuery(queryText, queryParams);
};

const addProduct = async (userID, productID) => {
  const queryText = `INSERT INTO cart_item (user_id, product_id, quantity) VALUES ($1, $2, 1)`;
  const queryParams = [userID, productID];
  return await execQuery(queryText, queryParams);
};

const updateProduct = async (userID, productID, quantity) => {
  const queryText = `UPDATE cart_item SET quantity = $3 WHERE user_id = $1 and product_id = $2`;
  const queryParams = [userID, productID, quantity];
  return await execQuery(queryText, queryParams);
};

const removeProduct = async (userID, productID) => {
  const queryText = `DELETE cart_item WHERE user_id = $1 and product_id = $2`;
  const queryParams = [userID, productID];
  return await execQuery(queryText, queryParams);
};

const getCartTotalAmount = async (userID) => {
  const queryText = `SELECT SUM(p.price * ci.quantity) AS total_cart_amount FROM cart_item ci JOIN products p ON ci.product_id = p.id WHERE user_id = $1`;
  const queryParams = [userID];
  return await execQuery(queryText, queryParams);
};

const getCartDetails = async (userID) => {
    const queryText = `SELECT p."name", p.description, p.price, ci.quantity  FROM cart_item ci JOIN products p ON ci.product_id = p.id  WHERE ci.user_id = $1`;
    const queryParams = [userID];
    return await execQuery(queryText, queryParams);
  };

module.exports = {
  isProductExistInCart,
  addProduct,
  updateProduct,
  removeProduct,
  getCartDetails,
  getCartTotalAmount
};
