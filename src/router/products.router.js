import {Router} from 'express'
import { productsManager } from '../ProductManager.js'

const router = Router()

router.get("/", async(req,res)=>{
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


router.get("/:idProduct", async(req,res)=>{
const {idProduct} = req.params;

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

  router.get('/', async(req, res)=>{
    const products = await productsManager.findAllProducts(req.query);
    res.json({products})
  }
  )


router.post('/', async(req, res)=>{
    const {title, description, price, thumbnail, code, stock}= req.body
    if(!title || !description || !price || !thumbnail || !code || !stock){
        return res.status(400).json({message: 'some data is missing'})
    }
    try {
        const newProduct = await productsManager.createProduct(req.body)
        res.status(200).json({message:'produc created', product: newProduct})
        
    } catch (error) {
        res.status(500).json({message: error })
    }
})


router.delete('/:idProduct', async(req,res)=>{
    const {idProduct} = req.params
    try {
        const response = await productsManager.deleteProduct(+idProduct)
        if(response=== -1) {
            res.status(400).json({message: 'product not found with the id sent '})
        }else {
            res.status(200).json({message: ' product deleted'})
        }
        
    } catch (error) {
        res.status(500).json({message: error })
    }
})


router.put('/:idProduct', async (req, res)=>{
    const {idProduct} = req.params
    try {
        const response = await productsManager.updateProduct(+idProduct, req.body)
        if(response=== -1) {
            res.status(400).json({message: 'product not found with the id sent '})
        }else {
            res.status(200).json({message: ' product deleted'})
        }

    } catch (error) {
        res.status(500).json({message: error })
    }
})


export default router