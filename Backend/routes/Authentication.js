const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecretKey = process.env.SECRET_KEY || 'default-secret-key';


router.post('/register' , async(req,res) => {
    try{
        const {username ,email, password } = req.body;
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(400).json({message : 'Username already exists'});
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);


        const newUser = new User({username ,email, password:hashedPassword});
        await newUser.save();

        res.status(201).json({message : 'User Registered Successfully'});
    }catch(error){
        console.error(error);
        res.status(500).json({message : "server error"});
    }
})



router.post('/login' , async(req,res) => {
    try{
        const { email , password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message : "Invalid Credentials"});
        }

        const passwordMatch = await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            return res.status(400).json({message : 'Invalid Credentials'});
        }

        const token  = jwt.sign({userId : user._id} , jwtSecretKey);
        res.status(200).json({token , user:{
            userId : user._id,
            username:user.username,
            email:user.email
        }});

    }catch(error){
        console.error(error);
        res.status(500).json({message : "Server error"});
    };

});


module.exports = router;