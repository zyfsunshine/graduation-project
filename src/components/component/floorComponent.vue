<template>
  <!-- 楼层页面 -->
  <div class="floor">
    <!-- <div class="title">{{floorName.floor1}}</div> -->
    <div class="title">{{floorName}}</div>
    <div class="floor-normally">
      <div class="floor-left">
        <img :src="floorData0.image" width="100%" />
        <!-- <img :src="floor1[0].image" width="100%"> -->
      </div>
      <div>
        <div class="floor-two">
          <img :src="floorData1.image" width="100%" />
        </div>
        <div class="floor-three">
          <img :src="floorData2.image" width="100%" />
        </div>
      </div>
    </div>
    <div class="floor-rules">
      <div v-for="(item,index) in floorData.slice(3)" :key="index">
        <img :src="item.image" width="100%" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        // floorData:[],
      floorData0: {},
      floorData1: {},
      floorData2: {},
    };
  },
  //父组件向子组件中传值
  props: ["floorData","floorName"],
  created() {

  },
  watch:{
      floorData:function(val){
          console.log(this.floorData);
          this.floorData0=this.floorData[0];
          this.floorData1=this.floorData[1];
          this.floorData2=this.floorData[2];
      }
  }
};
</script>

<style scoped>
.title {
  text-align: center;
    color: #2c3e50;
    font-size: 14px;
    padding: 0.2rem;
    border-bottom: 1px solid #eee;
    background-color: #ebedf0;
}
.floor-normally {
  display: flex;
  flex-direction: row;
  background-color: white;
  border-bottom: 1px solid #eee;
}
.floor-two {
  border-bottom: 1px solid #eee;
}
.floor-left {
  border-right: 1px solid #eee;
}
.floor-rules {
  display: flex;
  /* //自动换行 */
  flex-wrap: wrap;
  border-bottom: 1px solid #eee;
  background-color: white;
}
.floor-rules div {
  /* border-right: 1px solid #eee; */
  width: 9.95rem;
  border-bottom: 1px solid #eee;
}
/* //使用css选择器 */
.floor-rules div:nth-child(odd) {
  border-right: 1px solid #eee;
}
</style>