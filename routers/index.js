
const express = require('express');
// 生成路由对象
const router = express.Router();
const PostModel = require('../models/article');


// 默认的首页路径是  / ,
router.get('/', function (req, res) {
    // 设置页码的初始值  parseInt() 将字符串转换成整型数字
    // parseFloat() 浮点数
    var page = parseInt(req.query.page || 1)  // ?
    // 设置每页显示的文章数量
    var size = 1;

    PostModel.find().count(function (err, count) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/zhuce');
        }
        // 页码数量
        var pageTotal = Math.ceil(count / size);

        // pages:存储的是显示的页码，及其个数：length, 5
        // page = 10
        var pages = [page];
        var left = page;//3
        var right = page;//3
        //1:[1]
        //2:[1,2]
        //3:[1,2,3]
        //4:[1,2,3,4]
        //5: [1,2,3,4,5] 
        //6:[2,3,4,5,6]
        // i++
        // ++i
        while (( (right < pageTotal) || (left > 1))  && pages.length < 5 ) {
            // 4,5,6,7,8
            if (right < pageTotal) {
                pages.push(++right);//4  5
            }
            // 3,4,5,6,7
            // 2,3,4,5,6
            if (left > 1) {
                pages.unshift(--left);//2  1
            }
        }

        // get请求路径及其请求数据的结构:
        // /login?name=value&name=value
        // sort()排序   skip(n)跳过n篇文章，limit(m)限制显示m篇文章
        PostModel.find().sort({ 'time.date': -1 }).skip(size * (page - 1)).limit(size).exec(function (err, posts) {
            // console.log(count);
            // console.log(posts);
            if (err) {
                req.flash('error', err);
                return res.redirect('/zhuce');
            }
            res.render('index', {
                title: '博客系统首页',
                // 将session中的用户信息发送给浏览器端
                // 如果数据存在，发送数据
                // 如果数据不存在，发送则是 undefined
                user: req.session.user,
                // 将某状态的描述信息转换成字符串发送给浏览器端
                // 如果状态存在，发送其描述信息
                // 如果不存在，发送则是undefined
                success: req.flash('success').toString(),
                error: req.flash('error').toString(),
                posts: posts,
                page: page,
                pageTotal: pageTotal,
                pages: pages
                // isLast:  
            })
        })
    })
})

// 导出模块
module.exports = router;


