var  express = require('express');
var router = express.Router();
var db = require('./db');

router.get('/', function(req, res, next) {
	if(req.session.userId) {
		if( req.session.role !== 'admin'){
			res.status(401);
			res.send('UnAuthorized');
		}else{
			res.render('admin');
		}
	} else {
		res.redirect('/login');
	}
	
});
router.post('/product', function(req, res, next) {
	if(req.session.userId){
			if( req.session.role !== 'admin'){
				res.status(401);
				res.send('UnAuthorized');
	
		}else{
			var productId=req.body.productId;
			var productName=req.body.name;
			var description=req.body.description;
			var price=req.body.price;
			var conn = db.getConnection();
			conn.query('insert into product_details  set ?', {'productId': productId,'name':productName,'description':description,'price':price},function(err, rows){
				if(err) {
					console.log(err);
					res.render('admin', {error: 'Problem Occured'});
					} else {
						res.render('admin', {msg: 'Sucessfully inserted', title: 'success'});
					}
				conn.end();
			});
		}
	}else{
		res.redirect('/login');
	}
});

router.get('/manageUsers', function(req, res, next) {
	if(req.session.userId){
		if( req.session.role !== 'admin'){
			res.status(401);
			res.send('UnAuthorized');
		
		}else{
		 var conn = db.getConnection();
		 conn.query('select * from signup_details',function(err, rows){
					if(err) {
						console.log(err);
						res.render('admin', {error: 'Problem Occured'});
						} else {
							if(rows.length >0) {
				        		res.render('manageUsers', { details: rows });
							} else{
								res.render('admin', {msg: 'no results found', title: 'success'});
							}
						
							
						}
					conn.end();
					});
		}
	}else{
		res.redirect('/login');
	}
	
});
router.get('/manageProducts', function(req, res, next) {
	var conn = db.getConnection();
	if(req.session.userId){
		if( req.session.role !== 'admin'){
			res.status(401);
			res.send('UnAuthorized');
		}else{
			conn.query('select * from product_details',function(err, rows){
				if(err) {
					console.log(err);
					res.render('admin', {error: 'Problem Occured'});
					} else {
						if(rows.length >0) {
			        		res.render('manageProducts', { productDetails: rows });
						} else{
							res.render('admin', {msg: 'no results found', title: 'success'});
						}
						
					}
				conn.end();
			});
		}
	}else{
		res.redirect('/login');	
	}
	
});
router.post('/update', function(req, res, next) {
	if(req.session.userId){
		if( req.session.role !== 'admin'){
			res.status(401);
			res.send('UnAuthorized');
		}else{
			res.send("unauthorized");try {
				var productId=req.body.productId; 
				var productName=req.body.name;
				var description=req.body.description;
				var price=req.body.price;
				var conn = db.getConnection();
				conn.query('UPDATE product_details SET ? WHERE productId=?',[{ 'name': productName,'description': description, 'price': price}, productId  ],function(err, rows){
					if(err) {
						console.log(err);
						res.status(500);
						res.send({error: 'Problem Occured'});
						} else {
							res.status(200);
							res.send({msg: 'Sucessfully updated', title: 'success'});
						}
					conn.end();
				});
			}catch(e){
				console.log(e);
				res.status(500);
				res.send({error: 'Problem Occured'});
			}
		}
	}else{
		res.redirect('/login');	
	}
});
router.post('/delete', function(req, res, next) {
	if(req.session.userId){
		if( req.session.role !== 'admin'){
			res.status(401);
			res.send('UnAuthorized');
	
		}else{
			var productId=req.body.productId; 
			console.log(productId);
			var conn = db.getConnection();
			conn.query('DELETE FROM product_details WHERE productId=?', productId ,function(err, rows){
				if(err) {
					console.log(err);
					res.status(500);
					res.send({error: 'Problem Occured'});
					} else {
						res.status(200);
						res.send({msg: 'deleted successfully', title: 'ManageProducts'});
					}
				conn.end();
			});	
		}
	}else{
		res.redirect('/login');	
	}
});

module.exports = router;