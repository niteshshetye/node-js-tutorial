require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const postsRouter = require("./routes/posts");

const server = express();

server.use(express.json());
server.use(morgan("common"));

server.use("/posts", postsRouter.router);

// listen server on port
server.listen(process.env.PORT, () => {
  console.log(`server started on port: ${process.env.PORT}`);
});
