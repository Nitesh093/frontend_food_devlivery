const mongoose=require('mongoose')
const mongoDB=async()=>{
    await mongoose.connect("mongodb+srv://kumawatnit:Test123@cluster0.reah9zv.mongodb.net/GoFood")
    .then(async() =>{      
        console.log("connected with GoFood")
    })

    setTimeout(async () => {
  
        let coll = mongoose.connection.db.collection("Items");
        let data = await coll.find({}).toArray();
        // let data = await coll.find({}, {limit:2}).toArray();
        // let data = await coll.find({}, {projection:{player:1, _id:0}}).toArray();
        // let data = await coll.find({}, {limit:3, sort:{name:-1}}).toArray();
        // console.log(data);
        global.Items=data;
        
        let coll2 = mongoose.connection.db.collection("foodCategory");
        let cate = await coll2.find({}).toArray();
        global.foodCategory=cate;
        
        
    }, 2000);
    

}
 

module.exports= mongoDB();
// const mongoose=require('mongoose');

