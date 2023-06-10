const express = require("express");
const router = express.Router();
const ingredientController = require("../controllers/ingredient");

// Get all ingredients
router.get("/", ingredientController.getIngredients);
// Get ingredient by id
router.get("/:id", ingredientController.getIngredientById);
// Create an ingredient
router.post("/", ingredientController.createIngredient);
// Update an ingredient
router.put("/:id", ingredientController.updateIngredient);
// Delete an ingredient
router.delete("/:id", ingredientController.deleteIngredient);

module.exports = router;
