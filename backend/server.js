require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const receiptRoutes = require('./routes/receipts')

//express app
const app = express()

//middleware
app.use(express.json())
app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})


//routes
app.use('/api/receipts',receiptRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listen for requests
app.listen(process.env.PORT, () =>{
    console.log('connected to db listening to port 4000', process.env.PORT)
})
    })
    .catch((error)=>{
        console.log(error)
    })


