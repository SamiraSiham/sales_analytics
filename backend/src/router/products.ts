import { getProducts } from "../controllers/getProducts";
import { createProduct } from "../controllers/createProduct";
import { getProductById } from "../controllers/getProductById";
import { getProductsWithSales } from "../controllers/getProductsWithSales";

const express = require("express");
const router = express.Router();

console.log("loading products routes");

// router.post("/", createProduct);
// router.get('/', getProducts);
router.get('/', getProductsWithSales);
router.get('/:ProductID', getProductById);


module.exports = router;
