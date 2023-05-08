const { v4: uuidv4 } = require("uuid");
const cloudinary = require("../middleware/cloudinary");
const Recipe = require("../models/recipe");

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
  // Retrieve recipes based on catagory from the Database
  getCategoryRecipes: (req, res) => {
    const category_id = req.params.catagory_id;
    Recipe.findAll({ where: { category_id } })
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
  createRecipe: async (req, res) => {
    const id = uuidv4();
    const { name, ingredients, directions, category_id } = req.body;
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "recipes",
      });
      console.log(result);

      await Recipe.create({
        id,
        name,
        image: result.secure_url,
        cloudinary_id: result.public_id,
        ingredients,
        directions,
        category_id,
      });
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
    }
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
