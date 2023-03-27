import ErrorResponses from "../error/ErrorResponses";
import { IChiefWarden } from "../interfaces/IChiefWarden";
import { comparePassword } from "../utils/passwordManager";

// Unified authentication service for everyone

// export type AuthRoles = "student" | "staff" | "chief warden";

// export abstract class AuthService {
//   abstract role: AuthRoles;
//   abstract find(email: string): Promise<IChiefWarden | null>;

//   async login(email: string, password: string): Promise<IChiefWarden> {
//     const existingUser = await this.find(email.toLowerCase());
//     if (!existingUser) {
//       throw ErrorResponses.noDataFound(this.role);
//     }
//     const validPassword = await comparePassword(
//       password,
//       existingUser.password
//     );
//     if (!validPassword) {
//       throw ErrorResponses.unautharized("Invalid Password");
//     }
//     return existingUser;
//   }
// }
