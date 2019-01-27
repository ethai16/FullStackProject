const express = require('express');
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');
const db = require('../models/');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');




router.get('/api', (req, res) => {
    db.users.findOne({ where: { username: { [Sequelize.Op.eq]: req.body.userename } } })
        .then(results => {
            res.render('/api')
        });
    // attributes:['id','name','feedback','feeling.icon']
    //     ,order: [['id', 'DESC']]
    //     ,include: [{
    //         model:db.feelings,
    //         required:true
    //     }]
    // }).then(results => {
    //         res.json(results)
    // });
});


router.use(bodyParser.urlencoded({ extended: false }));
router.post('/api', (req, res) => {
    let icon = !(req.body.icon) ? null : parseInt(req.body.icon);
    console.log(req.body)
    let industry_id1, industry_id2, industry_id3, school_id;

    if (req.body.role_id === '1') {
        industry_id1 = parseInt(req.body.teacher_industry)
            , industry_id2 = null
            , industry_id3 = null
            , school_id = parseInt(req.body.teacher_school)
    } else if (req.body.role_id === '2') {
        industry_id1 = parseInt(req.body.student_industries1)
            , industry_id2 = parseInt(req.body.student_industries2)
            , industry_id3 = parseInt(req.body.student_industries3)
            , school_id = parseInt(req.body.student_school)
    } else {
        industry_id1 = parseInt(req.body.company_industries1)
            , industry_id2 = parseInt(req.body.company_industries2)
            , industry_id3 = 0
    }
    var pwd = req.body.password;
    //utilizing bcrypt

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(pwd, salt, (err, hash) => {
            db.users.create({
                username: req.body.username,
                password_hash: hash,
                password_salt: salt,
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                telephone: req.body.phone,
                zipcode: req.body.zip,
                street: req.body.address,
                city: req.body.city,
                bio: req.body.bio,
                image_url: req.body.image_url,
                active: true,
                grade: req.body.studentgrade,
                position: req.body.position,
                background_check: false,
                company_name: req.body.company_name,
                company_zipcode: req.body.company_zip,
                company_street: req.body.company_address,
                company_city: req.body.company_city,
                company_telephone: req.body.company_phone,
                title: req.body.title,
                code: req.body.code,
                industry_id1,
                industry_id2,
                industry_id3,
                role_id: parseInt(req.body.role_id),
                school_id,
                state_code: req.body.state,
                company_state_code: req.body.company_state
            })
                .then(results => {
                    res.json(results)
                    // console.log(data.get({plain: true}))
                    // db.users.findAll({
                    //     attributes:['id','name','feedback','feeling.icon']
                    //     ,order: [['id', 'DESC']]
                    //     ,include: [{
                    //         model:db.feelings,
                    //         required:true
                    //         }]
                    // })
                    // .then(results => {
                    //         res.json(results)
                    // });
                })
                .catch(error => {
                    console.error(`Error Message: ${error}`)
                })
        })
    })

});


// // delete route
// router.delete('/api/delete/:id',(req, res)=>{
//     let paramId = parseInt(req.params.id);
//     db.feedbacks.destroy({
//         where:{id: {[Sequelize.Op.eq]: paramId}}
//         })
//     .then(results => {
//         // console.log(data.get({plain: true}))
//         db.feedbacks.findAll({
//             attributes:['id','name','feedback','feeling.icon']
//             ,order: [['id', 'DESC']]
//             ,include: [{
//                 model:db.feelings,
//                 required:true
//                 }]
//         })
//         .then(results => {
//                 res.json(results)
//         });
//     })
//     .catch(error => {
//         console.error(`Error Message: ${error}`)
//     })

// })

// // // edit
// router.put('/api/edit/:id',(req, res)=>{
//     let paramId = parseInt(req.params.id);
//     let fdbk = req.body.feedback;
// // way 2
//     db.feedbacks.update(
//         {feedback: fdbk}
//         ,{where:{id: {[Sequelize.Op.eq]: paramId}}
//     })
//     .then(results => {
//         // console.log(data.get({plain: true}))
//         db.feedbacks.findAll({
//             attributes:['id','name','feedback','feeling.icon']
//             ,order: [['id', 'DESC']]
//             ,include: [{
//                 model:db.feelings,
//                 required:true
//                 }]
//         })
//         .then(results => {
//                 res.json(results)
//         });
//     })
//     .catch(error => {
//         console.error(`Error Message: ${error}`)
//     })
// })

module.exports = router;