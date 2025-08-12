# **Culina – AI-Powered Personal Cooking Assistant**

Culina is an AI-driven, personalized cooking assistant that adapts to your tastes, location, cooking skills, and dietary needs. Whether you want a quick weekday meal, a gourmet dinner, or a calorie-conscious plan, Culina makes cooking effortless by combining intelligent recipe generation, adaptive learning, and personalized recommendations.

---

## **1. Project Overview**

Culina is designed to provide **deeply personalized recipes, meal plans, and cooking guidance**. It goes beyond basic recipe search by understanding the user’s preferences, available ingredients, local market conditions, and even their mood.

The system will:

- Generate **AI-crafted recipes** tailored to the user’s tastes, goals, and pantry.
- Adapt cooking instructions to the user’s **skill level**.
- Support **meal planning**, **budget cooking**, and **health-based diets**.
- Suggest **smart pairings**, ingredient substitutions, and mood-based meals.
- Use **Gemini AI** for intelligent recipe generation and personalization.

---

## **2. Features**

### **User Profile & Preferences**

- Name & location (adapts to local ingredients).
- Cooking skill level (Beginner → detailed steps, Pro → concise).
- Dietary preference (Vegan, Keto, Gluten-free, etc.).
- Allergies (nuts, dairy, shellfish, etc.).
- Favorite cuisines (Italian, Japanese, Indian…).
- Disliked ingredients (never suggests them).
- Kitchen equipment available (oven, microwave, blender…).
- Time constraints (15-min, 30-min meals).
- Health goals (weight loss, muscle gain, balanced diet).

---

### **Core AI Features**

- **Pantry Mode** – Save ingredients in a virtual pantry for recipe suggestions.
- **Goal Mode** – Calorie & macro-based recipe generation.
- **Skill-Based Instructions** – Tailored detail based on cooking experience.
- **Weekly Meal Planning** – 7-day meal plans with shopping lists.
- **Adaptive Learning** – AI learns from ratings & skipped recipes.
- **Local Adaptation** – Replaces unavailable ingredients with local alternatives.
- **Budget Mode** – Recipes sorted by cost.
- **Occasion Mode** – Menus for birthdays, date nights, family dinners.

---

### **Extra Standout Features**

- **Smart Pairings 🍷** – Suggests side dishes, sauces, or drinks to match the main dish.
- **Cooking Timer Integration ⏲️** – In-app timers for steps with notifications.
- **AI Ingredient Substitutions 🔄** – Instantly swaps ingredients (diet-friendly).
- **Mood-Based Cooking 🎭** – Recipes & plating ideas based on mood (lazy, romantic, festive).
- **Meal Prep & Storage Guide ❄️** – Bulk cooking tips + storage & reheating instructions.

---

## **3. How AI Concepts Are Used**

### **Prompting**

Culina uses **dynamic prompting** to create highly personalized outputs from Gemini AI. Each prompt includes:

- User’s dietary preferences, allergies, disliked ingredients.
- Cooking skill level for adjusting detail.
- Available ingredients from pantry mode.
- Local ingredient availability for substitutions.
- Time & budget constraints.
- Mood or occasion context.

**Example Prompt:**

```

Generate a 30-minute vegan pasta recipe for a beginner cook in Mumbai, using only these pantry ingredients: tomatoes, spinach, garlic, and pasta. Avoid nuts and dairy. Suggest a drink pairing.

```

---

### **Structured Output**

Responses from Gemini are parsed into structured JSON objects for easy integration into the frontend.

**Example Structure:**

```json

{
  "recipe_title": "Creamy Vegan Spinach Pasta",
  "servings": 2,
  "prep_time": "10 min",
  "cook_time": "20 min",
  "ingredients": [
    "200g pasta",
    "2 cups spinach",
    "2 tomatoes",
    "3 cloves garlic"
  ],
  "steps": [
    "Boil pasta until al dente.",
    "Sauté garlic in olive oil...",
    "Add tomatoes and spinach..."
  ],
  "nutrition": {
    "calories": 350,
    "protein": "12g",
    "carbs": "60g",
    "fat": "8g"
  },
  "pairing": "Lemon-Basil Mocktail"
}

```

---

### **Function Calling**

We’ll use Gemini’s **function calling** to trigger specific backend functions for:

- Fetching nutrition data from an external API.
- Replacing ingredients with substitutions.
- Calculating cost per serving.
- Generating shopping lists for weekly meal plans.

**Example:**

If a user asks *"What can I cook with chicken, rice, and broccoli under 500 calories?"*, Gemini will trigger the `generateRecipe` function with these parameters:

```json

{
  "ingredients": ["chicken", "rice", "broccoli"],
  "max_calories": 500
}

```

---

### **RAG (Retrieval-Augmented Generation)**

Culina uses RAG to enhance recipe generation by pulling information from:

- **Local food databases** (to suggest locally available ingredients).
- **Nutritional datasets** for accurate calorie/macro counts.
- **Cultural cuisine datasets** to enhance authenticity.

The retrieved data is **merged with Gemini’s generative output** to ensure relevance and accuracy.

---

## **4. Tech Stack**

**Frontend:** React + Vite + Tailwind CSS

**Backend:** Node.js (CJS) + Express.js

**Database:** MongoDB (for user profiles, pantry, history)

**AI Provider:** Gemini API (Google Generative AI)

**Auth:** JWT-based authentication