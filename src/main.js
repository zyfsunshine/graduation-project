// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import {Tabbar,TabbarItem,Button,Row,Col, Swipe, SwipeItem,Lazyload ,List,Field,NavBar,Tab, Tabs,PullRefresh,Stepper} from 'vant';
import { Cell, CellGroup } from 'vant';

Vue.use(Cell);
Vue.use(CellGroup);



Vue.use(Button).use(Row).use(Col)
.use(Tab)
.use(Tabs)
.use(Swipe)
.use(SwipeItem)
.use(Field)
.use(Tabbar)
.use(TabbarItem)
.use(NavBar)
.use(List)
.use(Stepper)
.use(PullRefresh)
.use(Lazyload);

import Moment from 'moment'
//设置中文提示：
Moment.locale('zh-cn');
Vue.filter('convertTime',function(data,formatStr){
	return Moment(data).format(formatStr);
});

Vue.filter('relativeTime',function(previousTime){
return Moment(previousTime).fromNow();
});
//处理字符串过长的过滤器
Vue.filter('convertStr',function(str,count){
return str.substring(0,count)+'...';
})


import Axios from 'axios'
Vue.prototype.$axios=Axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
