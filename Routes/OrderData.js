const express=require('express')
const orders=require("../models/Order") 
const router=express.Router();

router.post('/OrderData',async(req,res)=>{
    let data=req.body.order_data;
    // console.log(req.body.order_date)
    // console.log(req.body.email)
    // console.log(req.body.order_data)
    await data.splice(0,0,{order_date:req.body.order_date});
    let eId=await orders.findOne({"email":req.body.email})
    console.log(data)
    if(eId==null){
        try {
            console.log("ye sahi 1")
            await orders.create({
                email:req.body.email,
                order_data:[data]
            })
            
        } catch (error) {
            console.log(error)
            // res.send("Server Error",error.message)
            // res.status("Server Error").send(error.message)
            res.json({success:false})
            console.log("error 1")
        } 
    } 
    else{   
        try {
            console.log("ye sahi 2")
            await orders.findOneAndUpdate({email:req.body.email},{
                $push:{order_data:data}
            }).then(()=>{ 
                res.json({success:true})
            })
            
            
        } catch (error) {
            console.log(error)
            // res.status("Server Error").send(error.message)
            // res.send("server Error",error.message)
            res.json({success:false})
            
        } 
 
    }   
 
})


router.post('/myorderData', async (req,res)=>{
    try {
        let myData=await orders.findOne({email:req.body.email})
        res.json({orderData:myData})
    } catch (error) {
    res.send("server Error",error.message)
    }
})

module.exports =router;