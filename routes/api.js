const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../models/');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
<<<<<<< HEAD
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
=======

// generate random code
function generateCode(){
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let num ='';
    for (let i = 0; i < 5; i++){
        num += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return num
}


router.get('/api',(req, res)=>{
    db.users.findOne({where:{username: {[Sequelize.Op.eq]: req.body.userename}}})
    .then(results =>{    
        res.render('/api')
    });
});


router.use(bodyParser.urlencoded({extended:false}));
router.post('/api',(req, res)=>{
    let industry_id1, industry_id2, industry_id3, school_id, company_state_code, grade, code;
    const role_id = parseInt(req.body.role_id);
    const {username, fname, lname, email, 
        telephone, zipcode, street, city, bio,
        position, company_name, company_zipcode, image_url,
        company_street, company_city, company_telephone,
        title, state_code} = req.body;
>>>>>>> 718739f0f6bcbb36646a45aac61e4a294a92b268
        
    //teacher
    if (role_id === 1){  
        industry_id1 = parseInt(req.body.teacher_industry)
        , grade = null
<<<<<<< HEAD
        , company_state_code = null
        , school_id = parseInt(req.body.teacher_school)
        , mentor_code = null
=======
        , code = generateCode()
        , company_state_code = null
        , school_id = parseInt(req.body.teacher_school)
    
>>>>>>> 718739f0f6bcbb36646a45aac61e4a294a92b268
        //student
    } else if (role_id === 2){   
        industry_id1 = parseInt(req.body.student_industries1)
        , industry_id2 = parseInt(req.body.student_industries2)
        , industry_id3 = parseInt(req.body.student_industries3)
        , company_state_code = null
        , grade = req.body.grade
<<<<<<< HEAD
        , school_id = parseInt(req.body.student_school)
        , mentor_code = req.body.mentor_code_student
        , teacher_code = req.body.teacher_code_student
=======
        , code = null
        , school_id = parseInt(req.body.student_school)
>>>>>>> 718739f0f6bcbb36646a45aac61e4a294a92b268
    //mentor
    }else{  
        industry_id1 = parseInt(req.body.company_industries1)
        , industry_id2 = parseInt(req.body.company_industries2)
        , grade=null
        , company_state_code = req.body.company_state
<<<<<<< HEAD
        , teacher_code = null
=======
        , code =null
>>>>>>> 718739f0f6bcbb36646a45aac61e4a294a92b268
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
<<<<<<< HEAD
                company_city,company_telephone,title,
                industry_id1,industry_id2,industry_id3, teacher_code, mentor_code,
                role_id,school_id,state_code,company_state_code
            })
            .then(results => {
                res.render('/dashboard',{
                    topMsg:`Welcome, ${results.username}!`,
                    secondMsg:``
                })                      
            })
            .catch(error => {
                // req.flash("error",`Error Message: ${error}`)
                // res.locals.error = req.flash();
                res.render('message',{
                    topMsg:`ERROR, ${error}.`,
                    secondMsg:`Please try registration again.`
                })                
=======
                company_city,company_telephone,title,code,
                industry_id1,industry_id2,industry_id3,
                role_id,school_id,state_code,company_state_code
            })
            .then(results => {
                res.json(results),{title:'User registered successfully'}
            })
            .catch(error => {
                console.error(`Error Message: ${error}`)
>>>>>>> 718739f0f6bcbb36646a45aac61e4a294a92b268
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
        res.render('/message',{
            topMsg:`${userID} has been deleted successfully.`,
            secondMsg:`Sad to see you go....`
        });

    }).catch(error=>{
        res.render('/message',{
            topMsg:`Error: ${error}`,
            secondMsg:`Please try again.`,
        });
    })
})



router.put('/api/edit/:userID',(req,res)=>{
    let userID = req.params.userID;
    
    db.users.findOne({
        where: {
            username: {[Sequelize.Op.eq]: userID}
        }
    }).then(results=>{
        console.log(results)
        // res.render('signup',{
        //     states: results.state_code,
        //     schools:results.school.name,
        //     industries:results.industries.name,
        //     topMsg:"edit Profile".toUpperCase()
        // });
    }).catch(error=>{
        console.log(error)
    })
})
// // // edit
// router.put('/api/edit/userId',(req, res)=>{
//     let paramId = parseInt(req.params.id);
//     let fdbk = req.body.feedback;
// // way 2
//     db.users.update(
//         {feedback: fdbk}
//         ,{where:{username: {[Sequelize.Op.eq]: paramId}}
//     })
//     .then(results => {
//         // console.log(data.get({plain: true}))
//         console.log('updated successfully)
//     })
//     .catch(error => {
//         console.error(`Error Message: ${error}`)
//     })
// })

module.exports = router;