<template>
    <div>
        <div class="navbar-div">
        <van-nav-bar title="结算详情"  />
      </div>
      
      <div class="pay-text">
          <div class="pay-img"><img src="@/assets/img/支付成功.png" width="40%"></div>
          <div class="pay-font">支付成功</div> 
          <div class="pay-button">
               <van-button type="primary" size="large" @click="onClickleft">完成</van-button>
          </div>
      </div>
       
    </div>
</template>

<script>
    export default {
        methods:{
            onClickleft(){
                localStorage.removeItem("cartInfo");
                this.cartInfo = [];
                this.$router.go(-1);
            }
        }
    }
</script>

<style  scoped>
.pay-text{
    margin: 0 auto;
    background-color: white;
    /* height: 25rem;
    line-height: 25rem; */
    padding:10px;
   
}
.pay-font{
    margin-top: 2rem;
    margin-bottom: 2rem;
}
.pay-img{
    margin-top: 2rem;
}
</style>