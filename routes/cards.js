const express = require('express');
const router = express.Router();
const db = require('../models/');
const Sequelize = require('sequelize');


router.get('/mentorlists', (req, res) => {

    let ind = parseInt(req.query.category);
    db.users.findAll({
        raw: true,
        attributes: 
        {
            include: [
                [db.sequelize.literal('(SELECT "industries" FROM "industries" WHERE "industries"."id" = "users"."industry_id1")'), 'ind1_name'],
                [db.sequelize.literal('(SELECT "industries" FROM "industries" WHERE "industries"."id" = "users"."industry_id2")'), 'ind2_name'],
                [db.sequelize.literal('(SELECT "industries" FROM "industries" WHERE "industries"."id" = "users"."industry_id3")'), 'ind3_name'],
            ]
        },
        include:[{
            model: db.roles,
            required: true
        }],
        where: {
            role_id: {
                [Sequelize.Op.eq]: 3
            },
            industry_id1: {
                [Sequelize.Op.eq]: ind
            }
        }
    }).then(results => {
        if (results.length > 0) {
            res.render('mentorlists', {
                data: results[0],
                publicProfile: `/${results[0]['role.role']}/${results[0].username}`,
                // pageTitle:results[0].ind1_name,
                pageTitle:'search results'.toUpperCase(),
                mainUserName: results[0].fname,
                user: results[0]
            })
        }else{
            res.render('message', {
                topMsg: `ERROR: No mentor registered under that category.`,
                secondMsg: `Please try again.`
            })            
        }
    }).catch(error => {
        res.render('message', {
            topMsg: `ERROR, ${error}.`,
            secondMsg: `Please try Update again.`
        })
    })
});


module.exports = router;