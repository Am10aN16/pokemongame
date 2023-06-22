const Users = require('../models/userModel');
const brcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userCtrl = {
    register: async(req,res)=>{
        try {
            const {name, email, password} = req.body;

            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: "The email already exists."})

            //password length
            if(password.length<6)
            res.status(400).json({msg: "Password is at least 6 characters"})

            //Password Encryption
            const passwordHash = await brcrypt.hash(password, 10)
            const newUser = new Users({
                name,email,password:passwordHash
            })

            //saving data to mongoDB
            await newUser.save()

            //create jsonwebtoken to authentication
            const accesstoken = createAccessToken({id: newUser._id})
            const refreshtoken = createAccessToken({id: newUser._id})

            res.cookie('refreshtoken', refreshtoken,{
                httpOnly:true,
                path:'/user/refresh_token'
            })
            res.json({accesstoken})


        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    login: async(req,res)=>{
        try {
            
            const {email, password} = req.body

            //checking in database if user is reg or not
            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg:"User does not exist."})

            const isMatch = await brcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg:"Invalid Credentials."})

     //If login success generate access token and refresh token
        const accesstoken = createAccessToken({id: user._id})
        const refreshtoken = createRefreshToken({id: user._id})
        
        res.cookie('refreshtoken', refreshtoken,{
            httpOnly:true,
            path:'/user/refresh_token',
            maxAge: 7*24*60*60*1000
        })


        res.json({accesstoken})
        } catch (error) {
            return res.status(500).json({msg: err.message}) 
        }
    },
    logout: async(req,res)=>{
        try {
            res.clearCookie('refreshtoken',{path: '/user/refresh_token'})
            return res.json({msg:"Logged you Out"})
        } catch (error) {
            return res.status(500).json({msg: error.message})  
        }
    },
    refreshToken: (req,res)=>{
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg:"Please Login or Register"})
    
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err ,user)=>{
                if(err) return res.status(400).json({msg:"Please Login or Register"})
               
                const accesstoken = createAccessToken({id: user.id})
                
                res.json({accesstoken})
            })
        } catch (error) {
            return res.status(500).json({msg: err.message})  
        }

       

    },
    getUser: async(req,res)=>{
        try {
            const user = await Users.findById(req.user.id).select("-password")
           if(!user) return res.status(400).json({msg: "Invalid User, User not exist!"})
           
           res.json(user)
        } catch (err) {
           return res.status(500).json({msg: err.message}) 
        }
    },
}

const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '11m'})
}
const createRefreshToken = (user) =>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = userCtrl;