const genAI = require("../config/geminiConfig");

const generateRecipe = async (req, res) => {
  try {
    const { ingredients } = req.body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: "Please provide an array of ingredients" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Zero-shot prompt (no examples, just instruction)
    const prompt = `You are a professional chef. Based on the given ingredients: ${ingredients.join(", ")}, create a delicious recipe with step-by-step cooking instructions.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ recipe: text });
  } catch (error) {
    console.error("Error generating recipe:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const generateOneShotRecipe = async (req, res) => {
  try {
    const { ingredients } = req.body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: "Please provide an array of ingredients" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const example = `
Example Recipe:
Title: Spicy Tomato Pasta
Ingredients:
- 200g pasta
- 2 tomatoes
- 1 tsp chili flakes
- 1 tbsp olive oil
Instructions:
1. Boil pasta until al dente.
2. Heat oil, add chopped tomatoes & chili flakes.
3. Toss pasta with sauce and serve hot.
---
`;

    const prompt = `
You are a professional chef.
Here is one example of a recipe format I want:
${example}
Now, create a recipe using only these ingredients: ${ingredients.join(", ")}.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ recipe: text });
  } catch (error) {
    console.error("Error generating one-shot recipe:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const generateDynamicRecipe = async (req, res) => {
  try {
    const { ingredients, tone, cuisine } = req.body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: "Please provide an array of ingredients" });
    }

    const selectedTone = tone || "professional";
    const selectedCuisine = cuisine || "any";

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are a ${selectedTone} chef specializing in ${selectedCuisine} cuisine.
Based on these ingredients: ${ingredients.join(", ")}, create a recipe with:
1. A catchy title
2. List of ingredients with quantities
3. Step-by-step cooking instructions
4. Serving suggestions
Make sure the recipe matches the selected tone and cuisine.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({
      tone: selectedTone,
      cuisine: selectedCuisine,
      recipe: text
    });
  } catch (error) {
    console.error("Error generating dynamic recipe:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const generateStructuredRecipe = async (req, res) => {
  try {
    const { ingredients } = req.body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: "Please provide an array of ingredients" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are a professional chef.
Based on the given ingredients: ${ingredients.join(", ")}, create a recipe.

Return ONLY valid JSON in this exact format:
{
  "title": "Recipe title here",
  "ingredients": [
    { "name": "ingredient1", "quantity": "amount" },
    { "name": "ingredient2", "quantity": "amount" }
  ],
  "steps": [
    "Step 1 instruction",
    "Step 2 instruction"
  ],
  "servingSuggestions": "How to serve the dish"
}
Do not include extra text or explanations, just the JSON.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    let recipeData;
    try {
      recipeData = JSON.parse(text);
    } catch (err) {
      return res.status(500).json({ error: "Invalid JSON response from AI", raw: text });
    }

    res.json(recipeData);
  } catch (error) {
    console.error("Error generating structured recipe:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const generateMultiShotRecipe = async (req, res) => {
  try {
    const { ingredients } = req.body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: "Please provide an array of ingredients" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Multi-Shot Prompt with two examples
    const prompt = `
You are a professional chef. I will give you ingredients, and you will return a recipe with a title and step-by-step instructions.

Example 1:
Ingredients: chicken, garlic, lemon, olive oil
Recipe:
Title: Garlic Lemon Roasted Chicken
Steps:
1. Preheat oven to 200°C (400°F).
2. Rub chicken with olive oil, minced garlic, and lemon juice.
3. Roast for 45 minutes until golden brown.
4. Serve with fresh herbs.

Example 2:
Ingredients: tomatoes, basil, mozzarella, balsamic vinegar
Recipe:
Title: Caprese Salad
Steps:
1. Slice tomatoes and mozzarella cheese.
2. Arrange on a plate with fresh basil leaves.
3. Drizzle with balsamic vinegar.
4. Serve immediately.

Now it's your turn:
Ingredients: ${ingredients.join(", ")}
Recipe:
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ recipe: text });
  } catch (error) {
    console.error("Error generating multi-shot recipe:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const generateMealPlanCoT = async (req, res) => {
  try {
    const {
      days = 7,
      caloriesPerDay = 2000,
      dietaryPref = "none",
      pantry = [],
      budget = "moderate",
      skillLevel = "beginner" // optional
    } = req.body;

    if (!Number.isInteger(days) || days <= 0) {
      return res.status(400).json({ error: "days must be a positive integer" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Prompt: ask for a short chain-of-thought and a final structured JSON
    const prompt = `
You are an expert chef and nutritionist. You will PLAN meals step-by-step and then return a final meal plan JSON.

First, in a concise list (max 8 items) show your planning steps (reasoning) — e.g., identify constraints, balance macros, reuse ingredients to minimize shopping, respect budget and pantry.

Then produce ONLY valid JSON in this exact format (no extra text):

{
  "reasoning_steps": ["step 1", "step 2", "..."],
  "mealPlan": [
    {
      "day": 1,
      "meals": [
        {
          "slot": "Breakfast",
          "title": "Oats with fruit",
          "estimated_calories": 400,
          "macros": {"protein": 15, "carbs": 60, "fat": 10},
          "ingredients": [{"name":"oats","qty":"50g"}, {"name":"banana","qty":"1"}],
          "prepTime": "10 min"
        }
      ]
    }
    /* repeat for each day */
  ],
  "shoppingList": ["item1", "item2", "..."],
  "notes": "Any extra notes (optional)"
}

Constraints:
- days: ${days}
- target calories/day: ${caloriesPerDay}
- dietary preference: ${dietaryPref}
- pantry items (prefer to use): ${pantry.length ? pantry.join(", ") : "none"}
- budget level: ${budget}
- user skill level: ${skillLevel}

Important:
- Keep reasoning_steps concise (max 8 short bullet items).
- Ensure mealPlan satisfies calories roughly per day and reuses pantry items where possible.
- RETURN ONLY the JSON above and nothing else.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Try to parse JSON
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      // If parsing fails, return helpful debugging info
      return res.status(500).json({
        error: "Invalid JSON from model",
        raw: text
      });
    }

    return res.json(parsed);
  } catch (error) {
    console.error("Error generating CoT meal plan:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
module.exports = { generateRecipe, generateOneShotRecipe, generateDynamicRecipe, generateStructuredRecipe, generateMultiShotRecipe, generateMealPlanCoT };
