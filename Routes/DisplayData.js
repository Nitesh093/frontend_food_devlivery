const express =require('express')
const router=express.Router();

router.post('/foodData',(req,res)=>{
    try {
        res.send([global.Items,global.foodCategory])
    } catch (error) {
        console.error(error.message)
    }
})

module.exports =router; 