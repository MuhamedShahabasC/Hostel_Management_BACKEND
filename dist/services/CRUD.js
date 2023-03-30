"use strict";
// generic crud class
// import { Model } from "mongoose";
// export class CRUD {
//     async update<T>(model : Model<T>,_id: string, data: T ){
//         console.log(data,model,_id);
//     }
// }
//-----------------------
// 1. extend two classes
// type Constructor<T = {}> = new (...args: any[]) => T;
// function Mixin<T extends Constructor[]>(...baseClasses: T) {
//   return class extends baseClasses.reduce((accumulator, currentValue) => {
//     return class extends accumulator {
//       constructor(...args: any[]) {
//         super(...args);
//       }
//     };
//   }, class {}) {};
// }
//-----------------------
// 2. Instantiate crud on demand on services
//-----------------------
// 3. Replace auth with crud - good
