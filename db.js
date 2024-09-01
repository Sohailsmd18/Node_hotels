const mongoose=require('mongoose');
require('dotenv').config();

//Define the mongoDB URL
//const mongoURL='mongodb://localhost:27017/hotels' //Local database
//const mongoURL= //cloud database in env for password hiding
const mongoURL=process.env.MONGODB_URL;
//const mongoURL=process.env.MONGODB_URL_LOCAL;
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
//Get Default connection
//Mongoose Maintain a default connection object representing mongoaDB connection
const db=mongoose.connection;
db.on('connected',()=>{
    console.log("MongoDB connected to server");
})

db.on('disconnected',()=>{
    console.log("MongoDB disconnected");
})
db.on('error',(err)=>{
    console.log("MongoDB connection error");
})
module.exports=db;