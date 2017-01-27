var mysql = require('mysql');

function getConnection() {
var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '',
	  database : 'shopping_cart'
	});
return connection;
}
exports.getConnection = getConnection;