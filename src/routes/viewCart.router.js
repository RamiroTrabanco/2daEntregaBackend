import { Router } from "express"
import CartManager from "../dao/mongoManagers/CartManager.js"

const cartManager = new CartManager()
const router = Router()

router.get("/:cid", async(req, res)=>{
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