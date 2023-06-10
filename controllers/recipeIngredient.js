const recipeIngredient = require("../models/recipeIngredient");
const Recipe = require("../models/recipe");
const Ingredient = require("../models/ingredient");

module.exports = {
  // Retrieve all recipe ingredients
  getRecipeWithIngredients: (req, res) => {
    const recipeId = req.params.recipe_id;
    const data = {
      where: { recipeId },
      // include: [
      //   { model: Recipe, as: "recipe", required: true },
      //   { model: Ingredient, as: "ingredient", required: true },
      // ],
    };

    recipeIngredient
      .findAll(data)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
        console.log(err);
        console.log(err.message);
      });
  },
  // Add a recipe ingredient
  addIngredientToRecipe: (req, res) => {
    const ingredientId = req.params.ingredient_id;
    const recipeId = req.params.recipe_id;

    const { quantity, unit } = req.body;

    recipeIngredient
      .create({ recipeId, ingredientId, quantity: quantity, unit: unit })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
        console.log(err.message);
      });
  },
  // Delete a recipe from a user favourites
  deleteFromRecipe: (req, res) => {
    const ingredientId = req.params.ingredient_id;
    const recipeId = req.params.recipe_id;

    recipeIngredient
      .findOne({ where: { ingredientId, recipeId } })
      .then((result) => {
        // Check if the ingredient exists in the database table
        if (!result) {
          res.status(404).send("ingredient not found!");
          return;
        }
        // Delete the ingredient from recipeIngredient table in the Database
        result
          .destroy()
          .then(() => {
            res.status(200).send(result);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
