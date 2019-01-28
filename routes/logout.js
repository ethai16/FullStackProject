const express = require('express');
const router = express.Router();

router.get('/logout', function(req, res, next){
    req.session.destroy((err)=>{
        if(err) return next(err)

        req.logout();
<<<<<<< HEAD
        res.sendStatus(200)
=======
        res.render('home')
>>>>>>> 718739f0f6bcbb36646a45aac61e4a294a92b268
    })
})

module.exports = router;