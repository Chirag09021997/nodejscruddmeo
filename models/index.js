const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
    },
  }
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.items = require("./item.model")(sequelize, Sequelize, DataTypes);
db.units = require("./unit.model")(sequelize, Sequelize, DataTypes);
db.users = require("./user.model")(sequelize, Sequelize, DataTypes);

module.exports = db;
