const express=require('express')
const router=express.Router()
const { register , login, sendOtp }=require('../Controllers/userController');
const { question , easy , medium , hard, specificQues } = require('../Controllers/questionController');
const { run } = require('../Controllers/javaController');

router.post('/register', register);
router.post('/login', login);
router.get('/questions', question);
router.get('/questions/easy',easy);
router.get('/questions/medium',medium);
router.get('/questions/hard',hard);
router.post('/send-otp',sendOtp);
router.get('/questions/:difficulty/:id',specificQues)
router.post('/run/:id',run)

module.exports=router