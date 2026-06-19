<template>
  <div class="admin-shell">
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div class="brand">
        <span>IVY</span>
        <small>Admin</small>
      </div>

      <nav class="nav">
        <RouterLink to="/admin" class="nav-item" exact-active-class="active">
          <i class="bi bi-speedometer2"></i> Dashboard
        </RouterLink>
        <RouterLink to="/admin/products" class="nav-item" active-claass="active">
          <i class="bi bi-box-seam"></i> Produtos
        </RouterLink>
        <RouterLink to="/admin/joias" class="nav-item" active-class="active">
          <i class="bi bi-gem"></i> Joias
        </RouterLink>
        <RouterLink to="/admin/perfumes" class="nav-item" active-class="active">
          <i class="bi bi-droplet-half"></i> Perfumes
        </RouterLink>
        <RouterLink to="/admin/pingentes" class="nav-item" active-class="active">
          <i class="bi bi-link-45deg"></i> Pingentes
        </RouterLink>
        <RouterLink to="/admin/relogios" class="nav-item" active-class="active">
          <i class="bi bi-watch"></i> Relógios
        </RouterLink>
        <RouterLink to="/admin/sales" class="nav-item" active-class="active">
          <i class="bi bi-tag"></i> Sale
        </RouterLink>
        <RouterLink to="/admin/cupons" class="nav-item" active-class="active">
          <i class="bi bi-ticket-perforated"></i> Cupons
        </RouterLink>
        <RouterLink to="/admin/categorias" class="nav-item" active-class="active">
          <i class="bi bi-grid"></i> Categorias
        </RouterLink>

        <div class="nav-divider"></div>

        <RouterLink to="/admin/usuarios" class="nav-item" active-class="active">
          <i class="bi bi-people"></i> Usuários
        </RouterLink>
        <RouterLink to="/admin/pedidos" class="nav-item" active-class="active">
          <i class="bi bi-bag-check"></i> Pedidos
        </RouterLink>
      </nav>

      <div class="sidebar-footer">
        <RouterLink to="/" class="nav-item">
          <i class="bi bi-house"></i> Ver Loja
        </RouterLink>
        <button class="logout" @click="logout">
          <i class="bi bi-box-arrow-left"></i> Sair
        </button>
      </div>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<style scoped>
* { box-sizing: border-box; }

.admin-shell {
  display: flex;
  min-height: 100vh;
  background: #0d0d0d;
  color: #e0e0e0;
  font-family: 'Inter', system-ui, sans-serif;
}

/* SIDEBAR */
.sidebar {
  width: 240px;
  background: #111;
  border-right: 1px solid #1e1e1e;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 100;
}

.brand {
  padding: 28px 24px 22px;
  border-bottom: 1px solid #1e1e1e;
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.brand span {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 6px;
  color: #c9a96e;
}

.brand small {
  font-size: 10px;
  color: #555;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.nav {
  flex: 1;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 14px;
  border-radius: 12px;
  color: #777;
  text-decoration: none;
  font-size: 0.87rem;
  font-weight: 500;
  transition: all 0.18s;
}

.nav-item:hover {
  background: #1a1a1a;
  color: #e0e0e0;
}

.nav-item.active {
  background: #1f1a0f;
  color: #c9a96e;
}

.nav-item i { font-size: 1rem; width: 18px; text-align: center; }

.nav-divider {
  height: 1px;
  background: #1e1e1e;
  margin: 10px 0;
}

/* SIDEBAR FOOTER */
.sidebar-footer {
  padding: 12px;
  border-top: 1px solid #1e1e1e;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.logout {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 14px;
  border-radius: 12px;
  background: transparent;
  border: none;
  color: #c0392b;
  cursor: pointer;
  font-size: 0.87rem;
  font-weight: 500;
  width: 100%;
  transition: all 0.18s;
}

.logout:hover { background: #1f0f0f; }
.logout i { font-size: 1rem; width: 18px; text-align: center; }

/* MAIN */
.main-content {
  flex: 1;
  margin-left: 240px;
  padding: 40px;
  min-height: 100vh;
  background: #0d0d0d;
}

/* Global headings inside admin */
:deep(h1) {
  font-size: 1.4rem;
  font-weight: 700;
  color: #e0e0e0;
  margin: 0;
}

:deep(h2) { color: #e0e0e0; }
</style>
