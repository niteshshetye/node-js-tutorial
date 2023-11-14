const fs = require("fs");
const express = require("express");

const { products } = JSON.parse(fs.readFileSync("data.json", "utf-8"));

const server = express();

server.use(express.json());

// Create product - /products
server.product("/product", (req, res) => {
  let newProduct = { ...req.body, id: products.length + 1 };

  products.push(newProduct);

  res.json(newProduct);
});

// Read GET - /products
server.get("/products", (req, res) => {
  res.json(products);
});

// Read Single Item GET - /products
server.get("/product/:id", (req, res) => {
  let { id } = req.params;

  let myProducts = products.find((product) => +product.id === +id);

  res.json(myProducts);
});

// Update PUT - /product/:id (// * Note: PUT will override object)
server.put("/product/:id", (req, res) => {
  let { id } = req.params;

  let productIndex = products.findIndex((product) => +product.id === +id);

  products.splice(productIndex, 1, { ...req.body, id });

  res.status(200).json({ msg: "product updated" });
});

// Update PATCH - /product/:id (// * Note: PATCH will only update the perticular field or key value)
server.patch("/product/:id", (req, res) => {
  let { id } = req.params;

  let productIndex = products.findIndex((product) => +product.id === +id);
  let copyOldproduct = products[productIndex];
  products.splice(productIndex, 1, { ...copyOldproduct, ...req.body });

  res.status(200).json({ msg: "product updated" });
});

// Delete DELETE - /product/:id (// * Note: PUT will override object)
server.delete("/product/:id", (req, res) => {
  let { id } = req.params;

  let productIndex = products.findIndex((product) => +product.id === +id);

  products.splice(productIndex, 1);

  res.status(200).json({ msg: "product deleted" });
});

// listen server on port
server.listen(8080, () => {
  console.log("server started on port 8080");
});
