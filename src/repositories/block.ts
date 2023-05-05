import { CRUD } from "./CRUD";
import { IBlock } from "../interfaces/block";
import { BlockModel } from "../models/block";
import ErrorResponses from "src/error/ErrorResponses";

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
    return await this.findOneAndUpdate({ _id, "rooms.code": roomCode }, data);
  }

  // Vacate room by _id and code
  protected async vacateRoomByCode(_id: string, roomCode: string): Promise<IBlock> {
    return await this.findOneAndUpdate(
      { _id, "rooms.code": roomCode },
      {
        $unset: { "rooms.$.student": 1 },
        $set: { "rooms.$.availability": true },
        $inc: { occupancy: -1 },
      }
    );
  }

  // Total Room occupancy
  protected async totalOccupancy(): Promise<any> {
    let allBlocksData = await this.model.aggregate([
      {
        $match: {},
      },
      {
        $group: {
          _id: null,
          occupancy: { $sum: "$occupancy" },
          totalRooms: { $sum: { $size: "$rooms" } },
        },
      },
    ]);
    allBlocksData = allBlocksData[0];
    const activeRoomsData = await this.model.aggregate([
      { $match: {} },
      {
        $unwind: "$rooms",
      },
    ]);
    const availableRooms = activeRoomsData.filter(({ rooms }) => rooms.availability).length;
    return {
      ...allBlocksData,
      availableRooms,
    };
  }
}
