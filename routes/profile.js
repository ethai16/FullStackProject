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
const sequelize = new Sequelize('fullstack', 'erickthai', '', {
    dialect: 'postgres'
});


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
            var masterRole = ""
            if (req.user.role_id === 1){
                masterRole = 'teacher'
            }else if (req.user.role_id === 2){
                masterRole = 'student' 
            }else{
                masterRole = 'mentor'
            }
            sequelize.query("SELECT * FROM users INNER JOIN comments ON comments.username = users.username WHERE users.username = '" + username + "' ")
            .then((results)=>{
                
                
            res.render('home', {
                publicProfile: '/'+ masterRole + '/'+ req.user.username,
                user:req.user,
                fName: req.user.fname,
                mainUserName:req.user.fname,
                lName: req.user.lname,
                mainUser: req.user.username,
                post: results[0],
                friendInfo:'',
                fRole:''
            })
        })
        }else{
            res.redirect('/login')
        }
    }else{
        res.redirect('/login')
    }
})
router.post("/:userRole/:username", (req, res) => {
    var username = req.user.username;
    var comment = req.body.post;

    res.status(204).send();
    db.comments.create({
        username: username,
        comment: comment
    })

})

module.exports = router