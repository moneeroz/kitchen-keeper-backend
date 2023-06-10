const { v4: uuidv4 } = require("uuid");
const Ingredient = require("../models/ingredient");

module.exports = {
  // Retrieve all
  getIngredients: (req, res) => {
    Ingredient.findAll()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  // Retrieve by id
  getIngredientById: (req, res) => {
    const IngredientId = req.params.id;

    Ingredient.findByPk(IngredientId)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  // Create
  createIngredient: (req, res) => {
    const id = uuidv4();
    const { name } = req.body;

    Ingredient.create({ id, name })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  // Update
  updateIngredient: (req, res) => {
    const id = req.params.id;
    const { name } = req.body;

    Ingredient.findByPk(id)
      .then((result) => {
        if (!result) {
          res.status(404).send("Ingredient not found!");
          return;
        }

        result.name = name;

        result
          .save()
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
  // Delete
  deleteIngredient: (req, res) => {
    const id = req.params.id;

    Ingredient.findByPk(id)
      .then((result) => {
        if (!result) {
          res.status(404).send("Ingredient not found!");
          return;
        }

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
