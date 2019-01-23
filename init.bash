sequelize model:generate --name Session --attributes expire:date,data:string

sequelize model:generate --name users --attributes fname:string,lname:string,gender:char,email:string,telephone:string,zipcode:string,street:string,city:string,state:char,bio:text,image_url:string,active:boolean,role_id:smallint

sequelize model:generate --name logins --attributes username:string,password_salt:string,password_hash:string

sequelize model:generate --name role --attributes role:string

sequelize model:generate --name schools --attributes name:string,zipcode:string,street:string,city:string,state:string,type:string

sequelize model:generate --name mentors --attributes company_name:string,company_phone:string,title:string,backgroundcheck:boolean,memo:text

sequelize model:generate --name teachers --attributes memo:text

sequelize model:generate --name students --attributes grade:integer,memo:text

sequelize model:generate --name matching --attributes code:integer,active:boolean

sequelize model:generate --name industries --attributes industries:string