const User=require("../models/userModel");

exports.signup=async(req,res)=>{
    try{
        const newUser=await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
        });

        res.status(200).json({
            status:"success",
            data:{
             user:newUser,
            },
        }); 

    }catch(err){
        res.status(400).json({
            status:"fail",
            message:"User could not be created"
        });
    }
};