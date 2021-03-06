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
const Sequelize = require('sequelize');
// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres',
//     protocol: 'postgres'
// })
const sequelize = new Sequelize('fullstack', 'erickthai', '', {
    dialect: 'postgres'
});

router.get('/public/:role/:username', (req,res)=>{
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
        console.log(role)
        console.log(username)
        console.log('HERE!!!!PLZ', results[0], " cnothing")
        if (req.user){
            var masterRole = ""
            if (req.user.role_id === 1){
                masterRole = 'teacher'
            }else if (req.user.role_id === 2){
                masterRole = 'student' 
            }else{
                masterRole = 'mentor'
            }
            if ((results[0] && req.user.teacher_code === results[0].teacher_code) ||(results[0] && req.user.mentor_code === results[0].mentor_code)) {
                sequelize.query("SELECT * FROM users INNER JOIN comments ON comments.username = users.username WHERE users.username = '" + username + "' ")
                .then((results_2)=>{
                    
                    
                res.render('profile', {
                    publicProfile: '/'+ masterRole + '/'+ req.user.username,
                    user: req.user,
                    friendInfo: results[0],
                    fName: results[0].fname,
                    lName: results[0].lname,
                    fRole: results[0].role_id,
                    mainUser: req.user.username,
                    mainUserName:req.user.fname,
                    post: results_2[0],
                })
            })
                

            }else{
                res.redirect('/login')
            }
        }else{
            res.redirect('/login')
        }
    })
})

module.exports = router