const fs = require("fs");
const express = require("express");

const { posts } = JSON.parse(fs.readFileSync("data.json", "utf-8"));

const server = express();

server.use(express.json());

// Create POST - /posts
server.post("/post", (req, res) => {
  let newProduct = { ...req.body, id: posts.length + 1 };

  posts.push(newProduct);

  res.json(newProduct);
});

// Read GET - /posts
server.get("/posts", (req, res) => {
  res.json(posts);
});

// Read Single Item GET - /posts
server.get("/post/:id", (req, res) => {
  let { id } = req.params;

  let myPost = posts.find((post) => +post.id === +id);

  res.json(myPost);
});

// Update PUT - /post/:id (// * Note: PUT will override object)
server.put("/post/:id", (req, res) => {
  let { id } = req.params;

  let postIndex = posts.findIndex((post) => +post.id === +id);

  posts.splice(postIndex, 1, { ...req.body, id });

  res.status(200).json({ msg: "post updated" });
});

// Update PATCH - /post/:id (// * Note: PATCH will only update the perticular field or key value)
server.patch("/post/:id", (req, res) => {
  let { id } = req.params;

  let postIndex = posts.findIndex((post) => +post.id === +id);
  let copyOldPost = posts[postIndex];
  posts.splice(postIndex, 1, { ...copyOldPost, ...req.body });

  res.status(200).json({ msg: "post updated" });
});

// Delete DELETE - /post/:id (// * Note: PUT will override object)
server.delete("/post/:id", (req, res) => {
  let { id } = req.params;

  let postIndex = posts.findIndex((post) => +post.id === +id);

  posts.splice(postIndex, 1);

  res.status(200).json({ msg: "post deleted" });
});

// listen server on port
server.listen(8080, () => {
  console.log("server started on port 8080");
});
