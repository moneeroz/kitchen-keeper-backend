const express = require("express");
const router = express.Router();

const recipeIngredientController = require("../controllers/recipeIngredient");

// Get all recipe ingredients
router.get("/:recipe_id", recipeIngredientController.getRecipeWithIngredients);
// Add ingredient
router.post(
  "/:ingredient_id/:recipe_id",
  recipeIngredientController.addIngredientToRecipe,
);
// Delete a recipe from user recipeIngredientss
router.delete(
  "/:ingredient_id/:recipe_id",
  recipeIngredientController.deleteFromRecipe,
);

module.exports = router;
