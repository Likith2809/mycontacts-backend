const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name:{
        type: String,
        required : [true, "Please add the contact name"],
    },
    email: { 
        type: String,
        required : [true, "Please add the contact Email Address"],
    },
    phone: { 
        type: String,
        required : [true, "Please add the Contact phone number"],
    },
    },
    {
        timestamps : true,
    }
);

module.exports= mongoose.model("Contact", contactSchema);