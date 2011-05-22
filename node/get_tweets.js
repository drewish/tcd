// require our StreamConsumer
var sys = require("sys"), 
  StreamConsumer = require("./stream_consumer").StreamConsumer,
  PushSocket = require("./push_socket").PushSocket;

// main method
stream_consumer = new StreamConsumer().main();
push_socket = new PushSocket().main();

// handle SIGTERM
process.on('exit', function(){
  console.log("Shutting down....");
  stream_consumer.exit();
});