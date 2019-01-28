const express = require('express');
const app = express();
const db = require('./models/');
const session = require('express-session');

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static('public'));
app.use(require('./routes/index'));

app.use(require('./routes/signup'));
app.use(require('./routes/login'));
app.use(require('./routes/logout'));
app.use(require('./routes/dashboard'));
app.use(require('./routes/api'));



app.listen(3000, () => {
    console.log('listening on port 3000')
})
