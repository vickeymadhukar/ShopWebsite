const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    username:String,
    name:String,
    email:String,
    password:String,
    isAdmin:{
        type:Boolean,
        default:false,
    },
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
         ref:"product",
    }],
    orders:{
        typeof:Array,
        default:[],
    },
    contact:Number,
    picture:String,

});

module.exports= mongoose.model("user",userSchema);