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


router.get('/users/student/:username/dashboard', (req,res)=>{
    var role = req.params.userRole;
    var username = req.params.username;
    if (req.user){
        if (req.user.username === username) {
            res.render('dashboard')
        }else{
            res.send('UNAUTHORIZED!')
        }
    }else{
        res.redirect('/login')
    }
})

module.exports = router