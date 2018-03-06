var Sequelize=require('sequelize');
var sequelize=require('./module_head')();
var renzhengmodule=sequelize.define('renzhengs',{
    id:{
        type:Sequelize.BIGINT,
        primaryKey:true
    },
    uid:Sequelize.STRING,
    name:Sequelize.STRING,
    native:Sequelize.STRING,
    address:Sequelize.STRING,
    idphoto:Sequelize.STRING,
    idname:Sequelize.STRING,
    status:Sequelize.STRING,
    idphotopath:Sequelize.STRING,
},{
    timestamps:false,
});
module.exports=renzhengmodule;