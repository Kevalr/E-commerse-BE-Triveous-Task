const execQuery = require("../config/db");

const getAllCategories = async () => {
    const queryText = `SELECT id, name, description, "isActive"  from categories`;
    return await execQuery(queryText);
}

const getProductDetails = async (id) => {
    const queryText = `SELECT p.id, p."name", c."name" as category, p.available_qty as stock, p.price, p.description FROM products p JOIN categories c ON p.category_id = c.id  WHERE p.id = $1`;
    const queryParams = [id];
    return await execQuery(queryText, queryParams);
} 

const getProductListByCategory = async(categoryIDS) => {
    console.log("service => ", categoryIDS);
    const queryText = `SELECT p.id, p."name", c."name" as category, p.available_qty as stock, p.price, p.description, c."isActive" FROM products p JOIN categories c ON p.category_id = c.id  WHERE p.category_id IN ${categoryIDS};`
    // const queryParams = [categoryIDS];
    return await execQuery(queryText);
}

module.exports = { getAllCategories, getProductDetails, getProductListByCategory };
