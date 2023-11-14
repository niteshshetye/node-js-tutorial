const model = require("../models/user");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await model.User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.createUser = async (req, res) => {
  const user = new model.User(req.body);
  try {
    const entry = await user.save();
    res.status(200).json(entry);
  } catch (error) {
    res.status(404).json(error);
  }
};
