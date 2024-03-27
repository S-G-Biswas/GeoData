const express = require("express")
const {UserModel} = require("../model/user.model")
const bcrypt = require("bcrypt")
const userRouter= express.Router()
const jwt = require("jsonwebtoken")


//Adding new user

userRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
      const hash = await bcrypt.hash(password, 8);
      const user = new UserModel({ username, email, password: hash}); 

      await user.save();
      res.json({ "msg": "New user has been added" });
  } catch (error) {
      res.status(500).json({ "error": error.message });
  }
});


//Authenticating the existing user -->  Login

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
         const user =  await UserModel.findOne({email})
         if(!user){
          res.send({"Error":"User Not Found"})
         }
         
         bcrypt.compare(password, user.password, (err, result) => {
               if(result){
                 const accessToken = jwt.sign({ userID:user._id,author:user.username }, 'masai')
                  res.send({"msg":"Login Successful",accessToken})
               }
               else{
                  res.send({"msg":"User Not Found.."})
                }
         });       
     } 
    catch (error) {
       res.send({"error":error})
       
    }
})


module.exports={
    userRouter
}