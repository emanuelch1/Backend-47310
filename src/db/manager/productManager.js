import { productModel } from "../db/models/products.models.js";
import BasicManager from "./basicManager.js";

class ProductsManager extends BasicManager{
   constructor(){
    super (productModel);
   }

   async finAllProducts(obj){
    console.log("obj",obj);
    const {limit=10, page=1, sort, ...queryFilter} = obj;
    console.log("queryFilter", queryFilter);
   }
}

export const productsManager = new ProductsManager();
