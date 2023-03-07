import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [{ 
        pid: {type: mongoose.Schema.Types.ObjectId, ref:'products'},
        quantity: {type: Number},
        _id: false
    }]
})

cartSchema.pre('findOne',function(){
    this.populate('products.pid')
})

export const cartsModel = mongoose.model("Carts", cartSchema)