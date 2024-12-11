const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token,
    config.jwt_secret,
    (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      req.userId = decoded.id;
      next();
    });
};

const verifyRefreshToken = (req, res, next) => {
  let token = req.body.refresh_token;

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token,
    config.jwt_secret,
    (err) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      next();
    });
};

const authJwt = {
  verifyToken,
  verifyRefreshToken
};
module.exports = authJwt;
