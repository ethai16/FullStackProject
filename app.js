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



io.on('connection', (socket)=> {
    console.log('someone connected')
    socket.on('chat message', (msg)=> {
        io.sockets.emit('chat message', msg);
        
    
    });
});



// io.on('chat message',(username)=>{
//     socket.username = username;
// })
// io.sockets.on('connection', function (socket) {
//     console.log('a client connected')
//    });



// need this only when creating database.
// db.sequelize.sync({force:true}).then(()=>{
//     app.listen(3500)
// })



    


http.listen(3000, ()=>{
    console.log('listening on port 3000')
})
