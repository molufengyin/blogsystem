
const express = require('express');
// 生成路由对象
const router = express.Router();
const PostModel = require('../models/article');

router.get('/tags', function (req, res) {

    // distinct() 方法使用类似于find()
    // 查询集合数据中，某个字段(数据的属性名)的所有的不重复的值
    PostModel.distinct('tags').exec(function (err, tags) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/tags');
        }
        // console.log(tags);

        // req.flash('success', '');

        res.render('tags', {
            title: '标签种类',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString(),
            tags: tags
        })
    });


})
module.exports = router;

