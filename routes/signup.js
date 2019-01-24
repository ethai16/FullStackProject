const express = require('express');
const router = express.Router();
const db = require('../models/');
const Sequelize = require('sequelize');


// router.get('/signup4',(req,res)=>{
//     res.render('signup4')
// })
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
  

module.exports = router;