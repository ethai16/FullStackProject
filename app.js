const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static('public'));
app.use(require('./routes/index'));
app.use(require('./routes/register'));
const fileUpload = require('express-fileupload');

app.get('/chat', (req, res)=>{
    // res.sendFile(__dirname + '/views/index.ejs')
    res.render('chat')
});


io.on('connection', (socket)=> {
    console.log('someone connected')
    socket.on('chat message', (msg)=> {
        io.sockets.emit('chat message', msg);
    });
});

http.listen(3000, ()=>{
    console.log('listening on port 3000')
})