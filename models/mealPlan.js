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
      meal: {
        type: String,
        default: "",
      },
      calories: {
        type: Number,
        default: 0},
    },
    lunch: {
        meal: {
        type: String,
        default: "",
      },
      calories: {
        type: Number,
        default: 0},
    },
    dinner: {
      meal: {
        type: String,
        default: "",
      },
      calories: {
        type: Number,
        default: 0},
    },
  },
});

module.exports = mongoose.model("MealPlan", mealPlanSchema);
