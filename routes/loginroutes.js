const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const {Login}=require('../models/loginschema');



router.post('/',async(req,res)=>{
    try {
        const {loginid,password}= req.body;
        const user= await Login.findOne({loginid:loginid});
        // console.log(user);
        if(!user) return res.status(400).json({message: "User does not exists"})

        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:"Invalid credentials"});

        const token =jwt.sign({id:user._id}, process.env.JWTSECRETKEY);
        console.log(process.env.JWTSECRETKEY);
        console.log(token);
        res.cookie("jwt",token,{
            expires:new Date(Date.now()+2996000000),
            httpOnly:true
        })
        delete user.password;
        res.status(200).json({token:token,user:user,id:user._id});
        console.log("logged in");
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message})
    }
});

router.post('/update',async(req,res)=>{
    try {
       const {id,loginid,password} =req.body;
       const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashedPassword = await bcrypt.hash(password, salt);
    //    console.log(id);
       const user= await Login.findByIdAndUpdate(id,{loginid,password:hashedPassword});

       if (!user) {
        return res.redirect(`http://127.0.0.1:5500/server/aisu_mail/login.html`);
      }
  
      console.log("profile updated");
      res.status(200).json({ user, message: "Profile updated" });

    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message})
    }
})

module.exports=router;