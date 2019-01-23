sequelize model: generate --name Session \
    --attributes expire:date,data:string

sequelize model: generate --name user \ 
    --attributes username:string,password:string

sequelize model: generate --name mentor \
    --attributes name:string,email:string,gender:string,industry_id:integer,backgroundCheck:boolean,\
    active:boolean,memo:string

sequelize model: generate --name teacher \
    --attributes name:string,email:string,gender:string,school_id:integer,telephone:string,memo:string

sequelize model: generate --name student \
    --attributes name:string,grade:integer,school_id:integer,industry_id1:integer,industry_id2:integer,industry_id3:integer,email:string,gender:string,memo:string

sequelize model: generate --name matching \
    --attributes teacher_id:integer,mentor_id:integer,student_id:integer,active:boolean

sequelize model:generate --name industries \
    --attributes industries:string

sequelize model: generate --name school \
    --attributes name:string,address:string,type:string
