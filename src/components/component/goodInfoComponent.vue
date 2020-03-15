<template>
  <div class="goods-info" @click="goGoodsPage">
    <!-- //不一样，在16课视频13分 -->
    <div class="goods-image">
      <img v-lazy="good.image" width="90%" />
    </div>
    <div class="goods-name">{{good.name}}</div>
    <div class="goods-price">￥{{good.price | moneyFilter }}</div>
  
  </div>
</template>

<script>
import { toMoney } from "@/filter/moneyFilter.js";
export default {
  data() {
    return {
     
    };
  },
  props: ["good"],
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  methods:{
    goGoodsPage(){
      // this.goodsId=this.good.goodsId;
      this.$router.push({name:'Goods',query:{goodsId:this.good.goodsId}})
    }
  }
};
</script>
<style scoped>
.goods-name {
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goods-info{
    margin: 10px;
    border-radius: 11px;
    background-color: white;

}
.goods-price{
    color: #ec7158;

}

</style>