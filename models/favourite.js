const config = require("../config/database");

const Category = config.define(
  "category",
  {},
  { timestamps: true, updatedAt: false },
);

module.exports = Category;
