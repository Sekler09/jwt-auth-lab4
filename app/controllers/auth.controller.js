const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try{
    const {username, password} = req.body;
    if(!username) throw new Error("Username must be provided");
    if(!password) throw new Error("Password must be provided");
    const user = await User.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8)
    });

    res.status(200).send({
      id: user.id,
      username: user.username,
      refresh_token: user.refresh_token
    })
  }
  catch(err) {
    console.log("ERROR")
    res.status(500).send({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const {username, password} = req.body;
    if(!username) throw new Error("Username must be provided");
    if(!password) throw new Error("Password must be provided");
    await User.findOne({
      where: {
        username
      }
    })
    .then(async user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
        
        const passwordIsValid = bcrypt.compareSync(
          password,
          user.password
        );
        
        if (!passwordIsValid) {
          return res.status(401).send({
            message: "Invalid Password!"
          });
        }
        
        const accessToken = jwt.sign(
          { id: user.id },
          config.jwt_secret,
          {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 20,
          }
        );
        const refreshToken = jwt.sign(
          { id: user.id },
          config.jwt_secret,
          {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: "7d",
          }
        );

        await user.update({refresh_token: refreshToken})
        
        req.session.user = user.get({plain: true});

        res.status(200).send({
          id: user.id,
          username: user.username,
          accessToken: accessToken,
          refreshToken: user.refresh_token
        });
    })
  }
  catch(err) {
    res.status(500).send({ message: err.message });
  };
};

exports.refresh = async (req, res) => {
  try {
    const { refresh_token } = req.body;
    if(!refresh_token) throw new Error("Refresh token must be provided");
    await User.findOne({
      where: {
        refresh_token
      }
    })
    .then(async user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
        
        const accessToken = jwt.sign(
          { id: user.id },
          config.jwt_secret,
          {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 20,
          }
        );

        res.status(200).send({
          accessToken: accessToken,
        });
    })
  }
  catch(err) {
    res.status(500).send({ message: err.message });
  };
};
