// require our StreamConsumer
var sys = require("sys"), 
  StreamConsumer = require("./stream_consumer").StreamConsumer,
  PushSocket = require("./push_socket").PushSocket;

// main method
push_socket = new PushSocket();
push_socket.main();

stream_consumer = new StreamConsumer(push_socket);
stream_consumer.main();


// handle SIGTERM
process.on('exit', function(){
  console.log("Shutting down....");
  stream_consumer.exit();
});