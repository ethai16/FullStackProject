const express = require('express');
const router = express.Router();



router.get('/chat', (req, res)=>{
    if (req.user){
        if (req.user.role_id === 1){
            role = 'teacher'
        }else if (req.user.role_id === 2){
            role = 'student' 
        }else{
            role = 'mentor'
        }
    }else{
        res.redirect('/login')
    }
    res.render('chat', {
        publicProfile: '/'+ role + '/'+ req.user.username

    })
});


module.exports = router