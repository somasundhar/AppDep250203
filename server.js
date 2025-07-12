const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer = require("multer");

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/profilePics', express.static('profilePics'))
const storage = multer.diskStorage({
  destination:  (req, file, cb) => {
    console.log(file)
    cb(null, 'profilePics')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
});

const upload = multer({ storage: storage });

app.post("/login",upload.none(),async(req,res)=>{
    console.log(req.body);
   let userArr = await user.find().and([{email:req.body.email}]);
   if(userArr.length >0){
     if(userArr[0].password === req.body.password){
        let dataToSend ={
       firstName: userArr[0].firstName,
        lastName: userArr[0].lastName,
         age: userArr[0].age,
          email: userArr[0].email,
           mobileNo: userArr[0].mobileNo,
            profilePic: userArr[0].profilePic,
            
        }
     res.json({status:"Success",msg:"credintials are correct",data:dataToSend})
     }else{
      res.json({status:"Failure",msg:"Invalid Password"})  
     }
   }else{
    res.json({status:"Failure",msg:"user does not exist"})
   }
})

app.post("/signup",upload.single("profilePics"), async (req,res) => {
    console.log(req.body);
    console.log(req.file);
  try{
let newUser = new user({
      firstName:req.body.firstName,
    lastName:req.body.lastName,
    age:req.body.age,
    email:req.body.email,
    password:req.body.password,
    mobileNo:req.body.mobileNo,
    profilePic:req.file.path 
    });
    console.log("Successfully inserting the data into DB")
    await user.insertMany([newUser]);
    res.json({ status:"success",msg:"account is created successfully" });
    }catch(err){
        console.log("Unable to inserting the data into DB");
         res.json({ status:"failure",msg:"unable to create account" });
    }
});
app.listen(3333,()=>{
    console.log("Listening to port 3333")
})
let userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    age:Number,
    email:String,
    password:String,
    mobileNo:Number,
    profilePic:String
});

let user = new mongoose.model("users",userSchema,"250203users");

let connectedToMDB = async ()=>{
 try{
    await mongoose.connect("mongodb+srv://Sundhar:Sundhar@batch2503.rkuidj4.mongodb.net/MERN250203?retryWrites=true&w=majority&appName=batch2503")
    console.log("Successfully connected to MDB");
    
    }catch(err){
        console.log("Unable to connected to MDB")
    }
}
connectedToMDB();