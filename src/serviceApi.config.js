// const BASEURL = " http://0.0.0.0:7300/mock/5e44ca03042ca13c5c646b47/index/"
const BASEURL="http://182.92.154.87:7300/mock/5e6c95dca6a6a01e5999ce81/market/"
const LOCALURL = "http://182.92.154.87:3001/"
const URL = {
  getShopMailInfo: BASEURL + "marketHome", //商城首页所有信息
  getGoodsInfo: BASEURL + "getGoodsInfo",
  registerUser: LOCALURL + 'user/register', //用户注册接口
  loginUser: LOCALURL + 'user/login', //用户登录接口
  getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo', //获取商品详情接口
  getCategoryList: LOCALURL + 'goods/getCategoryList',  //获取大类列表接口
  getCategorySubList: LOCALURL + 'goods/getCategorySubList',  //获取子类列表的接口
  getGoodsListBySub: LOCALURL + 'goods/getGoodsListBySub',  //根据子类获取商品列表

};

module.exports = URL
