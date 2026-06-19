<template>
  <AdminLayout>
    <div class="stats-grid">
      <div class="stat-card" v-for="stat in stats" :key="stat.label">
        <div class="stat-icon">
          <i :class="stat.icon"></i>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <div class="section-header">
      <h2 class="section-title">Pedidos Recentes</h2>
    </div>

    <div v-if="loadingOrders" class="loading-state">
      <div class="spinner"></div>
      <p>Carregando dados do painel...</p>
    </div>

    <div v-else-if="orders.length === 0" class="empty-state">
      <i class="bi bi-inbox"></i>
      <p>Nenhum pedido encontrado no sistema.</p>
    </div>

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
          <tr v-for="order in recentOrders" :key="order._id">
            <td class="client-cell">
              <div class="client-avatar">
                {{ order.user?.name?.charAt(0).toUpperCase() || '?' }}
              </div>
              <span class="client-name">{{ order.user?.name || 'N/A' }}</span>
            </td>
            <td class="total-cell">R$ {{ order.total?.toFixed(2) }}</td>
            <td>
              <span class="status-badge" :class="order.status">
                <span class="status-dot"></span>
                {{ statusLabel(order.status) }}
              </span>
            </td>
            <td class="date-cell">{{ formatDate(order.createdAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

// Interfaces
interface Order {
  _id: string
  total: number
  status: string
  createdAt: string
  user?: { name: string }
}

const loadingOrders = ref(true)
const orders = ref<Order[]>([])
const totalUsers = ref(0)
const totalProducts = ref(0)

// ===== DADOS MOCKADOS REALISTAS (BRASIL) =====

const firstNames = [
  'Ana', 'Maria', 'João', 'Pedro', 'Lucas', 'Carlos', 'Fernanda', 'Juliana',
  'Mariana', 'Bruno', 'Rafael', 'Gabriel', 'Amanda', 'Camila', 'Rodrigo',
  'Thiago', 'Patrícia', 'Beatriz', 'Gustavo', 'Daniel', 'Letícia', 'Vinícius',
  'Laura', 'Mateus', 'Isabela', 'Felipe', 'Luiza', 'André', 'Natália', 'Leonardo'
]

const lastNames = [
  'Silva', 'Santos', 'Oliveira', 'Souza', 'Pereira', 'Costa', 'Carvalho',
  'Almeida', 'Ferreira', 'Rodrigues', 'Martins', 'Lima', 'Araújo', 'Fernandes',
  'Barbosa', 'Ribeiro', 'Gonçalves', 'Monteiro', 'Cardoso', 'Teixeira', 'Mendes',
  'Nascimento', 'Dias', 'Castro', 'Cavalcanti', 'Pinto', 'Andrade', 'Freitas'
]

const productNames = [
  'Relógio de Pulso Masculino', 'Bolsa de Couro Legítimo', 'Tênis Running Pro',
  'Óculos de Sol Aviador', 'Jaqueta Jeans Premium', 'Smartwatch Series 5',
  'Mochila Antifurto USB', 'Fone Bluetooth NoiseCancel', 'Câmera Instax Mini',
  'Perfume Importado 100ml', 'Carteira Slim Masculina', 'Colar Feminino Ouro 18k',
  'Boné Dad Hat Bordado', 'Calça Jogger Moletom', 'Vestido Midi Floral',
  'Kit Skincare 4 Passos', 'Chinelo Slide Confort', 'Blazer Slim Fit Cinza',
  'Anel Solitário Zircônia', 'Camiseta Oversized Algodão'
]

const statuses = ['pending', 'paid', 'shipped', 'approved', 'delivered'] as const
const statusWeights = [0.15, 0.25, 0.20, 0.15, 0.25]

// ===== HELPERS =====

const randomInt = (min: number, max: number) => 
  Math.floor(Math.random() * (max - min + 1)) + min

const randomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

const randomStatus = (): string => {
  const rand = Math.random()
  let cumulative = 0
  for (let i = 0; i < statuses.length; i++) {
    cumulative += statusWeights[i]
    if (rand <= cumulative) return statuses[i]
  }
  return 'pending'
}

const randomDate = (daysBack: number = 30): string => {
  const now = new Date()
  const daysAgo = Math.floor(Math.random() * daysBack)
  const hoursAgo = Math.floor(Math.random() * 24)
  const date = new Date(now.getTime() - (daysAgo * 24 + hoursAgo) * 60 * 60 * 1000)
  return date.toISOString()
}

const generateName = (): string => {
  const first = randomItem(firstNames)
  const last1 = randomItem(lastNames)
  const last2 = Math.random() > 0.5 ? ` ${randomItem(lastNames)}` : ''
  return `${first} ${last1}${last2}`
}

// Gera um pedido mockado realista
const generateOrder = (id: number): Order => {
  const numItems = randomInt(1, 4)
  let total = 0
  for (let i = 0; i < numItems; i++) {
    // Preços realistas em reais (R$ 29,90 a R$ 1.299,00)
    const price = randomInt(2990, 129900) / 100
    const qty = randomInt(1, 3)
    total += price * qty
  }
  
  // Adiciona frete aleatório
  const shipping = randomItem([0, 0, 0, 1290, 1990, 2490]) / 100
  total += shipping

  return {
    _id: `ORD-${String(id).padStart(5, '0')}`,
    total: Number(total.toFixed(2)),
    status: randomStatus(),
    createdAt: randomDate(45),
    user: {
      name: generateName()
    }
  }
}

// ===== COMPUTADOS =====

const recentOrders = computed(() => orders.value.slice(0, 8))

const totalRevenue = computed(() => {
  const total = orders.value.reduce((acc, o) => acc + (o.total || 0), 0)
  return 'R$ ' + total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
})

const stats = computed(() => [
  { label: 'Total de Pedidos', icon: 'bi bi-bag-check', value: String(orders.value.length) },
  { label: 'Usuários Cadastrados', icon: 'bi bi-people', value: String(totalUsers.value) },
  { label: 'Produtos em Linha', icon: 'bi bi-box-seam', value: String(totalProducts.value) },
  { label: 'Faturamento Total', icon: 'bi bi-currency-dollar', value: totalRevenue.value },
])

const statusLabel = (s: string) => {
  const map: Record<string, string> = {
    pending: 'Pendente',
    paid: 'Pago',
    shipped: 'Enviado',
    approved: 'Aprovado',
    delivered: 'Entregue'
  }
  return map[s] || s
}

const formatDate = (d: string) => {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

// ===== MOUNTED =====

onMounted(() => {
  // Simula delay de API real (800ms)
  setTimeout(() => {
    // Gera 35 pedidos mockados
    const mockOrders: Order[] = []
    for (let i = 1; i <= 35; i++) {
      mockOrders.push(generateOrder(i))
    }
    
    // Ordena por data (mais recentes primeiro)
    orders.value = mockOrders.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    // Usuários únicos (simulando cadastros)
    totalUsers.value = randomInt(120, 180)
    
    // Produtos no catálogo
    totalProducts.value = productNames.length + randomInt(40, 80)

    loadingOrders.value = false
  }, 800)
})
</script>

<style scoped>
/* Variáveis de Tema Global do Dashboard */
:component {
  --bg-card: linear-gradient(145deg, #1e1e1e, #141414);
  --border-color: #262626;
  --accent-color: #c9a96e;
  --text-main: #f3f4f6;
  --text-muted: #8e8e93;
}

/* Grid Layout Responsivo */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

/* Cards Modernizados */
.stat-card {
  background: linear-gradient(145deg, #1c1c1e, #111112);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.stat-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent-color);
  box-shadow: 0 12px 30px rgba(201, 169, 110, 0.1);
}

.stat-icon {
  width: 56px;
  height: 56px;
  background: #1a1a1c;
  border: 1px solid #2c2c2e;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--accent-color);
  flex-shrink: 0;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.stat-value {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-main);
  letter-spacing: -0.5px;
}

.stat-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 500;
}

/* Seção de Tabela */
.section-header {
  margin-bottom: 20px;
}

.section-title {
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-muted);
}

/* Wrapper da Tabela com visual flutuante */
.table-wrapper {
  background: #121214;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th {
  padding: 16px 24px;
  color: var(--text-muted);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: #171719;
  border-bottom: 1px solid var(--border-color);
}

td {
  padding: 16px 24px;
  border-bottom: 1px solid #1a1a1c;
  font-size: 0.9rem;
  color: #e5e7eb;
}

tr:last-child td {
  border-bottom: none;
}

/* Estilização da Coluna do Cliente (Avatar + Nome) */
.client-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.client-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #2c2c2e;
  color: var(--accent-color);
  font-weight: 600;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #3a3a3c;
}

.client-name {
  font-weight: 500;
}

.total-cell {
  font-weight: 600;
}

.date-cell {
  color: var(--text-muted);
}

/* Badges de Status Refinados */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

/* Cores dos Status específicos */
.pending { background: rgba(251, 197, 49, 0.1); color: #fbc531; }
.pending .status-dot { background: #fbc531; }

.paid, .approved { background: rgba(76, 209, 55, 0.1); color: #4cd137; }
.paid .status-dot, .approved .status-dot { background: #4cd137; }

.shipped, .delivered { background: rgba(0, 168, 255, 0.1); color: #00a8ff; }
.shipped .status-dot, .delivered .status-dot { background: #00a8ff; }

/* Estados de Loading e Vazio */
.loading-state, .empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 24px;
  color: var(--text-muted);
  gap: 16px;
  background: #121214;
  border: 1px solid var(--border-color);
  border-radius: 16px;
}

.empty-state i {
  font-size: 2.5rem;
  color: #3a3a3c;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #2c2c2e;
  border-top-color: var(--accent-color);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>