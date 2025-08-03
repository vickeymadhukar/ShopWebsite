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


router.get("/shop", isLoggedin, async (req, res) => {
  let user = await userModel.findOne({email:req.user.email}).populate("cart");

    const category = req.query.category;
    const search = req.query.search;
    let query = {};

    if (category) {
        query.category = category;
    }

    if (search) {
        query.name = { $regex: search, $options: "i" }; 
    }

    let products = await productModel.find(query);
    let success = req.flash("success");
    let error = req.flash("error");

    res.render("shop", { products, success,user, error, search, category });
});





router.get("/cart", isLoggedin, async (req,res)=>{
let user = await userModel.findOne({email:req.user.email}).populate("cart");
  res.render("cart",{user});
});


router.get("/addtocart/:productid", isLoggedin, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });

  const alreadyInCart = user.cart.some(
    (item) => item.toString() === req.params.productid
  );

  if (alreadyInCart) {
    req.flash("error", "Product already in cart");
  } else {
    user.cart.push(req.params.productid); // ✅ Only ObjectId
    await user.save();
    req.flash("success", "Product added to cart");
  }

  res.redirect("/shop");
});




module.exports=router;