<template>
  <div> 
    <div class="navbar-div">
      <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="onClickleft" />
    </div>
    <!-- 清空购物车的按钮 -->
   
    <!-- 显示购物车中的商品 -->
    <div class="goodsInfo">
      <div class="good" v-for="(item,index) in cartInfo" :key="index">
        <div class="good-img">
          <img :src="item.image" width="100%" />
        </div>
        <div class="good-text">
          <div class="good-name">{{item.name}}</div>
          <div class="good-bottom">
            <div class="good-price"> ￥{{item.price*item.count|  moneyFilter}}</div>
            <div class="good-plus"> <van-stepper v-model="item.count" /></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 计算购物车总价 -->
    <div class="allPrice">
        
        <van-button size="small" type="danger" @click="clearCart" plain class="kong-button">清空购物车</van-button>
        合计：<span style="color: #f50">￥{{totalMoney| moneyFilter}}</span>
        <button class="price-button" @click="pay">结算</button>
    </div>
  </div>
</template>

<script>
import CategoryListVue from "./CategoryList.vue";
import { toMoney } from "@/filter/moneyFilter.js";
export default {
  data() {
    return {
      cartInfo: [],
      isEmpty: false //判断购物车是否是空，通过他来控制显示哪个div
    };
  },
  methods: {
    onClickleft() {
      // this.$router.push({ name: "CategoryList" });
      this.$router.go(-1);
    },
    //得到购物车数据的方法
    getCartInfo() {
      if (localStorage.cartInfo) {
        //获得的是字符串，要变成对象
        this.cartInfo = JSON.parse(localStorage.cartInfo); //变换成对象
      }
      console.log("this.cartInfo:" + JSON.stringify(localStorage.cartInfo)); //转换为字符串
      this.isEmpty = this.cartInfo.length > 0 ? true : false;
      console.log(this.isEmpty);
    },
    //清空购物车
    clearCart() {
      localStorage.removeItem("cartInfo");
      this.cartInfo = [];
       document.getElementsByClassName("goodsInfo")[0].style.paddingBottom =0;
    },
    //支付成功页面
    pay(){
        this.$router.push({name:"Pay"})
    }
  },
  created() {
    this.getCartInfo();
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  computed:{
      totalMoney(){
          let allMoney=0;
          this.cartInfo.forEach((item,index)=>{
              allMoney+=item.price*item.count;
          })
          localStorage.cartInfo=JSON.stringify(this.cartInfo);
          return allMoney;
      }
  }
};
</script>

<style  scoped>
.goodsInfo {
  padding-bottom: 0.5px;
  margin-bottom: 100px;
}
.good {
  display: flex;
  margin: 10px;
  border-radius: 11px;
  background-color: white;
}
.good-img {
  flex: 2;
  padding: 2px;
}
.good-text {
  flex: 4;
  margin: auto 0.2px;
}
.cart-title {
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  text-align: right;
}
.good-bottom{
    display: flex;
    margin-top: 0.4rem;
}
.good-price{
    flex:2;
}
.good-plus{
     flex:4;
}
.good-price {
  color: #f50;
  /* text-align: left;
  margin: 0.2rem 0.2rem; */
}
.allPrice{
    position: fixed;
        bottom: 50.5px;
  
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    background-color: #fff;
    /* border-radius: 10px; */
    border-top: 1px solid #f0f0f0;
    text-align: right
    
    
}
.price-button{
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    background-color: #f50;
    color: white;
    border-radius: 15px;
    width: 4.3rem;
    height: 2rem;
    line-height: 2rem;
    font-size: 0.9rem;
    border: 1px solid white;
}
.kong-button{
    margin-right:2.5rem;
}

</style>