const express = require('express');
const router = express.Router();
const PostModel = require('../models/article'); 

// 文章编辑页面跳转
router.get('/edit/:author/:time/:title', function (req, res) {

    PostModel.findOne({
        author: req.params.author,
        'time.day': req.params.time,
        title: req.params.title
    }).exec(function (err, post) {
        if (err) {
            req.flash('error', err);
            var url = encodeURI('/u/' + req.params.author + '/' +
                req.params.time + '/' + req.params.title)
            return res.redirect(url);
        }
        if (!post) {
            req.flash('error', '文章不存在');
            return res.redirect('/');
        }
        res.render('edit', {
            title: '编辑页面',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString(),
            post: post
        })
    })
})

// 文章编辑页面数据更新
router.post('/edit/:author/:time/:title', function (req, res) {
    PostModel.findOneAndUpdate({
        author: req.params.author,
        'time.day': req.params.time,
        title: req.params.title
    }, req.body).exec(function (err) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        req.flash('success', '文章更新成功');

        var url = encodeURI('/u/' + req.params.author + '/' +
            req.params.time + '/' + req.params.title)
        return res.redirect(url);
    })
})
module.exports = router;