import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products:[{ 
        pid: {type: mongoose.Schema.Types.ObjectId, ref: "products"},
        quantity: {type: Number},
        _id: false
    }]
})

cartSchema.pre('findById',function(next){
    this.populate("products.pid")
    next()
})

export const cartsModel = mongoose.model("Carts", cartSchema)