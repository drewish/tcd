var http = require('http'),  
    io = require('socket.io');
  
  
var PushSocket = function(){};

PushSocket.prototype = {
  // 
  active_clients : [],
  // main
  main : function(){
    var self = this;
    
    this.server = http.createServer(function(req, res){
     // your normal server code 
     res.writeHead(200, {'Content-Type': 'text/html'}); 
     res.end(); 
    });
    this.server.listen(8080);
    
    // add the listener for the message
    this.socket = io.listen(this.server); 
    this.socket.on('connection', function(client){ 
      // we have a new client, so let's add him to our list of actives
      self.active_clients.push(client);
      
      // stop sending messages when a client disconnects
      client.on('disconnect', function(){
        self.active_clients.splice(self.active_clients.indexOf(client));
      }) 
    });
    
  },
  // we have some new data! let's tell everyone!
  push_data : function(data){
    this.clients.forEach(function(client){
      client.broadcast(data);
    })
  }
}
exports.PushSocket = PushSocket;