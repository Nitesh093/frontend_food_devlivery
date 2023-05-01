const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    order_data:{
        type:Array,
        required:true
    }
})
module.exports=mongoose.model('orders',userSchema);