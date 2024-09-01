const express=require('express');
const app=express();
const db=require('./db');

const bodyParser=require('body-parser');
app.use(bodyParser.json());



app.get('/',function(req,res){
    res.send('Welcome to our Hotel');
}) 
//using callBack
// app.post('/Person',function(req,res){
//     const data=req.body //Assuming the request body contains body data
//     //create new person document using mongoose model
//     // const newPerson=new Person();
//     // newPerson.name=data.name;
//     // newPerson.age=data.age;
//     // newPerson.mobile=data.mobile
//     // newPerson.email=data.email
//     // newPerson.address=data.address
//     const newPerson=new Person(data);
//     newPerson.save((error,savedPerson)=>{
//         if(error){
//             console.log("Error saving person",error);
//             res.status(500).json({error:'Internal server error'});
//         }else{
//             console.log("Data saved successfully");
//             res.status(200).json(savedPerson);
//         }
//     })
// })

const personRoutes=require('./routes/personRoutes');
const menuItemRoutes=require('./routes/menuItemRoutes');
app.use('/',personRoutes);
app.use('/',menuItemRoutes);

app.listen(3000,()=>{
    console.log("listening on port 3000")
});