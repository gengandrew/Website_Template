const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(cors());

const query = "SELECT * FROM products;";
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pass4me",
  database: "testdb"
});
connection.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log("sucess");
  }
});
app.get("/", (req, res) => {
  res.send("hello from the server");
});

app.get("/api/database", (req, res) => {
  connection.query(query, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: result
      });
    }
  });
});

app.listen(3000, () => {
  console.log("Server Listening on port 3000");
});
