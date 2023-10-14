import { productModel } from "../db/models/products.models.js";

class ProductsManager{
    async finAll(){
        return productModel.find();
    }

    async findById(id){
        return productModel.findById(id);
    }
    async createOne(obj){
        return productModel.create(obj);
    }

    async updateOne(id, obj){
        return productModel.updateOne({ _id: id}, obj);
    }

    async deleteOne(id){
        return productModel.deleteOne({ _id: id});
    }
}

export const ProductsManager = new ProductsManager();