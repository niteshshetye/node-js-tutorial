const express = require("express");
const products = require("../controller/products");

// create router
const router = express.Router();

router
  .post("/", products.createProduct)
  .get("/", products.getAllProducts)
  .get("/:id", products.getProduct)
  .put("/:id", products.replaceproduct)
  .patch("/:id", products.updateproduct)
  .delete("/:id", products.deleteproduct);

exports.router = router;
