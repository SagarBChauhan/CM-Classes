var express = require('express');
var router = express.Router();
var StudentRequests = require('../models/student-requests');
var EmployeeRequests = require('../models/employee-requests');
var Student = require('../models/student');
var Employee = require('../models/employee');
var Users = require('../models/user');


/* GET home page. */
router.get('/', function (req, res, next) {
    EmployeeRequests.find().then(function (doc) {
        console.log(doc);
    res.render('dashboard/dashboard', {title: 'Dashboard', li1: true, dashboard: true, user: req.user,employeeReq:doc});
    });
});

/* GET profile page. */
router.get('/profile', function (req, res, next) {
    res.render('dashboard/profile', {title: 'Profile', li2: true, dashboard: true, user: req.user});
});

/* GET admission page. */
router.get('/admission', function (req, res, next) {
    StudentRequests.find().then(function (doc) {
        console.log(doc);
        EmployeeRequests.find({status:""}).then(function (doc2) {
            res.render('dashboard/admission', {title: 'Admission', li3: true, dashboard: true, user: req.user, students: doc,employees:doc2});
        });
    });
});

/* GET admission edit page. */
router.get('/admission-edit/:id', function (req, res, next) {
    var userId = req.params.id;
    StudentRequests.findById(userId, function (err, doc) {
        if (err) {
            return res.write('Error!');
        }
        res.render('dashboard/admission-edit', {title: 'Admission edit', li3: true, dashboard: true, user: req.user, items: doc});
    });
});
/* Post admission edit page. */
router.post('/admission-edit/:id', function (req, res, next) {
    var messages = [];
    var userId=req.params.id;
    StudentRequests.findById(userId, function (err, doc) {
        if (err) {
            return res.write('Error!');
        }
        var address2 = req.body.address2;
        var contact = req.body.contact;

        // doc.firstName = req.body.firstname;
        // doc.middleName = req.body.middlename;
        // doc.lastName = req.body.lastname;
        // doc.gender = req.body.gender;
        doc.dob = req.body.dob;
        doc.address = req.body.address;
        doc.address2 = address2;
        doc.state = req.body.state;
        doc.city = req.body.city;
        doc.pinCode = req.body.pin;
        doc.email = req.body.email;
        doc.contact = contact;
        // doc.enrollmentNo= ts,
        doc.stream= req.body.stream,
        doc.medium= req.body.medium,
        doc.schoolName= req.body.schoolName,
        doc.schoolAddress= req.body.schoolAddress,
        doc.standard= req.body.standard,
        // doc.profilePicture = "";
        // doc.leaveDate = "";
        doc.save();
        console.info("Data updated!");
        console.info(doc);
        res.render('dashboard/admission-edit', {title: 'Admission edit', li3: true, dashboard: true, user: req.user, items: doc,msg:"Successfully updated!"});
    });
});
/* GET admission-accept page. */
router.get('/admission/accept/:type/:id', function (req, res, next) {
    var type = req.params.type;
    var userId = req.params.id;

    Users.findById(userId, function (err, user) {
        if (err) {
            return res.write('Error!');
        }
        user.type = type;
        user.save();

        let ts = Date.now();
        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();

        if(type=="Student"){
            StudentRequests.findOne({'user': user.id}, function (err, doc) {
                var student= new Student({
                    user: userId,
                    firstName: doc.firstName,
                    middleName: doc.middleName,
                    lastName: doc.lastName,
                    gender: doc.gender,
                    dob:  doc.dob,
                    address:  doc.address,
                    address2:  doc.address2,
                    state:  doc.state,
                    city:  doc.city,
                    pinCode:  doc.pinCode,
                    email: doc.email,
                    contact:  doc.contact,
                    enrollmentNo:ts,
                    stream: doc.stream,
                    medium: doc.medium,
                    schoolName: doc.schoolName,
                    schoolAddress: doc.schoolAddress,
                    standard: doc.standard,
                    profilePicture: "",
                    registrationDate:Date( date + "-" + month + "-" + year),
                    leaveDate: ""
                });
                student.save().then(function (err, result) {
                    console.info("Student Data Inserted!");

                    StudentRequests.findByIdAndRemove(doc._id).exec();
                    console.info('data soft deleted' + doc._id);
                    res.redirect('/dashboard/admission');
                });
            });
        }
        else if(type=="Employee"){
            EmployeeRequests.findOne({'user': user.id}, function (err, doc) {
                var employee= new Employee({
                    user: userId,
                    firstName: doc.firstName,
                    middleName: doc.middleName,
                    lastName: doc.lastName,
                    gender: doc.gender,
                    dob:  doc.dob,
                    address:  doc.address,
                    address2:  doc.address2,
                    state:  doc.state,
                    city:  doc.city,
                    pinCode:  doc.pinCode,
                    email: doc.email,
                    contact:  doc.contact,
                    enrollmentNo:doc.enrollmentNo,
                    department:doc.department,
                    salary:doc.salary,
                    designation:doc.designation,
                    skill:doc.skill,
                    profilePicture: "",
                    registrationDate:Date( date + "-" + month + "-" + year),
                    leaveDate: ""
                });
                employee.save().then(function (err, result) {
                    console.info("Employee Data Inserted!");

                    EmployeeRequests.findByIdAndRemove(doc._id).exec();
                    console.info('data soft deleted' + doc._id);
                    res.redirect('/dashboard/admission');
                });
            });
        }
    });
});

/* GET admission-reject page. */
router.get('/admission/reject/:type/:id', function (req, res, next) {
    var type = req.params.type;
    var userId = req.params.id;
    Users.findById(userId, function (err, user) {
        if(type=="Student"){
            StudentRequests.findOne({'user': user.id}, function (err, doc) {
                doc.status='Rejected';
                doc.save();
            });
        }
        else if(type=="Employee"){
           EmployeeRequests.findOne({'user': user.id}, function (err, doc) {
                doc.status='Rejected';
                doc.save();
            });
        }
    });
    res.redirect('/dashboard/admission');
});

/* GET students page. */
router.get('/students', function (req, res, next) {
    Student.find().then(function (doc) {
        res.render('dashboard/students', {title: 'Students', li4: true, dashboard: true, user: req.user, students:doc});
    });
});

/* GET notify page. */
router.get('/notify', function (req, res, next) {
    res.render('dashboard/notify', {title: 'Notify', li5: true, dashboard: true, user: req.user});
});


module.exports = router;
