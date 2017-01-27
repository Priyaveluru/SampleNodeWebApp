var express = require('express');
var router = express.Router();
var db = require('./db');
var conn = db.getConnection();
/* GET users listing. */
router.get('/', function(req, res, next) {
	if(req.session.userId){
		if( req.session.role !== 'user'){
			res.status(401);
			res.send('UnAuthorized');
		} else {
			conn.query('select * from product_details',function(err, rows){
				if(err) {
					console.log(err);
					res.render('user', {error: 'Problem Occured'});
					} else {
						if(rows.length >0) {
			        		res.render('user', { productDetails: rows });
						} else{
							res.render('user', {msg: 'no results found', title: 'success'});
						}
						
					}
			});
		}
	}else{
			res.redirect('/login');
	}
	
});
module.exports = router;
