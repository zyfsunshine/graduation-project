<template>
  <div class="register">
    <van-nav-bar title="用户登录" left-text="返回" left-arrow @click-left="goBack" />
    <div class="register-panel">
      <h1>登录</h1>
      <van-field
        v-model="username"
        clearable
        placeholder="手机/用户名"
        :error-message="usernameErrorMsg"
      />
      <van-field
        v-model="password"
        type="password"
        clearable
        placeholder="密码"
        :error-message="passwordErrorMsg"
      />
      <div class="register-button">
        <van-button type="primary" size="large" @click="loginAction" :loading="openLoading">登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceApi.config.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      username: "",
      password: "",
      openLoading: false, //是否开启用户注册的loading状态
      usernameErrorMsg: "", //当用户注册时用户名出现错误时候的提示信息
      passwordErrorMsg: "" //当用户注册时密码出现错误时候的提示信息
    };
  },
  created () {
    //一进入login.vue来判断时候有localstorage，如果有说明登录成功，不可以再次登录。直接跳转
    if(localStorage.useInfo){
      Toast.success("您已登录");
      this.$router.push('/');
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    loginAction() {
      // if(this.checkForm()){
      //     this.axiosRegisterUser();
      // }
      this.checkForm() && this.axiosLoginUser();
    },
    axiosLoginUser() {
      this.openLoading = true; //开启用户注册的loading状态
      axios({
        url: url.loginUser,
        method: "post",
        data: {
          userName: this.username,
          password: this.password
        }
      })
        .then(res => {
          //  console.log(res.data);
          if (res.data.code === 200 && res.data.message) {
            //这个条件下满足登录成功，登陆成功需要保存登录状态
            //登录状态存储：
            new Promise((resolve, reject) => {
              //需要等待，等待登陆成功后再存储
              //第一种方法插入不进去，只是插入进去一个空对象，没有具体的值。
              // localStorage.useInfo = { userName: this.userName };
               localStorage.setItem("useInfo",this.username );
              console.log(localStorage.useInfo);
              setTimeout(() => {
                resolve();
              }, 500);
            }).then(() => {
              //res.data.message返回true用户名密码是正确的
              Toast.success("登陆成功");
              // this.$router.push("/");  //本地存储完成了再进行跳转
              this.$router.push({name:"Me"});
            })
            .catch(error=>{
              Toast.fail("登录状态保存失败");
              console.log(error)
            })
          } else if (res.data.code === 200 && !res.data.message) {
            Toast.fail("密码错误");
            this.openLoading = false; //按钮可以再次使用
          } else if (res.data.code === 2000) {
            Toast.fail("用户名不存在");
            this.openLoading = false; //按钮可以再次使用
          }
        })
        .catch(error => {
          Toast.fail("登录异常，请检查网络连接");
          this.openLoading = false;
        });
    },
    //表单验证方法
    checkForm() {
      let isOk = true;
      if (this.username.length < 5) {
        this.usernameErrorMsg = "用户名不能少于5位";
        isOk = false;
      } else {
        this.usernameErrorMsg = "";
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = "密码不能少于6位";
        isOk = false;
      } else {
        this.passwordErrorMsg = "";
      }
      return isOk;
    }
  }
};
</script>

<style  scoped>
.register-panel {
  margin: 0 5% 0 5%;
  padding-right: 10px;
}
.register-panel h1 {
  text-align: left;
}
.register {
  background-color: white;
}
.register-button {
  margin-top: 30px;
  padding-left: 15px;
}
</style>