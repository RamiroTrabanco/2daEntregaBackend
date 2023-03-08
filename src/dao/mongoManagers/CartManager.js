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

    async getCartsById(cid){
        try {
            const cartById = await cartsModel.findById(cid).populate('products.pid')
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

        let newProdToCart = {
            pid: prodId,
            quantity: 1,
            }

        const findProdOnCart = cartById.products.find(prod=>prod.pid==prodId)

        if (findProdOnCart == undefined) {
                let newCart = cartById
                newCart.products.push(newProdToCart)
                return await cartById.updateOne(newCart)
            } else {
                findProdOnCart.quantity++
                let newProdToCart = {
                    pid: prodId,
                    quantity: findProdOnCart.quantity
                }
                const indexFindProdOnCart = cartById.products.indexOf(findProdOnCart)
                cartById.products.splice(indexFindProdOnCart, 1)
                let newCart = cartById
                newCart.products.push(newProdToCart)
                return await cartById.updateOne(newCart)
            }
        } catch (error) {
            return console.log(error)
        }
        }

    async deleteCart(cartId){
        try {
            const cartById = await cartsModel.findById(cartId)
            const productsLength = cartById.products.length
            cartById.products.splice(0, productsLength)
            cartById.save()
            return cartById
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