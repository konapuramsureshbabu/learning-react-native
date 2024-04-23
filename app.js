const express=require("express");
const app =express();
require('dotenv/config')
const api=process.env.API_URL;
const morgan=require('morgan');
const mongoose=require('mongoose')




//Middleware
app.use(express.json());

app.use(morgan('tiny'));


const productSchema=mongoose.Schema({
    name:String,
    image:String,
    countInStock:{
        type:Number,
        required:true
    }
});

const Product=mongoose.model('Product',productSchema)

mongoose.connect(process.env.CONNECTION_STRING).then(()=>{
    console.log("data base connection is ready")
}).catch((err)=>{
    console.log(err)
})

app.get(`${api}+/products`,async(req,res)=>{
    const productList=await Product.find();
    if(!productList){
        res.status(500).json({success:false})
    }
    res.send(productList)
})

app.post(`${api}+/products`,(req,res)=>{
   const product=new Product({
    name:req.body.name,
    image:req.body.image,
    countInStock:req.body.countInStock
   })
   product.save().then((createdProduct=>{
    res.status(201).json(createdProduct)
   })).catch((err)=>{
    res.status(500).json({
        error:err,
        success:false
    })
   })
})


app.listen(3000,()=>{
    console.log(api);
    console.log("server is running now on https://localhost:3001")
})