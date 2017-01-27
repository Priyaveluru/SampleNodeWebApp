var  express = require('express');
var router = express.Router();
var db = require('./db');
router.get('/', function(req, res, next) {
	res.render('signup',{title:'Signup'});
	});
router.post('/details', function(req,res,next){
	var name=req.body.name;
	var emailId=req.body.emailId;
	var password=req.body.password;
	var phoneNo=req.body.phoneNo;
	var role=req.body.role;
	var conn = db.getConnection();
	conn.query('select * from  signup_details  where emailId = ?',emailId,function(err, rows){
		if(err) {
			console.log(err);
			res.render('signup', {error: 'Problem Occured', title: 'signup'});
			} else {
				if(rows.length >0){
					res.render('signup', {error: 'User Alredy Exists', title: 'signup'});
				} else {
					conn.query('insert into signup_details  set ?', {'UserName': name,'password':password,'emailId':emailId,'phoneNo':phoneNo,'role':role},function(err, rows){
						if(err) {
							console.log(err);
							res.render('signup', {error: 'Problem Occured', title: 'signup'});
							} else {
								res.render('signup', {msg: 'Sucessfully signed up for the application.Please Login', title: 'success'});
							}
					});
				}
			}
	});
	
});
module.exports = router;