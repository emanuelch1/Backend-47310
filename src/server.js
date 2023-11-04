import express from 'express'
import productsRouter from './router/products.router.js'
import cartRouter from './router/carts.rauter.js'
import { __dirname } from './utils.js'
import { engine } from 'express-handlebars'
import viewsRouter from './router/views.router.js'
import { Server, Socket } from 'socket.io'
import {productsManager} from './ProductManager.js'
import "./db/configDB.js"
import cookieParser from 'cookie-parser'
import loginRouter from './router/loginRouter.js'
import session from 'express-session'
import FileStore  from 'session-file-store'
import usersRouter from './router/users.router.js'

const app = express()
// COOKIES
const secret = '123456789'
app.use(cookieParser(secret));

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))

//user router
app.use('/api/users', usersRouter)

//session
const fileStore = FileStore(session)
app.use(session({
    secret:"sessionsecrekey",
    cookie:{
        maxAge:60 * 60 * 1000,
    },
    store:new fileStore(
        {
            path: __dirname + "/sessions"
        }
    )
}));

// handerlebars
app.engine('handlebars', engine());
app.set('views', __dirname +'/views')
app.set('view engine', 'handlebars');

//login
app.use('/login', loginRouter)
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