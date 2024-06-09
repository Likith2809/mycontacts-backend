const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required : [true, "Please add the User Name"],
    },
    email: { 
        type: String,
        required : [true, "Please add the Email Address"],
        unique : [true, "This email address is already taken"],
    },
    password: { 
        type: String,
        required : [true, "Please add the password"],
    },
    },
    {
        timestamps : true,
    }
);

module.exports = mongoose.model("User", userSchema);