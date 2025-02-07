const asyncHandler=require('express-async-handler')
const userModel=require('../Models/userSchema')
const jwt = require('jsonwebtoken'); 
const bcrypt=require('bcrypt')
require('dotenv').config();
const nodemailer=require('nodemailer')

const register = asyncHandler(async (req, res) => {
    const { name, email, password, code, verify} = req.body
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    else if(name.length<6){
        return res.status(400).json({ message: 'Name length must be greater than 5' })
    }
    else if(password.length<6){
        return res.status(400).json({ message: 'password length must be greater than 5' })
    }
    if(!code){
        return res.status(400).json({ message: 'Please enter verification code' })
    }

    if(code===verify){
        const b_pass=await bcrypt.hash(password,10)
        const user = await userModel.create({ name, email, password:b_pass })
        res.status(200).json(user)
    }
    else{
        res.status(401).json({message: "Invalid code"})
    }    
});

const login=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const user=await userModel.findOne({email})
    if(!user){
        return res.status(401).json({message:"Invalid credentials"})
    }  
    const v_pass=await bcrypt.compare(password,user.password)
    if(!v_pass){
        return res.status(401).json({message:"Invalid credentials"})
    }
    const token=jwt.sign({_id:user.id},process.env.SECRET_KEY)
    res.status(200).json({
        message: 'Login successful',
        token: {token} ,
    });
})

const sendOtp=asyncHandler(async(req,res)=>{
    const {email} =req.body
    const userExist=await userModel.findOne({email})
    if(userExist){
        return res.status(401).json({message:"Email already exist"})
    }

    const vtoken=Math.floor(Math.random()*10000)
    const verifyCode=String(vtoken)

    const senderAddress=nodemailer.createTransport({
        service:'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    const mail={
        from: {
            name: "CEA",
            address: process.env.EMAIL,
        },
        to: email,
        subject: "Verification code from CEA",
        text: `verification code is ${verifyCode}`
    }
    const sendmail=asyncHandler(async(senderAddress,mail)=>{
        await senderAddress.sendMail(mail)
        res.status(200).json({message:verifyCode})
    })
    sendmail(senderAddress,mail)
})

module.exports={register,login,sendOtp}