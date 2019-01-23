const express = require('express');
const app = express();
const db = require('./models/')
const session = require('express-session')
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static('public'));
app.use(require('./routes/index'));
app.use(require('./routes/register'));

db.sequelize.sync({force:true}).then(()=>{
    app.listen(3000, ()=>{
        console.log('listening on port 3000')
    })
})

