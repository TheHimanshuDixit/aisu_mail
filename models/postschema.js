const mongoose=require('mongoose');
const postSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    gender:{
        type:String,
        required: true,
    },
    dob:{
        type: Date,
        required: true,
        trim: true,
    },
    contact:{
        type:Number,
        required:true,
        minLength:10,
    },
    address:{
        type:String,
        required: true,
    },
    city:{
        type:String,
        required: true,
    },
    state:{
        type:String,
        required: true,
    },
    pincode:{
        type:Number,
        required:true,
        minLength:6,
    },
    university:{
        type:String,
        required: true,
    },
    whyAISU:{
        type:String,
        required: true,  
    },
    hearAISU:{
        type: String,
        required:true,
    },
    howAISU:{
        type: String,
        required:true,
    },
    formfile:{
        data:Buffer,
        contentType:String
    }

})

const User= mongoose.model('User',postSchema);
module.exports={User};