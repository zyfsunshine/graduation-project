<template>
  <div class="wrap">
    <div class="navbar-div">
      <van-nav-bar title="会员中心" />
    </div>
    <div class="user-icon">
       
      <img src="@/assets/img/头像.png" />
      <br />
      <strong v-if="!isOnline" class="user-name">{{username}}</strong>
    </div>
    <div class="user-button" v-if="isOnline">
      <van-button type="info" size="large" @click="register">注册</van-button>
      <van-button type="primary" size="large" @click="login">登录</van-button>
    </div>
    <div v-if="!isOnline" class="user-list">
      <van-cell-group>
        <van-cell title="会员卡" is-link />
        <van-cell title="地址管理" is-link />
        <van-cell title="我的订单" is-link />
        <van-cell title="会员权益" is-link />
        <van-cell title="联系我们" is-link />
      </van-cell-group>
    </div>
    <div v-if="!isOnline">
      <van-button type="info" size="normal" @click="Outlogin" class="out">退出登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      isOnline: true
    };
  },
  created() {
    this.getUsername();
    if (localStorage.useInfo) {
      this.isOnline = false;
    }
  },
  methods: {
    register() {
      this.$router.push({ name: "Register" });
    },
    login() {
      this.$router.push({ name: "Login" });
    },
    getUsername() {
      this.username = localStorage.getItem("useInfo");
      // console.log(this.username);
      // console.log(localStorage.useInfo)
      // console.log(JSON.stringify(localStorage.useInfo));
      // localStorage.useInfo
    //   this.username = "zyf";
    },
    Outlogin() {
      localStorage.removeItem("useInfo");
      this.isOnline = true;
    }
  }
};
</script>

<style  scoped>
.wrap {
  background-color: #fff;
}
.user-list {
  height: 15rem;
  color: #000;
  text-align: left;
}
.user-icon {
  width: 100%;
  height: 9rem;
  /* line-height: 9rem; */
  /* background-color: #eea2ad; */
  /* background-color:#a0d9f6 */
  background-color: #fff;
  color: black;
}
.user-icon img {
  border-radius: 40px;
  width: 20%;
  border: 1px solid white;
  background-color: white;
  margin-top: 2rem;
}
.user-button {
  background-color: white;
  padding: 0 1.5rem;
  /* border-bottom: 1px solid #f0f0f0; */
}
button {
  /* margin-left: 2rem;
  margin-right: 2rem; */
  /* width: 5rem; */
  margin-top: 1rem;
}

.out {
  width: 80%;
}
</style>