const express = require('express');
const router = express.Router();
const db = require('./../models');
const Sequelize = require('sequelize');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = new Sequelize('fullstack', 'erickthai', '', {
    dialect: 'postgres'
  });

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

    db.users.findAll({where: {
        $or: [
            {teacher_code: req.user.teacher_code},

            {mentor_code: req.user.mentor_code}
        ]
    }})
    .then((results_1)=>{
        sequelize.query("SELECT * FROM users INNER JOIN comments ON comments.username = users.username")
        .then((results_2)=>{
            
            console.log(results_2[0])

        // console.log(results_2[0].comments[0].comment + '1')
        // console.log(results_2[0].comments[1].comment + '2')
        // console.log(results_2[1].comments[0].comment + '3')
        // console.log(results_2[0].comments[2].comment + '4')
        res.render('dashboard', {
            publicProfile: '/'+ masterRole + '/'+ req.user.username,
            fname: req.user.fname,
            lname: req.user.lname,
            friendsList: results_1,
            mainUser: req.user.username,
            teacher_code: req.user.teacher_code,
            mentor_code: req.user.mentor_code,
            post: results_2[0]
        })
    })

    })

})

router.use(bodyParser.urlencoded({ extended: false }));
router.post("/dashboard", (req, res) => {
    var username = req.user.username;
    var comment = req.body.post;

    res.status(204).send();
    db.comments.create({
        username: username,
        comment: comment
    })

})
module.exports = router;
