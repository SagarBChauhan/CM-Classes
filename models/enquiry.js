var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var schema=new Schema({
    firstname:{type: Object, required:true},
    email:{type: String,required:true},
    message:{type: String,required:true}
},{collation:'enquiry'});


module.exports=mongoose.model('Enquiry',schema)