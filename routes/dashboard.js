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

    db.users.findAll({where:{teacher_code: req.user.teacher_code}})
    .then((teacherFriends)=>{
        db.users.findAll({where:{mentor_code: req.user.mentor_code}})
        .then((mentorFriends)=>{
            var friendsList = teacherFriends.concat(mentorFriends);
            var friendUsernames = [];
            friendsList.forEach((e) =>{
                console.log(e.username)
                if (!friendUsernames.includes(e.username) ){
                    friendUsernames.push(e)
                };
            });
            // var filteredArray = friendsList.filter((item, pos) => {
            //     return friendsList.username.indexOf(item)== pos; 
            // });

            res.render('dashboard', {
                publicProfile: '/'+ masterRole + '/'+ req.user.username,
                fname: req.user.fname,
                lname: req.user.lname,
                friendsList: friendUsernames,
                mainUser: req.user.username,
                teacher_code: req.user.teacher_code,
                mentor_code: req.user.mentor_code
            })
        })

    })

})

module.exports = router;
