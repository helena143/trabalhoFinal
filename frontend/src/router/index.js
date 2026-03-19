import { createRouter, createWebHistory } from "vue-router"

import Home from "../components/Home.vue"
import Casamento from "../components/Casamento.vue"
import Relogios from "@/components/Relogios.vue"
import Presentes from "@/components/Presentes.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/casamento",
    name: "Casamento",
    component: Casamento
  },
  {
    path: "/relogios",
    name: "Relogios",
    component: Relogios
  },
  {
    path: "/presentes",
    name: "Presentes",
    component: Presentes
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,

  // 👇 ADICIONE ISSO
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router