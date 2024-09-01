const mongoose=require('mongoose');
//Define the mongoDB URL
const mongoURL='mongodb://localhost:27017/hotels'

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