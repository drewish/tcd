var fs = require('fs'),
    file = fs.readFileSync('settings.js').toString('utf8');
    settings = JSON.parse(file),
	MySQL = require('mysql').Client,
	connection = new MySQL();

connection.user = settings.mysql.user;
connection.password = settings.mysql.pass;
connection.connect();

connection.query("SHOW DATABASES", function(err,results,fields){
  console.log(results);
  console.log(fields)
  connection.end();
});
