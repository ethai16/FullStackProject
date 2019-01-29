sequelize model:generate --name Session --attributes expire:date,data:string

sequelize model:generate --name users --attributes username:string,password_salt:string,password_hash:string,fname:string,lname:string,email:string,telephone:string,zipcode:string,street:string,city:string,bio:text,image_url:string,active:boolean,grade:string,position:string,backgroundcheck:boolean,company_name:string,company_zipcode:string,company_street:string,company_city:string,company_telephone:string

sequelize model:generate --name roles --attributes role:string

sequelize model:generate --name schools --attributes name:string,zipcode:string,street:string,city:string,type:string,telephone:string

sequelize model:generate --name matchings --attributes code:integer,active:boolean,name:string

sequelize model:generate --name industries --attributes industries:string
sequelize model:generate --name states --attributes state:string
sequelize model:generate --name comments --attributes comment:string
