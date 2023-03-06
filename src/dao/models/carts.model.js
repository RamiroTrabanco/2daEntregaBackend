import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        default: []
    }]
})

export const cartsModel = mongoose.model("Carts", cartSchema)