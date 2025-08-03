
const userModel=require("../models/user-model");
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");

const {genrateToken} = require("../utils/genrateToken");

module.exports.registerUser = async function (req,res){
   try{
    let {email,password,name,age} =req.body;
  let user = await userModel.findOne({email:email});
  if(user){
    return res.status(401).send("You already have an account");
  }

 bcrypt.genSalt(12,function(err,salt){
    bcrypt.hash(password,salt,async function(err,hash){
        if(err){console.log(err.message)}
        else{
            let user=await  userModel.create({
                             name,
                             age,
                             email,
                             password:hash,
   });
  
   let token = genrateToken(user);
   res.cookie("token",token)
   res.redirect("/shop")
            
        }

    })
 })

   
res.send(user);
console.log(user);
   }catch(err){
      console.log(err.message);
   }

};


module.exports.loginUser = async function (req,res){
   let {email,password} =req.body

    let user=await userModel.findOne({email:email});
    if(!user){
        return res.send("Email or Password is incorrect");
    }
         bcrypt.compare(password,user.password,function(err,result){
               if(result){
                let token = genrateToken(user);
                res.cookie("token",token);
                res.redirect("/shop");
               }else{
                res.send("Email or Password is incorrect");
               }
        });
    


};

module.exports.logout=async function(req,res){
   res.cookie("token",'');
   res.redirect("/login");
};