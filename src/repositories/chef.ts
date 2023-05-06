import { Model } from "mongoose";
import { CRUD } from "./CRUD";
import { IMealPlan } from "../interfaces/staff";
import { MealPlanModel } from "../models/mealPlan";
import ErrorResponses from "../error/ErrorResponses";

// Chef Repository

export abstract class ChefRepo extends CRUD {
  // Meal Plan model
  model: Model<IMealPlan> = MealPlanModel;

  // Find all meal plans with optional filter
  protected async findMealPlans(filter?: Object, options?: Object) {
    const mealPlans = await this.findAll<IMealPlan>(filter, options);
    if (mealPlans.length === 0) throw ErrorResponses.noDataFound("meal plans");
    return mealPlans;
  }

  // Create new meal plan
  protected async createPlan(data: IMealPlan) {
    return await this.create<IMealPlan>(data);
  }

  // Find meal plan
  protected async findMealPlan(_id: string) {
    const mealData = await this.findOne<IMealPlan>({ _id });
    if (!mealData) throw ErrorResponses.noDataFound("meal plan");
    return mealData;
  }

  // Update meal plan
  protected async update(_id: string, data: any) {
    const updatedMealPlan = await this.findByIdAndUpdate<IMealPlan>(_id, data);
    if (!updatedMealPlan) throw ErrorResponses.noDataFound("updated meal plan");
    return updatedMealPlan;
  }
}
