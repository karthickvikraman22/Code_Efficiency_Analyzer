const express = require('express')
const router = express.Router()
const multer = require("multer");
const path = require('path')
const { register, login, sendOtp, updateUser, getUser, updateLogo } = require('../Controllers/userController')
const { question, easy, medium, hard, specific, isauth, likeCode } = require('../Controllers/questionController')
const { run } = require('../Controllers/javaController')
const { getCode, deleteCode } = require('../Controllers/codeController')

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../Logo/"),
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({ storage })

router.post('/register', register)
router.post('/login', login)
router.post('/send-otp', sendOtp)
router.put('/user/:email/solve', updateUser)
router.get('/user/:email/getInfo', getUser)
router.post('/user/:email/logo', upload.single("logo"), updateLogo)

router.get('/Basic', isauth, question)
router.get('/Easy', easy)
router.get('/Medium', medium)
router.get('/Hard', hard)

router.get('/specific/:scope/:id', isauth, specific)
router.post('/run/:scope', run)
router.post('/api/code', getCode)
router.post('/api/restore', deleteCode)
router.post('/api/like', likeCode)

module.exports = router