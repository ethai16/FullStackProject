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
    res.redirect('/')
})

router.get('/signup/:roleID',(req,res)=>{
    let roleID = req.params.roleID;
    
    db.states.findAll({
        raw:true,
        attributes: ['state'],
        order: [['state']]
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


module.exports = router;