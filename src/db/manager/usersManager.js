import { usersModel } from "../models/users.model.js";
import BasicManager from "./basicManager.js";

//class UsersManager extends BasicManager{
  // constructor(){ 
   //     super (usersModel)
  //  }
//}
 class UsersManager{
    async getById(id){
        const response= await usersModel.findById(id);
        return response;
    }

    async createOne(obj){
        const response = await usersModel.create(obj)
        return response;
    }
 }


export const usersManager = new UsersManager();
