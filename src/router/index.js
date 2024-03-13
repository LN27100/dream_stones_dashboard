import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/admin/Home.vue'

import AdminLayout from '@/views/admin/Layout.vue'
import Dashboard from '@/views/admin/Dashboard.vue'

import UserIndex from '@/views/admin/users/UserIndex.vue'
import UserAdd from '@/views/admin/users/UserAdd.vue'
import UserEdit from '@/views/admin/users/UserEdit.vue'

import DreamStonesIndex from '@/views/admin/DreamStones/DreamStonesIndex.vue'
import DreamStonesEdit from '@/views/admin/DreamStones/DreamStonesEdit.vue'

// import Login from '@/views/auth/Login.vue'


import NotFound from '@/views/admin/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminLayout,
    children: [
      {path: '/', name: 'home', component: Home },
      {path: 'dashboard', name: 'dashboard', component: Dashboard },
      {path: 'users/index', component: UserIndex},
      {path: 'users/add', component: UserAdd},
      //utilisation de props pour récupérés les propriétés du paramètres id dans l'url
      {path: 'users/edit/:id', component: UserEdit, props: true},

      {path: 'Dreamstones/index', component: DreamStonesIndex},
      {path: 'Dreamstones/edit/:id', component: DreamStonesEdit}


    ]
  },
  // {
  //   path: '/login', name: 'Login', component: Login
  // },
  {
    path: '/:patchMatch(.*)*', component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
