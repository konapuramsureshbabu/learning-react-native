const express=require("express");
const app =express();
const morgan=require('morgan');
const mongoose=require('mongoose');
const cors=require('cors');

require('dotenv/config');
const api=process.env.API_URL;


const productRouter=require('./routes/products')
const categoryRouter=require('./routes/categories');



//Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.options('*',cors());


//Router
app.use(`${api}/products`,productRouter)
app.use(`${api}/categories`,categoryRouter);

mongoose.connect(process.env.CONNECTION_STRING).then(()=>{
    console.log("data base connection is ready")
}).catch((err)=>{
    console.log(err)
})



app.listen(3000,()=>{
    console.log(api);
    console.log("server is running now on https://localhost:3000")
})