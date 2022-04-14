// middleware to verify jwt token on request

module.exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  // check if header is undefined
  if (typeof bearerHeader !== "undefined") {
    // split at token
    const bearer = bearerHeader.split(" ");
    // get token from array
    const bearerToken = bearer[1];
    // set the token
    req.token = bearerToken;
    // next
    next();
  } else {
    res.sendStatus(403);
  }
};
