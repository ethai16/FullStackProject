const express = require('express');
const app = express();
const db = require('./models/')
const session = require('express-session')
// const flash = require('connect-flash')

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static('public'));
app.use(require('./routes/index'));

app.use(require('./routes/signup'));
app.use(require('./routes/login'));
app.use(require('./routes/logout'));
app.use(require('./routes/dashboard'));
// app.use(require('./routes/chat'));
app.use(require('./routes/api'));
// app.use(flash());


// need this only when creating database.
// db.users.sequelize.sync({force:true}).then(()=>{
//     app.listen(3500)
// })

// Middleware: pass user info to all routes, so that user name will be shown on NAV bar
// res.locals.currentUser = req.user;
app.use(function(req, res, next){
    res.locals.error    = req.flash("error");
    res.locals.success  = req.flash("success");
    next();
});


// function isLoggedIn(req,res,next){
//     if(req.isAuthenticated()){
//         //req.isAuthenticated() will return true if user is logged in
//         return next();
//     } else{
//         req.flash("error", "Please log in first.")
//         res.redirect("/login");
//     }
// }


app.listen(3000, ()=>{
    console.log('listening on port 3000')
})
