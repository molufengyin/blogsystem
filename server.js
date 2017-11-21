// 导入所需模块
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
//session设置模块
const session = require('express-session');
// session存储模块
const MongoStore = require('connect-mongo')(session);
// 即时消息设置模块
const flash = require('connect-flash');
const ejs =require('ejs');

// 实例化express
const app = express();

// 设置项目的视图模板引擎
app.set('view engine', 'ejs');

// app.use() 加载各种中间件

//加载即时消息模块  -- 请求对象中会添加req.flash()方法
app.use(flash());
// 加载session模块，并设置存储session数据
// --
app.use(session({
    secret:'boke1', // 必选参数 --- 设置session的签名,防止数据被篡改
    store:new MongoStore({
        // 自动存储session数据到数据库中
        url:'mongodb://localhost/bokesys1'
    }),
    // 设置cookie存在的期限，以毫秒计，30天
    cookie:{maxAge:1000 * 60 * 60 * 24 * 30 },
    // 是否强制性的保存未修改的数据
    resave:false,
    // 是否强制性的保存未初始化的数据
    saveUninitialized:true,
    // 设置cookie中，存储sessionId的属性名称,具有默认值，connect.sid
    name:'bokeid1'
}));

// 设置静态资源文件夹-----express唯一的内置中间件
app.use(express.static('www'));

// 处理post请求数据的模块  -- urlencoded编码类型
app.use(bodyParser.urlencoded({extended:false}));

// 处理post请求数据中模块  ---- json数据类型
app.use( bodyParser.json() );

// 解析cookie的模块
app.use( cookieParser() );

/// 加载首页模块
app.use( require('./routers/index') );

// 加载注册模块
app.use( require('./routers/zhuce') );

// 加载登录模块
app.use( require('./routers/denglu') );

// 加载发布模块
app.use( require('./routers/fabu') );

// 加载标签分类模块
app.use( require('./routers/tags') );

// 加载标签模块
app.use( require('./routers/tag') );

// 加载文章模块
app.use( require('./routers/wenzhang') );

// 加载编辑模块
app.use( require('./routers/edit') );

// 加载删除模块
app.use( require('./routers/delete') );

// 加载作者模块
app.use( require('./routers/author') );

// 加载评论模块
app.use( require('./routers/comment') );

// 加载存档模块
app.use( require('./routers/file') );

app.listen(2900, function(){
    console.log('博客系统终极版启动了2900....');
})




