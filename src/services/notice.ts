// import { INotice } from "../interfaces/chiefWarden";
// import { NoticeRepo } from "../repositories/notice";

// export class NoticeService extends NoticeRepo {
//     async singleNotice(_id: string){
//         return await this.single(_id)
//     }
    
//     async updateNotice (_id: string, data: INotice){
//        return await this.update(_id, data)
//     }

//     async newNotice(data: INotice){
//         return await this.post(data)
//     }

//     async changeVisibility(_id: string, newVisibility:boolean){
//         return await this.update(_id, {visibility: newVisibility})
//     }

//     async deleteNotice(_id: string){
//         return await this.remove(_id)
//     }
// }