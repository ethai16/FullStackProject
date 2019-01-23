const express = require("express");

const router = express.Router();

router.get('/register', (req,res)=>{
    res.render('register')
})

module.exports = router;