
const userModel=require("../models/user-model");
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");

const {genrateToken} = require("../utils/genrateToken");

module.exports.registerUser = async function (req,res){
   try{
    let {email,password,name,age} =req.body;
  let user = await userModel.findOne({email:email});
  if(user){
    req.flash("error", "You already have an account");
    return res.redirect("/");
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

   }catch(err){
      console.log(err.message);
      req.flash("error", "Something went wrong");
      res.redirect("/");
   }

};


module.exports.loginUser = async function (req,res){
   let {email,password} =req.body

    let user=await userModel.findOne({email:email});
    if(!user){
        req.flash("error", "Email or Password is incorrect");
        return res.redirect("/signin");
    }
         bcrypt.compare(password,user.password,function(err,result){
               if(result){
                let token = genrateToken(user);
                res.cookie("token",token);
                res.redirect("/shop");
               }else{
                req.flash("error", "Email or Password is incorrect");
                res.redirect("/signin");
               }
        });

    


};

module.exports.logout=async function(req,res){
   res.cookie("token",'');
   res.redirect("/signin");
};