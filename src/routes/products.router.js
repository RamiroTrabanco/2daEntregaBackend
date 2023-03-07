import { Router } from "express"
import ProductManager from "../dao/mongoManagers/ProductManager.js"
import { __dirname } from "../dirname.js"

const router = Router()
const productManager = new ProductManager()

router.get("/GET", async (req, res) => {
    const {limit=10, page=1, sort, ...query} = req.query
    const products = await productManager.getProducts(limit, page, sort, query)
    res.json({products})
})

router.get("/GET/:pid", async(req, res)=>{
    const {pid} = req.params
    const productById = await productManager.getProductsById(pid)
    res.json({productById})
})

router.post("/POST", async(req, res)=>{
    const newProd = req.body
    const addProd = await productManager.addProducts(newProd)
    res.json({message:"Producto creado con éxito",addProd})
})

router.put("/PUT/:pid", async(req, res)=>{
    const upProd = req.body
    const { pid } = req.params
    upProd.id = pid
    const updateProd = await productManager.updateProduct(upProd)
    res.json({message:"Producto actualizado con éxito",updateProd})
})

router.delete("/DELETE/:pid", async(req, res)=>{
    const {pid} = req.params
    const productById = await productManager.getProductsById(parseInt(pid))
    const deleteProd = await productManager.deleteProduct(productById)
    res.json({message:"Producto eliminado con éxito", deleteProd})
})

export default router