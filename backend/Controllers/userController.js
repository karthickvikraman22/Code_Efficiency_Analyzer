const asyncHandler = require('express-async-handler')
const userModel = require('../Models/userSchema')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { storeModel } = require("../Models/codeSchema")

const register = asyncHandler(async (req, res) => {
    const { name, email, password, code, verify } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    else if (name.length < 6) {
        return res.status(400).json({ message: 'Name length must be greater than 5' })
    }
    else if (password.length < 6) {
        return res.status(400).json({ message: 'password length must be greater than 5' })
    }
    if (!code) {
        return res.status(400).json({ message: 'Please enter verification code' })
    }

    if (code === verify) {
        const b_pass = await bcrypt.hash(password, 10)
        const user = await userModel.create({ name, email, password: b_pass })
        res.status(200).json(user)
    }
    else {
        res.status(401).json({ message: "Invalid code" })
    }
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" })
    }
    const v_pass = await bcrypt.compare(password, user.password)
    if (!v_pass) {
        return res.status(401).json({ message: "Invalid credentials" })
    }
    const token = jwt.sign({ user: user._id }, process.env.SECRET_KEY)
    res.status(200).json({
        token: token,
        user: { name: user.name, email: user.email, solved: user.solved }
    })
})

const sendOtp = asyncHandler(async (req, res) => {
    const { email } = req.body
    const userExist = await userModel.findOne({ email })
    if (userExist) {
        return res.status(401).json({ message: "Email already exist" })
    }

    const vtoken = Math.floor(Math.random() * 10000)
    const verifyCode = String(vtoken)

    const senderAddress = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    const mail = {
        from: {
            name: "CEA",
            address: process.env.EMAIL,
        },
        to: email,
        subject: "Verification code from CEA",
        html: `
        <div style="text-align: center; padding: 20px;">
            <div style="width: 200px; background-color: black; border: 1px solid white; border-radius: 5px; padding: 20px; color: white; font-family: Arial, sans-serif;">
                <p style="font-size: 16px; font-weight: bold;">Verification Code</p>
                <p style="font-size: 20px; background-color: lightgreen; color: black; padding: 10px; border-radius: 5px; display: inline-block;">
                    ${verifyCode}
                </p>
            </div>
        </div>`
    }
    const sendmail = asyncHandler(async (senderAddress, mail) => {
        await senderAddress.sendMail(mail)
        res.status(200).json({ message: verifyCode })
    })
    sendmail(senderAddress, mail)
})

const updateUser = asyncHandler(async (req, res) => {
    const solvedCount = await storeModel.findOne({ user_id: req.params.email })
    const user = await userModel.findOneAndUpdate(
        { email: req.params.email },
        { solved: solvedCount.data.length },
        { new: true }
    )
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ solved: user.solved })
})

const getUser = asyncHandler(async (req, res) => {
    const user = await userModel.findOne({ email: req.params.email })
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ user: user })
})

module.exports = { register, login, sendOtp, updateUser, getUser }