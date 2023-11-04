const express = require("express");
const posts = require("../controller/posts");

// create router
const router = express.Router();

router
  .post("/", posts.createProduct)
  .get("/", posts.getAllProducts)
  .get("/:id", posts.getProduct)
  .put("/:id", posts.replacePost)
  .patch("/:id", posts.updatePost)
  .delete("/:id", posts.deletePost);

exports.router = router;
