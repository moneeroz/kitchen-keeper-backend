const Sequelize = require("sequelize");
const config = require("../config/database");

const Recipe = require("./recipe");
const Ingredient = require("./ingredient");

const RecipeIngredients = config.define(
  "recipe-ingredient",
  {
    // recipeId: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    //   references: {
    //     model: Recipe,
    //     key: "id",
    //   },
    // },
    // ingredientId: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    //   references: {
    //     model: Ingredient,
    //     key: "id",
    //   },
    // },
    quantity: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    unit: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: false },
);

module.exports = RecipeIngredients;
