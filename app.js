const express=require("express");
const app =express();
require('dotenv/config')
const api=process.env.API_URL;
const morgan=require('morgan');
const mongoose=require('mongoose')




//Middleware
app.use(express.json());

app.use(morgan('tiny'))

mongoose.connect(process.env.CONNECTION_STRING).then(()=>{
    console.log("data base connection is ready")
}).catch((err)=>{
    console.log(err)
})

app.get(`${api}+/products`,(req,res)=>{
    const product={
        id:1,
        name:"hair dresser",
        image:'some_url'
    }
    res.send(product)
})

app.post(`${api}+/products`,(req,res)=>{
    const newProduct=req.body;
    console.log(newProduct)
    res.send(newProduct)
})

app.listen(3001,()=>{
    console.log(api);
    console.log("server is running now on https://localhost:3001")
})