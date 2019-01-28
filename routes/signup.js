const express = require('express');
const router = express.Router();
const db = require('../models/');
const Sequelize = require('sequelize');;
// const LocalStrategy = require('passport-local').Strategy;
// const passport = require('passport');
// const bcrypt = require('bcryptjs');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const session = require('express-session');
const crypto = require('crypto');

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
                console.log(results_schools.length)
                if (results_states.length>0 && results_schools.length>0 && results_inds.length>0 ){
                    // console.log(results)
                    res.render('signup',{
                        states: results_states,
                        schools:results_schools,
                        industries:results_inds,
                        teacher_code:crypto.randomBytes(3).toString('hex'),
                        mentor_code:crypto.randomBytes(3).toString('hex'),
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


    db.users.findAll({
        raw:true
        ,attributes: {
            include: [
                [db.sequelize.literal('(SELECT "industries" FROM "industries" WHERE "industries"."id" = "users"."industry_id1")'), 'ind1_name']
                ,[db.sequelize.literal('(SELECT "industries" FROM "industries" WHERE "industries"."id" = "users"."industry_id2")'), 'ind2_name']
                ,[db.sequelize.literal('(SELECT "industries" FROM "industries" WHERE "industries"."id" = "users"."industry_id3")'), 'ind3_name']  
        ]}
        ,include:[
            {model:db.schools}
        ]
        ,where: {
            username: {[Sequelize.Op.eq]: userID}
        }
    }).then(results=>{
        // console.log(results)
        if (results){
            res.render('profileEdit',{
                data:results[0],
                topMsg:"Edit Profile".toUpperCase(),
                secondMsg:''
            });
        } else{
            res.render('message',{topMsg:`Error: ${error}`,secondMsg:''});        // if error, go back to all cards
        }   
    }).catch(error=>{
        res.render('message',{
            topMsg:`Error: ${error}`,
            secondMsg:'Please try again'});
    })
})

module.exports = router;