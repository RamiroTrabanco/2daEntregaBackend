import express from "express"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import viewProds from "./routes/viewProds.router.js"
import viewCart from "./routes/viewCart.router.js"
import handlebars from "express-handlebars"
import {__dirname} from "./dirname.js"
import "./dao/dbConfig.js"
import { Server } from "socket.io"
import CartManager from "./dao/mongoManagers/CartManager.js"

const app = express() 
const PORT = 8080
const cartManager = new CartManager

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+"/public"))


/*  seteo handlebars*/
app.engine('handlebars',handlebars.engine())
app.set('view engine','handlebars')
app.set('views',__dirname+'/views')

/* http server */
const httpServer = app.listen(PORT, () => {
    console.log("Escuchando al puerto 8080")
})
const socketServer = new Server(httpServer);
socketServer.on("connection",(socket)=>{
    console.log(`Usuario conectado: ${socket.id}`)
    socket.on("prodToCart", async prod => {
        const addProd = await cartManager.addProductToCart("6407886118c23af73d1197dc", prod.id)
        return addProd
    })
})




/* views */
app.use("/products/", viewProds)
app.use("/cart", viewCart)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)