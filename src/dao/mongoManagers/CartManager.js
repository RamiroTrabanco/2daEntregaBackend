import { cartsModel } from "../models/carts.model.js";
import ProductManager from "./ProductManager.js";

const productManager = new ProductManager

export default class CartManager{
    async getCarts(){
        try {
            const carts = await cartsModel.find({})
            return carts
        } catch (error) {
            return error
        }
    }

    async getCartsById(id){
        try {
            const cartById = await cartsModel.findById(id).populate("products")
            return cartById
        } catch (error) {
            return error
        }
    }

    async addCart(){
        try {
            const cartToAdd = await cartsModel.create({})
            return cartToAdd
        } catch (error) {
            return error
        }
    }

    async addProductToCart(cartId, prodId){
    try {
        const cartById = await cartsModel.findById(cartId)
        const prodById = await productManager.getProductsById(prodId)
        const newProdToCart = {
            id: prodById.id,
            quantity: 1
        }
        const newCart = cartById
        const findProdOnCart = cartById.products.find(prod=>prod.id===prodId)
        if (findProdOnCart === undefined) {
            newCart.products.push(newProdToCart)
            return await cartById.updateOne(newCart)
        } else {
            newProdToCart.quantity++
            const findQuant = cartById.products.find(prod=>prod.quantity===newProdToCart.quantity-1)
            const indexQuantUpdate = cartById.products.indexOf(findQuant)
            cartById.products.splice(indexQuantUpdate, 1)
            newCart.products.push(newProdToCart)
            return await cartById.updateOne(newCart)
        }
    } catch (error) {
        return error
    }
    }

    async deleteCart(cartId){
        try {
            const deleteProd = await cartsModel.deleteOne({_id:cartId})
            return deleteProd
        } catch (error) {
            return error
        }
    }

    async deleteProductOnCart(cartId, prodId){
        try {
            const cartById = await cartsModel.findById(cartId)
            const findProd = cartById.products.find(prod=>prod.id===prodId)
            const indexProd = cartById.products.indexOf(findProd)
            cartById.products.splice(indexProd, 1)
            const newCart = cartById
            return await cartById.updateOne(newCart)
        } catch (error) {
            return error
        }
    }
    
    async updateCart(newProds, cid){
        try {
            const cartById = await cartsModel.findById(cid)
            const cartNewProds = {
                id: cid,
                products: newProds
            }
            return await cartById.replaceOne(cartNewProds)
        } catch (error) {
            return error
        }
    }

    async updateQuant(quant, cid, pid){
        try {
            const cartById = await cartsModel.findById(cid)
            const findProd = cartById.products.find(prod=>prod.id===pid)
            const prodNewQuant = {
                id: pid,
                quantity: quant.quantity
            }
            const indexProd = cartById.products.indexOf(findProd)
            cartById.products.splice(indexProd, 1)
            cartById.products.push(prodNewQuant)
            console.log(cartById.products)
            cartById.save()
            return cartById
        } catch (error) {
            return error
        }
    }
}