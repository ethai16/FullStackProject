const express = require('express');
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');
const db = require('../models/');
const Sequelize = require('sequelize');

// generate random code

function generateCode(){
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let num;
    for (let i = 0; i < 5; i++)
        num += possible.charAt(Math.floor(Math.random() * possible.length));
    console.log(num);
    return num;
}

router.get('/api',(req, res)=>{
    // db.users.findOne({where:{username: {[Sequelize.Op.eq]: req.body.userename}}})
    // .then(results =>{    
    //     res.render('/api')
    // });
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


router.use(bodyParser.urlencoded({extended:false}));
router.post('/api',(req, res)=>{
    console.log(req.body.role_id)
    let industry_id1, industry_id2, industry_id3, school_id, company_state_code, grade, code;

    
  

    // ここから。
    if (req.body.role_id === '1'){  //teacher
        industry_id1 = parseInt(req.body.teacher_industry)
        , grade = null
        , code = null
        , company_state_code = null
        , school_id = parseInt(req.body.teacher_school)
    } else if (req.body.role_id === '2'){   //student
        industry_id1 = parseInt(req.body.student_industries1)
        , industry_id2 = parseInt(req.body.student_industries2)
        , industry_id3 = parseInt(req.body.student_industries3)
        , company_state_code = null
        , grade = req.body.grade
        , code = generateCode()
        , school_id = parseInt(req.body.student_school)

    }else{  //mentor
        industry_id1 = parseInt(req.body.company_industries1)
        , industry_id2 = parseInt(req.body.company_industries2)
        , grade=null
        , company_state_code = req.body.company_state_code
        , code =null
        // , industry_id3 = null
        // , school_id = null
        // , 
    }

    db.users.create({
        username:req.body.username, 
        fname:req.body.fname, 
        lname:req.body.lname, 
        email:req.body.email, 
        telephone:req.body.telephone,
        zipcode:req.body.zipcode,
        street:req.body.street,
        city:req.body.city,
        bio:req.body.bio,
        image_url:req.body.image_url,
        active:true,
        grade,
        position:req.body.position,
        background_check:false,
        company_name:req.body.company_name,
        company_zipcode:req.body.company_zipcode,
        company_street:req.body.company_street,
        company_city:req.body.company_city,
        company_telephone:req.body.company_phone,
        title:req.body.title,
        code:req.body.code,
        industry_id1,
        industry_id2,
        industry_id3,
        role_id:parseInt(req.body.role_id),
        school_id,
        state_code:req.body.state_code,
        company_state_code
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