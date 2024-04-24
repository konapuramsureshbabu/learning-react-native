const mongoose=require('mongoose');


const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    richDescription:{
        type:String,
        defalut:'',
    },
    image:{
        type:String,
        defalut:'',
    },
    images:[{
        type:String,
    }],
    brand:{
        type:String,
        defalut:'',
    },
    price:{
        type:Number,
        defalut:0,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true ,
    },
    countInStock:{
        type:Number,
        required:true,
        min:0,
        max:255,
    },
    rating:{
        type:Number,
        default:0,
    },
    numReviews:{
        type:Number,
        default:0,
    },
    isFeatured:{
        type:Boolean,
        default:false,
    },
    dateCreated:{
        type:Date,
        defalut:Date.now,
    }
});

exports.Product=mongoose.model('Product',productSchema)