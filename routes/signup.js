const express = require('express');
const router = express.Router();

router.get('/signup',(req,res)=>{
    res.render('signup')
})
router.get('/signup2',(req,res)=>{
    res.render('signup2')
})

module.exports = router