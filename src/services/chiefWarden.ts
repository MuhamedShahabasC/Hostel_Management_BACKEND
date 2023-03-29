import { IBlock } from "../interfaces/block";
import { ChiefWardenRepo } from "../repositories/chiefWarden";

export class ChiefWardenService extends ChiefWardenRepo {
  constructor() {
    super();
  }
  // Add new block
  async addNewBlock(data: IBlock) {
    await this.createBlock(data);
  }
}
