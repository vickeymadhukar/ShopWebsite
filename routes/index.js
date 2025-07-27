const express=require("express");
const router = express.Router();
const isLoggedin=require('../middleware/isLoggedin');
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/",(req,res)=>{
  let error=req.flash("error");
  res.render("signup",{error});
});

router.get("/signin",(req,res)=>{
  res.render("signin");
})


router.get("/shop",isLoggedin,async (req,res)=>{
  let products = await  productModel.find(); 
  let success= req.flash("success");
  res.render("shop",{products,success});
});



router.get("/cart", isLoggedin, async (req,res)=>{
let user = await userModel.findOne({email:req.user.email}).populate("cart");
  res.render("cart",{user});
});


router.get("/addtocart/:productid", isLoggedin, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });

  // Check if the product already exists in the cart
  const alreadyInCart = user.cart.some(
    (item) => item.product.toString() === req.params.productid
  );

  if (alreadyInCart) {
    req.flash("error", "Product already in cart");
  } else {
    user.cart.push({ product: req.params.productid, quantity: 1 }); // Add with default quantity 1
    await user.save();
    req.flash("success", "Product added to cart");
  }

  res.redirect("/shop");
});



module.exports=router;