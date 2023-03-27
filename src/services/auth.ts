import { IChiefWarden } from "../interfaces/IChiefWarden";

export abstract class AuthService {
  abstract find(email: string): Promise<IChiefWarden | null>;

  async login(email: string, password: string): Promise<IChiefWarden> {
    const existingUser = await this.find(email);
    if(!existingUser){
      throw new Error('User not found')
    }
    return existingUser
  }
}
