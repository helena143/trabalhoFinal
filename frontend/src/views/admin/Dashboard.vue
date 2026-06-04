<template>
  <AdminLayout>
    <div class="stats-grid">
      <div class="stat-card" v-for="stat in stats" :key="stat.label">
        <div class="stat-icon"><i :class="stat.icon"></i></div>
        <div class="stat-info">
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <div class="section-title">Pedidos Recentes</div>

    <div v-if="loadingOrders" class="loading">Carregando pedidos...</div>
    <div v-else-if="orders.length === 0" class="empty">Nenhum pedido encontrado.</div>
    <div v-else class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Total</th>
            <th>Status</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order._id">
            <td>{{ order.user?.name || 'N/A' }}</td>
            <td>R$ {{ order.total?.toFixed(2) }}</td>
            <td>
              <span class="status" :class="order.status">
                {{ statusLabel(order.status) }}
              </span>
            </td>
            <td>{{ formatDate(order.createdAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

const loadingOrders = ref(true)
const orders = ref<any[]>([])
const stats = ref([
  { label: 'Pedidos', icon: 'bi bi-bag-check', value: '—' },
  { label: 'Usuários', icon: 'bi bi-people', value: '—' },
  { label: 'Produtos', icon: 'bi bi-box-seam', value: '—' },
  { label: 'Receita Total', icon: 'bi bi-currency-dollar', value: '—' },
])

const token = localStorage.getItem('token')

const statusLabel = (s: string) => {
  const map: Record<string, string> = { pending: 'Pendente', paid: 'Pago', shipped: 'Enviado', approved: 'Aprovado', delivered: 'Entregue' }
  return map[s] || s
}

const formatDate = (d: string) => new Date(d).toLocaleDateString('pt-BR')

onMounted(async () => {
  try {
    const [ordersRes, usersRes, productsRes] = await Promise.all([
      fetch('http://localhost:3000/api/orders/all', { headers: { Authorization: `Bearer ${token}` } }),
      fetch('http://localhost:3000/api/users', { headers: { Authorization: `Bearer ${token}` } }),
      fetch('http://localhost:3000/api/products'),
    ])

    if (ordersRes.ok) {
      const oData = await ordersRes.json()
      const list = oData.data?.orders || oData || []
      orders.value = list.slice(0, 8)
      const receita = list.reduce((acc: number, o: any) => acc + (o.total || 0), 0)
      stats.value[0].value = String(oData.data?.pagination?.total || list.length)
      stats.value[3].value = 'R$ ' + receita.toFixed(2)
    }
    if (usersRes.ok) {
      const uData = await usersRes.json()
      stats.value[1].value = String(Array.isArray(uData) ? uData.length : '—')
    }
    if (productsRes.ok) {
      const pData = await productsRes.json()
      stats.value[2].value = String(Array.isArray(pData) ? pData.length : '—')
    }
  } catch (e) {
    console.error(e)
  } finally {
    loadingOrders.value = false
  }
})
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 36px;
}
.stat-card {
  background: #151515;
  border: 1px solid #222;
  border-radius: 20px;
  padding: 26px 22px;
  display: flex;
  align-items: center;
  gap: 18px;
}
.stat-icon {
  width: 52px;
  height: 52px;
  background: #1f1f1f;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: #c9a96e;
  flex-shrink: 0;
}
.stat-info { display: flex; flex-direction: column; gap: 4px; }
.stat-value { font-size: 1.3rem; font-weight: 700; color: #e0e0e0; }
.stat-label { font-size: 0.78rem; color: #666; }
.section-title { font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; color: #555; margin-bottom: 16px; }
.loading, .empty { color: #555; padding: 30px 0; text-align: center; }
.table-wrapper { background: #151515; border: 1px solid #222; border-radius: 20px; overflow: hidden; }
table { width: 100%; border-collapse: collapse; }
thead { background: #1b1b1b; }
th { text-align: left; padding: 18px 20px; color: #666; font-size: 0.8rem; letter-spacing: 1px; text-transform: uppercase; }
td { padding: 16px 20px; border-top: 1px solid #1a1a1a; font-size: 0.9rem; }
.status { padding: 6px 14px; border-radius: 999px; font-size: 0.75rem; }
.pending { background: #3d3117; color: #fbc531; }
.paid, .approved { background: #1f3b2d; color: #4cd137; }
.shipped, .delivered { background: #192a56; color: #74b9ff; }
</style>
