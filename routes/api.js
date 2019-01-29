const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../models/');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
router.use(bodyParser.urlencoded({extended:false}));

router.get('/api',(req,res)=>{
    res.redirect('/')
})

router.post('/api',(req, res)=>{
    const role_id = parseInt(req.body.role_id);
    let {username, fname, lname, email, 
        telephone, zipcode, street, city, bio, image_url,
        position, company_name, company_zipcode, 
        company_street, company_city, company_telephone,
        title, state_code, industry_id1, industry_id2, 
        industry_id3, school_id, company_state_code, grade, teacher_code, mentor_code} = req.body;
        
    //teacher
    if (role_id === 1){  
        industry_id1 = parseInt(req.body.teacher_industry)
        , grade = null
        , company_state_code = null
        , school_id = parseInt(req.body.teacher_school)
        , mentor_code = null
        //student
    } else if (role_id === 2){   
        industry_id1 = parseInt(req.body.student_industries1)
        , industry_id2 = parseInt(req.body.student_industries2)
        , industry_id3 = parseInt(req.body.student_industries3)
        , company_state_code = null
        , grade = req.body.grade
        , school_id = parseInt(req.body.student_school)
        , mentor_code = req.body.mentor_code_student
        , teacher_code = req.body.teacher_code_student
    //mentor
    }else{  
        industry_id1 = parseInt(req.body.company_industries1)
        , industry_id2 = parseInt(req.body.company_industries2)
        , grade=null
        , company_state_code = req.body.company_state
        , teacher_code = null
    }

    const pwd = req.body.password;
    //utilizing bcrypt

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(pwd, salt, (err, hash) => {
            db.users.create({
                username,
                password_hash: hash,
                password_salt: salt,
                fname, lname, email, 
                telephone, zipcode,street,
                city,bio, image_url,grade, 
                position,
                active:true,
                background_check:false,
                company_name, company_zipcode,company_street,
                company_city,company_telephone,title,
                industry_id1,industry_id2,industry_id3, teacher_code, mentor_code,
                role_id,school_id,state_code,company_state_code
            })
            .then(results => {
                res.redirect('login')                      
            })
            .catch(error => {
                // req.flash("error",`Error Message: ${error}`)
                // res.locals.error = req.flash();
                res.render('message',{
                    topMsg:`ERROR, ${error}.`,
                    secondMsg:`Please try registration again.`
                })                
            })
        });
    });
});



router.delete('/api/delete/:userID',(req,res)=>{
    let userID = req.params.userID;
    db.users.destroy({
        where: {
            username: {[Sequelize.Op.eq]: userID}
        }
    }).then(results=>{
        res.render('home');
    }).catch(error=>{
        res.render('message',{
            topMsg:`Error: ${error}`,
            secondMsg:`Please try again.`,
        });
    })
})

router.delete('/api/delete/comment/:commentId',(req,res)=>{
    let id = req.params.commentId;
    db.comments.destroy({
        where: {
            id: id
        }
    }).then(results=>{
        res.status(204).send();
    }).catch(error=>{
        res.render('message',{
            topMsg:`Error: ${error}`,
            secondMsg:`Please try again.`,
        });
    })
})



router.put('/api/edit/:userID',(req,res)=>{
    let userID = req.params.userID;
    let pwd = req.body.password;
    //utilizing bcrypt

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(pwd, salt, (err, hash) => {
            let updatedObj = {};
            Object.keys(req.body).forEach(function(item) {
                if (item === 'password'){
                    updatedObj['password_hash']= hash,
                    updatedObj['password_salt']= salt
                } else{
                    updatedObj[item] = req.body[item];
                }
            });
            db.users.update(
                updatedObj
                ,{where: {
                    username: {[Sequelize.Op.eq]: userID}
                }
            })
            .then(results => 
                {if (results.length >0){
                    res.render('home');
                }else{
                    res.render('message',{
                        topMsg:`ERROR, No data has been updated.`,
                        secondMsg:`Please try Update again.`
                    });
                }                      
            })
            .catch(error => {
                res.render('message',{
                    topMsg:`ERROR, ${error}.`,
                    secondMsg:`Please try Update again.`
                })                
            })
        });
    });
});

    


module.exports = router;