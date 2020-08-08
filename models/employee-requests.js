var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var EmployeeSchema=new Schema({
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
    department:{type:String, required:false},
    salary:{type:String, required:false},
    designation:{type:String, required:false},
    skill:{type:String, required:false},
    status:{type:String, required:false},
    profilePicture:{type:String, required:false},
    registrationDate:{type:Date, required:false},
    leaveDate:{type:Date, required:false}
});

module.exports=mongoose.model('EmployeeRequests',EmployeeSchema);