const mongoose=require('mongoose');
const config=require('config');

const dbgr=require('debug')("developemnt:mongoose");

mongoose
.connect(`${config.get("MONGODB_URI")}/Bagweb`)
.then(function(){
    console.log("Connected to MongoDB");
})
.catch(function(err){
 console.log(err)
})

module.exports=mongoose.connection;