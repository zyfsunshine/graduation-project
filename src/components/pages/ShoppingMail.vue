<template>
  <div>
    <!-- 搜索框 -->
    <div class="search-bar">
      <van-row class>
        <van-col span="3">
          <img :src="locationIcon" />
        </van-col>
        <van-col span="16">
          <input type="text" />
        </van-col>
        <van-col span="5">
          <button>查找</button>
        </van-col>
      </van-row>
    </div>
    <!-- 轮播图 -->
    <div class="swiper">
      <van-swipe :autoplay="3000">
        <!-- <van-swipe-item v-for="(image,index) in bannerArr" :key="index">
          <img v-lazy="image.imgUrl" alt />
        </van-swipe-item> -->
        <van-swipe-item> 
          <img src="@/assets/img/1.png" >
        </van-swipe-item>
         <van-swipe-item> 
          <img src="@/assets/img/2.png" >
        </van-swipe-item>
         <van-swipe-item> 
          <img src="@/assets/img/3.png" >
        </van-swipe-item>
         <van-swipe-item> 
          <img src="@/assets/img/4.png" >
        </van-swipe-item>
         <van-swipe-item> 
          <img src="@/assets/img/5.png" >
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 分类图标 -->
    <div class="type-bar">
      <div class="type" v-for="(type,index) in category" :key="index">
        <img v-lazy="type.image" />
        <span>{{type.mallCategoryName}}</span>
      </div>
    </div>
    <!-- 广告条 -->
    <div class="banner">
      <img :src="adbanner.PICTURE_ADDRESS" alt />
    </div>
    <!-- 商品推荐区域 -->
    <div class="goods-area">
      <div class="title">商品推荐</div>
      <div class="goods">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(good,index) in goods" :key="index">
            <div class="item">
              <img :src="good.image" />
              <div>
                <span>{{good.goodsName}}</span>
              </div>
              <div>
                <span>￥{{good.mallPrice | moneyFilter}}(￥{{good.price | moneyFilter}})</span>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- 楼层页面 -->
    <floor-component :floorData="floor1" :floorName="floorName.floor1"></floor-component>
    <floor-component :floorData="floor2" :floorName="floorName.floor2"></floor-component>
    <floor-component :floorData="floor3" :floorName="floorName.floor3"></floor-component>
    <!-- 热卖商品 -->
    <!--Hot Area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品🔥</div>
      <div class="hot-goods">
        <!--这里需要一个list组件 van-list-->
        <van-list>
          <!-- <van-row gutter="20"> -->
              <van-row class="good-content">
              <!-- 列元素之间的距离是20 像素 -->
            <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
              <goodInfo-component :good="item"></goodInfo-component>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "swiper/dist/css/swiper.css";

import { swiper, swiperSlide } from "vue-awesome-swiper";
import swiperDefault from "@/components/swiper/swiperDefault";
import swipertest from "@/components/swiper/swipertest";
import floorComponent from "@/components/component/floorComponent";
import goodInfoComponent from "@/components/component/goodInfoComponent";
import { toMoney } from "@/filter/moneyFilter.js";
import url from "@/serviceApi.config.js";

export default {
  data() {
    return {
      msg: "shopping mail ",
      locationIcon: require("@/assets/img/地址.png"),
      bannerArr: [
        { imgUrl: "http://q5kr6rt6a.bkt.clouddn.com/1.png" },
        { imgUrl: "http://q5kr6rt6a.bkt.clouddn.com/2.png" },
        { imgUrl: "http://q5kr6rt6a.bkt.clouddn.com/3.png" },
        { imgUrl: "http://q5kr6rt6a.bkt.clouddn.com/4.png" },
        { imgUrl: "http://q5kr6rt6a.bkt.clouddn.com/5.png" }
      ],
      category: [],
      adbanner: "",
      goods: [],
      swiperOption: {
        slidesPerView: 3
      },
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: []
    };
  },
  created() {
    axios({
      url: url.getShopMailInfo,
      method: "get"
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
        console.log(res.data.data);
        if (res.status === 200) {
          this.category = res.data.data.category;
          this.adbanner = res.data.data.advertesPicture;
          this.goods = res.data.data.recommend;
          this.floor1 = res.data.data.floor1;
          this.floor2 = res.data.data.floor2;
          this.floor3 = res.data.data.floor3;
          this.floorName = res.data.data.floorName;
          this.hotGoods = res.data.data.hotGoods;
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  components: {
    swiper,
    swiperSlide,
    swiperDefault,
    swipertest,
    floorComponent,
    goodInfoComponent
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  }
};
</script>

<style  scoped>
.search-bar {
  background-color: #ec7259;
}
.search-bar img {
  width: 72%;
  padding-top: 0.2rem;
}
.search-bar button {
  width: 3rem;
  height: 1.7rem;
  line-height: 1.7rem;
  background-color: #f0f8ff82;
  border-radius: 0.5rem;
  font-size: 0.7rem;
  /* padding: 0.3rem; */
  margin: 0.3rem;
}
.search-bar input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid white !important;
  background-color: #ec7259;
  color: white;
  margin-top: 0.2rem;
}
.swiper {
  clear: both;
  height: 11rem;
  overflow: hidden;
}
.swiper img {
  width: 100%;
  height: 11rem;
}
.type-bar {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 0.2rem;
  border: 0.1rem solid #ec7158;
  border-radius: 0.3rem;
  background-color: white;
}
.type {
  width: 20%;
  margin: 0.4rem 0.4rem 0.1rem 0.4rem;
}
.type-bar img {
  width: 100%;
  margin-bottom: -0.4rem;
}
.type-bar span {
  font-size: 10px;
}
.banner {
  width: 100%;
}
.banner img {
  width: 100%;
}
.goods-area {
  background-color: white;
  margin-top: 0.3rem;
}
.title {
  text-align: left;
  color: #ec7158;
  font-size: 14px;
  padding: 0.2rem;
  border-bottom: 1px solid #eee;
  background-color: white;
}
.goods {
  border-bottom: 1px solid #eee;
}
.item {
  /* border: 0.2rem solid #ec7158; */
  border-radius: 0.3rem;
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 10px;
  text-align: center;
}
.item img {
  width: 80%;
}
.hot-area {
  text-align: center;
  font-size: 14px;
  /* height: 1.8rem; */
  /* line-height: 1.8rem; */
}
.hot-title{
    background-color: #ec7158d1;
    color: white;
}
.good-content{
    background-color: #ecedf0;
}
.hot-area{
height: 119rem;

}
</style>