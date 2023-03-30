import { INotice } from "../interfaces/chiefWarden";
import { NoticeRepo } from "../repositories/notice";


// Notice Service

export class NoticeService extends NoticeRepo {
    
    // Post new notice
    async newNotice(data: INotice){
        return await this.post(data)
    }

    // Get single notice details
    async singleNotice(_id: string){
        return await this.single(_id)
    }
    
    // Update new notice
    async updateNotice (_id: string, data: INotice){
       return await this.update(_id, data)
    }

    // Show / Hide a notice
    async changeVisibility(_id: string, newVisibility:boolean){
        return await this.update(_id, {visibility: newVisibility})
    }

    // Delete a notice
    async deleteNotice(_id: string){
        return await this.remove(_id)
    }
}