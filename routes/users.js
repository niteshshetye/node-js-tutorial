const express = require("express");
const usersRouter = require("../controller/user");

// create router
const router = express.Router();

router.get("/", usersRouter.getAllUsers).post("/", usersRouter.createUser);

exports.router = router;
