
const express = require('express');
// 生成路由对象
const router = express.Router();
const PostModel = require('../models/article'); 

router.post('/comment/:author/:time/:title', function (req, res) {
    console.log(req.body);
    var now = new Date();
    // 设置文章发布的时间格式
    req.body.time = {
        date: now,
        year: now.getFullYear(),
        month: now.getFullYear() + '-' + (now.getMonth() + 1),
        day: now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate(),
        minute: now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() +
        ' ' + (now.getHours() < 10 ? '0' : '') + now.getHours() +
        ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes()
    }
    var url = encodeURI('/u/' + req.params.author + '/' +
        req.params.time + '/' + req.params.title)
    PostModel.findOne({
        author: req.params.author,
        'time.day': req.params.time,
        title: req.params.title
    }).exec(function (err, data) {
        if (err) {
            req.flash('error', err);

            return res.redirect(url);
        }
        if (!data) {					
            req.flash('error', '文章不存在');
            return res.redirect('/');
        }
        data.comments.push(req.body);
        // data.comments.unshift(req.body);
        PostModel.findOneAndUpdate({
            author: req.params.author,
            'time.day': req.params.time,
            title: req.params.title
        }, data).exec(function (err) {
            if (err) {
                req.flash('error', err);
                return res.redirect(url);
            }
            req.flash('success', '评论成功')
            res.redirect(url);
        })
    })
})


module.exports = router;