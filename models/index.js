const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config.js');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Staff = require("./staff.model.js")(sequelize, Sequelize);
db.Role = require("./role.model.js")(sequelize, Sequelize);
db.Permission = require("./permission.model.js")(sequelize, Sequelize);
db.Log = require("./log.model.js")(sequelize, Sequelize);

db.Staff.belongsTo(db.Role);
db.Role.hasMany(db.Staff);
db.Role.belongsTo(db.Permission);
db.Permission.hasOne(db.Role);


module.exports = db;
