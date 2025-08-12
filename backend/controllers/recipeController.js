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

module.exports = { generateRecipe, generateOneShotRecipe };
