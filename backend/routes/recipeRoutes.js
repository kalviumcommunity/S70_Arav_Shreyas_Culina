const express = require("express");
const { generateRecipe } = require("../controllers/recipeController");

const router = express.Router();

router.post("/recipe", generateRecipe);

module.exports = router;
