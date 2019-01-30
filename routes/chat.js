const express =require('express');
const router = express.Router();




router.get('/chat', (req, res)=>{
    var role = ''
    if (req.user){
        if (req.user.role_id === 1){
            role = 'teacher'
        }else if (req.user.role_id === 2){
            role = 'student' 
        }else{
            role = 'mentor'
        }
        res.render('chat', {
            publicProfile: '/'+ role + '/'+ req.user.username,
            user:req.user,
            fName: req.user.fname,
            mainUserName:req.user.fname,
            fname: req.user.fname,
            lname: req.user.lname,
            profilepic: req.user.image_url,
            username: req.user.username,
            userid:req.user.id

        })
    }else{
        res.redirect('/login')
    }

});





module.exports = router