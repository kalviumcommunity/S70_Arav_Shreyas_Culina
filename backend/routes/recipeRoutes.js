const express = require("express");
const { generateRecipe,generateOneShotRecipe,generateDynamicRecipe,generateStructuredRecipe,generateMultiShotRecipe,generateMealPlanCoT } = require("../controllers/recipeController");

const router = express.Router();

router.post("/recipe", generateRecipe);
router.post("/one-shot", generateOneShotRecipe);
router.post("/dynamic", generateDynamicRecipe);
router.post("/structured", generateStructuredRecipe);
router.post("/multi-shot", generateMultiShotRecipe);
router.post("/cot-mealplan", generateMealPlanCoT);

module.exports = router;
