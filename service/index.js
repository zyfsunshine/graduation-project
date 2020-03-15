const Koa = require("koa");
const app = new Koa();
const mongoose = require('mongoose');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');

app.use(cors());
app.use(bodyParser());



let user = require('./appApi/user.js');
let goods=require('./appApi/goods.js');
//装载所有子路由 见koa中
let router = new Router();
router.use('/user', user.routes());
router.use('/goods', goods.routes());

//router装载到app上，user装载到router上，register是user的层级。
//路由中间件加载上来。
app.use(router.routes());
app.use(router.allowedMethods());



//引入connect()
const {
  connect,
  initSchemas
} = require('./database/init.js');
//加一个立即执行函数来查看数据库是否连接成功
(async () => {
  await connect();
  initSchemas();
  //插入
  // const User=mongoose.model('User');
  // let oneUser=new User({
  //     userName:'zyuuu1',
  //     password:'123',

  // });
  // oneUser.save().then(()=>{
  //     console.log("插入成功");
  // })
  // //读出
  // let user=await User.findOne({}).exec();
  // console.log(user);

})();
app.use(async (ctx) => {
  ctx.body = "<h1>koa2</h1>"
});
app.listen(3001, () => {
  console.log("成功 3001");
})
