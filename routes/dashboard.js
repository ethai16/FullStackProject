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

router.get('/dashboard', (req,res)=>{
    if (req.user){
        if (req.user.role_id === 1){
            role = 'teacher'
        }else if (req.user.role_id === 2){
            role = 'student' 
        }else{
            role = 'mentor'
        }
    }else{
        res.redirect('/login')
    }

    var masterRole = ""
    if (req.user.role_id === 1){
        masterRole = 'teacher'
    }else if (req.user.role_id === 2){
        masterRole = 'student' 
    }else{
        masterRole = 'mentor'
    }

    db.users.findAll({where:{code: req.user.code}})
    .then((results)=>{

        res.render('dashboard', {
            publicProfile: '/'+ masterRole + '/'+ req.user.username,
            fname: req.user.fname,
            lname: req.user.lname,
            friendsList: results,
            mainUser: req.user.username
        })
    })

})

module.exports = router;
