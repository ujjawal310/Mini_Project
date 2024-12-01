const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: "*",  // Allow all origins for development (be more restrictive in production)
      methods: ["GET", "POST"]
    }
  });



const users={};

io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        console.log('New user',name)
        users[socket.id]=name;

        socket.broadcast.emit('user-joined');
    });
    
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
})

server.listen(5000, () => {
    console.log('Server listening on port 5000');
});
