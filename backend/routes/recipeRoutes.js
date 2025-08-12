const express = require("express");
const { generateRecipe,generateOneShotRecipe } = require("../controllers/recipeController");

const router = express.Router();

router.post("/recipe", generateRecipe);
router.post("/one-shot", generateOneShotRecipe);

module.exports = router;
