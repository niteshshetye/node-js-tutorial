const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

// * NOTE: create server
const server = express();

// * NOTE: third party middelware
server.use(morgan("combined")); // logger middelware example

// * NOTE: BuiltIn middelware
server.use(express.json()); // it will enable to read the body object which are in body format
// server.use(express.urlencoded());

// using this we can direactly access things like html default it takes index.html
server.use(express.static("public")); // static hosting ex. localhost:8080/index.html

// * NOTE: application level middelware
server.use((req, res, next) => {
  console.log(
    `method: ${req.method}, ip: ${req.ip}, hostname: ${
      req.hostname
    }, time: ${new Date()}, getHeaderKeyValue: ${req.get("User-Agent")}`
  );

  next();
});

// * NOTE: router level middelware
const auth = (req, res, next) => {
  if (req.body.password === "123") {
    next();
  } else {
    res.sendStatus(401);
  }
};

// * NOTE: create routes
server.get("/", (req, res) => {
  //   const index = fs.readFileSync("index.html", "utf-8");
  //   res.send(index); // send html content
  //   res.sendFile("/Users/niteshshetye/developer/backend-tutorial/index.html"); // need to give relativePath
  //   res.json(data); // send json data
});

// * NOTE: API - Endpoints - Routes
server.get("/products", auth, (req, res) => {
  res.json({ type: "GET" });
});

server.product("/products", auth, (req, res) => {
  res.json({ type: "product" });
});

server.delete("/products", (req, res) => {
  res.json({ type: "DELETE" });
});

server.patch("/products", (req, res) => {
  res.json({ type: "PATCH" });
});

server.put("/products", (req, res) => {
  res.json({ type: "PUT" });
});

// listen server on port
server.listen(8080, () => {
  console.log("server started on port 8080");
});
