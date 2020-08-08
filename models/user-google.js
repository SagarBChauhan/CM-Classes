const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const userSchema= new Schema({
   username:String,
   googleId:String
});

const UserGoogle= mongoose.model('userGoogle',userSchema);
module.exports=UserGoogle;