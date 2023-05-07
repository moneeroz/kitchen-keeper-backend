const config = require("../config/database");

const Favourite = config.define(
  "favourite",
  {},
  { timestamps: true, updatedAt: false },
);

module.exports = Favourite;
