const bcrypt = require("bcrypt");
var express = require("express");
var router = express.Router();
const connector = require("../poolconnect");
let salt = bcrypt.genSaltSync(10);

router.get("/createtable", function (req, res) {
  connector.query(
    "CREATE TABLE users (username VARCHAR(50), email VARCHAR(50), password VARCHAR(100), dob DATE);",
    function (err, results) {
      res.json({ err, results });
    }
  );
});

router.get("/", function (req, res) {
  connector.query("select * from users", function (err, results) {
    res.json({ err, results });
  });
});

router.post("/", (req, res) => {
  const { username, email, password, dob } = req.body;
  let encryptedPassword;
  try {
    encryptedPassword = bcrypt.hashSync(password, salt);
    console.log(encryptedPassword);
  } catch (error) {
    console.log("Error in bcrypt");
  }
  const sql = "INSERT INTO users VALUES(?,?,?,?)";
  connector.query(
    sql,
    [
      username,
      email,
      encryptedPassword,
      new Date(dob).toISOString().slice(0, 10),
    ],
    (error, result) => {
      res.json({ error, result });
    }
  );
});

router.get("/checkemail/:email", (req, res) => {
  const email = req.params.email;
  const sql = "SELECT * FROM users";

  connector.query(sql, (error, result) => {
    let flag = false;
    result.forEach((user) => {
      if (user.email === email) {
        flag = true;
      }
    });
    if (flag) res.json({ status: 0, debug_data: "email already exist" });
    else res.json({ status: 1, debug_data: "email doesn't exist" });
  });
});

router.get("/checkusername/:username", (req, res) => {
  const username = req.params.username;
  const sql = "SELECT * FROM users";

  connector.query(sql, (error, result) => {
    let flag = false;
    result.forEach((user) => {
      if (user.username === username) {
        flag = true;
      }
    });
    if (flag) res.json({ status: 0, debug_data: "username already exist" });
    else res.json({ status: 1, debug_data: "username doesn't exist" });
  });
});

module.exports = router;
