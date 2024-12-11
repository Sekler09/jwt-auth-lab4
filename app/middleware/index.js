const authJwt = require("./authJwt");
const sessionAuth = require("./authSession");
const verifySignUp = require("./verifySignUp");

module.exports = {
  authJwt,
  verifySignUp,
  sessionAuth,
};
