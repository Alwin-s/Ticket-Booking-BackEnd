const users = require('../Models/userSchema');
const user= require('../Models/userSchema');
const jwt=require('jsonwebtoken')




    //register
  exports.register = async (req, res) => {
    console.log("Inside Register Controller");
    let profilePic = "";
    if (req.file) {
        profilePic = req.file.filename;
    }
    const { username, email, password } = req.body;
    try {
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(406).json("User already exists. Please login.");
        } else {
            const newUser = new users({ username, email, password, profilePic });
            await newUser.save();
            return res.status(200).json(newUser);
        }
    } catch (err) {
        return res.status(401).json(`Register API failed. Error: ${err}`);
    }
};





//login
exports.login =async(req,res)=>{
console.log("Inside Login Controller");
const{email,password}=req.body;

    try{
        const exisitingUser=await users.findOne({email,password})
        if(exisitingUser){
            const token = jwt.sign({userId:exisitingUser._id},"secret123")
            res.status(200).json({
                exisitingUser , token
            })
        }else{
            res.status(404).json("Incorrect email/password")
        }
    }catch(err){
        res.status(401).json(`Login API Failed! Error:${err}`)
    }
}


//edit userdetails
 exports.editUserDetails = async (req,res)=>{
    const {username,email,profilePic}=req.body
    const { id } = req.params;
    const uploadProfilePic=req.file?req.file.filename:profilePic

    try{
        const updateUserDetails=await users.findByIdAndUpdate({_id:id},{
            username,email,profilePic:uploadProfilePic
        },{new:true})
        await updateUserDetails.save()
        res.status(200).json(updateUserDetails)
    }catch(err){
        res.status(401).json(err)
    }
 }
 
 //get user details
 exports.userDetailsController = async (req, res) => {
   try{
    const userProfileDetails=await users.find()
    res.status(200).json(userProfileDetails)
   }catch(err){
    res.status(401).json(err)
   }
};

