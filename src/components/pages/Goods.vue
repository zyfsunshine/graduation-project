<template>
  <div class="goodInfo">
    <div class="goods-top">
      <!-- 商品详情
      {{this.goodsId}}-->
      <div class="navbar-div">
        <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickleft" />
      </div>
      <div class="good-img">
        <img :src="good.IMAGE1" width="100%" :onerror="errorImg" />
      </div>
      <div class="good-price">
        <span style="font-size:0.5rem">抢鲜价</span>
        <br />
        <span style="font-size:22px">
          ￥{{good.PRESENT_PRICE | moneyFilter}}
          <span style="color:#3C3C3C;font-size:15px">价格￥</span>
          <span
            style="text-decoration:line-through;color:#3C3C3C;font-size:15px"
          >{{good.ORI_PRICE | moneyFilter}}</span>
        </span>
      </div>
      <div class="good-name">
        <strong>{{good.NAME}}</strong>
      </div>
      <div class="middle"></div>
      <div>
        <!--  swipeable这个属性实现滑动切换  sticky实现吸顶效果 -->
        <van-tabs swipeable sticky>
          <van-tab title="商品详情">
            <div class="detail" v-html="good.DETAIL"></div>
          </van-tab>
          <van-tab title="评论">
            <comment :cid="this.$route.name"></comment>
          </van-tab>
        </van-tabs>
      </div>
    </div>

    <div class="goods-bottom">
      <div class="button-left">
        <van-button size="large" type="primary" color="“#ec7259”" @click="addGoodToCart">加入购物车</van-button>
      </div>
      <div class="button-right">
        <van-button size="large" @click="pay">直接购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceApi.config.js";
import { Toast } from "vant";
import comment from "@/components/component/comment";
import { toMoney } from "@/filter/moneyFilter.js";

export default {
  data() {
    return {
      goodsId: "",
      good: {}, //商品所有详细信息
      errorImg: 'this.src="' + require("@/assets/img/error.png") + '"'
    };
  },
  created() {
    //兼容式处理。
    this.goodsId = this.$route.query.goodsId
      ? this.$route.query.goodsId
      : this.$route.params.goodsId;
    console.log(this.goodsId);
    this.getInfo();
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  methods: {
    getInfo() {
      axios({
        url: url.getDetailGoodsInfo,
        method: "post",
        data: { goodsId: this.goodsId }
      })
        .then(res => {
          if (res.data.code === 200 && res.data.message) {
            this.good = res.data.message;
          } else {
            Toast.fail("服务器错误，数据获取失败");
          }
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    onClickleft() {
      //编程式路由,返回上一级
      this.$router.go(-1);
    },
    //增加商品到购物车
    addGoodToCart() {
      // localStorage.removeItem("cartInfo");
      // 取出本地购物车中的商品
      // 如果localstorage里面有，就将他转换为对象，如果没有就将他初始化为一个数组
      let cartInfo = localStorage.cartInfo
        ? JSON.parse(localStorage.cartInfo)
        : [];
      //有就返回查找到的第一个数据信息，没有就返回undefined
      //这里出错了，错误在箭头函数不加大花括号表示直接return，加了大花括号不可以return结果，
      //之前有花括号，导致没有return值，所以不管是否添加过该商品都会再次添加。
      let isHaveGood = cartInfo.find(cart => cart.goodsId == this.goodsId);
      console.log(isHaveGood);
      if (!isHaveGood) {
        //如果没有的话
        let newGoodsInfo = {
          goodsId: this.good.ID,
          name: this.good.NAME,
          price: this.good.PRESENT_PRICE,
          image: this.good.IMAGE1,
          count: 1
        };
        cartInfo.push(newGoodsInfo);
        localStorage.cartInfo = JSON.stringify(cartInfo);
        Toast.success("商品已添加到购物车！");
      } else {
        //如果已经有的话
        Toast.success("购物车已有此商品");
      }
      //加入购物车之后跳转到购物车页面
      this.$router.push({ name: "Cart" });
    },
    //直接购买按钮
    pay(){
        this.$router.push({name:"Pay"})
    }
  },
  components: {
    comment
  }
};
</script>

<style  scoped>
.good-price {
  color: #f50;
  text-align: left;
  margin: 0.2rem 0.2rem;
}
.goodInfo {
  background-color: white;
}
.van-tabs__line {
  background-color: #1989fa;
}
.detail {
  font-size: 0px;
}
.good-name {
  text-align: left;
  font-size: 0.9rem;
  margin: 0.2rem 0.2rem;
}
.middle {
  width: 100%;
  height: 0.8rem;
  background-color: #f0f0f0;
  margin-top: 0.3rem;
}
.goods-top {
  margin-bottom: 2.7rem;
}
.goods-bottom {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
  /* margin-top: 1rem; */
  background-color: white;
}
.goods-bottom > div {
  /* 让good-bottom下面的div均分 */
  /* 和下面的float异曲同工 */
  flex: 1;
}
.button-right button {
  background-color: #ec7259;
  border: 0;
  color: white;
}
/* .button-left{
    float: left;
    width: 50%;
}
.button-right{
    float: right;
     width: 50%;
} */
</style>