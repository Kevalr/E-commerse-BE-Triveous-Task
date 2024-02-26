const productService = require("../services/productService");

const getAllCategories = async (req, res) => {
    try {
        let result = await productService.getAllCategories();
        
        console.log(result);
        if(result.qry_error) {
            return res.status(500).json({ success: false, message: "Error while fetching categories list" });
        }

        if(result.rows?.length) {
            return res.status(200).json({ success: true, categories: result.rows });
        } 
        res.status(200).json({ success: true, categories: [], message: "No Categories Available"});
    } catch (error) {
        console.log("error =>", error);
        res.status(500).json({
        message: "Error while fetching categories list",
        });
    }
}

const getProductDetails = async (req, res) => {
    try {
        const { id } = req.params; 
        let result = await productService.getProductDetails(id);
        
        console.log(result);
        if(result.qry_error) {
            return res.status(500).json({ success: false, message: "Error while fetching product details" });
        }

        if(result.rows?.length) {
            return res.status(200).json({ success: true, details: result.rows[0] });
        } 
        res.status(200).json({ success: false, message: "No Such Products Found"});
    } catch (error) {
        console.log("error =>", error);
        res.status(500).json({
        message: "Error while fetching product details",
        });
    }
}

const getProductListByCategory = async (req, res) => {
    try {
        const { categories } = req.body;

        let categoryIDS = '(';
        categories.forEach((categoryID) => {
            categoryIDS += `'${categoryID}',`
        })

        categoryIDS = categoryIDS.slice(0, -1);
        categoryIDS += ")";

        console.log("categoryIDS -> ", categoryIDS);
        let result = await productService.getProductListByCategory(categoryIDS);
        
        if(result.qry_error) {
            return res.status(500).json({ success: false, message: "Error while fetching products list" });
        }

        if(result.rows?.length) {
            return res.status(200).json({ success: true, products: result.rows });
        } 
        res.status(200).json({ success: true, categories: [], message: "No Products Available as per your search"});
    } catch (error) {
        console.log("error =>", error);
        res.status(500).json({
        message: "Error while fetching products list",
        });
    }
}

module.exports = { getAllCategories, getProductListByCategory, getProductDetails };
