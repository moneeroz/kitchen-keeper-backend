const Sequelize = require("sequelize");
const config = require("../config/database");

const Recipe = config.define(
  "recipe",
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image_url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cloudinary_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    directions: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    category_id: {
      type: Sequelize.STRING,
      allowNull: false,
      refrences: {
        model: "Category",
        key: "id",
      },
    },
  },
  { timestamps: false },
);

module.exports = Recipe;
