import { Router } from "express"
import ProductManager from "../dao/mongoManagers/ProductManager.js"

const productManager = new ProductManager()
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

export default router