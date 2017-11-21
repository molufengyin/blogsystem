
const mongoose = require('mongoose');
const db = require('./dbs');

const postSchema = new mongoose.Schema({
    title:String,
    author:String,
    content:String,
    tags:Array,
    time:Object,
    reads:{
        // 设置默认值与类型
        type:Number, default:0
    },
    comments:{
        type:Array,default:[]
    }
})
// 当前的postSchma添加方法
postSchema.methods.timeFabu = function(){
    console.log('时间计算中');
    var now = new Date();
    // 设置文章发布的时间格式
    var times = {
        date:now,
        year:now.getFullYear(),
        month:now.getFullYear() + '-' + (now.getMonth() + 1 ),
        day:now.getFullYear() + '-' + (now.getMonth() + 1 ) + '-' + now.getDate(),
        minute:now.getFullYear() + '-' + (now.getMonth() + 1 ) + '-' + now.getDate() +
                ' ' + ( now.getHours() < 10 ? '0':'' ) + now.getHours() +
                ':' + ( now.getMinutes() < 10 ? '0' : '' ) + now.getMinutes()
    /// 毫秒的时间
    }
    return times;
}


const PostModel = mongoose.model('post', postSchema);

module.exports = PostModel;






