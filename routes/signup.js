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
    res.redirect('/');
});
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
                        industries:results_inds,
                        topMsg:"New Profile".toUpperCase()
                    });
                } else{
                    res.send('error');        // if error, go back to all cards
                }   
            })
        }) 
    })         
})
router.get('/signup/:roleID/:userID',(req,res)=>{
    let roleID = req.params.roleID;
    let userID = req.params.userID;

    db.users.findOne({
        raw:true
        ,include:[
            {model:db.schools,required:true}
        //     {model:db.industries
                // ,on: {
                //     col1: db.sequelize.where(db.sequelize.col("users.industry_id1"), "=", db.sequelize.col("ind1.industries")),
                //     col1: db.sequelize.where(db.sequelize.col("users.industry_id2"), "=", db.sequelize.col("ind2.industries")),
                //     col1: db.sequelize.where(db.sequelize.col("users.industry_id3"), "=", db.sequelize.col("ind3.industries")),
                // },
            //}
        ]
        ,where: {
            username: {[Sequelize.Op.eq]: userID}
        }
    }).then(results=>{
        if (results){
            res.render('profileEdit',{
                data:results,
                topMsg:"Edit Profile".toUpperCase(),
                secondMsg:''
            });
        } else{
            res.send('error');        // if error, go back to all cards
        }   
    }).catch(error=>{
        res.render('message',{
            topMsg:`Error: ${error}`,
            secondMsg:''});
    })
})

module.exports = router;