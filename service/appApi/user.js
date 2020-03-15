const Router = require('koa-router');
const mongoose = require('mongoose');
// require('../database/schema/User.js');

let router = new Router();
router.get('/', async (ctx) => {
  ctx.body = "这是用户操作首页";
})
//注册的业务逻辑
router.post('/register', async (ctx) => {
  // 已经可以接受到数据了，这里的数据需要存入数据库
  //得到前端传给后端的数据
  const User = mongoose.model('User');
  let newUser = new User(ctx.request.body);
  await newUser.save().then(() => {
    ctx.body = {
      code: 200,
      message: "注册成功"
    }
  }).catch((error) => {

    ctx.body = {
      code: 500,
      message: error,
    }
  })
})
//登录的业务逻辑
router.post('/login', async (ctx) => {
  //进入路由 得到用户名密码
  let loginUser = ctx.request.body;
  console.log(loginUser);
  let userName = loginUser.userName;
  let password = loginUser.password;
  //数据库的查找，查找用户名是否存在
  //引入User中的model
  const User = mongoose.model('User'); //使用的user这个schema
  await User.findOne({
    userName: userName
  }).exec().then(async (result) => { //使用await等待查找结果
    console.log(result);
    if (result) {
      //密码的比对
      //因为是User.js中的实例方法，所以要先声明一个实例，来调用这个方法，User.js中的comparePassword
      let newUser = new User();
      //第二个参数是前端的密码，第二个密码是数据库中的密码
      await newUser.comparePassword(password, result.password).then((isMatch) => {
        ctx.body = {
          code: 200,
          message: isMatch
        }
      }).catch(err => {
        console.log(err);
        ctx.body = {
          code: 200,
          message: err
        }
      })
    } else {
      ctx.body = {
        code: 2000,
        message: "用户名不存在"
      }
    }
  }).catch(error => {
    console.log(error);
    ctx.body = {
      code: 500,
      message: error
    }
  })
})

module.exports = router;
