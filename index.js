const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const config = require("./config/database");
const Catagory = require("./models/catagory");
const Favourite = require("./models/favourite");
const Recipe = require("./models/recipe");
const User = require("./models/user");
const bcrybt = require("bcrypt");
const cors = require("cors");
const recipeRoutes = require("./routes/recipe");
const userRoutes = require("./routes/user");
const favouriteRoutes = require("./routes/favourite");

// Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("public")); //This makes our plublic folder including the uploads folder public

// DB table associations
User.belongsToMany(Recipe, { through: Favourite });
Recipe.belongsToMany(User, { through: Favourite });
User.hasMany(Favourite);
Favourite.belongsTo(User);
Recipe.hasMany(Favourite);
Favourite.belongsTo(Recipe);

Catagory.hasMany(Recipe, { foreignKey: "category_id" });
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

// Sync models to DB --migrate
config.sync();

// Routes
app.use("/api/recipes", recipeRoutes); // Recipe routes
app.use("/api/", userRoutes); // User routes
app.use("/api/favourites", favouriteRoutes); // User routes

// Server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
