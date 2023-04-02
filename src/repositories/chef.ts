import { Model } from "mongoose";
import { CRUD } from "./CRUD";
import { IMealPlan } from "../interfaces/staff";
import { MealPlanModel } from "../models/mealPlan";
import ErrorResponses from "../error/ErrorResponses";

// Chef Repository

export abstract class ChefRepo extends CRUD {
  // Meal Plan model
  model: Model<IMealPlan> = MealPlanModel;

  // Create new meal plan
  protected async createPlan(data: IMealPlan): Promise<void> {
    return await this.create(data);
  }

  // Find meal plan
  protected async findMealPlan(_id: string): Promise<IMealPlan> {
    const mealData = await this.findOne({ _id });
    if (!mealData) throw ErrorResponses.noDataFound("meal plan");
    return mealData;
  }

  // Update meal plan
  protected async update(_id: string, data: IMealPlan): Promise<IMealPlan> {
    return await this.idAndUpdate(_id, data);
  }
}
