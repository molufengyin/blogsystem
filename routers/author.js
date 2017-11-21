const express = require('express');
const router = express.Router();
const PostModel = require('../models/article'); 

// 作者的文章获取
router.get('/u/:author', function(req, res){
    var page = parseInt(req.query.page || 1);  // ?
    // 设置每页显示的文章数量
    var size = 2;
    var author = req.params.author;
    PostModel.find({author}).count(function(err, count){

    if (err) {
            req.flash('error', err);
            return res.redirect('/zhuce');
        }
        // 页码数量
        var pageTotal = Math.ceil(count / size);
        var pages = [page];
        var left = page;
        var right = page;
        while ( (right < pageTotal) || (left > 1)  && pages.length < 5 ) {
            if (right < pageTotal) {
                pages.push(++right);
            } 
            if (left > 1) {
                pages.unshift(--left);
            }
        }

        PostModel.find({author}).sort({ 'time.date': -1 }).skip(size * (page - 1)).limit(size).exec(function(err, posts){
            if(err){
                req.flash('error', err);
                return res.redirect('/');
            }
            res.render('index', {
                title:req.params.author,
                success:req.flash('success').toString(),
                error:req.flash('error').toString(),
                user:req.session.user,
                posts:posts,
                page: page,
                pageTotal: pageTotal,
                pages: pages
            })
        })
    })
})

module.exports = router;