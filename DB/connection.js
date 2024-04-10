const mongoose=require('mongoose')
const connectionString = process.env.DATABASE
mongoose.connect(connectionString).then(()=>{
    console.log("MongoDb Atlas successfully connected with pfserver");
}).catch((err)=>{
 console.log(`Mongoose connection failed !! error:${err}`);   
})