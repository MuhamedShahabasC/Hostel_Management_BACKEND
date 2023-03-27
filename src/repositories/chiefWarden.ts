import { AuthService } from "../services/auth";
import { ChiefWardenModel } from "../models/chiefWarden/chiefWarden";
import { IChiefWarden } from "../interfaces/IChiefWarden";

export class CWAuthRepo extends AuthService {
  async find(email: string): Promise<IChiefWarden | null> {
    return await ChiefWardenModel.findOne({ email });
  }
}

// import { ChiefWardenModel } from "../models/chiefWarden/chiefWarden";

// export abstract class CWAuthRepo {
//   async findCW(email: string) {
//     return await ChiefWardenModel.findOne({ email });
//   }
// }
