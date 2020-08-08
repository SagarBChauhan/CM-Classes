var express = require('express');
var router = express.Router();

var Enquiry=require("../models/enquiry");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CM Classes' });
});

router.post('/', function (req, res, next) {
  var item={
    firstname:req.body.firstname,
    email:req.body.email,
    message:req.body.message
  };
  var data=new Enquiry(item);
  data.save();
  res.redirect('/');
});

module.exports = router;
