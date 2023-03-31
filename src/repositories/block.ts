import { CRUD } from "./CRUD";
import { IBlock } from "../interfaces/block";
import { BlockModel } from "../models/block";

export abstract class BlockRepo extends CRUD {
  model = BlockModel;

  // Get all blocks
  protected async getAll(): Promise<IBlock[] | null> {
    return await this.findAll();
  }

  // Create a new block
  protected async createNew(data: IBlock): Promise<IBlock | null> {
    return await this.create(data);
  }

  // Delete block
  protected async delete(_id: string): Promise<void | null> {
    return await this.idAndDelete(_id);
  }
}
