const express = require("express");
const router = express.Router();
const MealPlan = require("../models/mealPlan");
const { authenticated } = require("../security");

const namespace = "https://food.api.com/";

//Get all users meals
router.get("/", authenticated, async (req, res) => {
  try {
    const userEmail = req.user[namespace + "email"];
    const plans = await MealPlan.find({ owner: userEmail });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//Creating one
router.post("/", authenticated, async (req, res) => {
  const meal = new MealPlan({
    name: req.body.name,
    owner: req.user[namespace + "email"],
    meals: req.body.meals,
  });
  try {
    const newMeal = await meal.save();
    res.status(201).json(newMeal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Updating one
router.patch("/:id", authenticated, async (req, res) => {
  let meal;
  try {
    meal = await MealPlan.findById(req.params.id);
    if (!meal || meal.owner !== req.user[namespace+'email']) {
      return res.status(404).json({ message: "Cannot find plan" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.meal = meal;

  if (req.body.name) {
    res.meal.name = req.body.name;
  }
  if (req.body.meals.breakfast) {
    res.meal.meals.breakfast = req.body.meals.breakfast;
  }
  if (req.body.meals.lunch) {
    res.meal.meals.lunch = req.body.meals.lunch;
  }
  if (req.body.meals.dinner) {
    res.meal.meals.dinner = req.body.meals.dinner;
  }

  try {
    const updatedPlan = await res.meal.save();
    res.json(updatedPlan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Deleting one
router.delete("/:id", authenticated, async (req, res) => {
  try {
    const plan = await MealPlan.findById(req.params.id);
    if (plan.owner === req.user[namespace + "email"]) {
      await plan.remove();
      res.json({ message: "Deleted meal plan" });
    } else {
      res.status(404).json({ message: "Plan not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
