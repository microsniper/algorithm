import Vue from 'vue'
import Router from 'vue-router'
import Index from "../views/index.vue";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index/list'
    },
    {
      path: '/index',
      name: 'index',
      component: ()=>import('../views/index.vue'),
      children:[
        {
          path: 'list',
          name: 'list',
          component: ()=>import('../views/subject/list.vue')
        }
      ]
    },
  ]
})
