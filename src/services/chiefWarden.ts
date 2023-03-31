import { IBlock } from "../interfaces/block";
import { ChiefWardenRepo } from "../repositories/chiefWarden";

export class ChiefWardenService extends ChiefWardenRepo {

  // Add new block
  async addNewBlock(data: IBlock) {
    await this.createBlock(data);
  }

}
