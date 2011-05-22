// require our StreamConsumer
var sys = require("sys"), 
  StreamConsumer = require("./stream_consumer").StreamConsumer;

// main method
stream_consumer = new StreamConsumer().main();

// handle SIGTERM
process.on('exit', function(){
  console.log("Shutting down....");
  stream_consumer.exit();
});