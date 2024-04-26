
const { Category } = require('../models/category');
const {Product}=require('../models/product')
const express=require('express');
const router =express.Router();
const mongoose=require('mongoose');


router.get(`/`,async(req,res)=>{
    const productList=await Product.find();
    if(!productList){
        return res.status(500).json({success:false})
    }
    res.send(productList);
})

router.get(`/:id`,async(req,res)=>{
    const product=await Product.findById(req.params.id).populate('category');
    if(!product){
        return res.status(500).json({success:false})
    }
    res.send(product);
})

router.post(`/`,async(req,res)=>{
   if(!mongoose.isValidObjectId(req.body.category)){
    return res.status(400).send("ID Not Valid")
   }
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
        return res.status(400).send("Invalid category")
    }
   product=await product.save();
   if(!product){
    return res.status(500).send('The Product is Not Created')
   }
   res.send(product);
})

router.put('/:id',async(req,res)=>{
    const category =await Category.findById(req.body.category);
    if(!category) return res.status(400).send("Invalid category")
    const product =await Product.findByIdAndUpdate(req.params.id,{
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
    },{new:true});
    if(!product){
        return res.status(500).send('The product cannot be updated');
    }
    res.send(product);

})


router.delete('/:id',async(req,res)=>{
    Product.findByIdAndDelete(req.params.id).then(category=>{
        if(category){
            return res.status(200).json({success:true,message:"the category is deleted"})

        }else{
            return res.status(404).json({success:false,message:"Not found any Categories for this Id"})
        }
    }).catch(err=>{
        return res.status(400).json({success:false,error:err})
    })
})

router.get(`/get/count`,async(req,res)=>{
    const productCount=await Product.countDocuments().then(count => {
        return count 
    }).catch(err => {
        console.log('err:', err);
    });
    if(!productCount){
        return res.status(500).json({success:false})
    }
    res.send({
        productCount:productCount
    });
});

router.get(`/get/featured`,async(req,res)=>{
    const products=await Product.find({isFeatured:true});
    if(!products){
        return res.status(500).json({success:false})
    }
    res.send({
        products:products
    });
});


module.exports=router;