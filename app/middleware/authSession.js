const verifySession = (req, res, next) => {
  if (!req.session.user) {
      return res.status(401).send('Session expired or not authenticated.');
  }
  next();
};

const sessionAuth = {
  verifySession,
};
module.exports = sessionAuth;