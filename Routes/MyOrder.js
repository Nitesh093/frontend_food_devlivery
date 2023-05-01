const express =require('express')
const router=express.Router();
const orders=require("../models/Order")

router.post('/myorder',async (req,res)=>{
    try {
        const order_detail=await orders.find({"email":req.body.email})
        
        res.send({order_detail:order_detail})
        console.log(order_detail)
        
    } catch (error) {
        console.error(error.message)
    }
})

module.exports =router;     