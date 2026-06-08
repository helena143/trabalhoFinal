<template>
  <div class="admin-layout">

    <!-- SIDEBAR -->
    <aside class="sidebar">

      <div class="sidebar-logo">
        <span class="logo-text">IVY</span>
        <span class="logo-sub">Painel administrativo</span>
      </div>

      <nav class="sidebar-nav">

        <span class="nav-section">Geral</span>

        <RouterLink to="/admin">
          <i class="ti ti-layout-dashboard"></i>
          Dashboard
        </RouterLink>

        <RouterLink to="/admin/joias">
          <i class="ti ti-package"></i>
          Joias
          <span class="nav-badge">48</span>
        </RouterLink>

        <RouterLink to="/admin/relogios">
          <i class="ti ti-clock"></i>
          Relógios
          <span class="nav-badge">21</span>
        </RouterLink>

        <RouterLink to="/admin/perfumes">
          <i class="ti ti-droplet"></i>
          Perfumes
          <span class="nav-badge">35</span>
        </RouterLink>

        <span class="nav-section">Comercial</span>

        <RouterLink to="/admin/pedidos">
          <i class="ti ti-shopping-bag"></i>
          Pedidos
          <span class="nav-badge">7</span>
        </RouterLink>

        <RouterLink to="/admin/clientes">
          <i class="ti ti-users"></i>
          Clientes
        </RouterLink>

        <RouterLink to="/admin/relatorios">
          <i class="ti ti-chart-bar"></i>
          Relatórios
        </RouterLink>

        <span class="nav-section">Sistema</span>

        <RouterLink to="/admin/configuracoes">
          <i class="ti ti-settings"></i>
          Configurações
        </RouterLink>

      </nav>

      <div class="sidebar-footer">
        <div class="avatar">AM</div>
        <div class="user-info">
          <span class="user-name">Ana Medeiros</span>
          <span class="user-role">Administrador</span>
        </div>
        <i class="ti ti-logout logout-icon"></i>
      </div>

    </aside>

    <!-- PAGE -->
    <div class="page-wrapper">

      <!-- TOPBAR -->
      <header class="topbar">
        <div class="topbar-left">
          <span class="page-title">Dashboard</span>
          <span class="breadcrumb">Admin / Dashboard</span>
        </div>
        <div class="topbar-right">
          <button class="icon-btn" aria-label="Buscar">
            <i class="ti ti-search"></i>
          </button>
          <button class="icon-btn notif-btn" aria-label="Notificações">
            <i class="ti ti-bell"></i>
            <span class="notif-dot"></span>
          </button>
          <div class="avatar avatar-sm">AM</div>
        </div>
      </header>

      <!-- CONTENT -->
      <main class="content">
        <router-view />
      </main>

    </div>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:wght@500;600&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

/* ── Layout ────────────────────────────────────── */
.admin-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 100vh;
  font-family: 'DM Sans', sans-serif;
  background: #f6f4f0;
}

/* ── Sidebar ───────────────────────────────────── */
.sidebar {
  background: #0c1220;
  display: flex;
  flex-direction: column;
  position: relative;
}

.sidebar::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(to bottom, transparent, #c9a96e40 30%, #c9a96e40 70%, transparent);
  pointer-events: none;
}

/* Logo */
.sidebar-logo {
  padding: 28px 24px 24px;
  border-bottom: 0.5px solid #ffffff0f;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.logo-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 0.18em;
  color: #c9a96e;
}

.logo-sub {
  font-size: 10px;
  letter-spacing: 0.22em;
  color: #ffffff28;
  font-weight: 400;
  text-transform: uppercase;
}

/* Nav */
.sidebar-nav {
  padding: 16px 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-section {
  font-size: 10px;
  letter-spacing: 0.18em;
  color: #ffffff22;
  font-weight: 500;
  text-transform: uppercase;
  padding: 12px 12px 6px;
}

.sidebar-nav a {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 13.5px;
  font-weight: 400;
  color: #8899aa;
  transition: background 0.15s, color 0.15s;
  position: relative;
}

.sidebar-nav a:hover {
  background: #ffffff0a;
  color: #ccd6e0;
}

.sidebar-nav a.router-link-active,
.sidebar-nav a.router-link-exact-active {
  background: #c9a96e18;
  color: #c9a96e;
}

.sidebar-nav a.router-link-active::before,
.sidebar-nav a.router-link-exact-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 25%;
  bottom: 25%;
  width: 2px;
  background: #c9a96e;
  border-radius: 2px;
}

.sidebar-nav a .ti {
  font-size: 16px;
  opacity: 0.7;
  width: 18px;
  text-align: center;
  flex-shrink: 0;
}

.sidebar-nav a.router-link-active .ti,
.sidebar-nav a.router-link-exact-active .ti {
  opacity: 1;
}

.nav-badge {
  margin-left: auto;
  background: #c9a96e22;
  color: #c9a96e;
  font-size: 10px;
  font-weight: 500;
  padding: 2px 7px;
  border-radius: 20px;
}

/* Footer */
.sidebar-footer {
  padding: 14px 12px;
  border-top: 0.5px solid #ffffff0f;
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.user-name {
  font-size: 12.5px;
  font-weight: 500;
  color: #ccd6e0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-role {
  font-size: 11px;
  color: #ffffff28;
}

.logout-icon {
  font-size: 15px;
  color: #ffffff22;
  cursor: pointer;
  transition: color 0.15s;
}

.logout-icon:hover {
  color: #ffffff66;
}

/* Avatar */
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #c9a96e22;
  border: 1px solid #c9a96e44;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
  color: #c9a96e;
  flex-shrink: 0;
}

.avatar-sm {
  width: 34px;
  height: 34px;
  font-size: 13px;
}

/* ── Page wrapper ──────────────────────────────── */
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f6f4f0;
}

/* ── Topbar ────────────────────────────────────── */
.topbar {
  background: #e71111;
  border-bottom: 0.5px solid #e2ddd7;
  padding: 0 28px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.topbar-left {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.page-title {
  font-size: 15px;
  font-weight: 500;
  color: #1a1a1a;
}

.breadcrumb {
  font-size: 11.5px;
  color: #9a9690;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-btn {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 0.5px solid #e2ddd7;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b6660;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  position: relative;
}

.icon-btn .ti {
  font-size: 16px;
}

.icon-btn:hover {
  background: #f6f4f0;
  color: #1a1a1a;
}

.notif-dot {
  position: absolute;
  top: 7px;
  right: 8px;
  width: 6px;
  height: 6px;
  background: #c9a96e;
  border-radius: 50%;
  border: 1.5px solid white;
}

/* ── Content ───────────────────────────────────── */
.content {
  padding: 28px;
  flex: 1;
}
</style>