<template>
  <div>
    <div class="navbar">
      <van-nav-bar title="商品分类" fixed />
    </div>
    <div class>
      <van-row>
        <van-col span="6">
          <div class="leftNav">
            <ul>
              <!-- <li class="white-font">  <img src="@/assets/img/mulu.png" width="100%"></li> -->
              <!-- 第二个参数，直接传遍历出来的大类数据中的id，将这个id传递给子类，进行查找子类中 MALL_CATEGORY_ID为id值的列表数据-->
              <li
                @click="clickCategory(index,item.ID)"
                :class="{categoryActive:categoryIndex==index}"
                v-for="(item,index) in category"
                :key="index"
              >{{item.MALL_CATEGORY_NAME}}</li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="subCategoryTab">
            <van-tabs v-model="active" @click="onClickCategorySub">
              <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
            </van-tabs>
          </div>

          <div class="list-div">
            <!-- <div v-for="(item,index) in Goodslist" :key="index">
                   <goodInfo-component :good="item"></goodInfo-component>
            </div>-->
            <!-- 将vanlist包裹起来 就有了下拉刷新的功能 -->
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list v-model="loading" :finished="finished" @load="onLoad" class="list-color">
                <div
                  class="list-item"
                  @click="goGoodsInfo(item.ID)"
                  v-for="(item,index) in Goodslist"
                  :key="index"
                >
                  <div class="list-imge">
                    <img :src="item.IMAGE1" width="100%" :onerror="errorImg" />
                  </div>
                  <div class="list-title">
                    {{item.NAME}}
                    <br />

                    ￥{{item.PRESENT_PRICE}}
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceApi.config.js";
// import { toMoney } from "@/filter/moneyFilter.js";
import { Toast } from "vant";
// import { toMoney } from "@/filter/moneyFilter.js";
import goodInfoComponent from "@/components/component/goodInfoComponent";

export default {
  created() {
    this.getCategory();
  },
  //dom加载结束之后在这个生命周期里面进行操作
  mounted() {
    let winHeight = document.documentElement.clientHeight;
    document.getElementsByClassName("leftNav")[0].style.height =
      winHeight - 46 + "px";
    document.getElementsByClassName("list-div")[0].style.height =
      winHeight - 90-50 + "px";
    // document.getElementsByClassName("leftNav").style.backgroundColor="#000";
  },
  data() {
    return {
      //看数据的名字，或者res返回的数据类型使用后端的接口进行查看，eg:http://localhost:3001/goods/getGoodsListBySub/
      category: [],
      categoryIndex: 0,
      categorySub: [],
      active: 0, //激活标签，默认从0开始激活
      loading: false, //上拉加载使用的一个变量，false才能进行上拉加载
      finished: false, //上拉加载的时候是否有数据
      Goodslist: [], //商品列表信息
      categorySubId: "", //子类id
      isRefresh: false, //下拉刷新，是否正在下拉刷新
      page: 1, //商品列表的页数
      errorImg: 'this.src="' + require("@/assets/img/error.png") + '"'
    };
  },
  //   filters:{
  //       moneyFilter(money){
  //           return toMoney(money)
  //       }
  //   },
  components: {
    goodInfoComponent
  },
  methods: {
    //获取大类列表
    getCategory() {
      axios({
        url: url.getCategoryList,
        method: "get"
      })
        .then(res => {
          console.log(res);
          if (res.data.code === 200 && res.data.message) {
            this.category = res.data.message;
            //当我们读取大类的时候，顺便读取一个大类的子类信息,参数传的是第一个大类的ID,大类数组第一个的ID
            this.getSubCategoryList(this.category[0].ID);
          } else {
            Toast("服务器错误，数据获取失败。");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //制作反白效果所需要的点击事件
    clickCategory(index, categoryId) {
      this.categoryIndex = index;
      //点击的时候获取子类列表
      this.page = 1;
      this.finished = false;
      this.Goodslist = [];
      this.getSubCategoryList(categoryId);
    },
    //根据大类id获取子类列表
    getSubCategoryList(categoryId) {
      axios({
        url: url.getCategorySubList,
        //注意这里的method没有s
        method: "post",
        //传递的参数
        data: {
          //后端中 使用koa获取的categoryId 等于传入的参数categoryId ，然后再通过koa传递给后端的接口中
          categoryId: categoryId
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.code === 200 && res.data.message) {
            this.categorySub = res.data.message;
            //默认显示的为第一个子类
            this.active = 0;
            this.categorySubId = this.categorySub[0].ID;
            this.onLoad();
          } else {
            Toast("服务器出错，数据获取失败");
            console.log(res.data.message);
          }
        })
        .catch(error => {
          Toast("服务器出错，数据获取失败");
          console.log(error);
        });
    },
    //上拉加载
    onLoad() {
      setTimeout(() => {
        //如果存在小类id直接取，如果没有就取第一个小类的id
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorySub[0].ID;
        this.getGoodsListBySub();
      }, 500);
    },
    //下拉刷新
    onRefresh() {
      //半秒之后才运行
      setTimeout(() => {
        this.isRefresh = false;
        //如果不设置这一行 会导致加载完全部的四十个数据之后 再下拉刷新 只能显示十个数据
        this.finished = false;
        this.Goodslist = []; //刷新首先要清空数据
        this.page = 1;
        this.onLoad(); //直接使用就等于刷新了
      }, 500);
    },
    //根据子类id获取商品列表
    getGoodsListBySub() {
      axios({
        url: url.getGoodsListBySub,
        //注意这里的method没有s
        method: "post",
        //传递的参数
        data: {
          //后端中 使用koa获取的categoryId 等于传入的参数categoryId ，然后再通过koa传递给后端的接口中
          categorySubId: this.categorySubId,
          page: this.page
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.code === 200 && res.data.message.length) {
            this.page++;
            this.Goodslist = this.Goodslist.concat(res.data.message);
          } else {
            this.finished = true; //表示数据已经完成了，不上拉加载了，已经请求完了
            Toast("没有更多数据了......");
          }
          this.loading = false;
        })
        .catch(error => {
          Toast("服务器出错，数据获取失败");
          console.log(error);
        });
    },
    //点击获取子类
    onClickCategorySub(index, title) {
      this.categorySubId = this.categorySub[index].ID;
      console.log(this.categorySubId);
      this.Goodslist = [];
      this.finished = false; //到底了变为true，上拉加载加载不出来了，要初始化成false，表示还可以上拉加载
      this.page = 1;
      this.onLoad();
    },
    //跳转到商品详细页
    goGoodsInfo(id) {
      //编程式导航，如果使用了name，就是用params,使用path时，使用query
      // this.$router.push({ name: "Goods", params: { goodsId: id } });
      //  this.$router.push({path:"/Goods",query:{goodsId:id}});
      //然后在Goods.vue中进行接收，使用什么传递就要用什么方式传递。
       this.$router.push({name:'Goods',query:{goodsId:id}})
    }
  }
};
</script>

<style scoped>
.navbar {
  height: 46px;
}
.leftNav {
  background-color: white;
  /* height: 700px; */
}
.leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #f0f0f0;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActive {
  background-color: #f0f0f0;
}
.list-color {
  background-color: #f0f0f0;
  margin-bottom: 53px;
}
.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border: 1px solid #f0f0f0;
  border-radius: 0.5rem;
  background-color: #fff;
  margin: 0.5rem;
  padding: 5px;
}
.list-imge {
  flex: 8;
}
.list-title {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
  text-align: left;
}
.white-font {
  color: #fff;
}
.van-tabs--line .van-tabs__wrap {
  height: 44px;
  background-color: #f0f0f0;
}
</style>