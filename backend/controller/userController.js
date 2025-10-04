const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSignUp = async (req, res)=>{
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({message: "Email and Password is required."})
    }
    let user = await User.findOne({email})
    if(user){
        return res.status(400).json({error:"Email already exists."})
    }
    const hashpwd = await bcrypt.hash(password,10)
    const newUser = await User.create({
        email, password:hashpwd
    })
    let token = jwt.sign({email, id: newUser._id},process.env.SECRET_KEY)
    return res.status(200).json({token, user:newUser})
    
}

const userLogIn = async (req, res)=>{
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({message: "Email and Password is required."})
    }
    let user = await User.findOne({email})
    if(user && await bcrypt.compare(password, user.password)){
        let token = jwt.sign({email, id: user._id},process.env.SECRET_KEY)
        return res.status(200).json({token, user})
    }
    else{
        return res.status(400).json({error: "Invalid Credentials."})
    }
}

const getUser = async (req, res)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        return res.status(400).json({message: "User not found!!"})

    }
    return res.status(200).json({email: user.email})

}

module.exports = {userSignUp, userLogIn, getUser}