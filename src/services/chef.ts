import { IMealPlan } from "../interfaces/staff";
import { ChefRepo } from "../repositories/chef";

// Chef Service

export class ChefService extends ChefRepo {
  // All meal plans
  async allMealPlans(): Promise<IMealPlan[]> {
    return await this.findAll();
  }

  // Active meal plans
  async showActivePlans(): Promise<IMealPlan[]> {
    return await this.findAll({ active: true });
  }

  // Adding meal plan
  async newMealPlan(data: IMealPlan): Promise<void> {
    return await this.createPlan(data);
  }

  // Single meal plan
  async singleMealPlan(_id: string): Promise<IMealPlan> {
    return await this.findMealPlan(_id);
  }

  // Updating meal plan
  async updateMealPlan(_id: string, data: any): Promise<IMealPlan> {
    return await this.update(_id, data);
  }

  // Add students to meal plan
  async subscribe(_id: string): Promise<IMealPlan> {
    return await this.update(_id, { $inc: { subscribers: 1 } });
  }

  // Reduce subscribers from meal plan
  async unSubscribe(_id: string): Promise<IMealPlan> {
    return await this.update(_id, { $inc: { subscribers: -1 } });
  }

  // Change visibitly of meal plan
  async changeAvailability(_id: string): Promise<string> {
    const mealPlan = await this.findMealPlan(_id);
    mealPlan.active = !mealPlan.active;
    await this.update(_id, mealPlan);
    return `${mealPlan.title} plan made ${mealPlan.active ? "active" : "in-active"}`;
  }
}
