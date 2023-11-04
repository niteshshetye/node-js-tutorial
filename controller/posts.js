const fs = require("fs");

const { posts } = JSON.parse(fs.readFileSync("data.json", "utf-8"));

exports.createProduct = (req, res) => {
  let newProduct = { ...req.body, id: posts.length + 1 };

  posts.push(newProduct);

  res.json(newProduct);
};

exports.getAllProducts = (req, res) => {
  res.json(posts);
};

exports.getProduct = (req, res) => {
  let { id } = req.params;

  let myPost = posts.find((post) => +post.id === +id);

  res.json(myPost);
};

exports.replacePost = (req, res) => {
  let { id } = req.params;

  let postIndex = posts.findIndex((post) => +post.id === +id);

  posts.splice(postIndex, 1, { ...req.body, id });

  res.status(200).json({ msg: "post updated" });
};

exports.updatePost = (req, res) => {
  let { id } = req.params;

  let postIndex = posts.findIndex((post) => +post.id === +id);
  let copyOldPost = posts[postIndex];
  posts.splice(postIndex, 1, { ...copyOldPost, ...req.body });

  res.status(200).json({ msg: "post updated" });
};

exports.deletePost = (req, res) => {
  let { id } = req.params;

  let postIndex = posts.findIndex((post) => +post.id === +id);

  posts.splice(postIndex, 1);

  res.status(200).json({ msg: "post deleted" });
};
