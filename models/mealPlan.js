const mongoose = require("mongoose");

const mealPlanSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
  meals: {
    breakfast: {
      meal: String,
      calories: Number,
    },
    lunch: {
      meal: String,
      calories: Number,
    },
    dinner: {
      meal: String,
      calories: Number,
    },
  },
});

module.exports = mongoose.model("MealPlan", mealPlanSchema);
