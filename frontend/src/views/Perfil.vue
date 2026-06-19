<template>
  <div class="perfil-page">
    <div class="perfil-container">

      <!-- SIDEBAR -->
      <aside class="sidebar">
        <div class="brand-mark">IVY JOIAS</div>

        <div class="user-box">
          <div class="avatar-wrapper" @click="triggerUpload" title="Alterar foto">
            <div class="avatar" :style="fotoUrl ? { backgroundImage: `url(${fotoUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}">
              <span v-if="!fotoUrl">{{ initial }}</span>
            </div>
            <div class="avatar-overlay">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </div>
            <input ref="fileInput" type="file" accept="image/*" style="display:none" @change="onFileChange" />
          </div>
          <h2>{{ user?.name || "Usuário" }}</h2>
          <p class="user-email">{{ user?.email || "usuario@email.com" }}</p>
          <span class="premium-pill">✦ Cliente Premium</span>
          <button v-if="fotoUrl" class="remove-photo-btn" @click.stop="removerFoto">Remover foto</button>
        </div>

        <nav class="menu">
          <button :class="{ active: activeTab === 'conta' }" @click="activeTab = 'conta'">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Minha Conta
          </button>
          <button :class="{ active: activeTab === 'pedidos' }" @click="activeTab = 'pedidos'">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
            Meus Pedidos
          </button>
          <button :class="{ active: activeTab === 'enderecos' }" @click="activeTab = 'enderecos'">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            Endereços
          </button>
          <button :class="{ active: activeTab === 'cupons' }" @click="activeTab = 'cupons'">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>
            Cupons
          </button>
        </nav>

        <button class="logout-btn" @click="logout">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
          Sair da Conta
        </button>
      </aside>

      <!-- CONTEÚDO -->
      <main class="content">

        <!-- CONTA -->
        <div v-if="activeTab === 'conta'" class="tab-content">
          <div class="page-header">
            <p class="eyebrow">Área do Cliente</p>
            <h1>Olá, {{ user?.name?.split(' ')[0] || "Visitante" }}</h1>
            <div class="header-rule"></div>
          </div>

          <section class="stats">
            <div class="stat-card">
              <span class="stat-icon">✦</span>
              <h3>{{ listaPedidos.length }}</h3>
              <p>Pedidos Realizados</p>
            </div>
            <div class="stat-card">
              <span class="stat-icon">◈</span>
              <h3>{{ totalGastoFormatado }}</h3>
              <p>Total Investido</p>
            </div>
            <div class="stat-card">
              <span class="stat-icon">♔</span>
              <h3>{{ membroDesde }}</h3>
              <p>Membro Desde</p>
            </div>
          </section>

          <section class="section">
            <h2 class="section-title"><span>Informações da Conta</span></h2>
            <form @submit.prevent="salvarDados" class="form-grid">
              <div class="input-group">
                <label>Nome Completo</label>
                <input type="text" v-model="editUser.name" placeholder="Seu nome">
              </div>
              <div class="input-group">
                <label>E-mail</label>
                <input type="email" v-model="editUser.email" placeholder="Seu e-mail">
              </div>
              <div class="input-group">
                <label>Telefone</label>
                <input type="tel" v-model="editUser.phone" placeholder="(11) 99999-9999">
              </div>
              <div class="input-group">
                <label>CPF</label>
                <input type="text" v-model="editUser.cpf" placeholder="000.000.000-00">
              </div>
              <div class="info-card">
                <span>Status</span>
                <strong class="gold-text">✦ Cliente Premium</strong>
              </div>
              <div class="info-card">
                <span>Membro desde</span>
                <strong>{{ membroDesde }}</strong>
              </div>
              <div class="form-actions">
                <button type="submit" class="btn-primary" :disabled="!foiAlterado">Salvar Alterações</button>
              </div>
            </form>
          </section>

          <section class="section">
            <h2 class="section-title"><span>Alterar Senha</span></h2>
            <form @submit.prevent="alterarSenha" class="form-grid">
              <div class="input-group">
                <label>Senha Atual</label>
                <input type="password" v-model="senhaForm.atual" placeholder="••••••••">
              </div>
              <div class="input-group">
                <label>Nova Senha</label>
                <input type="password" v-model="senhaForm.nova" placeholder="••••••••">
              </div>
              <div class="form-actions">
                <button type="submit" class="btn-primary" :disabled="!senhaForm.atual || !senhaForm.nova">Atualizar Senha</button>
              </div>
            </form>
          </section>
        </div>

        <!-- PEDIDOS -->
        <div v-if="activeTab === 'pedidos'" class="tab-content">
          <div class="page-header">
            <p class="eyebrow">Histórico</p>
            <h1>Meus Pedidos</h1>
            <div class="header-rule"></div>
          </div>
          <section class="section">
            <div class="orders-list" v-if="listaPedidos.length > 0">
              <div v-for="pedido in listaPedidos" :key="pedido.id" class="order-card">
                <div class="order-details">
                  <span class="order-meta">{{ pedido.id }} · {{ pedido.data }}</span>
                  <h3>{{ pedido.produto }}</h3>
                  <p class="order-price">R$ {{ pedido.valor.toFixed(2) }}</p>
                </div>
                <div class="status-badge" :class="pedido.statusClass">{{ pedido.status }}</div>
              </div>
            </div>
            <div v-else class="empty-state">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
              <p>Nenhum pedido encontrado.</p>
              <button class="btn-primary" style="margin-top:8px" @click="gerarPedidosMock">Ver Demonstração</button>
            </div>
          </section>
        </div>

        <!-- ENDEREÇOS -->
        <div v-if="activeTab === 'enderecos'" class="tab-content">
          <div class="page-header">
            <p class="eyebrow">Entrega</p>
            <h1>Meus Endereços</h1>
            <div class="header-rule"></div>
          </div>
          <section class="section">
            <button class="btn-primary" style="margin-bottom:24px" @click="mostrarFormEndereco = true">+ Adicionar Endereço</button>

            <div v-if="mostrarFormEndereco" class="address-form-overlay">
              <h3>Novo Endereço</h3>
              <div class="form-grid">
                <div class="input-group">
                  <label>Título (ex: Casa, Trabalho)</label>
                  <input type="text" v-model="novoEndereco.titulo" placeholder="Casa">
                </div>
                <div class="input-group">
                  <label>CEP</label>
                  <input type="text" v-model="novoEndereco.cep" placeholder="00000-000" @blur="buscarCep">
                </div>
                <div class="input-group" style="grid-column: span 2">
                  <label>Rua</label>
                  <input type="text" v-model="novoEndereco.rua" placeholder="Av. Paulista">
                </div>
                <div class="input-group">
                  <label>Número</label>
                  <input type="text" v-model="novoEndereco.numero" placeholder="1000">
                </div>
                <div class="input-group">
                  <label>Complemento</label>
                  <input type="text" v-model="novoEndereco.complemento" placeholder="Apto 42">
                </div>
                <div class="input-group">
                  <label>Bairro</label>
                  <input type="text" v-model="novoEndereco.bairro" placeholder="Bela Vista">
                </div>
                <div class="input-group">
                  <label>Cidade</label>
                  <input type="text" v-model="novoEndereco.cidade" placeholder="São Paulo">
                </div>
                <div class="input-group">
                  <label>Estado</label>
                  <select v-model="novoEndereco.estado">
                    <option value="">Selecione</option>
                    <option v-for="uf in estados" :key="uf" :value="uf">{{ uf }}</option>
                  </select>
                </div>
                <div class="input-group checkbox-group">
                  <label><input type="checkbox" v-model="novoEndereco.principal"> Definir como principal</label>
                </div>
              </div>
              <div class="form-actions" style="margin-top:20px">
                <button type="button" class="btn-ghost" @click="mostrarFormEndereco = false">Cancelar</button>
                <button type="button" class="btn-primary" @click="salvarEndereco">Salvar Endereço</button>
              </div>
            </div>

            <div class="address-grid" v-if="listaEnderecos.length > 0">
              <div v-for="end in listaEnderecos" :key="end.id" class="address-card" :class="{ principal: end.principal }">
                <div class="address-header">
                  <strong>{{ end.titulo }}</strong>
                  <div class="address-actions">
                    <span v-if="end.principal" class="address-badge">Principal</span>
                    <button v-else @click="definirEnderecoPrincipal(end.id)" class="set-main-btn">Definir Principal</button>
                    <button @click="removerEndereco(end.id)" class="btn-icon-remove small">
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  </div>
                </div>
                <p>{{ end.rua }}, {{ end.numero }}<span v-if="end.complemento"> — {{ end.complemento }}</span></p>
                <p>{{ end.bairro }} — {{ end.cidade }}/{{ end.estado }}</p>
                <p>CEP: {{ end.cep }}</p>
              </div>
            </div>
            <div v-else class="empty-state">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <p>Nenhum endereço cadastrado.</p>
            </div>
          </section>
        </div>

        <!-- CUPONS -->
        <div v-if="activeTab === 'cupons'" class="tab-content">
          <div class="page-header">
            <p class="eyebrow">Descontos</p>
            <h1>Meus Cupons</h1>
            <div class="header-rule"></div>
          </div>
          <section class="section">
            <div class="coupon-input-area">
              <div class="input-group" style="flex:1">
                <label>Inserir código</label>
                <input type="text" v-model="cupomInput" placeholder="CÓDIGO DO CUPOM" @keyup.enter="aplicarCupom" style="letter-spacing:0.1em">
              </div>
              <button class="btn-primary" style="margin-top:22px" @click="aplicarCupom" :disabled="!cupomInput.trim()">Aplicar</button>
            </div>
            <div class="coupon-grid" v-if="listaCupons.length > 0">
              <div v-for="cupom in listaCupons" :key="cupom.codigo" class="coupon-card">
                <div class="coupon-left">
                  <h2>{{ cupom.desconto }}</h2>
                  <span>OFF</span>
                </div>
                <div class="coupon-divider">
                  <span></span><span></span><span></span>
                </div>
                <div class="coupon-right">
                  <h3>{{ cupom.codigo }}</h3>
                  <p>{{ cupom.regra }}</p>
                  <span class="expiry">Válido até {{ cupom.validade }}</span>
                </div>
              </div>
            </div>
            <div v-else class="empty-state">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/></svg>
              <p>Nenhum cupom disponível.</p>
            </div>
          </section>
        </div>

      </main>
    </div>

    <!-- TOAST -->
    <Transition name="toast">
      <div v-if="mensagemSucesso" class="toast" :class="toastTipo">
        <div class="toast-icon">
          <svg v-if="toastTipo === 'success'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </div>
        <span>{{ mensagemSucesso }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const activeTab = ref("conta")
const mensagemSucesso = ref("")
const toastTipo = ref("success")
const mostrarFormEndereco = ref(false)
const cupomInput = ref("")
const fileInput = ref(null)
const fotoUrl = ref(localStorage.getItem("perfil_foto") || "")

const estados = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"]

const pedidosMock = [
  { id: "Pedido #10458", data: "Hoje", produto: "Pulseira Luxo Prata 925", valor: 290.00, status: "Entregue", statusClass: "success" },
  { id: "Pedido #10312", data: "14 Mai 2026", produto: "Anel Solitário Diamante Cravejado", valor: 1200.00, status: "Entregue", statusClass: "success" },
  { id: "Pedido #10289", data: "28 Abr 2026", produto: "Relógio de Pulso Masculino", valor: 299.90, status: "Enviado", statusClass: "info" },
  { id: "Pedido #10156", data: "10 Mar 2026", produto: "Bolsa de Couro Legítimo", valor: 459.00, status: "Entregue", statusClass: "success" },
  { id: "Pedido #09845", data: "02 Mar 2026", produto: "Colar Corrente Veneziana Ouro 18k", valor: 1400.00, status: "Cancelado", statusClass: "danger" }
]

const enderecosMock = [
  { id: 1, titulo: "Casa", rua: "Av. Paulista", numero: "1000", complemento: "Apto 42", bairro: "Bela Vista", cidade: "São Paulo", estado: "SP", cep: "01310-100", principal: true }
]

const cuponsMock = [
  { codigo: "iVY15", desconto: "20%", regra: "Válido para joias de prata.", validade: "30/06/2026" },
  { codigo: "FRETEGRATIS", desconto: "Grátis", regra: "Entrega gratuita sem valor mínimo.", validade: "15/07/2026" },
  { codigo: "BLACK50", desconto: "R$ 50", regra: "Desconto de R$ 50 em compras acima de R$ 300.", validade: "25/12/2026" }
]

const obterDoStorageOuCriarMock = (chave, dadosMock) => {
  if (typeof window === "undefined") return dadosMock
  const localData = localStorage.getItem(chave)
  if (!localData) { localStorage.setItem(chave, JSON.stringify(dadosMock)); return dadosMock }
  return JSON.parse(localData)
}

const salvarNoStorage = (chave, dados) => {
  if (typeof window !== "undefined") localStorage.setItem(chave, JSON.stringify(dados))
}

// ✅ Usa o usuário que de fato logou (salvo pelo Login.vue em "user"),
// e não mais um nome fixo de mock.
function carregarUsuarioLogado() {
  const raw = localStorage.getItem("user")
  if (!raw) {
    return { name: "", email: "", phone: "", cpf: "" }
  }
  try {
    const logado = JSON.parse(raw)
    return {
      name: logado.name || "",
      email: logado.email || "",
      phone: logado.phone || "",
      cpf: logado.cpf || ""
    }
  } catch (e) {
    return { name: "", email: "", phone: "", cpf: "" }
  }
}

const user = ref(carregarUsuarioLogado())
const editUser = ref({ ...user.value })
const listaPedidos = ref(obterDoStorageOuCriarMock("perfil_pedidos", pedidosMock))
const listaEnderecos = ref(obterDoStorageOuCriarMock("perfil_enderecos", enderecosMock))
const listaCupons = ref(obterDoStorageOuCriarMock("perfil_cupons", cuponsMock))
const senhaForm = ref({ atual: "", nova: "" })
const novoEndereco = ref({ titulo: "", cep: "", rua: "", numero: "", complemento: "", bairro: "", cidade: "", estado: "", principal: false })

const foiAlterado = computed(() =>
  editUser.value.name !== user.value.name ||
  editUser.value.email !== user.value.email ||
  editUser.value.phone !== user.value.phone ||
  editUser.value.cpf !== user.value.cpf
)
const initial = computed(() => user.value?.name?.charAt(0)?.toUpperCase() || "U")
const totalGastoFormatado = computed(() => {
  const total = listaPedidos.value.filter(p => p.status === "Entregue").reduce((s, p) => s + p.valor, 0)
  return `R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
})
const membroDesde = computed(() => "2024")

function triggerUpload() { fileInput.value?.click() }
function onFileChange(event) {
  const file = event.target.files[0]
  if (!file) return
  if (!file.type.startsWith("image/")) { mostrarMensagem("Selecione uma imagem válida", "error"); return }
  if (file.size > 5 * 1024 * 1024) { mostrarMensagem("Imagem deve ter no máximo 5MB", "error"); return }
  const reader = new FileReader()
  reader.onload = (e) => { fotoUrl.value = e.target.result; localStorage.setItem("perfil_foto", e.target.result); mostrarMensagem("Foto atualizada!") }
  reader.readAsDataURL(file)
  event.target.value = ""
}
function removerFoto() { fotoUrl.value = ""; localStorage.removeItem("perfil_foto"); mostrarMensagem("Foto removida") }

function mostrarMensagem(texto, tipo = "success") {
  mensagemSucesso.value = texto; toastTipo.value = tipo
  setTimeout(() => mensagemSucesso.value = "", 3000)
}

function salvarDados() {
  user.value = { ...editUser.value }
  // mantém sincronizado com o objeto "user" usado no login/navbar/etc
  const raw = localStorage.getItem("user")
  const atual = raw ? JSON.parse(raw) : {}
  localStorage.setItem("user", JSON.stringify({ ...atual, ...user.value }))
  mostrarMensagem("Alterações salvas!")
}

function alterarSenha() { if (senhaForm.value.atual && senhaForm.value.nova) { senhaForm.value = { atual: "", nova: "" }; mostrarMensagem("Senha atualizada!") } }
function definirEnderecoPrincipal(id) { listaEnderecos.value = listaEnderecos.value.map(e => ({ ...e, principal: e.id === id })); salvarNoStorage("perfil_enderecos", listaEnderecos.value); mostrarMensagem("Endereço principal atualizado") }
function removerEndereco(id) { listaEnderecos.value = listaEnderecos.value.filter(e => e.id !== id); salvarNoStorage("perfil_enderecos", listaEnderecos.value); mostrarMensagem("Endereço removido") }
function salvarEndereco() {
  if (!novoEndereco.value.titulo || !novoEndereco.value.rua || !novoEndereco.value.numero) { mostrarMensagem("Preencha os campos obrigatórios", "error"); return }
  const id = Math.max(...listaEnderecos.value.map(e => e.id), 0) + 1
  if (novoEndereco.value.principal) listaEnderecos.value = listaEnderecos.value.map(e => ({ ...e, principal: false }))
  listaEnderecos.value.push({ ...novoEndereco.value, id })
  salvarNoStorage("perfil_enderecos", listaEnderecos.value)
  mostrarFormEndereco.value = false
  novoEndereco.value = { titulo: "", cep: "", rua: "", numero: "", complemento: "", bairro: "", cidade: "", estado: "", principal: false }
  mostrarMensagem("Endereço adicionado!")
}
async function buscarCep() {
  const cep = novoEndereco.value.cep.replace(/\D/g, "")
  if (cep.length !== 8) return
  try {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const data = await res.json()
    if (!data.erro) { novoEndereco.value.rua = data.logradouro; novoEndereco.value.bairro = data.bairro; novoEndereco.value.cidade = data.localidade; novoEndereco.value.estado = data.uf }
  } catch (e) {}
}
function aplicarCupom() {
  const codigo = cupomInput.value.trim().toUpperCase()
  const validos = { "BEMVINDO10": { desconto: "10%", regra: "Desconto de boas-vindas.", validade: "31/12/2026" }, "BLACK50": { desconto: "R$ 50", regra: "R$ 50 em compras acima de R$ 300.", validade: "25/12/2026" }, "FRETEGRATIS": { desconto: "Grátis", regra: "Entrega gratuita sem valor mínimo.", validade: "31/12/2026" } }
  if (validos[codigo]) {
    if (listaCupons.value.some(c => c.codigo === codigo)) { mostrarMensagem("Você já possui este cupom", "error"); return }
    listaCupons.value.push({ codigo, ...validos[codigo] }); salvarNoStorage("perfil_cupons", listaCupons.value); cupomInput.value = ""; mostrarMensagem(`Cupom ${codigo} ativado!`)
  } else { mostrarMensagem("Cupom inválido ou expirado", "error") }
}
function gerarPedidosMock() { listaPedidos.value = pedidosMock; salvarNoStorage("perfil_pedidos", listaPedidos.value); mostrarMensagem("Pedidos carregados!") }
function logout() {
  ["token","user","role","perfil_pedidos","perfil_enderecos","perfil_cupons","perfil_foto"].forEach(k => localStorage.removeItem(k))
  router.push("/login")
}
onMounted(() => { if (listaPedidos.value.length === 0) { listaPedidos.value = pedidosMock; salvarNoStorage("perfil_pedidos", listaPedidos.value) } })
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Inter:wght@300;400;500;600&display=swap');

.perfil-page {
  min-height: 100vh;
  background: #faf8f5;
  padding: 40px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', system-ui, sans-serif;
}

.perfil-container {
  width: 100%;
  max-width: 1280px;
  display: grid;
  grid-template-columns: 280px 1fr;
  border: 1px solid #eeeae6;
}

.sidebar {
  background: #111;
  color: #ffffff;
  padding: 36px 24px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.brand-mark {
  font-family: 'Cormorant Garamond', serif;
  font-size: 13px;
  letter-spacing: 0.35em;
  color: #d4af37;
  margin-bottom: 36px;
  opacity: 0.95;
  text-align: center;
}

.user-box {
  text-align: center;
  margin-bottom: 36px;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(212,175,55,0.15);
}

.avatar-wrapper {
  position: relative;
  width: 84px; height: 84px;
  margin: 0 auto 16px;
  cursor: pointer;
  border-radius: 50%;
}

.avatar {
  width: 84px; height: 84px;
  border-radius: 50%;
  background: #d4af37;
  color: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Cormorant Garamond', serif;
  font-size: 30px;
  font-weight: 500;
  overflow: hidden;
  box-shadow: 0 0 0 2px #111, 0 0 0 3px rgba(212,175,55,0.4);
  transition: filter 0.2s;
}

.avatar-wrapper:hover .avatar { filter: brightness(0.7); }

.avatar-overlay {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  color: #ffffff;
  pointer-events: none;
}

.avatar-wrapper:hover .avatar-overlay { opacity: 1; }

.user-box h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px;
  font-weight: 400;
  margin: 0 0 4px 0;
  color: #ffffff;
}

.user-email {
  font-size: 12px;
  color: rgba(255,255,255,0.4);
  margin: 0 0 12px 0;
  word-break: break-all;
}

.premium-pill {
  display: inline-block;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #d4af37;
  border: 1px solid rgba(212,175,55,0.4);
  padding: 4px 12px;
}

.remove-photo-btn {
  display: block;
  margin: 10px auto 0;
  background: none;
  border: none;
  color: rgba(255,255,255,0.25);
  font-size: 11px;
  cursor: pointer;
  transition: color 0.2s;
  font-family: 'Inter', sans-serif;
}
.remove-photo-btn:hover { color: #e85555; }

.menu {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.menu button {
  height: 46px;
  border: none;
  background: transparent;
  color: rgba(255,255,255,0.4);
  cursor: pointer;
  text-align: left;
  padding: 0 14px;
  font-size: 12.5px;
  font-weight: 500;
  letter-spacing: 0.04em;
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  gap: 11px;
  transition: all 0.2s;
}

.menu button:hover { color: #ffffff; background: rgba(255,255,255,0.04); }

.menu .active {
  background: rgba(212,175,55,0.08);
  color: #d4af37;
  border-left: 2px solid #d4af37;
  padding-left: 12px;
}

.logout-btn {
  height: 44px;
  border: 1px solid rgba(232,85,85,0.2);
  background: transparent;
  color: rgba(232,85,85,0.6);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.04em;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  transition: all 0.2s;
  margin-top: 24px;
}
.logout-btn:hover { background: rgba(232,85,85,0.06); color: #e85555; border-color: rgba(232,85,85,0.4); }

.content {
  background: #ffffff;
  padding: 48px 52px;
  min-height: 600px;
}

.tab-content { animation: fadeUp 0.25s ease; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.page-header { margin-bottom: 36px; }

.eyebrow {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #d4af37;
  margin: 0 0 12px 0;
}

.page-header h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(30px, 3vw, 40px);
  font-weight: 300;
  color: #111;
  margin: 0 0 20px 0;
  line-height: 1.1;
}

.header-rule {
  height: 1px;
  background: linear-gradient(to right, rgba(212,175,55,0.5), transparent);
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 44px;
}

.stat-card {
  background: #111;
  color: #ffffff;
  padding: 24px 20px;
  position: relative;
  overflow: hidden;
}

.stat-icon {
  display: block;
  font-size: 14px;
  color: #d4af37;
  margin-bottom: 10px;
}

.stat-card h3 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 28px;
  font-weight: 500;
  margin: 0 0 4px 0;
  color: #d4af37;
}

.stat-card p { margin: 0; font-size: 11px; opacity: 0.5; letter-spacing: 0.03em; }

.section { margin-bottom: 44px; }

.section-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px;
  font-weight: 400;
  color: #111;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 14px;
}

.section-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #eeeae6;
}

.form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }

.input-group { display: flex; flex-direction: column; gap: 7px; }

.input-group label {
  font-size: 10px;
  font-weight: 600;
  color: #999;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.input-group input,
.input-group select {
  height: 46px;
  border: 1px solid #eeeae6;
  padding: 0 14px;
  font-size: 14px;
  outline: none;
  background: #fff;
  color: #111;
  width: 100%;
  transition: border-color 0.2s;
  font-family: 'Inter', sans-serif;
}

.input-group input:focus,
.input-group select:focus {
  border-color: #d4af37;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  text-transform: none;
  letter-spacing: 0;
  color: #555;
  cursor: pointer;
  padding-top: 24px;
  font-weight: 400;
}

.input-group input[type="checkbox"] {
  width: 16px; height: 16px;
  accent-color: #d4af37;
}

.info-card {
  background: #faf8f5;
  border: 1px solid #eeeae6;
  padding: 14px 18px;
}

.info-card span {
  display: block;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 5px;
}

.info-card strong { font-size: 14px; color: #111; font-weight: 500; }
.gold-text { color: #b5942b !important; }

.form-actions { grid-column: span 2; display: flex; justify-content: flex-end; gap: 10px; margin-top: 4px; }

.btn-primary {
  background: #111;
  color: #d4af37;
  border: 1px solid #111;
  padding: 13px 28px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Inter', sans-serif;
}

.btn-primary:hover { background: #d4af37; color: #111; border-color: #d4af37; }
.btn-primary:disabled { background: #e5e2dc; color: #aaa; border-color: #e5e2dc; cursor: not-allowed; }
.btn-primary.small { padding: 10px 16px; font-size: 10px; flex: 1; }

.btn-ghost {
  background: transparent;
  color: #777;
  border: 1px solid #eeeae6;
  padding: 13px 24px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Inter', sans-serif;
}
.btn-ghost:hover { background: #faf8f5; border-color: #d4af37; color: #111; }

.btn-icon-remove {
  background: #fdf3f3;
  border: 1px solid #f5d8d8;
  width: 38px; height: 38px;
  color: #c04040;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}
.btn-icon-remove:hover { background: #fbe5e5; }
.btn-icon-remove.small { width: 28px; height: 28px; }

.empty-state {
  text-align: center;
  padding: 48px 24px;
  color: #999;
  background: #faf8f5;
  border: 1px dashed #ddd6c8;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.empty-state svg { color: #ddd6c8; }
.empty-state p { font-size: 14px; }

.orders-list { display: flex; flex-direction: column; gap: 12px; }

.order-card {
  background: #ffffff;
  border: 1px solid #eeeae6;
  padding: 18px 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: border-color 0.2s;
}
.order-card:hover { border-color: rgba(212,175,55,0.4); }

.order-meta { font-size: 11px; color: #999; letter-spacing: 0.03em; }
.order-details h3 { margin: 5px 0 3px 0; font-size: 15px; color: #111; font-weight: 400; font-family: 'Cormorant Garamond', serif; }
.order-price { margin: 0; font-size: 13px; color: #777; }

.status-badge { padding: 5px 13px; font-size: 10px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }
.status-badge.success { background: #f0f9f0; color: #3a7a3a; }
.status-badge.danger { background: #fdf0f0; color: #c04040; }
.status-badge.info { background: #f0f0fd; color: #4040b0; }
.status-badge.warning { background: #fdf8f0; color: #a07020; }

.address-form-overlay {
  background: #faf8f5;
  border: 1px solid #eeeae6;
  padding: 24px;
  margin-bottom: 20px;
}
.address-form-overlay h3 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 18px;
  font-weight: 400;
  color: #111;
  margin: 0 0 18px 0;
}

.address-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }

.address-card {
  background: #ffffff;
  border: 1px solid #eeeae6;
  padding: 18px;
  transition: border-color 0.2s;
}
.address-card.principal { border-color: rgba(212,175,55,0.5); background: #fffdf7; }

.address-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.address-header strong { color: #111; font-size: 14px; font-weight: 500; }
.address-actions { display: flex; align-items: center; gap: 8px; }

.address-badge {
  background: rgba(212,175,55,0.1);
  color: #b5942b;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 4px 10px;
  text-transform: uppercase;
}

.set-main-btn {
  background: none; border: none;
  color: #999; font-size: 11px;
  cursor: pointer; text-decoration: underline;
  font-family: 'Inter', sans-serif;
}
.set-main-btn:hover { color: #111; }
.address-card p { margin: 0 0 3px 0; font-size: 13px; color: #666; }

.coupon-input-area { display: flex; gap: 12px; margin-bottom: 24px; align-items: flex-end; }
.coupon-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }

.coupon-card {
  background: #ffffff;
  border: 1px solid #eeeae6;
  overflow: hidden;
  display: flex;
}

.coupon-left {
  background: #111;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  gap: 2px;
}

.coupon-left h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 24px;
  font-weight: 500;
  color: #d4af37;
  margin: 0;
  line-height: 1;
}

.coupon-left span {
  font-size: 9px;
  letter-spacing: 0.2em;
  color: rgba(212,175,55,0.5);
  text-transform: uppercase;
}

.coupon-divider {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 12px 0;
  background: #faf8f5;
}

.coupon-divider span {
  display: block;
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #ddd6c8;
}

.coupon-right { padding: 16px 18px; display: flex; flex-direction: column; justify-content: center; flex: 1; }
.coupon-right h3 { margin: 0 0 4px 0; font-size: 14px; color: #111; font-weight: 600; letter-spacing: 0.05em; }
.coupon-right p { margin: 0 0 8px 0; font-size: 12px; color: #777; }
.coupon-right .expiry { font-size: 11px; color: #999; }

.toast {
  position: fixed;
  bottom: 28px; right: 28px;
  background: #111;
  color: #ffffff;
  padding: 14px 20px;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  border-left: 3px solid #d4af37;
  z-index: 999;
}

.toast.error { border-left-color: #e85555; }

.toast-icon {
  width: 22px; height: 22px;
  border-radius: 50%;
  background: rgba(212,175,55,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #d4af37;
}

.toast.error .toast-icon { background: rgba(232,85,85,0.15); color: #e88888; }

.toast-enter-active { animation: toastIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.toast-leave-active { animation: toastOut 0.2s ease forwards; }

@keyframes toastIn {
  from { opacity: 0; transform: translateY(16px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes toastOut {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(8px); }
}

@media (max-width: 1024px) {
  .perfil-container { grid-template-columns: 1fr; }
  .sidebar { padding: 28px 20px; }
  .content { padding: 32px 24px; }
}

@media (max-width: 768px) {
  .stats, .form-grid, .address-grid, .coupon-grid { grid-template-columns: 1fr; }
  .form-actions { grid-column: span 1; }
  .coupon-input-area { flex-direction: column; }
  .toast { bottom: 16px; right: 16px; left: 16px; }
}
</style>