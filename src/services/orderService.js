const execQuery = require("../config/db");

const generateOrder = async (userID) => {
    const queryText = `INSERT INTO orders (user_id) VALUES ($1) RETURNING id`;
    const queryParams = [userID];
    return await execQuery(queryText, queryParams);
}

const placeProductOrder = async (orderID, productID, qty) => {
    const queryText = `INSERT INTO order_item (order_id, product_id, qty) VALUES ($1, $2, $3);`;
    const queryParams = [orderID, productID, qty];
    return await execQuery(queryText, queryParams);
}

const getUserOrderHistory = async (userID) => {
    const queryText = `SELECT to_char(o.created_at, 'hh:MI AM MM/DD/YYYY') AS order_date, o.id  FROM orders o WHERE user_id = $1`;
    const queryParams = [userID];
    return await execQuery(queryText, queryParams);
}

const getOrderDetails = async (orderID) => {
    const queryText = `SELECT p."name", p.price, p.created_at, oi.qty  FROM order_item oi JOIN products p ON oi.product_id = p.id  WHERE order_id = $1;    `;
    const queryParams = [orderID];
    return await execQuery(queryText, queryParams);
}

module.exports = { generateOrder, placeProductOrder, getUserOrderHistory, getOrderDetails };