const Koa = require('koa');
const app = new Koa();
const Router = require("koa-router");
let router = new Router();
const mongoose = require('mongoose');
const fs = require('fs');

//以下三个都是添加数据的接口
router.get('/insertAllGoodsInfo', async (ctx) => {
  fs.readFile('./data_json/newGoods.json', 'utf8', (err, data) => {
    data = JSON.parse(data);
    let saveCount = 0;
    const Goods = mongoose.model('Goods'); //引用模型
    data.map((value, index) => {
      let newGoods = new Goods(value);
      newGoods.save()
        .then(() => {
          saveCount++;
          console.log(saveCount + "成功")
        }).catch(error => {
          console.log(error)
        });
    });

  })
  ctx.body = "开始导入数据";
})
router.get('/insertAllCategory', async (ctx) => { //路由不可以多点点，不是路径，直接斜杠就可以。
  fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
    data = JSON.parse(data);
    let count = 0;
    const Category = mongoose.model('Category');
    data.RECORDS.map((value, index) => {
      let newCategory = new Category(value);
      newCategory.save()
        .then(() => {
          count++;
          console.log("成功" + count);

        })
        .catch(error => {
          console.log("失败");
          console.log(error);
        })
    })
  })
  ctx.body = "开始导入数据";

})
router.get('/insertAllSubCategory', async (ctx) => { //路由不可以多点点，不是路径，直接斜杠就可以。
  fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
    data = JSON.parse(data);
    let count = 0;
    const SubCategory = mongoose.model('SubCategory');
    data.RECORDS.map((value, index) => {
      let newSubCategory = new SubCategory(value);
      newSubCategory.save()
        .then(() => {
          count++;
          console.log("成功" + count);
        })
        .catch(error => {
          console.log("失败");
          console.log(error);
        })
    })
  })
  ctx.body = "开始导入数据";

})
//商品详情页面的路由：
//获取商品详情信息的接口：
router.post('/getDetailGoodsInfo', async (ctx) => {
  //获取前台商品id
  let goodsId = ctx.request.body.goodsId;
  const Goods = mongoose.model('Goods');
  // let result=await Goods.findOne({
  await Goods.findOne({
      ID: goodsId
    }).exec()
    // ctx.body={
    //   code:200,
    //   message:result
    // }
    .then(result => {
      ctx.body = {
        code: 200,
        message: result
      }
    }).catch(error => {
      console.log(error);
      ctx.body = {
        code: 500,
        message: error
      }
    })
})
//async方式，不使用promise中的then和catch
// router.post('/getDetailGoodsInfo',async(ctx)=>{
//   try{
//       let goodsId = ctx.request.body.goodsId
//       const Goods = mongoose.model('Goods')
//       let result=await Goods.findOne({ID:goodsId}).exec()
//       ctx.body={code:200,message:result}
//   }catch(err){
//       ctx.body={code:500,message:err}
//   }

// })
//读取大类数据的接口：
router.get('/getCategoryList', async (ctx) => {
  try {
    const Category = mongoose.model('Category');
    let result = await Category.find().exec();
    ctx.body = {
      code: 200,
      message: result
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error
    }
  }
})
//读取小类，就是子类的数据：这个接口需要接收参数
router.post('/getCategorySubList', async (ctx) => {
  try {
    let categoryId=ctx.request.body.categoryId;  //post请求中获取category的id
    // let categoryId=1;
    const SubCategory = mongoose.model('SubCategory');
    let result = await SubCategory.find({MALL_CATEGORY_ID:categoryId}).exec();
    ctx.body = {
      code: 200,
      message: result
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error
    }
  }
})
//根据类别获取商品列表
router.post('/getGoodsListBySub', async (ctx) => {
  try {
    let categorySubId=ctx.request.body.categorySubId;  //post请求中获取category的id
    let page=ctx.request.body.page; //当前页数
    let num=10;                    //每页显示数量
    let start= (page-1)*num;    //每页开始位置
    // let categorySubId="2c9f6c946016ea9b016016f79c8e0000";
    const Goods = mongoose.model('Goods');
    let result = await Goods.find({SUB_ID:categorySubId})
    .skip(start).limit(num).exec();
    //skip是跳过，limit是限制数量，这两个方法实现分页
    ctx.body = {
      code: 200,
      message: result
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error
    }
  }
})
module.exports = router;
