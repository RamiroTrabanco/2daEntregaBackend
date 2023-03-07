import mongoose from "mongoose";

const URI = "mongodb+srv://trabancoramiro:coderhouse@ecommerce.q4hkofr.mongodb.net/ecommerce?retryWrites=true&w=majority"

mongoose.set("strictQuery",false)

mongoose.connect(URI)

if(mongoose.connect(URI)){
    console.log("Conectado a la DB");
}