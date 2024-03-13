import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/public/Home.vue";
import AdminLayout from "@/views/admin/Layout.vue";
import Dashboard from "@/views/admin/Dashboard.vue";

import UserIndex from "@/views/admin/users/UserIndex.vue";
import UserAdd from "@/views/admin/users/UserAdd.vue";
import UserEdit from "@/views/admin/users/UserEdit.vue";

import DreamStonesIndex from "@/views/admin/DreamStones/DreamStonesIndex.vue";
import DreamStonesEdit from "@/views/admin/DreamStones/DreamStonesEdit.vue";

import Login from "@/views/auth/Login.vue";

import NotFound from "@/views/admin/NotFound.vue";

// import authGuard from '@/_helpers/auth-guard'

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminLayout,
    children: [
      { path: "dashboard", name: "dashboard", component: Dashboard },
      { path: "users/index", component: UserIndex },
      { path: "users/add", component: UserAdd },
      { path: "users/edit/:id(\\d+)", component: UserEdit, props: true },

      { path: "Dreamstones/index", component: DreamStonesIndex },
      {
        path: "Dreamstones/edit/:id(\\d+)",
        component: DreamStonesEdit,
        props: true,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/:patchMatch(.*)*",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Vérouillage de la partie admin (token)
// router.beforeEach((to, from, next) => {
//   if(to.matched[0].name == 'admin'){
//     authGuard()
//   }
//   next()
// })

export default router;

// MEMO

//utilisation de props pour récupérés les propriétés du paramètres id dans l'url
// \\d+ indique que l'id ne doit comporter que des chiffres
