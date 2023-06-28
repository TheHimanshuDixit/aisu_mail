const express=require('express');
const router=express.Router();
const path=require('path');

const {User} = require('../models/postschema');

router.post('/',async(req,res)=>{
    try {
    const {name,email,gender, dob, contact, address, city, state,
    pincode, university, whyAISU, hearAISU, howAISU}=req.body;
        const post=new User({
            name,
            email,
            gender,
            dob,
            contact,
            address,
            city,
            state,
            pincode,
            university,
            whyAISU,
            hearAISU,
            howAISU
        });
        if(req.file){
            post.formfile.data=req.file.filename;
            // post.formfile.contentType = 'formfile/png';
            post.formfile.contentType = '*';

        }
        await post.save();
        const Post=await User.find();
        console.log("post made");
        res.status(201).json(Post);
    
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})

router.get('/posts',async(req,res)=>{
    try {
       const posts=await User.find();
        res.status(201).json(posts);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})

router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const post = await User.findByIdAndDelete(id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      console.log("Post deleted");
      res.sendStatus(204);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
  

router.get('/formfile/:filename',(req,res)=>{
    const filename= req.params.filename;
    const imagePath= path.join(__dirname,'../public/assets', filename);
    console.log(imagePath);
    res.sendFile(imagePath);
})
module.exports=router;