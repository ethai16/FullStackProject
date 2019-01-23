sequelize model:generate --name Session --attributes expire:date,data:string

<<<<<<< HEAD
sequelize model: generate --name users \ 
    --attributes username:string,password:string

sequelize model: generate --name mentors \
    --attributes name:string,email:string,gender:string,industry_id:integer,backgroundCheck:boolean,\
    active:boolean,memo:string

sequelize model: generate --name teachers \
    --attributes name:string,email:string,gender:string,school_id:integer,telephone:string,memo:string

sequelize model: generate --name students \
    --attributes name:string,grade:integer,school_id:integer,industry_id1:integer,industry_id2:integer,industry_id3:integer,email:string,gender:string,memo:string
=======
sequelize model:generate --name users --attributes fname:string,lname:string,gender:char,email:string,telephone:string,zipcode:string,street:string,city:string,state:char,bio:text,image_url:string,active:boolean,role_id:smallint

sequelize model:generate --name logins --attributes username:string,password_salt:string,password_hash:string

sequelize model:generate --name role --attributes role:string

sequelize model:generate --name schools --attributes name:string,zipcode:string,street:string,city:string,state:string,type:string
>>>>>>> Hiroko

sequelize model:generate --name mentors --attributes company_name:string,company_phone:string,title:string,backgroundcheck:boolean,memo:text

sequelize model:generate --name teachers --attributes memo:text

<<<<<<< HEAD
sequelize model: generate --name schools \
    --attributes name:string,address:string,type:string
=======
sequelize model:generate --name students --attributes grade:integer,memo:text

sequelize model:generate --name matching --attributes code:integer,active:boolean

sequelize model:generate --name industries --attributes industries:string
>>>>>>> Hiroko
