var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var StudentSchema=new Schema({
    user:{type: Schema.Types.ObjectId, ref: 'User'},
    firstName:{type:String, required:true},
    middleName:{type:String, required:true},
    lastName:{type:String, required:true},
    gender:{type:String, required:true},
    dob:{type:Date, required:false},
    address:{type:String, required:true},
    address2:{type:String, required:false},
    state:{type:String, required:false},
    city:{type:String, required:true},
    pinCode:{type:String, required:true},
    email:{type:String, required:true},
    contact:{type:String, required:false},
    enrollmentNo:{type:String, required:false},
    stream:{type:String, required:false},
    medium:{type:String, required:false},
    schoolName:{type:String, required:false},
    schoolAddress:{type:String, required:false},
    standard:{type:String, required:false},
    profilePicture:{type:String, required:false},
    registrationDate:{type:Date, required:false},
    leaveDate:{type:Date, required:false}
});

module.exports=mongoose.model('Student',StudentSchema);