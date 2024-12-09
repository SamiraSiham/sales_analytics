import { trendingProducts } from "../controllers/trendingProducts";
import { totalSales } from "../controllers/totalSales";
import { categorySales } from "../controllers/categorySales";


const express = require("express");
const router = express.Router();

console.log("loading analytics routes");

router.get('/total_sales', totalSales);
router.get('/trending_products', trendingProducts);
router.get('/category_sales', categorySales);


module.exports = router;
