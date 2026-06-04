<template>
  <header class="ivy-header">
    
    <div class="announcement-bar">
      <div class="container-fluid flex-between">
        <div class="top-left">
          <RouterLink to="/atendimento" class="top-link">Suporte ao Cliente</RouterLink>
        </div>
        
        <div class="top-center">
          <Transition name="fade-slide" mode="out-in">
            <span :key="currentMessage">{{ currentMessage }}</span>
          </Transition>
        </div>

        <div class="top-right">
          <RouterLink to="/acessibilidade" class="access-pill">
            <Accessibility :size="14" />
            <span>Acessibilidade</span>
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="main-header">
      <div class="container-fluid header-grid">
        
        <div class="nav-group-left">
          <div class="location-trigger" :class="{ 'has-data': endereco }">
            <MapPin :size="18" stroke-width="1.5" />
            <div class="location-inputs">
              <input 
                type="text" 
                placeholder="Informe seu CEP" 
                v-model="cepFormatted" 
                @input="onCepInput"
                maxlength="9"
              >
              <span v-if="cepLoading" class="loc-text loading-dots">Buscando...</span>
              <span v-else-if="endereco" class="loc-text">{{ endereco }}</span>
              <div v-if="freteInfo" class="frete-popup">
                <div class="frete-popup-header">
                  <strong>{{ endereco }}</strong>
                  <button class="frete-close" @click.stop="fecharFrete">✕</button>
                </div>
                <div class="frete-opcoes">
                  <div class="frete-opcao" v-for="op in freteInfo" :key="op.tipo">
                    <div class="frete-tipo-nome">{{ op.tipo }}</div>
                    <div class="frete-prazo">{{ op.prazo }}</div>
                    <div class="frete-valor" :class="{ gratis: op.gratis }">
                      {{ op.gratis ? 'Grátis' : 'R$ ' + op.valor }}
                    </div>
                  </div>
                </div>
                <p class="frete-note">* Valores estimados. Frete exato calculado no checkout.</p>
              </div>
            </div>
          </div>
        </div>

        <RouterLink to="/" class="brand-logo">
          <h1>IVY</h1>
        </RouterLink>

        <div class="nav-group-right">
          
          <!-- SEARCH -->
          <div class="search-wrapper" :class="{ 'is-active': searchActive }" v-click-outside="fecharBusca">
            <Search 
              class="nav-icon" 
              @click="toggleSearch" 
              :size="22" 
              stroke-width="1.5" 
            />
            <div class="search-box">
              <input 
                type="text" 
                placeholder="O que você procura?" 
                v-model="searchText"
                @input="buscarProdutos"
                @keydown.esc="fecharBusca"
                ref="searchInput"
              >
              <X v-if="searchActive" class="close-search" @click="fecharBusca" :size="18"/>
              
              <!-- RESULTADOS -->
              <Transition name="fade">
                <div v-if="searchActive && searchText.length > 1" class="search-results">

                  <!-- loading -->
                  <div v-if="buscando" class="search-loading">
                    <span class="search-spinner"></span> Buscando...
                  </div>

                  <!-- resultados -->
                  <template v-else>
                    <div v-if="resultadosBusca.length === 0" class="search-empty">
                      <span>Nenhum produto encontrado para</span>
                      <strong>"{{ searchText }}"</strong>
                    </div>

                    <ul v-else>
                      <li 
                        v-for="p in resultadosBusca" 
                        :key="p.id + p.categoria" 
                        @click="irParaProduto(p)"
                      >
                        <div class="res-img">
                          <img v-if="p.imagem" :src="p.imagem" :alt="p.nome" />
                          <div v-else class="res-img-placeholder">◆</div>
                        </div>
                        <div class="res-info">
                          <span class="res-name">{{ p.nome }}</span>
                          <span class="res-cat">{{ p.secao }}</span>
                          <span class="res-price">{{ formatarPreco(p.preco) }}</span>
                        </div>
                        <ArrowUpRight :size="14" class="res-arrow" />
                      </li>
                    </ul>

                    <div class="search-footer" v-if="resultadosBusca.length > 0">
                      <span>{{ resultadosBusca.length }} resultado{{ resultadosBusca.length > 1 ? 's' : '' }} encontrado{{ resultadosBusca.length > 1 ? 's' : '' }}</span>
                    </div>
                  </template>

                </div>
              </Transition>
            </div>
          </div>

          <User 
            class="nav-icon" 
            @click="goLogin" 
            :size="22" 
            stroke-width="1.5" 
          />

          <div class="bag-wrapper" @click="goCart">
            <ShoppingBag :size="22" stroke-width="1.5" />
            <span v-if="cart.items.length" class="bag-count">
              {{ cart.items.length }}
            </span>
          </div>

        </div>
      </div>
    </div>

    <nav class="category-nav">
      <div class="nav-links">
        <RouterLink to="/joias">JOIAS</RouterLink>
        <RouterLink to="/pingentes">PINGENTES</RouterLink>
        <RouterLink to="/casamento">CASAMENTO</RouterLink>
        <RouterLink to="/perfumes">PERFUMES</RouterLink>
        <RouterLink to="/relogios">RELÓGIOS</RouterLink>
        <RouterLink to="/sale" class="sale-link">SALE</RouterLink>
      </div>
    </nav>

  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue"
import { useRouter, RouterLink } from "vue-router"
import { cart } from "@/stores/cart"
import { 
  Search, ShoppingBag, User, MapPin, 
  Accessibility, X, ArrowUpRight 
} from "lucide-vue-next"

const router = useRouter()
const searchActive = ref(false)
const searchInput  = ref(null)
const searchText   = ref("")
const resultadosBusca = ref([])
const buscando = ref(false)
let searchTimer = null

/* ── DIRETIVA click-outside ── */
const vClickOutside = {
  mounted(el, binding) {
    el._clickOutside = (e) => {
      if (!el.contains(e.target)) binding.value()
    }
    document.addEventListener("mousedown", el._clickOutside)
  },
  unmounted(el) {
    document.removeEventListener("mousedown", el._clickOutside)
  }
}

/* ── CATÁLOGO COMPLETO ── */
const API_URL = "http://localhost:3000"

const catalogoProdutos = [
  // JOIAS
  { id: "j1",  nome: "Anel Solitário Ouro",       preco: 4290,  secao: "Joias",      rota: "/joias",      imagem: `${API_URL}/public/products/brilho.png` },
  { id: "j2",  nome: "Colar Riviera Diamante",     preco: 6800,  secao: "Joias",      rota: "/joias",      imagem: `${API_URL}/public/products/dourada.png` },
  { id: "j3",  nome: "Brinco Argola Ouro",         preco: 1290,  secao: "Joias",      rota: "/joias",      imagem: `${API_URL}/public/products/brinconoiva.png` },
  { id: "j4",  nome: "Pulseira Tennis",            preco: 3490,  secao: "Joias",      rota: "/joias",      imagem: `${API_URL}/public/products/pratas.png` },

  // PINGENTES
  { id: "p1",  nome: "Pulseira Berloque",          preco: 89.9,  secao: "Pingentes",  rota: "/pingentes",  imagem: `${API_URL}/public/products/berloque.png` },
  { id: "p2",  nome: "Coração Prata",              preco: 300,   secao: "Pingentes",  rota: "/pingentes",  imagem: `${API_URL}/public/products/berloque1.png` },
  { id: "p3",  nome: "Olho Grego",                 preco: 119.9, secao: "Pingentes",  rota: "/pingentes",  imagem: `${API_URL}/public/products/berloque2.png` },
  { id: "p4",  nome: "Estrela Prata",              preco: 220.9, secao: "Pingentes",  rota: "/pingentes",  imagem: `${API_URL}/public/products/berloque3.png` },
  { id: "p5",  nome: "Laço Prata",                 preco: 199.9, secao: "Pingentes",  rota: "/pingentes",  imagem: `${API_URL}/public/products/berloque4.png` },
  { id: "p6",  nome: "Religioso Fé",               preco: 79.9,  secao: "Pingentes",  rota: "/pingentes",  imagem: `${API_URL}/public/products/berloque5.png` },
  { id: "p7",  nome: "Cristo Redentor",            preco: 180,   secao: "Pingentes",  rota: "/pingentes",  imagem: `${API_URL}/public/products/berloque10.png` },
  { id: "p8",  nome: "Borboleta Prata",            preco: 250.9, secao: "Pingentes",  rota: "/pingentes",  imagem: `${API_URL}/public/products/berloque14.png` },
  { id: "p9",  nome: "Lua Dourada",                preco: 390.9, secao: "Pingentes",  rota: "/pingentes",  imagem: `${API_URL}/public/products/berloque18.png` },
  { id: "p10", nome: "Coração Dourado",            preco: 280.9, secao: "Pingentes",  rota: "/pingentes",  imagem: `${API_URL}/public/products/berloque16.png` },
  { id: "p11", nome: "Árvore da Vida",             preco: 250.9, secao: "Pingentes",  rota: "/pingentes",  imagem: `${API_URL}/public/products/berloque8.png` },
  { id: "p12", nome: "Trevo de Quatro Folhas",     preco: 250.9, secao: "Pingentes",  rota: "/pingentes",  imagem: `${API_URL}/public/products/berloque7.png` },
  { id: "p13", nome: "Violão Dourado",             preco: 380.9, secao: "Pingentes",  rota: "/pingentes",  imagem: `${API_URL}/public/products/berloque22.png` },
  { id: "p14", nome: "Patinha de Pet",             preco: 180.9, secao: "Pingentes",  rota: "/pingentes",  imagem: `${API_URL}/public/products/berloque20.png` },
  { id: "p15", nome: "Câmera Fotográfica",         preco: 299.9, secao: "Pingentes",  rota: "/pingentes",  imagem: `${API_URL}/public/products/berloque13.png` },

  // CASAMENTO
  { id: "c1",  nome: "Solitário Luxo",             preco: 4290,  secao: "Casamento",  rota: "/casamento",  imagem: `${API_URL}/public/products/brilho.png` },
  { id: "c2",  nome: "Aliança Ouro Clássica",      preco: 2490,  secao: "Casamento",  rota: "/casamento",  imagem: `${API_URL}/public/products/dp.png` },
  { id: "c3",  nome: "Aliança com Diamantes",      preco: 3290,  secao: "Casamento",  rota: "/casamento",  imagem: `${API_URL}/public/products/aliancas.png` },
  { id: "c4",  nome: "Brinco Pérola Royale",       preco: 1290,  secao: "Casamento",  rota: "/casamento",  imagem: `${API_URL}/public/products/brinconoiva.png` },
  { id: "c5",  nome: "Abotoadura Elegance",        preco: 890,   secao: "Casamento",  rota: "/casamento",  imagem: `${API_URL}/public/products/noivo.png` },
  { id: "c6",  nome: "Corrente Premium",           preco: 1290,  secao: "Casamento",  rota: "/casamento",  imagem: `${API_URL}/public/products/corrente.png` },
  { id: "c7",  nome: "Conjunto Nupcial",           preco: 3490,  secao: "Casamento",  rota: "/casamento",  imagem: `${API_URL}/public/products/noivado.png` },
  { id: "c8",  nome: "Solitário Halo",             preco: 5490,  secao: "Casamento",  rota: "/casamento",  imagem: `${API_URL}/public/products/dourada.png` },

  // RELÓGIOS
  { id: "r1",  nome: "Chronos Platinum",           preco: 8900,  secao: "Relógios",   rota: "/relogios",   imagem: null },
  { id: "r2",  nome: "Classic Gold Watch",         preco: 5400,  secao: "Relógios",   rota: "/relogios",   imagem: null },
  { id: "r3",  nome: "Sport Titanium",             preco: 3200,  secao: "Relógios",   rota: "/relogios",   imagem: null },
]

/* ── BUSCA ── */
const formatarPreco = (v) =>
  Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

const toggleSearch = () => {
  searchActive.value = !searchActive.value
  if (!searchActive.value) {
    searchText.value = ""
    resultadosBusca.value = []
  }
}

const fecharBusca = () => {
  searchActive.value = false
  searchText.value = ""
  resultadosBusca.value = []
}

const buscarProdutos = () => {
  clearTimeout(searchTimer)

  const termo = searchText.value
    .trim()
    .toLowerCase()

  if (termo.length < 1) {
    resultadosBusca.value = []
    buscando.value = false
    return
  }

  buscando.value = true

  searchTimer = setTimeout(() => {

    resultadosBusca.value =
      catalogoProdutos.filter((p) => {

        const nome =
          p.nome.toLowerCase()

        const secao =
          p.secao.toLowerCase()

        return (
          nome.includes(termo) ||
          secao.includes(termo)
        )
      })

    buscando.value = false

  }, 200)
}

/* ── FOCO automático ── */
watch(searchActive, (val) => {
  if (val) setTimeout(() => searchInput.value?.focus(), 120)
})

/* ── TOP BAR ── */
const messages = ["Frete cortesia em pedidos premium", "10% de benefício via PIX", "Curadoria exclusiva Ivy"]
const currentMessage = ref(messages[0])
let msgIdx = 0
let msgInterval

/* ── CEP + FRETE ── */
const cepFormatted = ref("")
const endereco     = ref("")
const cepLoading   = ref(false)
const freteInfo    = ref(null)

function formatCep(value) {
  const n = value.replace(/\D/g, "").slice(0, 8)
  return n.length > 5 ? `${n.slice(0, 5)}-${n.slice(5)}` : n
}

function onCepInput(e) {
  cepFormatted.value = formatCep(e.target.value)
  const cep = cepFormatted.value.replace(/\D/g, "")
  if (cep.length === 8) buscarCep(cep)
  else { endereco.value = ""; freteInfo.value = null }
}

function fecharFrete() { freteInfo.value = null }

const tabelaFrete = {
  SP: { pac: 12.90, sedex: 21.90, prazoPac: "2 a 4 dias úteis",  prazoSedex: "1 dia útil" },
  RJ: { pac: 14.90, sedex: 24.90, prazoPac: "3 a 5 dias úteis",  prazoSedex: "1 a 2 dias úteis" },
  MG: { pac: 11.90, sedex: 19.90, prazoPac: "2 a 3 dias úteis",  prazoSedex: "1 dia útil" },
  ES: { pac: 13.90, sedex: 23.90, prazoPac: "3 a 5 dias úteis",  prazoSedex: "1 a 2 dias úteis" },
  PR: { pac: 15.90, sedex: 26.90, prazoPac: "4 a 6 dias úteis",  prazoSedex: "2 dias úteis" },
  SC: { pac: 16.90, sedex: 27.90, prazoPac: "4 a 7 dias úteis",  prazoSedex: "2 dias úteis" },
  RS: { pac: 18.90, sedex: 31.90, prazoPac: "5 a 8 dias úteis",  prazoSedex: "2 a 3 dias úteis" },
  BA: { pac: 21.90, sedex: 35.90, prazoPac: "6 a 9 dias úteis",  prazoSedex: "3 dias úteis" },
  PE: { pac: 22.90, sedex: 36.90, prazoPac: "6 a 10 dias úteis", prazoSedex: "3 dias úteis" },
  CE: { pac: 24.90, sedex: 38.90, prazoPac: "7 a 10 dias úteis", prazoSedex: "3 a 4 dias úteis" },
}

function calcularFrete(uf) {
  const d = tabelaFrete[uf] || { pac: 29.90, sedex: 44.90, prazoPac: "8 a 12 dias úteis", prazoSedex: "4 a 5 dias úteis" }
  return [
    { tipo: "PAC",          prazo: d.prazoPac,        valor: d.pac.toFixed(2).replace(".", ","),   gratis: false },
    { tipo: "SEDEX",        prazo: d.prazoSedex,       valor: d.sedex.toFixed(2).replace(".", ","), gratis: false },
    { tipo: "EXPRESSO IVY", prazo: "Entrega premium",  valor: "49,90",                              gratis: false },
    { tipo: "Frete Grátis", prazo: "Compras acima de R$ 299", valor: "0,00",                        gratis: true  },
  ]
}

async function buscarCep(cep) {
  cepLoading.value = true; freteInfo.value = null
  try {
    const res  = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const data = await res.json()
    if (data.erro) throw new Error("CEP inválido")
    const rua    = data.logradouro || "Endereço não identificado"
    const bairro = data.bairro || ""
    endereco.value  = `${rua}${bairro ? `, ${bairro}` : ""} - ${data.localidade}/${data.uf}`
    freteInfo.value = calcularFrete(data.uf)
  } catch {
    endereco.value = "CEP não encontrado"; freteInfo.value = null
  } finally {
    cepLoading.value = false
  }
}

const goLogin = () => {
  const userStorage = localStorage.getItem("user")

  let user = null

  try {
    user = userStorage ? JSON.parse(userStorage) : null
  } catch {
    user = null
  }

  router.push(user ? "/perfil" : "/login")
}
const goCart = () => router.push("/carrinho")

onMounted(() => {
  msgInterval = setInterval(() => {
    msgIdx = (msgIdx + 1) % messages.length
    currentMessage.value = messages[msgIdx]
  }, 4500)
})
onUnmounted(() => clearInterval(msgInterval))
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Inter:wght@300;400;500&display=swap');

.ivy-header {
  background: #fff;
  width: 100%;
  z-index: 1000;
  border-bottom: 1px solid #f2f2f2;
}

/* TOP BAR */
.announcement-bar { background: #0a192f; color: #fff; padding: 10px 40px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; }
.flex-between { display: flex; justify-content: space-between; align-items: center; }
.top-link { color: rgba(255,255,255,0.8); text-decoration: none; transition: 0.3s; }
.top-link:hover { color: #fff; }
.access-pill { background: rgba(255,255,255,0.1); text-decoration: none; color: #fff; display: flex; align-items: center; gap: 6px; padding: 5px 14px; border-radius: 100px; cursor: pointer; transition: 0.3s; }
.access-pill:hover { background: rgba(255,255,255,0.3); transform: translateY(-1px); }

/* MAIN NAV */
.main-header { height: 100px; padding: 0 40px; display: flex; align-items: center; }
.header-grid { display: grid; grid-template-columns: 1fr auto 1fr; width: 100%; align-items: center; }

/* CEP */
.location-trigger { display: flex; align-items: center; gap: 12px; color: #0a192f; }
.location-inputs { display: flex; flex-direction: column; position: relative; }
.location-inputs input { width: 145px; height: 42px; border: 1px solid #e5e5e5; border-radius: 14px; padding: 0 14px; font-size: 13px; background: #fff; transition: all .25s ease; outline: none; font-family: 'Inter', sans-serif; }
.location-inputs input:focus { border-color: #d4af37; box-shadow: 0 0 0 4px rgba(212,175,55,.12); }
.loc-text { font-size: 10px; color: #888; text-transform: uppercase; margin-top: 4px; }
.loc-text.loading-dots { color: #d4af37; animation: pulse 1s infinite; }
@keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.4 } }

/* FRETE POPUP */
.frete-popup { position:absolute; top:calc(100% + 14px); left:-20px; width:340px; background:#fff; border-radius:24px; overflow:hidden; border:1px solid #ececec; box-shadow: 0 20px 60px rgba(0,0,0,.12); z-index:999; animation: popupFrete .28s ease; }
@keyframes popupFrete { from { opacity:0; transform: translateY(10px) scale(.96); } to { opacity:1; transform: translateY(0) scale(1); } }
.frete-popup-header { display:flex; justify-content:space-between; align-items:center; padding:14px 16px; background:#0a192f; color:white; font-size:12px; font-weight:500; }
.frete-close { background:none; border:none; color:rgba(255,255,255,0.6); cursor:pointer; font-size:12px; padding:0; line-height:1; }
.frete-close:hover { color:white; }
.frete-opcoes { padding:8px 0; }
.frete-opcao { display:grid; grid-template-columns:1fr 1fr auto; align-items:center; gap:8px; padding:12px 16px; border-bottom:1px solid #f5f5f5; font-size:12px; }
.frete-opcao:last-child { border-bottom:none; }
.frete-tipo-nome { font-weight:600; color:#0a192f; }
.frete-prazo { color:#888; font-size:11px; }
.frete-valor { font-weight:600; color:#0a192f; white-space:nowrap; }
.frete-valor.gratis { color:#16a34a; }
.frete-note { font-size:10px; color:#bbb; padding:8px 16px 12px; border-top:1px solid #f5f5f5; }

/* BRAND */
.brand-logo { text-decoration: none; text-align: center; }
.brand-logo h1 { font-family: 'Cormorant Garamond', serif; font-size: 48px; letter-spacing: 0.2em; color: #0a192f; margin: 0; }

/* RIGHT GROUP */
.nav-group-right { display: flex; justify-content: flex-end; align-items: center; gap: 28px; }
.nav-icon { color: #0a192f; cursor: pointer; transition: 0.3s; }
.nav-icon:hover { opacity: .65; }

/* ── SEARCH ── */
.search-wrapper { display: flex; align-items: center; position: relative; }

.search-box {
  position: absolute;
  right: 0;
  width: 0;
  opacity: 0;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(.22,1,.36,1);
  display: flex;
  align-items: center;
}

.search-wrapper.is-active .search-box {
  width: 320px;
  opacity: 1;
  border-bottom: 1.5px solid #0a192f;
  overflow: visible;
}

.search-box input {
  width: 100%;
  border: none;
  outline: none;
  padding: 6px 4px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  background: transparent;
  color: #0a192f;
}
.search-box input::placeholder { color: #aaa; }

.close-search { cursor: pointer; color: #999; flex-shrink: 0; margin-left: 4px; transition: color .2s; }
.close-search:hover { color: #0a192f; }

/* RESULTADOS */
.search-results {
  position: absolute;
  top: calc(100% + 18px);
  right: -10px;
  width: 380px;
  background: #fff;
  border: 1px solid #ececec;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0,0,0,.13);
  overflow: hidden;
  z-index: 9999;
}

.search-loading {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 20px;
  font-size: 13px;
  color: #999;
}
.search-spinner {
  width: 16px; height: 16px;
  border: 2px solid #eee;
  border-top-color: #d4af37;
  border-radius: 50%;
  display: inline-block;
  animation: spin .6s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.search-empty {
  padding: 28px 20px;
  text-align: center;
  font-size: 13px;
  color: #999;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.search-empty strong { color: #0a192f; font-size: 14px; }

ul { list-style: none; margin: 0; padding: 8px 0; }

li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background .18s;
  border-bottom: 1px solid #f8f8f8;
}
li:last-child { border-bottom: none; }
li:hover { background: #faf7f2; }
li:hover .res-arrow { opacity: 1; transform: translate(2px, -2px); }

.res-img {
  width: 44px; height: 44px;
  border-radius: 10px;
  background: #f5f5f5;
  overflow: hidden;
  flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.res-img img { width: 100%; height: 100%; object-fit: contain; padding: 4px; }
.res-img-placeholder { font-size: 14px; color: #d4af37; }

.res-info { flex: 1; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.res-name  { font-size: 13px; font-weight: 500; color: #0a192f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.res-cat   { font-size: 10px; color: #aaa; letter-spacing: 1px; text-transform: uppercase; }
.res-price { font-size: 12px; color: #d4af37; font-weight: 600; }

.res-arrow { color: #ccc; flex-shrink: 0; transition: all .2s; opacity: 0; }

.search-footer {
  padding: 10px 16px;
  background: #fafafa;
  border-top: 1px solid #f0f0f0;
  font-size: 11px;
  color: #bbb;
  letter-spacing: 0.5px;
  text-align: right;
}

/* BAG */
.bag-wrapper { position: relative; cursor: pointer; }
.bag-count { position: absolute; top: -8px; right: -10px; background: #0a192f; color: #fff; font-size: 9px; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; border-radius: 50%; }

/* CATEGORY NAV */
.category-nav { padding: 15px 0; border-top: 1px solid #f9f9f9; }
.nav-links { display: flex; justify-content: center; align-items: center; gap: 155px; }
.nav-links a { position: relative; text-decoration: none; color: #0a192f; font-size: 12px; font-weight: 500; letter-spacing: 0.15em; padding-bottom: 8px; transition: all 0.3s ease; }
.nav-links a::after { content: ""; position: absolute; left: 50%; bottom: 0; width: 0%; height: 1.5px; background: #0a192f; transition: all 0.35s ease; transform: translateX(-50%); border-radius: 10px; }
.nav-links a:hover::after { width: 100%; }
.nav-links a.router-link-active::after { width: 100%; background: #d4a373; }
.nav-links a:hover { transform: translateY(-1px); color: #000; }
.sale-link { color: #d4a373 !important; }
.sale-link::after { background: #d4a373 !important; }

/* TRANSITIONS */
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.5s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateY(10px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-10px); }
.fade-enter-active, .fade-leave-active { transition: opacity .25s ease, transform .25s ease; }
.fade-enter-from { opacity: 0; transform: translateY(-8px); }
.fade-leave-to { opacity: 0; }
</style>