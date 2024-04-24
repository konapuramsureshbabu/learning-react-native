
const { Category } = require('../models/category');
const {Product}=require('../models/product')
const express=require('express');
const router =express.Router();

router.get(`/`,async(req,res)=>{
    const productList=await Product.find();
    if(!productList){
        res.status(500).json({success:false})
    }
    res.send(productList);
})

router.get(`/:id`,async(req,res)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        res.status(500).json({success:false})
    }
    res.send(product);
})

router.post(`/`,async(req,res)=>{
   let product=new Product({
    name:req.body.name,
    description:req.body.description,
    richDescription:req.body.richDescription,
    image:req.body.image,
    brand:req.body.brand,
    price:req.body.price,
    category:req.body.category,
    countInStock:req.body.countInStock,
    rating:req.body.rating,
    numReviews:req.body.numReviews,
    isFeatured:req.body.isFeatured,

   });
   const category =await Category.findById(req.body.category);
    if(!category){
        res.status(400).send("Invalid category")
    }
   product=await product.save();
   if(!product){
    return res.status(500).send('The Product is Not Created')
   }
   res.send(product);
})

module.exports=router;