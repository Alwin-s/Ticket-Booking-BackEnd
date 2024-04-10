require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router =require('./Router/router')
require('./DB/connection')




const pfserver = express()
 pfserver.use(cors())
 pfserver.use(express.json())
 pfserver.use(router)
 pfserver.use('/uploads',express.static('./uploads'))

 const PORT = 5000 || process.env.PORT
 pfserver.listen(PORT,()=>{
    console.log(`Booking App started Running At port:${PORT} and waiting for then client request!!`);
 })
 pfserver.get('/',(req,res)=>{
    res.send('<h1>Booking App Server started and waiting for the client request</h1>')
 })