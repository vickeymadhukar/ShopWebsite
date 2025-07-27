const express=require('express');
const router=express.Router();
const ownerModel=require('../models/owner-model');

router.get('/',(req,res)=>{
    res.send('Hello World');
})

router.post('/create',async (req,res)=>{
   let owners=await ownerModel.find();
   if(owners.length>0){
    
   return res.status(503).send("you don't have permission to create a new owner");
   }
   let {name ,email,password}=req.body;
   let createdowner= await ownerModel.create({
    name,
    email,
    password,
   })
res.status(201).send(createdowner);
})



router.get("/admin",(req,res)=>{
    let success=req.flash("success");
    res.render("Addproduct",{success});
})

module.exports=router;