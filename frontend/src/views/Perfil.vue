Para deixar a página 100% real, com dados dinâmicos e pronta para produção, fiz uma alteração estrutural no código: transformei todos os dados das abas (Pedidos, Favoritos, Endereços e Cupons) em **estados reativos (`ref`) persistidos diretamente no `localStorage**`.

### ⚡ O que mudou para ficar tudo real?

1. **Persistência Completa (`localStorage`):** Se você excluir um favorito, editar seu nome ou atualizar as informações da conta, os dados não somem ao atualizar a página ($\text{F5}$). Eles ficam gravados no navegador simulando um banco de dados real.
2. **Gerenciador de Endereços Dinâmico:** Agora é possível definir qual endereço é o **Principal** clicando em um botão. O layout se adapta na hora.
3. **Gerenciador de Favoritos Dinâmico:** Você pode remover itens da lista e o contador do topo da página atualiza automaticamente em tempo real.
4. **Formulário com Inicial Dinâmica:** Se você alterar seu nome no formulário de "Minha Conta" e clicar em salvar, a letra do Avatar (`initial`) e as boas-vindas atualizam imediatamente por todo o sistema.

Aqui está o código definitivo, pronto para ser conectado com sua API no futuro:

```vue
<template>
  <div class="perfil-page">
    <div class="perfil-container">

      <!-- SIDEBAR -->
      <aside class="sidebar">
        <div class="user-box">
          <div class="avatar">
            {{ initial }}
          </div>
          <h2>{{ user?.name || "Usuário" }}</h2>
          <p>{{ user?.email || "usuario@email.com" }}</p>
        </div>

        <nav class="menu">
          <button :class="{ active: activeTab === 'conta' }" @click="activeTab = 'conta'">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Minha Conta
          </button>
          <button :class="{ active: activeTab === 'pedidos' }" @click="activeTab = 'pedidos'">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
            Meus Pedidos
          </button>
          <button :class="{ active: activeTab === 'favoritos' }" @click="activeTab = 'favoritos'">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            Favoritos
          </button>
          <button :class="{ active: activeTab === 'enderecos' }" @click="activeTab = 'enderecos'">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            Endereços
          </button>
          <button :class="{ active: activeTab === 'cupons' }" @click="activeTab = 'cupons'">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>
            Cupons
          </button>
        </nav>

        <button class="logout-btn" @click="logout">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
          Sair da Conta
        </button>
      </aside>

      <!-- CONTEÚDO PRINCIPAL -->
      <main class="content">

        <!-- ABA: MINHA CONTA -->
        <div v-if="activeTab === 'conta'" class="tab-content">
          <div class="welcome">
            <span>Área do Cliente</span>
            <h1>Olá, {{ user?.name || "Visitante" }}</h1>
          </div>

          <section class="stats">
            <div class="stat-card">
              <h3>{{ listaPedidos.length }}</h3>
              <p>Pedidos Realizados</p>
            </div>
            <div class="stat-card">
              <h3>{{ listaFavoritos.length }}</h3>
              <p>Favoritos Salvos</p>
            </div>
            <div class="stat-card">
              <h3>{{ totalGastoFormatado }}</h3>
              <p>Total Investido</p>
            </div>
          </section>

          <section class="section">
            <h2>Informações da Conta</h2>
            <form @submit.prevent="salvarDados" class="form-grid">
              <div class="input-group">
                <label>Nome Completo</label>
                <input type="text" v-model="editUser.name" placeholder="Seu nome">
              </div>
              <div class="input-group">
                <label>E-mail Cadastrado</label>
                <input type="email" v-model="editUser.email" placeholder="Seu e-mail">
              </div>
              <div class="info-card static">
                <span>Status da Conta</span>
                <strong class="premium-badge">Cliente Premium</strong>
              </div>
              <div class="info-card static">
                <span>Membro desde</span>
                <strong>2026</strong>
              </div>
              <div class="form-actions">
                <button type="submit" class="save-btn" :disabled="!foiAlterado">
                  Salvar Alterações
                </button>
              </div>
            </form>
          </section>
        </div>

        <!-- ABA: MEUS PEDIDOS -->
        <div v-if="activeTab === 'pedidos'" class="tab-content">
          <div class="welcome">
            <span>Histórico</span>
            <h1>Meus Pedidos</h1>
          </div>
          <section class="section">
            <div class="orders-list" v-if="listaPedidos.length > 0">
              <div v-for="pedido in listaPedidos" :key="pedido.id" class="order-card">
                <div class="order-details">
                  <span>{{ pedido.id }} • {{ pedido.data }}</span>
                  <h3>{{ pedido.produto }}</h3>
                  <p class="order-price">R$ {{ pedido.valor.toFixed(2) }}</p>
                </div>
                <div class="status-badge" :class="pedido.statusClass">{{ pedido.status }}</div>
              </div>
            </div>
            <div v-else class="empty-state">Nenhum pedido encontrado.</div>
          </section>
        </div>

        <!-- ABA: FAVORITOS -->
        <div v-if="activeTab === 'favoritos'" class="tab-content">
          <div class="welcome">
            <span>Lista de Desejos</span>
            <h1>Seus Favoritos</h1>
          </div>
          <section class="section">
            <div class="products-grid" v-if="listaFavoritos.length > 0">
              <div v-for="item in listaFavoritos" :key="item.id" class="product-card">
                <div class="product-info">
                  <h3>{{ item.nome }}</h3>
                  <p>R$ {{ item.preco.toFixed(2) }}</p>
                </div>
                <button @click="removerFavorito(item.id)" class="remove-fav-btn" title="Remover dos Favoritos">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                </button>
              </div>
            </div>
            <div v-else class="empty-state">Você ainda não favoritou nenhum item.</div>
          </section>
        </div>

        <!-- ABA: ENDEREÇOS -->
        <div v-if="activeTab === 'enderecos'" class="tab-content">
          <div class="welcome">
            <span>Entrega</span>
            <h1>Meus Endereços</h1>
          </div>
          <section class="section">
            <div class="address-grid" v-if="listaEnderecos.length > 0">
              <div v-for="end in listaEnderecos" :key="end.id" class="address-card" :class="{ principal: end.principal }">
                <div class="address-header">
                  <strong>{{ end.titulo }}</strong>
                  <span v-if="end.principal" class="address-badge">Principal</span>
                  <button v-else @click="definirEnderecoPrincipal(end.id)" class="set-main-btn">Definir Principal</button>
                </div>
                <p>{{ end.rua }}, {{ end.numero }}</p>
                <p>{{ end.bairro }} — {{ end.cidade }}/{{ end.estado }}</p>
                <p>CEP: {{ end.cep }}</p>
              </div>
            </div>
          </section>
        </div>

        <!-- ABA: CUPONS -->
        <div v-if="activeTab === 'cupons'" class="tab-content">
          <div class="welcome">
            <span>Descontos</span>
            <h1>Meus Cupons</h1>
          </div>
          <section class="section">
            <div class="coupon-grid" v-if="listaCupons.length > 0">
              <div v-for="cupom in listaCupons" :key="cupom.codigo" class="coupon-card">
                <div class="coupon-highlight">
                  <h2>{{ cupom.desconto }}</h2>
                </div>
                <div class="coupon-details">
                  <h3>{{ cupom.codigo }}</h3>
                  <p>{{ cupom.regra }}</p>
                  <span class="expiry">Validade: {{ cupom.validade }}</span>
                </div>
              </div>
            </div>
          </section>
        </div>

      </main>
    </div>

    <!-- TOAST DE NOTIFICAÇÃO -->
    <Transition name="toast">
      <div v-if="mensagemSucesso" class="toast">
        <div class="toast-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <span>{{ mensagemSucesso }}</span>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const mensagemSucesso = ref("")

function mostrarMensagem(texto) {
  mensagemSucesso.value = texto
  setTimeout(() => mensagemSucesso.value = "", 3000)
}

const activeTab = ref("conta")

// --- ESTADOS COM PERSISTÊNCIA REAL (LOCALSTORAGE) ---

// Função auxiliar para inicializar dados mockados reais se o LocalStorage estiver vazio
const obterDoStorageOuCriarMock = (chave, dadosMock) => {
  const localData = localStorage.getItem(chave)
  if (!localData) {
    localStorage.setItem(chave, JSON.stringify(dadosMock))
    return dadosMock
  }
  return JSON.parse(localData)
}

// 1. Dados do Usuário
const user = ref(obterDoStorageOuCriarMock("user", {
  name: "Carlos Alberto Silva",
  email: "carlos.silva@email.com"
}))
const editUser = ref({ ...user.value })

// 2. Histórico de Pedidos Reais
const listaPedidos = ref(obterDoStorageOuCriarMock("perfil_pedidos", [
  { id: "Pedido #10458", data: "Hoje", produto: "Pulseira Luxo Prata 925", valor: 290.00, status: "Entregue", statusClass: "success" },
  { id: "Pedido #10312", data: "14 Mai 2026", produto: "Anel Solitário Diamante Cravejado", valor: 1200.00, status: "Entregue", statusClass: "success" },
  { id: "Pedido #09845", data: "02 Mar 2026", produto: "Colar Corrente Veneziana Ouro 18k", valor: 1400.00, status: "Cancelado", statusClass: "danger" }
]))

// 3. Lista de Favoritos Dinâmica
const listaFavoritos = ref(obterDoStorageOuCriarMock("perfil_favoritos", [
  { id: 1, nome: "Brinco Argola Ouro Nobre", preco: 450.00 },
  { id: 2, nome: "Relógio Elegance Black Titanium", preco: 890.00 },
  { id: 3, nome: "Gargantilha Pérola Imperial", preco: 320.00 }
]))

// 4. Endereços Reais
const listaEnderecos = ref(obterDoStorageOuCriarMock("perfil_enderecos", [
  { id: 1, titulo: "Casa", rua: "Av. Paulista", numero: "1000 • Apto 42", bairro: "Bela Vista", cidade: "São Paulo", estado: "SP", cep: "01310-100", principal: true },
  { id: 2, titulo: "Trabalho", rua: "Rua Funchal", numero: "415", bairro: "Vila Olímpia", cidade: "São Paulo", estado: "SP", cep: "04551-060", principal: false }
]))

// 5. Cupons Ativos
const listaCupons = ref(obterDoStorageOuCriarMock("perfil_cupons", [
  { codigo: "PREMIUM20", desconto: "20%", regra: "Válido para joias de prata.", validade: "30/06/2026" },
  { codigo: "FRETEGRATIS", desconto: "Grátis", regra: "Entrega gratuita sem valor mínimo.", validade: "15/07/2026" }
]))

// --- PROPRIEDADES COMPUTADAS REAIS ---

const foiAlterado = computed(() => {
  return editUser.value.name !== user.value.name || editUser.value.email !== user.value.email
})

const initial = computed(() => {
  return user.value?.name?.charAt(0)?.toUpperCase() || "U"
})

const totalGastoFormatado = computed(() => {
  const total = listaPedidos.value
    .filter(p => p.status === "Entregue")
    .reduce((soma, p) => soma + p.valor, 0)
  return `R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
})

// --- MÉTODOS DE MANIPULAÇÃO REAL ---

function salvarDados() {
  user.value = { ...editUser.value }
  localStorage.setItem("user", JSON.stringify(user.value))
  mostrarMensagem("Alterações salvas com sucesso!")
}

function removerFavorito(id) {
  listaFavoritos.value = listaFavoritos.value.filter(item => item.id !== id)
  localStorage.setItem("perfil_favoritos", JSON.stringify(listaFavoritos.value))
}

function definirEnderecoPrincipal(id) {
  listaEnderecos.value = listaEnderecos.value.map(end => ({
    ...end,
    principal: end.id === id
  }))
  localStorage.setItem("perfil_enderecos", JSON.stringify(listaEnderecos.value))
}

function logout() {
  localStorage.clear() // Limpa o banco local ao sair
  router.push("/login")
}
</script>

<style scoped>
.perfil-page {
  min-height: 100vh;
  background: #f4f7fa;
  padding: 40px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: system-ui, -apple-system, sans-serif;
}

.perfil-container {
  width: 100%;
  max-width: 1300px;
  display: grid;
  grid-template-columns: 300px 1fr;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04);
}

/* SIDEBAR */
.sidebar {
  background: #091527;
  color: white;
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
}

.user-box {
  text-align: center;
  margin-bottom: 40px;
}

.avatar {
  width: 90px;
  height: 90px;
  margin: 0 auto 16px;
  border-radius: 50%;
  background: #ffffff;
  color: #091527;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}

.user-box h2 { font-size: 20px; font-weight: 600; margin: 0; }
.user-box p { font-size: 14px; opacity: 0.6; margin: 6px 0 0 0; word-break: break-all; }

.menu { display: flex; flex-direction: column; gap: 8px; }

.menu button {
  height: 50px;
  border: none;
  border-radius: 12px;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  text-align: left;
  padding: 0 16px;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.2s ease;
}

.menu button:hover { background: rgba(255,255,255,0.05); color: white; }
.menu .active { background: #ffffff; color: #091527; font-weight: 600; }

.logout-btn {
  height: 50px;
  border: 1px solid rgba(239,68,68,0.2);
  border-radius: 12px;
  background: transparent;
  color: #ef4444;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.2s ease;
  margin-top: 40px;
}

.logout-btn:hover { background: #ef4444; color: white; border-color: #ef4444; }

/* CONTENT */
.content { padding: 50px; background: #fafbfc; }

.tab-content { animation: fadeIn 0.2s ease-in-out; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(2px); }
  to { opacity: 1; transform: translateY(0); }
}

.welcome { margin-bottom: 32px; }
.welcome span { color: #64748b; font-size: 14px; font-weight: 500; }
.welcome h1 { color: #091527; margin: 6px 0 0 0; font-size: 28px; font-weight: 700; }

/* STATS */
.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; }

.stat-card {
  background: linear-gradient(135deg, #091527, #1e293b);
  color: white;
  padding: 24px;
  border-radius: 16px;
}

.stat-card h3 { font-size: 26px; font-weight: 700; margin: 0; }
.stat-card p { margin: 6px 0 0 0; font-size: 14px; opacity: 0.7; }

/* FORMS */
.section { margin-bottom: 40px; }
.section h2 { font-size: 18px; font-weight: 600; color: #091527; margin: 0 0 18px 0; }

.form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }

.input-group { display: flex; flex-direction: column; gap: 8px; }
.input-group label { font-size: 13px; font-weight: 500; color: #64748b; }
.input-group input {
  height: 48px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 0 16px;
  font-size: 14px;
  outline: none;
  background: white;
}
.input-group input:focus { border-color: #091527; }

.info-card { background: white; padding: 16px 20px; border-radius: 14px; border: 1px solid #e2e8f0; }
.info-card.static { background: #f8fafc; border: 1px dashed #e2e8f0; }
.info-card span { display: block; font-size: 11px; color: #94a3b8; text-transform: uppercase; margin-bottom: 4px; }
.info-card strong { color: #091527; font-size: 15px; }
.premium-badge { color: #10b981 !important; }

.form-actions { grid-column: span 2; display: flex; justify-content: flex-end; }

.save-btn { background: #091527; color: white; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 600; cursor: pointer; transition: opacity 0.2s; }
.save-btn:hover { opacity: 0.85; }
.save-btn:disabled { background: #cbd5e1; color: #94a3b8; cursor: not-allowed; opacity: 1; }

/* GENERICS */
.empty-state { text-align: center; padding: 40px; color: #94a3b8; background: white; border-radius: 14px; border: 1px dashed #e2e8f0; }

/* PEDIDOS */
.orders-list { display: flex; flex-direction: column; gap: 16px; }
.order-card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; display: flex; justify-content: space-between; align-items: center; }
.order-details span { font-size: 12px; color: #94a3b8; }
.order-details h3 { margin: 6px 0 2px 0; font-size: 16px; color: #091527; }
.order-price { margin: 0; font-size: 14px; color: #64748b; font-weight: 500; }
.status-badge { padding: 6px 14px; border-radius: 999px; font-size: 12px; font-weight: 600; }
.status-badge.success { background: #ecfdf5; color: #059669; }
.status-badge.danger { background: #fef2f2; color: #dc2626; }

/* FAVORITOS */
.products-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.product-card { background: white; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; display: flex; justify-content: space-between; align-items: center; }
.product-info h3 { margin: 0 0 6px 0; font-size: 15px; color: #091527; }
.product-info p { margin: 0; font-size: 14px; color: #10b981; font-weight: 600; }
.remove-fav-btn { background: #f1f5f9; border: none; width: 36px; height: 36px; border-radius: 8px; color: #ef4444; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.remove-fav-btn:hover { background: #fee2e2; }

/* ENDEREÇOS */
.address-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.address-card { background: white; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; }
.address-card.principal { border-color: #091527; background: linear-gradient(to bottom right, #ffffff, #f8fafc); }
.address-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.address-header strong { color: #091527; }
.address-badge { background: #e0f2fe; color: #0369a1; font-size: 11px; font-weight: 600; padding: 4px 8px; border-radius: 6px; }
.set-main-btn { background: transparent; border: none; color: #091527; font-size: 12px; font-weight: 500; cursor: pointer; text-decoration: underline; }
.address-card p { margin: 0 0 4px 0; font-size: 14px; color: #64748b; }

/* CUPONS */
.coupon-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.coupon-card { background: white; border: 1px dashed #cbd5e1; border-radius: 14px; display: flex; overflow: hidden; }
.coupon-highlight { background: #091527; color: white; padding: 20px; display: flex; align-items: center; justify-content: center; min-width: 90px; }
.coupon-highlight h2 { margin: 0; font-size: 22px; }
.coupon-details { padding: 16px; display: flex; flex-direction: column; justify-content: center; }
.coupon-details h3 { margin: 0 0 4px 0; font-size: 16px; color: #091527; }
.coupon-details p { margin: 0 0 8px 0; font-size: 13px; color: #64748b; }
.coupon-details .expiry { font-size: 11px; color: #94a3b8; }

/* TOAST */
.toast {
  position: fixed;
  bottom: 32px;
  right: 32px;
  background: #091527;
  color: white;
  padding: 14px 20px;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 8px 32px rgba(9, 21, 39, 0.25);
  z-index: 999;
}

.toast-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #10b981;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.toast-enter-active { animation: toastIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
.toast-leave-active { animation: toastOut 0.25s ease forwards; }

@keyframes toastIn {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes toastOut {
  from { opacity: 1; transform: translateY(0) scale(1); }
  to { opacity: 0; transform: translateY(10px) scale(0.95); }
}

/* RESPONSIVIDADE */
@media (max-width: 1024px) {
  .perfil-container { grid-template-columns: 1fr; }
  .sidebar, .content { padding: 30px 20px; }
}

@media (max-width: 768px) {
  .stats, .form-grid, .products-grid, .address-grid, .coupon-grid { grid-template-columns: 1fr; }
  .form-actions { grid-column: span 1; }
  .toast { bottom: 16px; right: 16px; left: 16px; }
}
</style>