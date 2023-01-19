const mongoose = require("mongoose"); 
const validator = require("validator");

const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : [true, "Please Enter Your Name"],
        maxLength : [30, "Name cannot exceed 30 charachters"],
        minLength : [4, "Name should have at least 4 characters"]
    },
    email : {
        type : String,
        required : [true, "Please Enter Your Email"],
        unique : true,
        validate : [validator.isEmail, "Please Enter a Valid Password"]
    },
    password : {
        type : String,
        required : [true, "Please Enter Your Password"],
        minLength : [8, "Password should have at least 8 charachters"],
        select : false
    },
    avatar : {
        public_id : {
            type : String,
            required : true
        },
        url : {
            type : String,
            required : true
        }
    },
    role : {
        type : String,
        default : "user",
    },
    
    resetPaswordToken : String,
    resetPasswordExpire : Date,

});

module.exports = mongoose.model("User", userSchema);