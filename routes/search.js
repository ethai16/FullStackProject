const express = require('express');
const router = express.Router();
const db = require('./../models');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const session = require('express-session');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

router.use(bodyParser.urlencoded({extended:false}));

// var myStore = new SequelizeStore({
//     db: db.sequelize
// })


router.get('/search', (req,res)=>{
    var masterRole = ""
    if (req.user.role_id === 1){
        masterRole = 'teacher'
    }else if (req.user.role_id === 2){
        masterRole = 'student' 
    }else{
        masterRole = 'mentor'
    }
    // console.log('searchpage');
    db.industries.findAll()
    .then((results)=>{
        if(req.user){
        res.render('search',{
            pageTitle: 'Search',
            data: results,
            publicProfile: '/'+ masterRole + '/'+ req.user.username,
            mainUserName:req.user.fname,
            user: req.user

        }) 
    }else{
        res.redirect('/login')
    }
    })
});

module.exports = router;