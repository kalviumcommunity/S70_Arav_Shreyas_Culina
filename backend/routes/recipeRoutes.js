const express = require("express");
const { generateRecipe,generateOneShotRecipe,generateDynamicRecipe,generateStructuredRecipe,generateMultiShotRecipe } = require("../controllers/recipeController");

const router = express.Router();

router.post("/recipe", generateRecipe);
router.post("/one-shot", generateOneShotRecipe);
router.post("/dynamic", generateDynamicRecipe);
router.post("/structured", generateStructuredRecipe);
router.post("/multi-shot", generateMultiShotRecipe);
module.exports = router;
