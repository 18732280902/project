var Sequelize=require('sequelize');
var sequelize=require('./module_head')();
// console.log(sequelize)
var usermodule=sequelize.define('usernames',{
    id:{
        type:Sequelize.BIGINT,
        primaryKey:true
    },
    name:Sequelize.STRING,
    pwd:Sequelize.STRING,
    createtime:Sequelize.DATE,
    updtime:Sequelize.DATE,
    role:Sequelize.INTEGER
},{
    timestamps:false,
});
module.exports=usermodule;
