import { INotice } from "../interfaces/chiefWarden";
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

  // Post new notice
  async postNewNotice(data: INotice) {
    await this.createNotice(data);
  }
}
