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

module.exports = { generateRecipe };
