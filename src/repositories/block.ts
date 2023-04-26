import { CRUD } from "./CRUD";
import { IBlock } from "../interfaces/block";
import { BlockModel } from "../models/block";

export abstract class BlockRepo extends CRUD {
  // Block model
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

  // Update block by _id
  protected async updateBlockById(_id: string, data: any) {
    return await this.findByIdAndUpdate(_id, data);
  }

  // Update room by code
  protected async updateRoomByCode(_id: string, roomCode: string, data: any) {
    return await this.findOneAndUpdate({ _id, "rooms.code": roomCode }, { $set: data });
  }

  // Vacate room by _id and code
  protected async vacateRoomByCode(_id: string, roomCode: string): Promise<IBlock> {
    return await this.findOneAndUpdate(
      { _id, "rooms.code": roomCode },
      { $unset: { "rooms.$.student": 1 }, $set: { "rooms.$.availability": true } }
    );
  }
}
