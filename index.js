const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const Sequelize = require("sequelize");
const config = require("./config/database");
const Catagory = require("./models/catagory");
const Favourite = require("./models/favourite");
const Recipe = require("./models/recipe");
const User = require("./models/user");
const bcrybt = require("bcrypt");
const cors = require("cors");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// DB table associations
User.belongsToMany(Recipe, { through: Favourite });
Recipe.belongsToMany(User, { through: Favourite });
Catagory.hasMany(Recipe, { foreignKey: "id" });
Recipe.belongsTo(Catagory, { foreignKey: "category_id" });

// Test DB connection
config
  .authenticate()
  .then(() => {
    console.log("Databae is connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Server
app.listen(process.env.PORT, () => {
  console.log("Server is running");
});