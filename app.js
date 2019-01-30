const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const db = require('./models/')
const session = require('express-session')
const fileUpload = require('express-fileupload');


app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static('public'));

app.use(require('./routes/signup'));
app.use(require('./routes/login'));
app.use(require('./routes/logout'));
app.use(require('./routes/index'));
app.use(require('./routes/register'));
app.use(require('./routes/profile'));
app.use(require('./routes/dashboard'));
app.use(require('./routes/chat'));
app.use(require('./routes/search'));



app.use(require('./routes/signup'));
app.use(require('./routes/api'));

users = [];
connections = [];
var userid = `<%=userid%>`
io.on('connection', function (socket) {

    connections.push(socket);

    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', msg)
    });

    socket.on('send-nickname', function(socket){
        socket.nickname = nickanme;
        userid.push(socket.nickname);
        console.log(users)
    })
    console.log('Connected: %s sockets connected', connections.length);
    io.sockets.emit('totalUsers', { count: connections.length });
    //Disconnect
    socket.on('disconnect', function (data) {
        users.splice(users.indexOf(socket.username), 1);
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length);
        io.sockets.emit('totalUsers', { count: connections.length });

    });
})



// need this only when creating database.
// db.sequelize.sync({force:true}).then(()=>{
//     app.listen(3500)
// })






http.listen(3000, () => {
    console.log('listening on port 3000')
})
