var MySQL = require('mysql').Client, connection = new MySQL();

connection.user = "dlangevin";
connection.password = "Piazza32";
connection.connect();

connection.query("SHOW DATABASES", function(err,results,fields){
  console.log(results);
  console.log(fields)
  connection.end();
});
