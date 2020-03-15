import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMail from '@/components/pages/ShoppingMail'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'
import Home from '@/components/pages/Home'
import Me from '@/components/pages/Me'
import Pay from '@/components/pages/Pay'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      // name: 'Home',
      component: Home,
      children: [{
          path: '/',
          name: 'ShoppingMail',
          component: ShoppingMail
        },
        {
          path: '/categorylist',
          name: 'CategoryList',
          component: CategoryList
        },
        {
          path: '/cart',
          name: 'Cart',
          component: Cart
        },
        {
          path: '/me',
          name: 'Me',
          component: Me
        },
        {
          path: '/login',
          name: 'Login',
          component: Login
        },
        {
          path: '/register',
          name: 'Register',
          component: Register
        },
      ]
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay
    },
  ]
})
