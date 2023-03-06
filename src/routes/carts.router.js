import { Router } from "express"
import CartManager from "../dao/mongoManagers/CartManager.js"

const router = Router()
const cartManager = new CartManager()

router.get("/GET/:cid", async(req, res) => {
    const {cid} = req.params
    const cartById = await cartManager.getCartsById(cid)
    res.json({cartById})
})

router.post("/POST", async(req, res)=>{
    const addCart = await cartManager.addCart()
    res.json({addCart})
})

router.post("/POST/:cid/product/:pid", async(req, res) => {
    const {cid, pid} = req.params
    const addProdToCart = await cartManager.addProductToCart(cid, pid)
    res.json({addProdToCart})
})

router.delete("/:cid/", async(req, res)=>{
    const {cid} = req.params
    const dltCart = await cartManager.deleteCart(cid)
    res.json({dltCart})
})

router.delete("/:cid/products/:pid", async(req, res)=>{
    const {cid, pid} = req.params
    const dltProd = await cartManager.deleteProductOnCart(cid, pid)
    res.json({dltProd})
})

router.put("/:cid", async(req, res)=>{
    const newProds = req.body
    const {cid} = req.params
    const updCart = await cartManager.updateCart(newProds, cid)
    res.json({updCart})
})

router.put("/:cid/products/:pid", async (req, res)=>{
    const newQuant = req.body
    const {cid, pid} = req.params
    const updStock = await cartManager.updateQuant(newQuant, cid, pid)
    res.json([updStock])
})

export default router