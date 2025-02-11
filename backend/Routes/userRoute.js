const express=require('express')
const router=express.Router()
const { register , login, sendOtp }=require('../Controllers/userController');
const {question,easy,medium,hard,specific,isauth }  = require('../Controllers/questionController');
const { run } = require('../Controllers/javaController');

router.post('/register', register);
router.post('/login', login);
router.post('/send-otp',sendOtp);
router.get('/Basic',isauth, question);
router.get('/Easy', easy);
router.get('/Medium', medium);
router.get('/Hard', hard);
router.get('/specific/:scope/:id',isauth, specific);
router.post('/run/:scope/:id',run)

module.exports=router