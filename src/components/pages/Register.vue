<template>
  <div class="register">
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack" />
    <div class="register-panel">
      <h1>注册</h1>
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
        <van-button
          type="primary"
          size="large"
          color="#1989fa"
          @click="registerAction"
          :loading="openLoading"
        >注册</van-button>
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
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    registerAction(){
        // if(this.checkForm()){
        //     this.axiosRegisterUser();
        // }
        this.checkForm()&&this.axiosRegisterUser();
    },
    axiosRegisterUser() {
      this.openLoading = true; //开启用户注册的loading状态
      axios({
        url: url.registerUser,
        method: "post",
        data: {
          userName: this.username,
          password: this.password
        }
      })
        .then(res => {
          if (res.data.code === 200) {
            Toast.success(res.data.message);
            //需要跳转
            this.$router.push({name:"Login"});
          } else {
            if (res.data.code === 500) {
              Toast.fail("用户名重复");
            } else {
              Toast.fail("注册失败");
            }
            console.log(res.data.message);
            this.openLoading = false; //关闭用户注册的loading状态
          }
        })
        .catch(error => {
          Toast.fail("注册失败");
          console.log(error);
          this.openLoading = false; //关闭用户注册的loading状态
        });
    },
    //表单验证方法
    checkForm(){
       
        let isOk=true;
        if(this.username.length<5){
            this.usernameErrorMsg="用户名不能少于5位";
            isOk=false;
        }else{
            this.usernameErrorMsg="";
        }
        if(this.password.length<6){
            this.passwordErrorMsg="密码不能少于6位";
            isOk=false;
        }
        else{
            this.passwordErrorMsg="";
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