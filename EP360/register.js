const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const session = require("express-session");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "your_username",
  password: "your_password",
  database: "your_database",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to the database");
});

// Sign Up Route
app.post("/signup", (req, res) => {
  const { fName, lName, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return res.status(400).send("Email Address Already Exists!");
    } else {
      const insertQuery =
        "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)";
      db.query(
        insertQuery,
        [fName, lName, email, hashedPassword],
        (err, result) => {
          if (err) throw err;
          res.redirect("/");
        }
      );
    }
  });
});

// Sign In Route
app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const user = result[0];
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send("Incorrect Email or Password");
      }
      req.session.email = user.email;
      res.redirect("/homepage");
    } else {
      res.status(404).send("Incorrect Email or Password");
    }
  });
});

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to the Event Planner 360");
});

// Homepage Route
app.get("/homepage", (req, res) => {
  if (req.session.email) {
    res.send(`Welcome to the homepage, ${req.session.email}`);
  } else {
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
