const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    name:{
        type:String,

    },
    email:String,
    password:String,
    isAdmin:Boolean,
    contact:Number,
    picture:String,
    products:{
        typeof:Array,
        default:[],
    },
    gstin:String,


});

module.exports= mongoose.model("owner",ownerSchema);