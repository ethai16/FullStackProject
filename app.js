const express = require('express');
const app = express();
<<<<<<< HEAD
const db = require('./models/');
const session = require('express-session');
=======
var http = require('http').Server(app);
var io = require('socket.io')(http);
const db = require('./models/')
const session = require('express-session')
const fileUpload = require('express-fileupload');
>>>>>>> 718739f0f6bcbb36646a45aac61e4a294a92b268

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static('public'));

app.use(require('./routes/signup'));
app.use(require('./routes/login'));
app.use(require('./routes/logout'));
app.use(require('./routes/index'));
<<<<<<< HEAD
=======
app.use(require('./routes/register'));
app.use(require('./routes/profile'));
app.use(require('./routes/dashboard'));
app.use(require('./routes/chat'));
app.use(require('./routes/search'));


>>>>>>> 718739f0f6bcbb36646a45aac61e4a294a92b268

app.use(require('./routes/signup'));
app.use(require('./routes/login'));
app.use(require('./routes/logout'));
app.use(require('./routes/dashboard'));
app.use(require('./routes/api'));


<<<<<<< HEAD

app.listen(3000, () => {
=======

io.on('connection', (socket)=> {
    console.log('someone connected')
    socket.on('chat message', (msg)=> {
        io.sockets.emit('chat message', msg);
        
        socket.on('typing', data => {
            socket.broadcast.emit('typing', data)
        })
    });
});


// need this only when creating database.
// db.users.sequelize.sync({force:true}).then(()=>{
//     app.listen(3500)
// })




http.listen(3000, ()=>{
>>>>>>> 718739f0f6bcbb36646a45aac61e4a294a92b268
    console.log('listening on port 3000')
})
