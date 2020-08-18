const jwt = require('jsonwebtoken');
var method = function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      jwt.verify(bearerToken, 'secretkey', (err, user) => {
        if (err) return res.sendStatus(403)
        next() 
      })
    } else {
      res.sendStatus(403);
    }  
  }
  module.exports = method;