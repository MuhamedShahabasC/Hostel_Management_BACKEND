import { BlockRepo } from "../repositories/block";
import { IBlock, IRoom } from "../interfaces/block";
import { roomCreater } from "../utils/roomCreater";

export class BlockService extends BlockRepo {
  
  // Get all blocks
  async allBlocks(): Promise<IBlock[] | null> {
    return await this.getAll();
  }

  // Create a new block
  async createBlock(name: string, code: string, numberOfRooms: number) {
    const roomsArray = roomCreater(code, numberOfRooms);
    const blockData = {
      name,
      code,
      occupancy: 0,
      rooms: roomsArray as IRoom[],
    };
    return await this.createNew(blockData);
  }

  // Delete a block
  async deleteBlock(_id: string):Promise<void| null>{
    return await this.delete(_id)
  }
}
