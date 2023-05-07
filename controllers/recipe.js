const { v4: uuidv4 } = require("uuid");
const cloudinary = require("../middleware/cloudinary");
const Recipe = require("../models/recipe");
const Favourite = require("../models/favourite");

module.exports = {
  // Retrieve all recipes from the Database
  getRecipes: (req, res) => {
    Recipe.findAll()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  // Retrieve a recipe by id the Database
  getRecipe: (req, res) => {
    const recipeId = req.params.id;

    Recipe.findByPk(recipeId)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  // Create a new recipe in the Database
  createRecipe: (req, res) => {
    const id = uuidv4();
    const { name, image, cloudinary_id, ingredients, directions, category_id } =
      req.body;

    Recipe.create({
      id,
      name,
      image,
      cloudinary_id,
      ingredients,
      directions,
      category_id,
    })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  // Delete a recipe from the Database
  deleteRecipe: (req, res) => {
    const recipeId = req.params.id;

    Recipe.findByPk(recipeId)
      .then((result) => {
        // Check if the recipe exists in the database table
        if (!result) {
          res.status(404).send("Recipe not found!");
          return;
        }
        // Delete the recipe from database
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
