<template>
  <div class="comment" :cid="cid">
    <div class="submit">
      <!-- <strong>发表评论</strong>
      <strong class="back" @click="goback">返回</strong>-->
      <input v-model="newComment" placeholder="请输入评论......" />
      <!-- <mt-button size="large" type="danger" @click="snedMsg(cid)">发表评论</mt-button> -->
      <!-- <button  @click="snedMsg(cid)"> 发表评论</button> -->
      <van-button type="primary" color="#1989fa" @click="snedMsg(cid)">发表</van-button>
    </div>
    <div class="comment-list">
      <div class="title">
        <span>评论列表：</span>
        <span class="back">{{comments.length}}条评论</span>
      </div>

      <ul>
        <li v-for="(comment,index) in comments" :key="index">
          <strong>{{comment.message_nickname}}：</strong>
          <span class="back">{{comment.message_post_time |relativeTime}}</span>
          <div v-html="comment.message_content" class="commentdetail"></div>
        </li>
      </ul>
      <!-- <mt-button size="large" type="danger" plain @click="loadMore(page,cid)">加载更多</mt-button> -->
      <!-- <button  @click="loadMore(page,cid)"> 加载更多</button> -->
      <van-button @click="loadMore(page,cid)">
        <img src="@/assets/img/更多.png" width="8%" />
      </van-button>
    </div>
  </div>
</template>

<script>
// import Axios from 'axios'
// Vue.prototype.$axios = Axios;
export default {
  name: "comment",
  props: ["cid"],
  data() {
    return {
      page: 1, //默认为1，控制页码
      name: "comment",
      comments: [],
      newComment: ""
    };
  },
  created() {
    this.page = this.$route.query.page || "1";
    //使用组件时，是否有页码，如果有就对应显示，如果没有页码，默认使用第一页
    this.loadMore(1, this.cid);
  },
  methods: {
    goback: function() {
      this.$router.go(-1);
    },
    loadMore(page, cid) {
      //传参表示页面点击按钮，这个时候数据是追加，否则不传参数就是一般第一次或者刷新使用这个方法
      this.$axios
        .get("http://hn216.api.yesapi.cn/", {
          params: {
            // message_key:'',&message_id=${this.cid}
            service: "App.Market_Message.Show",
            page: this.page,
            order: 2,
            app_key: "FA499B8D69BB25426060C72E0C6EB412",
            message_key: cid,
            perpage: 10
          }
        })
        .then(res => {
          //判断是否是created中调用还是点击按钮的调用
          if (res.data.data.items.length === 0) {
            this.$toast("没有更多数据");
          }
          if (page) {
            this.comments = this.comments.concat(res.data.data.items);
          } else {
            this.comments = res.data.data.items;
          }

          this.page++;
          console.log(this.page);
          console.log(res.data.data.items);
        })
        .catch(err => {
          console.log("留言列表异常", err);
        });
    },
    //发表评论
    snedMsg(cid) {
      //发表之前判断是否为空
      if (this.newComment.trim() === "") {
        return this.$toast("评论信息不能为空！");
      }
      //获取评论信息 this.newComment

      this.$axios
        .post(
          "http://hn216.api.yesapi.cn/?service=App.Market_Message.Post&message_pid=0&app_key=FA499B8D69BB25426060C72E0C6EB412&message_key=" +
            cid +
            "&message_content=" +
            this.newComment +
            "&message_nickname=匿名用户"
        )
        .then(res => {
          //发表之后清空评论框
          this.newComment = "";
          //加载第一页的数据，就是最新的数据
          this.page = 1;
          console.log(this.cid);
          this.loadMore(null, cid);
        })
        .catch(err => {
          console.log("发表评论失败", err);
        });
    }
  }
};
</script>

<style scoped>
.submit {
  display: flex;
  padding: 1rem;
  background-color: #f0f0f0;
}
input {
  /* border-bottom: 1px solid black; */
  border-top: 1px solid white;
  border-left: 1px solid white;
  border-right: 1px solid white;
  background-color: white;
  border-radius: 6px;
  /* width: 80%;
    height: 2rem;
    line-height: 2rem;
    margin: 1.5rem 0; */
  flex: 5;
  font-size: 0.8rem;
}

.submit button {
  /* padding: 0 1.5rem; */
  flex: 1;
  margin-left: 1rem;
}
.title {
  width: 100%;
  /* margin: 1rem; */
  font-size: 1.2rem;
  font-weight: 600;
  text-align: left;
  margin: 1rem 0;
}
li {
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
  margin-top: 3px;
  margin-bottom: 3px;
}
.comment-list{
  margin:1rem;
}
.comment-list button {
  background-color: white;
  color: black;
  border: 1px solid white;
  width: 100%;
}
.back{
  float:  right;
}
.commentdetail{
  margin-top: 2px;
}
</style>

