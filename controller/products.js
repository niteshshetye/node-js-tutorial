const model = require("../models/product");

const AFTER = "after";

exports.createProduct = async (req, res) => {
  const products = new model.Product(req.body);

  // to save in database
  try {
    const entry = await products.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await model.Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.getProduct = async (req, res) => {
  let { id } = req.params;

  try {
    const product = await model.Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.replaceproduct = async (req, res) => {
  let { id } = req.params;

  try {
    const product = await model.Product.findOneAndReplace(
      { _id: id },
      req.body,
      {
        returnDocument: AFTER,
      }
    );
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.updateproduct = async (req, res) => {
  let { id } = req.params;

  try {
    const product = await model.Product.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        returnDocument: AFTER,
      }
    );
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.deleteproduct = async (req, res) => {
  let { id } = req.params;

  try {
    await model.Product.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "Product Deleted!" });
  } catch (error) {
    res.status(404).json(error);
  }
};
