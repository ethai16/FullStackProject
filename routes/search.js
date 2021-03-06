const express = require('express');
const router = express.Router();
const db = require('./../models');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

router.use(bodyParser.urlencoded({extended:false}));

var myStore = new SequelizeStore({
    db: db.sequelize
})


router.get('/search', (req,res)=>{
    var masterRole = ""
    if (req.user.role_id === 1){
        masterRole = 'teacher'
    }else if (req.user.role_id === 2){
        masterRole = 'student' 
    }else{
        masterRole = 'mentor'
    }
    // console.log('searchpage');
    db.industries.findAll()
    .then((results)=>{
        if(req.user){
        res.render('search',{
            pageTitle: 'Search',
            data: results,
            publicProfile: '/'+ masterRole + '/'+ req.user.username,
            mainUserName:req.user.fname,
            user: req.user

        }) 
    }else{
        res.redirect('/login')
    }
    })
});
// db.users.findAll({
//     raw:true
//     ,attributes: {
//         include: [
//             [db.sequelize.literal('(SELECT "industries" FROM "industries" WHERE "industries"."id" = "users"."industry_id1")'), 'ind1_name']
//             ,[db.sequelize.literal('(SELECT "industries" FROM "industries" WHERE "industries"."id" = "users"."industry_id2")'), 'ind2_name']
//             ,[db.sequelize.literal('(SELECT "industries" FROM "industries" WHERE "industries"."id" = "users"."industry_id3")'), 'ind3_name']
//     ]}
//     ,include:[
//         {model:db.schools}
// ]}).then((results)=>{
//     console.log(results);
    
// })
//     ,where: {
//         username: {[Sequelize.Op.eq]: userID}
// }



module.exports = router;