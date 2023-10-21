import express from 'express'
import productsRouter from './router/products.router.js'
import cartRouter from './router/carts.rauter.js'
import { __dirname } from './utils.js'
import { engine } from 'express-handlebars'
import viewsRouter from './router/views.router.js'
import { Server, Socket } from 'socket.io'
import {productsManager} from './ProductManager.js'
import "./db/configDB.js"

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))

// handerlebars
app.engine('handlebars', engine());
app.set('views', __dirname +'/views')
app.set('view engine', 'handlebars');

// routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
app.use('/', viewsRouter)


const httpServer = app.listen(8080, ()=>{
    console.log("Escuchando al puerto 8080");
});
const socketServer = new Server (httpServer)

socketServer.on('connection', (socket)=>{
    console.log(`cliente conectado: ${socket.id}`);

socket.on('createProduct', async (product)=>{
        const newProduct = await productsManager.createProduct(product)
        socket.emit('productCreated', newProduct)
});  

});