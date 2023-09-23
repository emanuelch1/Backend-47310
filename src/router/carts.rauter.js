import {Router} from 'express'
import { cart } from '../services/carts.js'

const router = Router()

router.get("/", async(req,res)=>{
    try {
        const carts = await cart.getCarts(req.query)
        if (!carts.length){
            res.status(200).json({message:'no product'} )
        } else {
            res.status(200).json({message:'Products found', products})
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
})


router.get("/:idCart", async(req,res)=>{
const {idCart} = req.params;

try {
    const cart = await cart.getcartById(+idCart)
    if(!cart){
        return res.status(400).json({message:'Product not found whit the id sent'})
    } else {
        res.status(200).json({message:'Product foun', product})
    }
} catch (error) {
    res.status(500).json({message: error })
    
}
  })


router.post('/', async(req, res)=>{
    const {title, price}= req.body
    if(!title || !price){
        return res.status(400).json({message: 'some data is missing'})
    }
    try {
        const newCart = await cart.createCarts(req.body)
        res.status(200).json({message:'produc created', cart: newCart})
        
    } catch (error) {
        res.status(500).json({message: error })
    }
})


router.delete('/:idCart', async(req,res)=>{
    const {idCart} = req.params
    try {
        const response = await cart.deleteCarts(+idCart)
        if(response=== -1) {
            res.status(400).json({message: 'product not found with the id sent '})
        }else {
            res.status(200).json({message: ' product deleted'})
        }
        
    } catch (error) {
        res.status(500).json({message: error })
    }
})


router.put('/:idCart', async (req, res)=>{
    const {idCart} = req.params
    try {
        const response = await cart.updateCart(+idCart, req.body)
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