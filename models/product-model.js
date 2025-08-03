const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    image:Buffer,
    name:String,
    price:Number,
    discount:{
        type:Number,
        default:0
    },
    color:String,
    description:String,
    originalPrice:String,
     category: {  
        type: String,
        required: true,
        enum: ["New Collection", "Handbags", "Laptop Bags", "Backpacks"] 
    }
});

module.exports= mongoose.model("product",productSchema);