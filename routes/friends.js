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

router.get('/public/:role/:username', (req,res)=>{

    console.log('We are HEre!!!!')
    var role = req.params.role;
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



    db.users.findAll({where: {username: username}})
    .then((results)=>{
        if (req.user){
            var masterRole = ""
            if (req.user.role_id === 1){
                masterRole = 'teacher'
            }else if (req.user.role_id === 2){
                masterRole = 'student' 
            }else{
                masterRole = 'mentor'
            }

            if (req.user.teacher_code === results[0].teacher_code || req.user.mentor_code === results[0].mentor_code) {
                res.render('profile', {
                    publicProfile: '/'+ masterRole + '/'+ req.user.username,
                    fName: results[0].fname,
                    lName: results[0].lname
                })
            }else{
                console.log("COME ON MAN!!!!!!!!!")
                res.redirect('/login')
            }
        }else{
            res.redirect('/login')
        }
    })
})

module.exports = router