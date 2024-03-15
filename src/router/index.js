import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/public/Home.vue";
import AdminLayout from "@/views/admin/Layout.vue";
import Dashboard from "@/views/admin/Dashboard.vue";

import UserIndex from "@/views/admin/users/UserIndex.vue";
import UserAdd from "@/views/admin/users/UserAdd.vue";

import DreamStonesIndex from "@/views/admin/DreamStones/DreamStonesIndex.vue";
import DreamStonesAdd from "@/views/admin/DreamStones/DreamStonesAdd.vue";
import DreamStonesEdit from "@/views/admin/DreamStones/DreamStonesEdit.vue";

import StocksIndex from "@/views/admin/stocks/StocksIndex.vue";

import Login from "@/views/auth/Login.vue";

import NotFound from "@/views/admin/NotFound.vue";


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
      { path: "Dreamstones/index", component: DreamStonesIndex },
      { path: "Dreamstones/add", component: DreamStonesAdd },
      { path: "Dreamstones/edit/", component: DreamStonesEdit, props: true },
      { path: "Stocks/index", component: StocksIndex },
    ],
    // Fonction de garde pour empêcher l'accès au portail admin si non connecté.
    beforeEnter: (to, from, next) => {
      // Vérifiez si l'utilisateur est connecté en consultant le stockage local
      const loggedIn = localStorage.getItem("loggedIn");
      if (!loggedIn) {
        // Utilisateur non connecté, redirigez vers la page de connexion
        next({ name: "Login" });
      } else {
        // Utilisateur connecté, autorisez l'accès à la route
        next();
      }
    },
    
  },
  {
    path: "/login",
    name: "Login",
    component: Login
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


export default router;

// MEMO

//utilisation de props pour récupérés les propriétés du paramètres id dans l'url
// \\d+ indique que l'id ne doit comporter que des chiffres
// Props sert à passer les paramètres d'URL en tant que props au composant