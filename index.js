const express = require('express')
const mongoDB=require('./db')
const app = express()
const port = process.env.PORT || 5000 ;

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin',"http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin ,X-Requested-With,Content-Type,Accept"
  );
  next();
})

app.get('/', (req, res) => {
  res.send('Hello Worlds!')
})
app.use(express.json())
app.use('/api',require("./Routes/CreateUser"))
app.use('/api',require("./Routes/DisplayData"))
app.use('/api',require("./Routes/OrderData"))
app.use('/api',require("./Routes/MyOrder"))


//  if(process.env.NODE_ENV ==="production"){
//     app.use(express.static("frontend/build"))
//  }
 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})  
