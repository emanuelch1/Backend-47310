import express from 'express'
import { productsManager } from './ProductsManager.js'


const app = express()

app.get("/products", async(req,res)=>{
    try {
        const products = await productsManager.getProducts(req.query)
        if (!products.length){
            res.status(200).json({message:'no product'} )
        } else {
            res.status(200).json({message:'Products found', products})
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
})

app.get("/products/idProduct", async(req,res)=>{
const {idProduct} = req.params
try {
    const product = await productsManager.getProducById(+idProduct)
    if(!product){
        return res.status(400).json({message:'Product not found whit the id sent'})
    } else {
        res.status(200).json({message:'Product foun', product})
    }
} catch (error) {
    res.status(500).json({message: error })
    
}
  })

app.listen(8080, ()=>{
    console.log('Escuchando al puerto 8080')
})
