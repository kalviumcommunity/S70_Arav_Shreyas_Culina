const express = require("express");
const { generateRecipe,generateOneShotRecipe,generateDynamicRecipe } = require("../controllers/recipeController");

const router = express.Router();

router.post("/recipe", generateRecipe);
router.post("/one-shot", generateOneShotRecipe);
router.post("/dynamic", generateDynamicRecipe);

module.exports = router;
