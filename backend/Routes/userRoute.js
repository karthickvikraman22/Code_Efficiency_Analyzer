const express=require('express')
const router=express.Router()
const { register , login, sendOtp }=require('../Controllers/userController');
const {question}  = require('../Controllers/questionController');
const { run } = require('../Controllers/javaController');

router.post('/register', register);
router.post('/login', login);
router.get('/questions', question);
router.post('/send-otp',sendOtp);
router.post('/run/:id',run)

module.exports=router