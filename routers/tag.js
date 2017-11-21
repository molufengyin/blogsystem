const express = require('express');
// 生成路由对象
const router = express.Router();
const PostModel = require('../models/article');

// 获取单个标签种类的文章
router.get('/tags/:tag', function (req, res) {
    // 获取请求路径中的参数
    // console.log( req.params );
    var tag = req.params.tag;
    PostModel.find({ tags: tag }).sort({ 'time.date': -1 }).exec(function (err, posts) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/tags');
        }
        console.log(posts);
        res.render('tag', {
            title: 'TAG: ' + tag,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString(),
            posts: posts
        })
    })
})


module.exports = router;