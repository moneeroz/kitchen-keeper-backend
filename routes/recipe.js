const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const recipeController = require("../controllers/recipe");

// Get all recipes
router.get("/", recipeController.getRecipes);
// Get a recipe by id
router.get("/:id", recipeController.getRecipe);
// Create a recipe
router.post("/create-recipe", recipeController.createRecipe);
// Delete a recipe by id
router.delete("/delete-recipe/:id", recipeController.deleteRecipe);

module.exports = router;
