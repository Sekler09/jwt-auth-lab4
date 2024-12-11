const db = require("../models");
const User = db.user;

checkDuplicateUsername = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

    next();
  }).catch(err => {
    console.log("ERROR")
    res.status(500).send({ message: err.message });
  });
};

const verifySignUp = {
  checkDuplicateUsername: checkDuplicateUsername,
};

module.exports = verifySignUp;
