// Database Conniction Info
const Sequelize = require("sequelize");

const config = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mariadb",
  },
);

module.exports = config;
