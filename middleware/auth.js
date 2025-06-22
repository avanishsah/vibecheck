// middleware/auth.js
const jwt = require('jsonwebtoken');
module.exports = async function(req, res, next) {
 const authHeader = req.header('Authorization');
 let token;
 if (authHeader && authHeader.startsWith('Bearer ')) {
   token = authHeader.split(' ')[1];
 }
 if (!token) {
   return res.status(401).json({ msg: 'No token, authorization denied' });
 }
 try {
   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   req.user = { id: decoded.user.id };
   next();
 } catch (err) {
   res.status(401).json({ msg: 'Token is not valid' });
 }
};