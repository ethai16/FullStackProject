const express = require('express');
const router = express.Router();
const db = require('../models/');
const Sequelize = require('sequelize');;
const crypto = require('crypto');


router.get('/signup',(req,res)=>{
    res.redirect('/');
});

// SELECT * FROM states; SELECT * FROM schools; SELECT * FROM industries;
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
                    res.render('message',{topMsg:`Error: ${error}`,secondMsg:`Please Try Again`});        // if error, go back to all cards
                }   
            })
        }) 
    })         
})
router.get('/signup/:roleID/:userID',(req,res)=>{
    let roleID = req.params.roleID;
    let userID = req.params.userID;

// SQL for below sequelize     
//   SELECT username, 
// 	(select industries from industries where industries.id = users.industry_id1) ind1_name,
// 	(select industries from industries where industries.id = users.industry_id2) ind2_name,
// 	(select industries from industries where industries.id = users.industry_id3) ind3_name
// FROM
// 	users
// 	WHERE username = [the username of the user]


    // db.users.findAll({
    //     raw:true
    //     ,attributes: {
    //         include: [
    //             [db.sequelize.literal('(SELECT "industries" FROM "industries" WHERE "industries"."id" = "users"."industry_id1")'), 'ind1_name']
    //             ,[db.sequelize.literal('(SELECT "industries" FROM "industries" WHERE "industries"."id" = "users"."industry_id2")'), 'ind2_name']
    //             ,[db.sequelize.literal('(SELECT "industries" FROM "industries" WHERE "industries"."id" = "users"."industry_id3")'), 'ind3_name']  
    //     ]}
    //     ,include:[
    //         {model:db.schools}
    //     ]
    //     ,where: {
    //         username: {[Sequelize.Op.eq]: userID}
    //     }
    // }).then(results=>{
    //     if (results.length > 0){
    //         res.render('signupEdit',{
    //             data:results[0],
    //             topMsg:"Edit Profile".toUpperCase(),
    //             secondMsg:''
    //         });
    //     } else{
    //         res.render('message',{topMsg:`Error: Please double check username`,secondMsg:`${error}`});        // if error, go back to all cards
    //     }   
    // }).catch(error=>{
    //     res.render('message',{
    //         topMsg:`Error: ${error}`,
    //         secondMsg:'Please try again'});
    // });

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
    }).then(results_user =>{
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
                    console.log(results_user.length)
                    if (results_user.length>0 && results_states.length>0 && results_schools.length>0 && results_inds.length>0 ){
                        // console.log(results)
                        res.render('signupEdit',{
                            states: results_states,
                            schools:results_schools,
                            industries:results_inds,
                            data:results_user[0],
                            topMsg:"Edit Profile".toUpperCase(),
                            secondMsg:''
                        });
                    } else{
                        res.render('message',{topMsg:`Error: Please double check username`,secondMsg:`Please Try Again`});        // if error, go back to all cards
                    }   
                })
            }) 
        })
    }).catch(error=>{
        res.render('message',{
            topMsg:`Error: ${error}`,
            secondMsg:'Please try again'});
    })

});

module.exports = router;