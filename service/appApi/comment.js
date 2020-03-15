const Koa = require('koa');
const app = new Koa();
const Router = require("koa-router");
let router = new Router();
const mongoose = require('mongoose');
const fs = require('fs');

router.post('/getComment', async (ctx) => {
    //获取前台商品id
    let goodsId = ctx.request.body.goodsId;
    const Comment = mongoose.model('Comment');
    // let result=await Goods.findOne({
    await Comment.findOne({
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