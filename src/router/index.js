import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import Checkout from '@/views/Checkout/index.vue'
import Pay from '@/views/Pay/index.vue'
import Member from '@/views/Member/index.vue'
import UserInfo from '@/views/Member/components/UserInfo.vue'
import UserOrder from '@/views/Member/components/UserOrder.vue'
import PayBack from "@/views/Pay/PayBack.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home
        },
        {
          path: 'category/:id',
          component: Category
        },
        {
          path: 'category/sub/:id',
          component: SubCategory
        },
        {
          path: 'detail/:id',
          component: Detail
        },
        {
          path: 'cartlist',
          component: CartList
        }
        ,
{
  path: 'checkout',
  component: Checkout
},
{
  path: 'paycallback', // 注意路径，必须是paycallback
  component: PayBack
},
{
  path: 'pay',
  component: Pay
},
{
  path: 'member',
  component: Member,
  children: [
    {
      path: '',
      component: UserInfo
    },
    {
      path: 'order',
      component: UserOrder
    }
  ]
}

      ]
    },
    {
      path: '/login',
      component: Login
    },
  ],
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router
