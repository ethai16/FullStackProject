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


router.get('/:userRole/:username', (req,res)=>{
    var role = req.params.userRole;
    var username = req.params.username;
    var roleNum = ''
    if (role === 'teacher'){
        roleNum = 1
    } else if(role === 'student') {
        roleNum = 2
    } else if (role === 'mentor'){
        roleNum = 3
    }else{
        res.redirect('/login')
    }

    if (req.user){
        if (req.user.username === username && roleNum === req.user.role_id) {
            res.render('profile')
        }else{
            res.redirect('/login')
        }
    }else{
        res.redirect('/login')
    }
})

module.exports = router