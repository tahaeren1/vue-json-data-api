import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    // detay sayfası oluşturuldu
    //prop gönderceğimiz için name de oluşturduk
    //buraya oluşturduğumuz detail sayfası prop gönderceğimiz için de açmamız gerekiyor.
    path: "/detail", // detay sayfası oluşturuldu
    name: "detail",
    component: () => import("@/views/PostDetail.vue"),
    props:true,
  },
  {
    // detay sayfası oluşturuldu
    //prop gönderceğimiz için name de oluşturduk
    //buraya oluşturduğumuz detail sayfası prop gönderceğimiz için de açmamız gerekiyor.
    path: "/createPost", // detay sayfası oluşturuldu
    name: "createPost",
    component: () => import("@/views/CreatePost.vue"),
    props:true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
