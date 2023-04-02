import asyncHandler from "express-async-handler";
import { ChefService } from "../../services/chef";
import { dataFormattor } from "../../utils/JSON-formattor";

const service = new ChefService();

// Creating new meal plan
export const newMealPlan = asyncHandler(async (req, res) => {
  await service.newMealPlan(req.body);
  res.json(dataFormattor(`${req.body.title} plan created successfully`));
});

// Single meal plan details
export const singleMealPlan = asyncHandler(async (req, res) => {
  const mealPlanData = await service.singleMealPlan(req.params._id);
  res.json(dataFormattor(mealPlanData));
});

// Updating existing meal plan
export const updateMealPlan = asyncHandler(async (req, res) => {
  const updatedMealPlan = await service.updateMealPlan(
    req.params._id,
    req.body
  );
  res.json(dataFormattor(`${req.body.title} plan updated successfully`));
});

// Change availability of meal plan
export const changeAvailability = asyncHandler(async (req, res) => {
  const mealAvailability = await service.changeAvailability(req.params._id);
  res.json(dataFormattor(mealAvailability));
});
