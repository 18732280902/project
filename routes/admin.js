var express = require('express');
var router = express.Router();
var Sequelize=require('sequelize');
var sequelize=require('../module/module_head')();
var usermodule=require('../module/module_user.js');
var renzhengmodule=require('../module/module_renzheng.js');
var formidable=require('formidable');

router.get('/admin',function (req,res,next){
    let sql = 'select * from renzhengs  where status=0;'
    sequelize.query(sql).then(function (rs){
        res.render('admin',{rs:rs[0]});
    }).catch(function (err){
        console.log(err);
    })
});

router.get('/Management',function (req,res,next){
    let sql='select * from renzhengs where id=?;'
    sequelize.query(sql,{
        replacements:[req.query.id]
    }).then(function (rs){
        res.render('Management',{rs:rs[0][0]})
    }).catch(function (err){
        console.log(err)
    })
})
router.get('/adminagree',function (req,res,next){
    let loginbean=req.session.loginbean;
    let sql='update renzhengs set status=1 where id=?'
    sequelize.query(sql,{
        replacements:[req.query.id]
    }).then(function (rs){
        usermodule.update({
            role:3
        },{
            where:{
                'id':req.query.uids
            }
        }).then(function (rs){
            res.send('1')
            console.log('==========================')
        })
    }).catch(function (err){
        console.log(err);
    })
})
router.get('/regect',function (req,res,next){
    let loginbean=req.session.loginbean;
    res.render('text',{
        id:req.query.id,
        uid:req.query.uid
    })
})

router.post('/regect',function (req,res,next){
    console.log(req.body)
    let loginbean=req.session.loginbean;
    let sql='delete from renzhengs where id=?';
    sequelize.query(sql,{
        replacements:[req.body.id]
    }).then(function (rs){
        usermodule.update({
            role:1
        },{
            where:{
                'id':req.body.uid
            }
        }).then(function (rs){
            let sql2='insert into massage(sendid,receiveid,content) value(?,?,?)';
            sequelize.query(sql2,{
                replacements:[loginbean.id,req.body.uid,req.body.text]
            }).then(function (rs){
                // res.redirect('/home')
                let sql3 = 'select * from renzhengs  where status=0;'
                sequelize.query(sql3).then(function (rs){
                    res.render('admin',{rs:rs[0]});
                }).catch(function (err){
                    console.log(err);
                })
            })
        })
    }).catch(function (err){
        console.log(err);
    })
})
module.exports = router;