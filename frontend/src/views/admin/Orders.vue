<template>
  <AdminLayout>
    <div class="page-head">
      <div>
        <h1>Pedidos</h1>
        <p>Controle todos os pedidos realizados</p>
      </div>
    </div>

    <div v-if="loading" class="loading">Carregando pedidos...</div>
    <div v-else-if="orders.length === 0" class="empty">Nenhum pedido encontrado.</div>
    <div v-else class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Status</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order._id">
            <td class="id-col">#{{ order._id.slice(-6).toUpperCase() }}</td>
            <td>{{ order.user?.name || 'N/A' }}</td>
            <td>R$ {{ Number(order.total).toFixed(2) }}</td>
            <td>
              <span class="status" :class="order.status">{{ statusLabel(order.status) }}</span>
            </td>
            <td>{{ formatDate(order.createdAt) }}</td>
            <td class="actions">
              <select class="status-select" :value="order.status" @change="updateStatus(order._id, ($event.target as HTMLSelectElement).value)">
                <option value="pending">Pendente</option>
                <option value="paid">Pago</option>
                <option value="shipped">Enviado</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="pagination.totalPages > 1" class="pagination">
      <button @click="changePage(pagination.currentPage - 1)" :disabled="pagination.currentPage <= 1">‹</button>
      <span>{{ pagination.currentPage }} / {{ pagination.totalPages }}</span>
      <button @click="changePage(pagination.currentPage + 1)" :disabled="pagination.currentPage >= pagination.totalPages">›</button>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

const orders = ref<any[]>([])
const loading = ref(true)
const pagination = ref({ currentPage: 1, totalPages: 1, total: 0, limit: 15 })
const token = localStorage.getItem('token')

const statusLabel = (s: string) => {
  const map: Record<string, string> = { pending: 'Pendente', paid: 'Pago', shipped: 'Enviado', approved: 'Aprovado', delivered: 'Entregue' }
  return map[s] || s
}
const formatDate = (d: string) => d ? new Date(d).toLocaleDateString('pt-BR') : '—'

const fetchOrders = async (page = 1) => {
  loading.value = true
  try {
    const res = await fetch(`http://localhost:3000/api/orders/all?page=${page}&limit=15`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (res.ok) {
      const data = await res.json()
      orders.value = data.data?.orders || data || []
      if (data.data?.pagination) pagination.value = data.data.pagination
    }
  } catch { } finally { loading.value = false }
}

const updateStatus = async (id: string, status: string) => {
  await fetch(`http://localhost:3000/api/orders/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ status })
  })
  fetchOrders(pagination.value.currentPage)
}

const changePage = (p: number) => { if (p >= 1 && p <= pagination.value.totalPages) fetchOrders(p) }

onMounted(() => fetchOrders())
</script>

<style scoped>
.page-head { margin-bottom: 30px; }
.page-head p { color: #777; margin-top: 4px; }
.loading, .empty { color: #555; padding: 60px 0; text-align: center; }
.table-wrapper { background: #151515; border: 1px solid #222; border-radius: 24px; overflow: hidden; }
table { width: 100%; border-collapse: collapse; }
thead { background: #1b1b1b; }
th { text-align: left; padding: 18px 20px; color: #666; font-size: 0.78rem; letter-spacing: 1px; text-transform: uppercase; }
td { padding: 16px 20px; border-top: 1px solid #1a1a1a; font-size: 0.9rem; }
.id-col { font-family: monospace; color: #888; font-size: 0.8rem; }
.status { padding: 6px 14px; border-radius: 999px; font-size: 0.75rem; }
.pending { background: #3d3117; color: #fbc531; }
.paid, .approved { background: #1f3b2d; color: #4cd137; }
.shipped, .delivered { background: #192a56; color: #74b9ff; }
.actions { display: flex; gap: 10px; }
.status-select { background: #222; border: 1px solid #333; border-radius: 10px; color: #e0e0e0; padding: 8px 12px; cursor: pointer; font-size: 0.85rem; outline: none; }
.pagination { display: flex; align-items: center; justify-content: center; gap: 20px; margin-top: 24px; }
.pagination button { width: 40px; height: 40px; background: #1a1a1a; border: 1px solid #222; border-radius: 10px; color: #e0e0e0; cursor: pointer; font-size: 1.1rem; }
.pagination button:disabled { opacity: 0.3; cursor: not-allowed; }
.pagination span { color: #666; font-size: 0.9rem; }
</style>
