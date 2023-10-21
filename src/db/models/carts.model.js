import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    products: [
      {
        product:{
            type: mongoose.SchemaType.ObjetId,
            ref: "Products",
        },
        quantity: {
            type: Number,
        },
      },
     ],
});

export const cartsModel = mongoose.model("Carts", cartsSchema);