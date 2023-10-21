import mongoose from "mongoose";
const URI= "mongodb+srv://emanuelch1:emanuelch1@emanuelch1.t1l3xr2.mongodb.net/ecommerce47310?retryWrites=true&w=majority";

mongoose.connect(URI)
.then(()=>console.log("Conectado a la base de dato"))
.catch((error)=> console.log(error));
