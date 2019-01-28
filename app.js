const express = require('express');
const app = express();
const db = require('./models/');
const session = require('express-session');
const flash = require('connect-flash');
// const cookieParser = require('cookie-parser');

app.set("view engine", "ejs");
app.set("views", "views");
// app.use(cookieParser('keyboard cat'));
// app.use(session({
//     cookie: {
//         maxAge: 60000
//     }
// }));
app.use(flash());
app.use(express.static('public'));
app.use(require('./routes/index'));

app.use(require('./routes/signup'));
app.use(require('./routes/login'));
app.use(require('./routes/logout'));
app.use(require('./routes/dashboard'));
// app.use(require('./routes/chat'));
app.use(require('./routes/api'));

// var sessionFlash = function(req, res, next) {
//     res.locals.currentUser = req.user;
//     res.locals.error = req.flash('error');
//     res.locals.success = req.flash('success');
//     next();

// }
//app.use(sessionFlash);


app.listen(3000, () => {
    console.log('listening on port 3000')
})
