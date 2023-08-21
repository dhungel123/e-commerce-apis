import mongoose from "mongoose";

// set rule(schema)
const userSChema=new mongoose.Schema({

    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:5,
        maxlength:55,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        

    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:55,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:55,
    },
    gender:{
        type:String,
        requred:true,
        trim:true,
        enum:["male","female","preferNotToSet"],

    },
    dob:{
        type:Date,
        required:true,


    },
    role:{
        type:String,
        required:true,
        enum:["seller","buyer"],
        trim:true,

    }
}

)

// create table
export const User=mongoose.model("User",userSChema)