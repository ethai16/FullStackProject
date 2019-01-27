const express = require('express');
const router = express.Router();
const db = require('./../models');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

router.use(bodyParser.urlencoded({extended:false}));

router.use(cookieParser());

var myStore = new SequelizeStore({
    db: db.sequelize
})

router.use(session({
    secret: 'this is our secret',
    store: myStore,
    resave: false,
    proxy: true
}))

myStore.sync();

router.use(passport.initialize());
router.use(passport.session());

router.get('/login', (req,res)=>{
    res.render('login')
})

// router.post('/login',
//     passport.authenticate('local', {
//         successRedirect: '/dashboard',
//         failureRedirect: '/'
//     })
// );
router.post('/login',passport.authenticate('local', {failureRedirect: '/'}), (req,res)=>{
    // passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/login'})
    //used to check role of login user
    console.log(req.user)
    if(req.user){
        var role = ""
        console.log(req.user.role)
        if (req.user.role === 1){
            role = 'teacher'
        }else if (req.user.role === 2){
            role = 'student' 
        }else{
            role = 'mentor'
        }
        if (req.user.role){
            res.redirect('/'+ role + '/'+ req.user.username);
        }else{
            res.redirect('/login')
        }
    }

    //checking a password using pbkdf2 and crypto
    // var username = req.body.username;
    // var pwd = req.body.password;
    // var stored_pass = `pbkdf2_sha256$36000$${salt}$${hash}`;
    // var pass_parts = stored_pass.split('$');
    // var key = pbkdf2.pbkdf2Sync(pwd, pass_parts[2], paseInt(pass_parts[1]), 256, 'sha256');
    // var hash = key.toString('hex');

})

passport.use(new LocalStrategy((username, password, done)=>{
    console.log('Im in passport');
    db.users.findAll({where: {username: username}})
    .then((results)=>{
        //if err occurs fix this vvv(was results != null)
        if(results.length != 0) {
            const data = results[0];
            console.log(data)
            bcrypt.compare(password, data.password_hash, (err, res)=>{
                if (res) {
                    done(null, {id: data.id, username: data.username, role: data.role_id})
                }else{
                    done(null,false)
                }
            })
        } else{
            done(null, false)
        }
        })
}))

passport.serializeUser((user,done)=>{
    done(null, user.username)
});

passport.deserializeUser((username, done)=>{
    //changed to find by username and not by id
    db.users.findOne({where: {username: username}}).then((data)=>{
        done(null,data)
    })
})


module.exports = router;