const express=require('express')
const router=express.Router()
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt=  require('jsonwebtoken')
require("dotenv").config()
const securePass=process.env.SECURE_PASSWORD;
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/createuser',  body('email').isEmail(),
body('name','name will be greater then 5 char').isLength({ min: 5 }),

body('password','incorrect password').isLength({ min: 5 }),async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    try {
        await User.create({
            name: req.body.name,
            location:req.body.location,
            password:hash,
            email:req.body.email
            
        })
        res.json({success:true})
    } catch (error) { 
        console.log(error)
        res.json({success:false,errors: errors.array()})
    }
})


router.post('/loginuser', body('email').isEmail(),
body('password','incorrect password').isLength({ min: 5 }),async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email=req.body.email;
    
    try {
       let userData= await User.findOne({email});
       if(!userData){
       return res.status(400).json({ errors: "try logging with correct credentials" })
        }

        const pwdCompare=await bcrypt.compare(req.body.password,userData.password)
        if(!pwdCompare){
        return res.status(400).json({ errors: "try logging with correct credentials" })    
        }

        const data={
            user:{
                id:userData._id
            }
        }
        const authToken=jwt.sign(data,securePass);

        return res.json({success:true,authToken:authToken,email:email})
    }
         
     catch (error) { 
        console.log(error)
        res.json({success:false})
    }
})

module.exports=router; 
