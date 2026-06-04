import { createRouter, createWebHistory } from "vue-router"

/* ================== VIEWS ================== */
import Home from "@/components/Home.vue"
import Casamento from "@/components/Casamento.vue"
import Perfumes from "@/components/Perfumes.vue"
import Joias from "@/components/Joias.vue"
import Relogios from "@/components/Relogios.vue"
import Pingentes from "@/components/Pingentes.vue"
import Sale from "@/components/Sale.vue"

import Login from "@/views/Login.vue"

import Acessorios from "@/views/Acessorios.vue"
import Atendimento from "@/views/Atendimento.vue"
import Acessibilidade from "@/views/Acessibilidade.vue"
import Carrinho from "@/views/Carrinho.vue"
import Perfil from "@/views/Perfil.vue"
import guiatamanhos from "@/views/guiatamanhos.vue"
import trocasdevolucoes from "@/views/trocasdevolucoes.vue"
import sobrepedidos from "@/views/sobrepedidos.vue"
import Checkout from "@/views/Checkout.vue"

/* ================== ADMIN ================== */
import Dashboard from "@/views/admin/Dashboard.vue"
import Products from "@/views/admin/Products.vue"
import Users from "@/views/admin/Users.vue"
import Orders from "@/views/admin/Orders.vue"
import Categories from "@/views/admin/Categories.vue"
import AdminJoias from "@/views/admin/AdminJoias.vue"
import AdminPerfumes from "@/views/admin/AdminPerfumes.vue"
import AdminPingentes from "@/views/admin/AdminPingentes.vue"
import AdminRelogios from "@/views/admin/AdminRelogio.vue"
import AdminSales from "@/views/admin/AdminSale.vue"

/* ================== ROTAS ================== */
const routes = [
  /* PÚBLICAS */
  { path: "/", name: "home", component: Home, meta: { showNav: true } },
  { path: "/acessorios", name: "acessorios", component: Acessorios, meta: { showNav: true } },
  { path: "/atendimento", name: "atendimento", component: Atendimento, meta: { showNav: true } },
  { path: "/carrinho", name: "carrinho", component: Carrinho, meta: { showNav: true } },
  { path: "/acessibilidade", name: "acessibilidade", component: Acessibilidade, meta: { showNav: true } },
  { path: "/casamento", name: "casamento", component: Casamento, meta: { showNav: true } },
  { path: "/perfumes", name: "perfumes", component: Perfumes, meta: { showNav: true } },
  { path: "/relogios", name: "relogios", component: Relogios, meta: { showNav: true } },
  { path: "/joias", name: "joias", component: Joias, meta: { showNav: true } },
  { path: "/sale", name: "sale", component: Sale, meta: { showNav: true } },
  { path: "/pingentes", name: "pingentes", component: Pingentes, meta: { showNav: true } },
  { path: "/guiatamanhos", name: "guiatamanhos", component: guiatamanhos, meta: { showNav: true } },
  { path: "/trocasdevolucoes", name: "trocasdevolucoes", component: trocasdevolucoes, meta: { showNav: true } },
  { path: "/sobrepedidos", name: "sobrepedidos", component: sobrepedidos, meta: { showNav: true } },
  { path: "/Checkout",   name: "Checkout",    component: Checkout,    meta: { showNav: true } },

  /* AUTH */
  { path: "/login", name: "login", component: Login, meta: { showNav: true } },
  {
    path: "/perfil",
    name: "perfil",
    component: Perfil,
    meta: { requiresAuth: true, showNav: true }
  },

  /* ADMIN */
  {
    path: "/admin",
    name: "admin-dashboard",
    component: Dashboard,
    meta: { requiresAdmin: true, showNav: false }
  },
  {
    path: "/admin/products",
    name: "admin-products",
    component: Products,
    meta: { requiresAdmin: true, showNav: false }
  },
  {
    path: "/admin/usuarios",
    name: "admin-users",
    component: Users,
    meta: { requiresAdmin: true, showNav: false }
  },
  {
    path: "/admin/pedidos",
    name: "admin-orders",
    component: Orders,
    meta: { requiresAdmin: true, showNav: false }
  },
  {
    path: "/admin/categorias",
    name: "admin-categories",
    component: Categories,
    meta: { requiresAdmin: true, showNav: false }
  },
  {
    path: "/admin/joias",
    name: "admin-joias",
    component: AdminJoias,
    meta: { requiresAdmin: true, showNav: false }
  },
  {
    path: "/admin/perfumes",
    name: "admin-perfumes",
    component: AdminPerfumes,
    meta: { requiresAdmin: true, showNav: false }
  },
  {
    path: "/admin/pingentes",
    name: "admin-pingentes",
    component: AdminPingentes,
    meta: { requiresAdmin: true, showNav: false }
  },
  {
    path: "/admin/relogios",
    name: "admin-relogios",
    component: AdminRelogios,
    meta: { requiresAdmin: true, showNav: false }
  },
  {
    path: "/admin/sales",
    name: "admin-sales",
    component: AdminSales,
    meta: { requiresAdmin: true, showNav: false }
  },

  /* FALLBACK */
  {
    path: "/:pathMatch(.*)*",
    redirect: "/"
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,

  // VOLTA PARA O TOPO EM TODAS AS NAVEGAÇÕES
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    return {
      top: 0,
      left: 0,
      behavior: "smooth"
    }
  }
})

router.beforeEach((to) => {
  const user = localStorage.getItem("user")
  const adminToken = localStorage.getItem("token")

  if (to.meta.requiresAdmin) {
    if (!adminToken) return "/admin/login"

    try {
      const payload = JSON.parse(atob(adminToken.split(".")[1]))

      if (payload.role !== "admin") {
        return "/admin/login"
      }
    } catch {
      return "/admin/login"
    }
  }

  if (to.meta.requiresAuth && !user) {
    return "/login"
  }

  return true
})

export default router