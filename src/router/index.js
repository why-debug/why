import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        //商品页面
        { path: '/Main/Goods', component: () => import('../views/Goods.vue'), children: [{ path: '/Main/Goods', component: () => import('../views/Shopcar.vue') }] },
        //评价页面
        { path: '/Main/Merchant', component: () => import('../views/Merchant.vue') },
        //商家页面
        { path: '/Main/Evaluate', component: () => import('../views/Evaluate.vue') },
        //购物车页面
        // { path: '/Main/Goods', component: () => import('../views/Shopcar.vue') },
      ]
    },

  ]
})

