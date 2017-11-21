
const express = require('express');
const router = express.Router();
const PostModel = require('../models/article');

// 发布页面跳转
router.get('/fabu', function(req, res){
    res.render('fabu', {
        title:'文章发布',
        user:req.session.user,
        success:req.flash('success').toString(),
        error:req.flash('error').toString()
    })
})


// 发布数据提交保存
router.post('/fabu', function(req, res){
    console.log(req.body);
    // 获取当前的用户信息
    const currentUser = req.session.user;
    req.body.author = currentUser.uname;
    req.body.tags = [req.body.tag1, req.body.tag2, req.body.tag3];
    //
    var postFabu = new PostModel(req.body);
    postFabu.time = postFabu.timeFabu();

    // 保存数据
    postFabu.save(function(err){
        if(err){
            req.flash('error', err);
            return res.redirect('/zhuce');
        }
        req.flash('success', '发布成功');
        res.redirect('/');
    })

})

module.exports = router;




