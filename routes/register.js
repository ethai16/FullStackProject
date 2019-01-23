const express = require('express');
const router = express.Router();
const body_parser = require('body-parser')
const pbkdf2 = require('pbkdf2');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

router.get('/register', (req,res)=>{
    res.render('register')
})

router.use(body_parser.urlencoded({ extended: false }));
router.post('/register', (req,res)=>{
    var username = req.body.username;
    var pwd = req.body.password;
    //utilizing bcrypt
    bcrypt.genSalt(10, (err,salt)=>{
        console.log(salt)
        bcrypt.hash(pwd, salt, (err,hash)=>{
            console.log(hash)
        })
    })
    //requires a res, this bypasses the need to render or send new page.
    res.status(204).send();
    
    //utilizing pbkdf2 and crypto packages
    // var salt = crypto.randomBytes(256).toString('hex');
    // var key = pbkdf2.pbkdf2Sync(
    //     pwd, salt, 36000,256, 'sha256'
    // );
    // var hash = key.toString('hex')
})


module.exports = router;