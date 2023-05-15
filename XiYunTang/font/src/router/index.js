import { createRouter, createWebHistory } from 'vue-router'
import Home from '../page/Home.vue'
import Main from '../page/Main.vue'
import Video from '../page/Video.vue'
import Blog from '../page/Blog.vue'
import About from '../page/About.vue'
import Admin from '../page/Admin.vue'

const routes = [
  {
    path: '/',
    name: 'App',
    redirect: '/main',
    component: Home,
    children: [
      {
        path: '/main',
        name: 'Main',
        component: Main
      },
      {
        path: '/video',
        name: 'Video',
        component: Video
      },
      {
        path: '/blog',
        name: 'Blog',
        component: Blog
      },
      {
        path: '/about',
        name: 'About',
        component: About
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
