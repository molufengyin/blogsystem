
const express = require('express');
const router = express.Router();
const PostModel = require('../models/article');

router.get('/storage', function(req, res){
    PostModel.find().sort({ 'time.date': -1 }).exec(function(err, posts){
        if(err){
			
        }
        res.render('tag', {
            title: '存档 ',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString(),
            posts: posts
        })
    })
})













module.exports = router;