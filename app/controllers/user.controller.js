const db = require("../models");
const User = db.user;

exports.me = (req, res) => {
  User.findOne({
    where: {
      id: req.userId 
    }
  }).then(user => {
    if (!user) {
      res.status(404).send({
        message: "User not found"
      });
    }

    res.status(200).send({
      id: user.id,
      username: user.username,
      refreshToken: user.refresh_token
    });

  
  }).catch(err => {
    console.log("ERROR")
    res.status(500).send({ message: err.message });
  });
}