const express = require('express');
const router = express.Router();
const db = require('../models/');
const Sequelize = require('sequelize');;
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);



router.get('/signup',(req,res)=>{
    db.states.findAll({
        raw:true,
        attributes: ['state']
    })
    .then(results_states=>{
        db.schools.findAll({
            raw:true
        })
        .then(results_schools =>{
            db.industries.findAll({
                raw:true
            })
            .then(results_inds => {
                if (results_states.length>0 && results_schools.length>0 && results_inds.length>0 ){
                    // console.log(results)
                    res.render('signup',{
                        states: results_states,
                        schools:results_schools,
                        industries:results_inds
                    });
                } else{
                    res.send('error');        // if error, go back to all cards
                }   
            })
        }) 
    })         
})

router.use(bodyParser.urlencoded({ extended: false }));
router.post('/signup', (req,res)=>{
    var username = req.body.username;
    var pwd = req.body.password;
    //utilizing bcrypt
    bcrypt.genSalt(10, (err,salt)=>{
        bcrypt.hash(pwd, salt, (err,hash)=>{
            db.users.create({username: username, password_hash: hash, password_salt: salt})
            .then(()=>{
                res.redirect('/login');
            })
            .catch(error =>{
        
            });
        })
    })
    
    //utilizing pbkdf2 and crypto packages
    // var salt = crypto.randomBytes(256).toString('hex');
    // var key = pbkdf2.pbkdf2Sync(
    //     pwd, salt, 36000,256, 'sha256'
    // );
    // var hash = key.toString('hex')
})


module.exports = router;