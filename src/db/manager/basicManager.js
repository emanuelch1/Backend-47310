export default class BasicManager{
    constructor(model){
        thid.model = model
    }
    async finAll(){
        return thid.model.find();
    }

    async findById(id){
        return thid.model.findById(id);
    }
    async createOne(obj){
        return thid.model.create(obj);
    }

    async updateOne(id, obj){
        return thid.model.updateOne({ _id: id}, obj);
    }

    async deleteOne(id){
        return thid.model.deleteOne({ _id: id});
    }
}