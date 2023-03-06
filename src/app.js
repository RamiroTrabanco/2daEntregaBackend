import express from "express"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import handlebars from "express-handlebars"
import {__dirname} from "./dirname.js"
import ProductManager from "./dao/fileManagers/ProductManager.js"
import { Server } from "socket.io"
import "./dao/dbConfig.js"
import { messageModel } from "./dao/models/messages.model.js"

const app = express() 
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+"/public"))


/*  seteo handlebars*/
app.engine('handlebars',handlebars.engine())
app.set('view engine','handlebars')
app.set('views',__dirname+'/views')


/* vistas handlebars */
/* const productManager = new ProductManager()
app.get("/", async (req, res)=> {
    const products =  await productManager.getProducts()
    res.render("home", {products})
})
app.get("/realTimeProducts", async (req, res)=> {
    res.render("realTimeProducts")
})

const httpServer = app.listen(PORT, () => {
    console.log("Servidor escuchando al puerto 8080")
})

const products = await productManager.getProducts()
let addLiProducts = [...products]
const socketServer = new Server(httpServer);
socketServer.on("connection", (socket) => {
    socket.emit("productos", addLiProducts)
    console.log(`Usuario conectado: ${socket.id}`);
    socket.on("objeto", (obj) => {
    productManager.addProducts(obj)
    let addLi = {title: obj.title}
    addLiProducts.push(addLi)
    socketServer.emit("addProductToHTML", addLiProducts)
});
}); */

/* chat */

app.get("/chat", (req,res)=>{
    res.render("chat")
})

const httpServer = app.listen(8080, () => {
    console.log("Escuchando al puerto 8080")
})

const socketServer = new Server(httpServer)

const messages = []

socketServer.on("connection", socket=>{
    console.log(`Usuario conectado: ${socket.id}`)

    socket.on("disconnect",()=>{
        console.log("Usuario desconectado")
    })

    socket.on("newUser",user=>{
        console.log("Usuario:", user);
    })

    socket.on("message",async info=>{
        messages.push(info)
        socketServer.emit("chat", messages)
        await messageModel.create(info)
    })
})



app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)