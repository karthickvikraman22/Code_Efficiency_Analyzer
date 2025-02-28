const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.CONNECTION_STRING)
   .then(() => console.log("MongoDB connected"))
   .catch(err => console.error("Database connection failed:", err))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', require('./Routes/userRoute'))
app.use("/Logo", express.static("Logo"));


const port = process.env.PORT || 3501
app.listen(port, () => {
   console.log(`Server running on port ${port}`)
})
