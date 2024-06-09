const asyncHandler = require("express-async-handler");
const bcrypt =  require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//@desc Registering user
//@route POST /api/user/register
//@access public
const registerUser = asyncHandler(async (req,res)=>{
    const {username, email, password}=req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("Details not found");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered");
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log(`User Created: ${user}`);
    if(user){
        res.status(201)
        .json(
            {
                _id : user.id,
                email : user.email,
            }
        )
    }else{
        res.status(400);
        throw new Error("User data is not valid")
    }
});

//@desc Login user
//@route POST /api/user/login
//@access public
const loginUser = asyncHandler(async (req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(401);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign(
            {
                user: {
                    username : user.username,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"1m"}
        );
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("Username or password details are not valid");
    }
});

//@desc current user information
//@route POST /api/user/current
//@access private
const currentUser = asyncHandler(async (req,res)=>{
    res.json({
        message:"Current user Information"
    })
});


module.exports={
    registerUser,
    loginUser,
    currentUser,
}