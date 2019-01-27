const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../models/');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

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
    db.users.findOne({where:{username: {[Sequelize.Op.eq]: req.body.userename}}})
    .then(results =>{    
        res.render('/api')
    });
});


router.use(bodyParser.urlencoded({extended:false}));
router.post('/api',(req, res)=>{
    let industry_id1, industry_id2, industry_id3, school_id, company_state_code, grade, code;
    const role_id = parseInt(req.body.role_id )

    if (role_id === 1){  //teacher
        industry_id1 = parseInt(req.body.teacher_industry)
        , grade = null
        , code = null
        , company_state_code = null
        , school_id = parseInt(req.body.teacher_school)
    } else if (role_id === 2){   //student
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

    var pwd = req.body.password;
    //utilizing bcrypt
    const {username, fname, lname, email, 
        telephone, zipcode, street, city, bio,image_url,
        position, company_name, company_zipcode, 
        company_street, company_city, company_telephone,
        title, state_code} = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(pwd, salt, (err, hash) => {
            db.users.create({
                username,
                password_hash: hash,
                password_salt: salt,
                fname, lname, email, telephone, zipcode,
                street,city,bio, image_url,grade, position,
                active:true,
                background_check:false,
                company_name, company_zipcode,company_street,
                company_city,company_telephone,title,
                code,
                industry_id1,
                industry_id2,
                industry_id3,
                role_id,
                school_id,
                state_code,
                company_state_code
            })
            .then(results => {
                res.json(results),{title:'User registered successfully'}
            })
            .catch(error => {
                console.error(`Error Message: ${error}`)
            })
        });
    });
});


module.exports = router;