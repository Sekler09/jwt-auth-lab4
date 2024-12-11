const express = require("express");
const cors = require("cors");
const session = require('express-session');
const config = require("./app/config/auth.config.js");


const app = express();

let corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: config.session_secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 15, 
  },
}));

const db = require("./app/models");

db.sequelize.sync({force: true});

app.get("/", (req, res) => {
  res.json({ message: "Test lab 4!" });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
