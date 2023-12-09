const mongoose=require('mongoose');
const validator=require('validator');

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    message:String
})

const UserDetails=mongoose.model("detail",userSchema);

module.exports=UserDetails;