import { usersModel } from "../db/models/users.model.js";

class UsersManager{
    async finAll(){
        return usersModel.find();
    }

    async findById(id){
        return usersModel.findById(id);
    }
    async createOne(obj){
        return usersModel.create(obj);
    }

    async updateOne(id, obj){
        return usersModel.updateOne({ _id: id}, obj);
    }

    async deleteOne(id){
        return usersModel.deleteOne({ _id: id});
    }
}

export const usersManager = new UsersManager();