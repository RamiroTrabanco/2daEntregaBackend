import { Router } from "express"
import ProductManager from "../dao/mongoManagers/ProductManager.js"
import CartManager from "../dao/mongoManagers/CartManager.js"

const productManager = new ProductManager()
const cartManager = new CartManager()
const router = Router()

router.get("/",async (req, res)=>{
    try {
        const {limit=10, page=1, sort, ...query} = req.query
        const products = await productManager.getProducts(limit, page, sort, query)
        res.render("products", {products: products.payload})
    } catch (error) {
        return error
    }
})

router.get("/cart/:cid", async(req, res)=>{
    try {
        const {cid} = req.params
        const getCart = await cartManager.getCartsById(cid)
        const getCartProds = getCart.products
        res.render("cart", {products: getCartProds})
    } catch (error) {
        return error
    }
})

export default router