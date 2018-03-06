var express = require('express');
var router = express.Router();
var mysql=require('mysql');
var usermodule=require("../module/module_user.js");
var pool=mysql.createPool({

})
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('index', { title: '智能系统' });
});
router.get('/home', function(req, res, next) {
    if(loginbean.role==0){
        res.render('adminhome',{loginbean:loginbean,title:'智能系统'});
    }else{
        res.render('home',{title:'智能系统',loginbean:req.session.loginbean});
    }

});
router.get('/renzheng',function(req,res){
    res.render('renzheng')
})
router.get('/loginout',function(req,res,next){
    delete req.session.loginbean;
    res.redirect('/')
});
router.get('/register',function(req,res){
  res.render('register')
})
router.get('/login',function(req,res){
    res.render('login')
})

router.post('/login',function (req,res,next){
    console.log('---------------');
    console.log(req.body);
    usermodule.findOne({
        where:{name:req.body.name,pwd:req.body.pwd}
    }).then(function (rs){
        if(rs){
            console.log('---------------');
            console.log(rs);
            loginbean={};
            loginbean=req.body;
            loginbean.id=rs.id;
            loginbean.role=rs.role;
            req.session.loginbean=loginbean;
            res.redirect('/home');
        }else{
            res.send('账号或密码错误');
        }
    })
})

router.post('/register',function(req,res,next){
    usermodule.create(req.body).then(function(rs){
        if(rs){
            console.log('1')
            res.redirect(307,"/login");
        }
    }).catch(function (err){
        console.log('=================================');
        console.log(err.errors);
        if(err.errors[0].path=='name'){
            res.send('该账号已被注册');
        }else{
            res.send('数据库出错');
        }
    })
})
module.exports = router;
