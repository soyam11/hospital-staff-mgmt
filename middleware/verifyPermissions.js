const db = require('../models');
const jwt = require('jsonwebtoken');
const logActivity = require('../utility/logger');

const verifyPermissions = (action) => {
    return async (req, res, next) => {
        if (process.env.NODE_ENV === 'test') {
            return next();
        }
      try {
        const token = req.headers["authorization"]?.split(' ')[1];
        if (!token) {
          return res.status(403).send({ message: "No token provided." });
        }
  
        const verifyToken= jwt.verify(token, process.env.SECRET);
        const staff = await db.Staff.findByPk(verifyToken.id, {
          include: [{ model: db.Role, include: [db.Permission] }]
        });
  
        if (!staff || !staff.role || !staff.role.permission) {
          return res.status(403).send({ message: "Role or permissions not found." });
        }

        const hasPermission = staff.role.permission[action];
        if (hasPermission) {
          logActivity(action, 'SUCCESS',staff.name, req.body);
          next();
        } else {
            logActivity(action, 'FAILED',staff.name, req.body);
          res.status(403).send({ message: "Insufficient permissions" });
        }
      } catch (error) {
        console.error(error);
        res.status(401).send({ message: "Unauthorized!" });
      }
    };
  };
  
  module.exports = verifyPermissions;
  