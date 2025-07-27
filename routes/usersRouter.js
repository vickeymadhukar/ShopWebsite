const express=require('express');
const router=express.Router();
const userModel=require("../models/user-model");
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");

const {genrateToken} = require("../utils/genrateToken");
const {registerUser}=require("../controller/authController");
const {loginUser}=require("../controller/authController");

const {logout} = require("../controller/authController");

router.get('/',(req,res)=>{
    res.send('Hello World');
})

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post("/logout",logout);

module.exports=router;