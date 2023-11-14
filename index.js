require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const productsRouter = require("./routes/products");
const userRouter = require("./routes/users");

const server = express();

server.use(express.json());
server.use(morgan("common"));

// Router setup
server.use("/products", productsRouter.router);
server.use("/users", userRouter.router);

// Connect to cloud database
async function connectToDb() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@mumbai.jvd8ddy.mongodb.net/Ecommerce`
    );
    console.log("Connected to database...");
  } catch (error) {
    console.error("Error In Database connection: ", error);
  }
}

connectToDb();

// listen server on port
server.listen(process.env.PORT, () => {
  console.log(`server started on port: ${process.env.PORT}`);
});
