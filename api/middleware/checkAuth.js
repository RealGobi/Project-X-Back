
const jwt = require('jsonwebtoken');

function checkAuth(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];

  // Check for token
  if (!token)
    return res.status(401).json({ msg: 'Tillträde förbjudet!' });

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.jwt_key);
    // Add user from payload
    req.userData = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token, ej giltig' });
  }
}

module.exports = checkAuth;


