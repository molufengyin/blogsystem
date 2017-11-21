
const express = require('express');
const router = express.Router();
const PostModel = require('../models/article');

router.get('/remove/:author/:time/:title', function (req, res) {
    PostModel.findOneAndRemove({
        author: req.params.author,
        'time.day': req.params.time,
        title: req.params.title
    }).exec(function (err) {
        if (err) {
            req.flash('error', err);
            // 生成固定的路径
            var url = encodeURI('/u/' + req.params.author + '/' +
                req.params.time + '/' + req.params.title)
            return res.redirect(url);
        }
        req.flash('success', '文章删除成功');
        res.redirect('/');
    })
})


module.exports = router;