const express = require('express');
const router = express.Router();
const db = require('./../models');
const LocalStragety = require('passport-local').Stragety;
const passport = require('passport');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

router.use(bodyParser.urlencoded({extended: false}));



// var myStore = new SequelizeStore({
//     db: db.sequelize
// })

router.get('/cards', (req,res)=>{
    if(req.query.category==11){
        res.render('Designcards',{
            pageTitle: 'Design'
        });
    } else if(req.query.category==9) {
        res.render('Consultantcards',{
            pageTitle: 'Consultant'
        });       
    } else if(req.query.category==14) {
        res.render('Engineercards',{
            pageTitle: 'Engineer'
        });
    } else if(req.query.category==39) {
        res.render('Sciencecards',{
            pageTitle: 'Science'
        });
    } else {
        res.render('cards',{
            pageTitle: 'Cards'
        });       
    }
});


// ==== Each Cards Can check with number and name ====
// router.get('/cards/:cardsID',(req, res)=>{

//     let cardsID = req.params.cardsID;
 
//     //error handling
//     if (!parseInt(cardsID)) res.send('cards','URL Error: Please type in proper cards number.');
 
//     db.users.findAll({
//         include: [
//             { model:db.industries, required:true
//         }]
//         ,where: {
//             id: {[Sequelize.Op.eq]: cardsID}, // category
//             role_id:{[Sequelize.Op.eq]: 3} // mentor
//           }
//     }).then(results => {
//         if (results.length>0){
//             res.render('cards',{
//                 cards: results,
//                 bodyClass:"cards",
//                 param:false,
//                 pageID: results[0].name.toUpperCase()
//             });
//         } else{
//             res.redirect('/cards');        // if error, go back to all cards
//         }
//     });
//  });

module.exports = router;