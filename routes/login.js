var  express = require('express');
var router = express.Router();
var db = require('./db');
router.get('/', function(req, res, next) {
		if(req.session.userId && req.session.goingTo){
			res.redirect(req.session.goingTo);
		} else {
			res.render('login',{title:'Login'});
		}
		
});
router.post('/', function(req, res, next) {
	  var userName=req.body.userName;
	  var password=req.body.password;
	  if(userName === '' || password === ''){
			res.status(500).send('Required fields');
		}
	  var Login=req.body.login;
	  if(Login){
	  var conn = db.getConnection();
		  conn.query('SELECT userId, role FROM signup_details where userName=? and password =?',[userName,password ],function(err,rows){
		        if (err) {
		            console.log('Error: ' + err);
		        } else {
		        	if(rows.length >0) {
		        		req.session.userId = rows[0].userId;
		        		req.session.role = rows[0].role;
		        		if(rows[0].role==="admin"){
		        			req.session.goingTo = '/admin';
		        			res.redirect('/admin');
		        		}else if(rows[0].role==="user"){
		        			req.session.goingTo = '/users';
		        			res.redirect('/users');
		        		}	
		        	 }else {
		        		res.render('login', {error: 'Please Signup and login'});
		        	}
		        }
		  });
	  }
	  
});



module.exports = router;
