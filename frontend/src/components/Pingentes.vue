<template>
  <div class="pagina-pingentes">

    <!-- PARTÍCULAS DECORATIVAS -->
    <div class="particles">
      <span v-for="n in 12" :key="n" :class="`particle p${n}`"></span>
    </div>

    <!-- HEADER IGUAL AO DE JOIAS -->
    <header class="page-header">
      <span class="header-eyebrow">Coleção Exclusiva</span>
      <h1>PINGENTES</h1>
      <div class="header-divider"></div>
      <p class="header-sub">{{ pingentesFiltrados.length }} peças disponíveis</p>
    </header>

    <!-- FILTROS -->
    <nav class="filtros">
      <div class="filtros-inner">

        <div class="search-box">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input v-model="busca" type="text" placeholder="Buscar pingente..." />
        </div>

        <div class="filtro-material">
          <button :class="['btn-material', { active: materialFiltro === '' }]" @click="materialFiltro = ''">Todos</button>
          <button :class="['btn-material', { active: materialFiltro === 'dourado' }]" @click="materialFiltro = 'dourado'">
            <span class="dot dourado-dot"></span> Dourado
          </button>
          <button :class="['btn-material', { active: materialFiltro === 'prata' }]" @click="materialFiltro = 'prata'">
            <span class="dot prata-dot"></span> Prata
          </button>
        </div>

        <div class="select-wrapper">
          <select v-model="ordenar">
            <option value="">Ordenar por</option>
            <option value="menor">Menor preço</option>
            <option value="maior">Maior preço</option>
          </select>
          <svg class="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>

      </div>
    </nav>

    <!-- CONTEÚDO PRINCIPAL -->
    <main class="container">

      <!-- SEÇÃO DOURADOS -->
      <template v-if="materialFiltro === '' || materialFiltro === 'dourado'">
        <div v-if="pingentesDourado.length > 0" class="section-header">
          <div class="section-line"></div>
          <h2 class="section-title">
            <span class="section-gem">◆</span> Pingentes Dourados
          </h2>
          <div class="section-line"></div>
        </div>

        <TransitionGroup name="list" tag="section" class="grid">
          <article class="card" v-for="pingente in pingentesDourado" :key="pingente.id" @click="abrirModal(pingente)">
            <div class="card-badge dourado-badge">Ouro 18k</div>
            <div class="image-wrapper">
              <img :src="pingente.imagem" :alt="pingente.nome" />
              <div class="card-overlay"><span>Ver detalhes</span></div>
            </div>
            <div class="card-info">
              <h3>{{ pingente.nome }}</h3>
              <p class="card-material dourado-text">Banho de Ouro 18k</p>
              <p class="price">{{ formatarPreco(pingente.preco) }}</p>
            </div>
          </article>
        </TransitionGroup>
      </template>

      <!-- SEÇÃO PRATA -->
      <template v-if="materialFiltro === '' || materialFiltro === 'prata'">
        <div v-if="pingentesPrata.length > 0" class="section-header">
          <div class="section-line"></div>
          <h2 class="section-title">
            <span class="section-gem prata-gem">◆</span> Pingentes em Prata
          </h2>
          <div class="section-line"></div>
        </div>

        <TransitionGroup name="list" tag="section" class="grid">
          <article class="card" v-for="pingente in pingentesPrata" :key="pingente.id" @click="abrirModal(pingente)">
            <div class="card-badge prata-badge">Prata 925</div>
            <div class="image-wrapper">
              <img :src="pingente.imagem" :alt="pingente.nome" />
              <div class="card-overlay"><span>Ver detalhes</span></div>
            </div>
            <div class="card-info">
              <h3>{{ pingente.nome }}</h3>
              <p class="card-material prata-text">Prata 925</p>
              <p class="price">{{ formatarPreco(pingente.preco) }}</p>
            </div>
          </article>
        </TransitionGroup>
      </template>

      <!-- EMPTY STATE -->
      <div v-if="pingentesDourado.length === 0 && pingentesPrata.length === 0" class="empty-state">
        <div class="empty-gem">◇</div>
        <p>Nenhum pingente encontrado para <strong>"{{ busca }}"</strong></p>
        <button @click="busca = ''; materialFiltro = ''">Limpar filtros</button>
      </div>

    </main>

    <!-- MODAL -->
    <Transition name="modal-fade">
      <div v-if="produtoSelecionado" class="modal-overlay" @click.self="fecharModal">
        <div class="modal-content">

          <button class="close-x" @click="fecharModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>

          <div class="modal-body">

            <div class="modal-image-side">
              <div class="modal-badge" :class="produtoSelecionado.tipo === 'dourado' ? 'dourado-badge' : 'prata-badge'">
                {{ produtoSelecionado.tipo === 'dourado' ? 'Ouro 18k' : 'Prata 925' }}
              </div>
              <div class="modal-image-container" @mousemove="moverZoom" @mouseleave="resetZoom">
                <img :src="produtoSelecionado.imagem" :alt="produtoSelecionado.nome" />
                <div class="zoom-hint">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="13" height="13">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/>
                  </svg>
                  Passe o mouse para ampliar
                </div>
              </div>
            </div>

            <div class="modal-details">
              <p class="modal-eyebrow">Coleção IVY · {{ produtoSelecionado.tipo === 'dourado' ? 'Série Dourada' : 'Série Prata' }}</p>
              <h2 class="modal-title">{{ produtoSelecionado.nome }}</h2>

              <div class="modal-divider">
                <span class="modal-gem">◆</span>
              </div>

              <p class="modal-description">{{ produtoSelecionado.descricao }}</p>

              <div class="modal-specs">
                <div class="spec">
                  <span class="spec-label">Material</span>
                  <span class="spec-value" :class="produtoSelecionado.tipo === 'dourado' ? 'dourado-text' : 'prata-text'">
                    {{ produtoSelecionado.tipo === 'dourado' ? 'Liga de prata com banho ouro 18k' : 'Prata 925' }}
                  </span>
                </div>
                <div class="spec">
                  <span class="spec-label">Garantia</span>
                  <span class="spec-value">12 meses</span>
                </div>
                <div class="spec">
                  <span class="spec-label">Envio</span>
                  <span class="spec-value">Em até 5 dias úteis</span>
                </div>
              </div>

              <p class="modal-price">{{ formatarPreco(produtoSelecionado?.preco) }}</p>
              <p class="modal-installments">ou 3x de {{ formatarPreco((produtoSelecionado?.preco || 0) / 3) }} sem juros</p>

              <div class="modal-actions">
                <button class="btn-carrinho" @click="adicionarCarrinho">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  Adicionar ao Carrinho
                </button>
                <button class="btn-comprar" @click="comprarProduto">Comprar Agora</button>
              </div>

              <p class="modal-seguro">🔒 Compra segura · Troca grátis em 30 dias</p>
            </div>

          </div>
        </div>
      </div>
    </Transition>

    <!-- TOAST -->
    <Transition name="toast-fade">
      <div v-if="toastVisivel" class="toast">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
          <path d="M20 6 9 17l-5-5"/>
        </svg>
        {{ toastMensagem }}
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { IPingente } from '@/interface/IPingente'
import axios from 'axios'  // ← troca o addToCart pelo axios

const router  = useRouter()
const API_URL = 'http://localhost:3000'

const busca = ref<string>('')
const ordenar = ref<string>('')
const materialFiltro = ref<string>('')

const produtoSelecionado = ref<IPingente | null>(null)
const toastVisivel = ref<boolean>(false)
const toastMensagem = ref<string>('')

const showToast = (msg: string) => {
  toastMensagem.value = msg
  toastVisivel.value = true
  setTimeout(() => (toastVisivel.value = false), 3000)
}

/* ── ZOOM ── */
const moverZoom = (e: MouseEvent) => {
  const container = e.currentTarget as HTMLElement
  const img = container.querySelector('img') as HTMLImageElement
  if (!img) return
  const rect = container.getBoundingClientRect()
  img.style.transformOrigin = `${((e.clientX - rect.left) / rect.width) * 100}% ${
    ((e.clientY - rect.top) / rect.height) * 100
  }%`
  img.style.transform = 'scale(2.4)'
}

const resetZoom = (e: MouseEvent) => {
  const container = e.currentTarget as HTMLElement
  const img = container.querySelector('img') as HTMLImageElement
  if (!img) return
  img.style.transformOrigin = 'center center'
  img.style.transform = 'scale(1)'
}

/* ── TODOS OS PINGENTES (BACKEND IMAGES) ── */
const pingentes = ref<IPingente[]>([
  { id: 1,  mongoId: '6a20b216ac6b2f17f374183d', nome: 'Pulseira Berloque',      preco: 89.90,  tipo: 'prata',   imagem: `${API_URL}/public/products/berloque.png`,    descricao: 'Confeccionada em prata 925 com acabamento polido.' },
  { id: 2,  mongoId: '6a20b216ac6b2f17f374183e', nome: 'Coração',                preco: 300.00, tipo: 'prata',   imagem: `${API_URL}/public/products/berloque1.png`,   descricao: 'Pingente em forma de coração em prata.' },
  { id: 3,  mongoId: '6a20b216ac6b2f17f374183f', nome: 'Olho Grego',             preco: 119.90, tipo: 'prata',   imagem: `${API_URL}/public/products/berloque2.png`,   descricao: 'Amuleto de proteção em prata 925.' },
  { id: 4,  mongoId: '6a20b216ac6b2f17f3741840', nome: 'Estrela',                preco: 220.90, tipo: 'prata',   imagem: `${API_URL}/public/products/berloque3.png`,   descricao: 'Estrela delicada com acabamento premium.' },
  { id: 5,  mongoId: '6a20b216ac6b2f17f3741841', nome: 'Laço',                   preco: 199.90, tipo: 'prata',   imagem: `${API_URL}/public/products/berloque4.png`,   descricao: 'Laço elegante em prata 925.' },
  { id: 6,  mongoId: '6a20b216ac6b2f17f3741842', nome: 'Religioso Fé',           preco: 79.90,  tipo: 'prata',   imagem: `${API_URL}/public/products/berloque5.png`,   descricao: 'Pingente minimalista de fé.' },
  { id: 7,  mongoId: '6a20b216ac6b2f17f3741843', nome: 'Cristo Redentor',        preco: 180.00, tipo: 'prata',   imagem: `${API_URL}/public/products/berloque10.png`,  descricao: 'Miniatura do Cristo Redentor em prata.' },
  { id: 8,  mongoId: '6a20b216ac6b2f17f3741844', nome: 'Bola de Vôlei',          preco: 200.00, tipo: 'prata',   imagem: `${API_URL}/public/products/berloque11.png`,  descricao: 'Pingente esportivo em prata.' },
  { id: 9,  mongoId: '6a20b216ac6b2f17f3741845', nome: 'Felicidade',             preco: 200.00, tipo: 'prata',   imagem: `${API_URL}/public/products/berloque12.png`,  descricao: 'Palavra felicidade gravada em prata.' },
  { id: 10, mongoId: '6a20b216ac6b2f17f3741846', nome: 'Câmera Fotográfica',     preco: 299.90, tipo: 'prata',   imagem: `${API_URL}/public/products/pingente13.png`,  descricao: 'Câmera detalhada em prata 925.' },
  { id: 11, mongoId: '6a20b216ac6b2f17f3741847', nome: 'Câmera Clássica',        preco: 299.90, tipo: 'prata',   imagem: `${API_URL}/public/products/berloque13.png`,  descricao: 'Modelo clássico de câmera em prata.' },
  { id: 12, mongoId: '6a20b216ac6b2f17f3741848', nome: 'Separador de Coração',   preco: 250.90, tipo: 'prata',   imagem: `${API_URL}/public/products/berloque17.png`,  descricao: 'Separador delicado em prata.' },
  { id: 13, mongoId: '6a20b216ac6b2f17f3741849', nome: 'Borboleta',              preco: 250.90, tipo: 'prata',   imagem: `${API_URL}/public/products/berloque14.png`,  descricao: 'Borboleta em prata 925.' },
  { id: 14, mongoId: '6a20b216ac6b2f17f374184a', nome: 'Borboleta Dourada',      preco: 250.90, tipo: 'prata',   imagem: `${API_URL}/public/products/berloque6.png`,   descricao: 'Borboleta com acabamento especial.' },
  { id: 15, mongoId: '6a20b216ac6b2f17f374184b', nome: 'Trevo de Quatro Folhas', preco: 250.90, tipo: 'prata',   imagem: `${API_URL}/public/products/berloque7.png`,   descricao: 'Símbolo de sorte em prata.' },
  { id: 16, mongoId: '6a20b216ac6b2f17f374184c', nome: 'Árvore da Vida',         preco: 250.90, tipo: 'prata',   imagem: `${API_URL}/public/products/berloque8.png`,   descricao: 'Árvore da vida em prata 925.' },
  { id: 17, mongoId: '6a20b216ac6b2f17f374184d', nome: 'Flor',                   preco: 180.90, tipo: 'prata',   imagem: `${API_URL}/public/products/berloque19.png`,  descricao: 'Flor delicada em prata.' },
  { id: 18, mongoId: '6a20b216ac6b2f17f374184e', nome: 'Lua',                    preco: 390.90, tipo: 'dourado', imagem: `${API_URL}/public/products/berloque18.png`,  descricao: 'Lua banhada a ouro 18k.' },
  { id: 19, mongoId: '6a20b216ac6b2f17f374184f', nome: 'Coração Dourado',        preco: 280.90, tipo: 'dourado', imagem: `${API_URL}/public/products/berloque16.png`,  descricao: 'Coração em ouro 18k.' },
  { id: 20, mongoId: '6a20b216ac6b2f17f3741850', nome: 'Menina',                 preco: 180.90, tipo: 'dourado', imagem: `${API_URL}/public/products/berloque15.png`,  descricao: 'Pingente menina dourado.' },
  { id: 21, mongoId: '6a20b216ac6b2f17f3741851', nome: 'Patinha de Pet',         preco: 180.90, tipo: 'prata',   imagem: `${API_URL}/public/products/berloque20.png`,  descricao: 'Patinha em prata 925.' },
  { id: 22, mongoId: '6a20b216ac6b2f17f3741852', nome: 'Patinha de Pet Dourada', preco: 180.90, tipo: 'dourado', imagem: `${API_URL}/public/products/berloque21.png`,  descricao: 'Patinha banhada a ouro.' },
  { id: 23, mongoId: '6a20b216ac6b2f17f3741853', nome: 'Violão Dourado',         preco: 380.90, tipo: 'dourado', imagem: `${API_URL}/public/products/berloque22.png`,  descricao: 'Violão em ouro 18k.' },
  { id: 24, mongoId: '6a20b216ac6b2f17f3741854', nome: 'Violão Prata',           preco: 180.90, tipo: 'prata',   imagem: `${API_URL}/public/products/berloque23.png`,  descricao: 'Violão em prata 925.' },
  { id: 25, mongoId: '6a20b216ac6b2f17f3741855', nome: 'Livro',                  preco: 180.90, tipo: 'dourado', imagem: `${API_URL}/public/products/berloque24.png`,  descricao: 'Livro em ouro 18k.' },
  { id: 26, mongoId: '6a20b216ac6b2f17f3741856', nome: 'Colcheia',               preco: 180.90, tipo: 'prata',   imagem: `${API_URL}/public/products/berloque25.png`,  descricao: 'Nota musical em prata.' },
])
/* ── MODAL ── */
const abrirModal = (p: IPingente) => {
  produtoSelecionado.value = p
  document.body.style.overflow = 'hidden'
}

const fecharModal = () => {
  produtoSelecionado.value = null
  document.body.style.overflow = ''
}

const formatarPreco = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

/* ── CARRINHO ── */
const adicionarCarrinho = async () => {
  if (!produtoSelecionado.value) return

  const token = localStorage.getItem('token')
  if (!token) { router.push('/login'); return }

  const p = produtoSelecionado.value

  try {
    await axios.post(
      `${API_URL}/api/cart`,
      { productId: p.mongoId, name: p.nome, price: p.preco, image: p.imagem, quantity: 1 },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    showToast(`"${p.nome}" adicionado ao carrinho 🛒`)
    fecharModal()
  } catch (error: any) {
    console.error('Erro ao adicionar:', error.response?.data)
  }
}

const comprarProduto = async () => {
  if (!produtoSelecionado.value) return

  const token = localStorage.getItem('token')
  if (!token) { router.push('/login'); return }

  const p = produtoSelecionado.value

  try {
    await axios.post(
      `${API_URL}/api/cart`,
      { productId: p.mongoId, name: p.nome, price: p.preco, image: p.imagem, quantity: 1 },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    localStorage.setItem('checkoutProduto', JSON.stringify(p))
    fecharModal()
    router.push({ name: 'checkout' })
  } catch (error: any) {
    console.error('Erro ao comprar:', error.response?.data)
  }
}

/* ── FILTROS ── */
const pingentesFiltrados = computed(() => {
  let lista = pingentes.value.filter((p) => {
    const nome = p.nome.toLowerCase()
    const buscar = busca.value.toLowerCase()
    return nome.includes(buscar) &&
      (materialFiltro.value === '' || p.tipo === materialFiltro.value)
  })

  if (ordenar.value === 'menor') return [...lista].sort((a, b) => a.preco - b.preco)
  if (ordenar.value === 'maior') return [...lista].sort((a, b) => b.preco - a.preco)

  return lista
})

const pingentesDourado = computed(() =>
  pingentesFiltrados.value.filter(p => p.tipo === 'dourado')
)

const pingentesPrata = computed(() =>
  pingentesFiltrados.value.filter(p => p.tipo === 'prata')
)
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

.pagina-pingentes {
  --gold:        #c9a84c;
  --gold-light:  #e2c97e;
  --gold-dark:   #a07830;
  --silver:      #8a9db5;
  --silver-light:#b8c8d8;
  --dark:        #0f0e0c;
  --cream:       #faf8f4;
  --text-muted:  #888070;
  --border:      rgba(201, 168, 76, 0.2);
  --font-display:'Cormorant Garamond', serif;
  --font-body:   'Jost', sans-serif;
  --ease-luxury: cubic-bezier(0.165, 0.84, 0.44, 1);

  background-color: var(--cream);
  min-height: 100vh;
  font-family: var(--font-body);
  color: var(--dark);
  position: relative;
  overflow-x: hidden;
}

/* ── PARTÍCULAS ── */
.particles { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
.particle  { position: absolute; width: 2px; height: 2px; background: var(--gold); border-radius: 50%; opacity: 0; animation: particleFloat 8s infinite; }
.particle:nth-child(1)  { left: 5%;  animation-delay: 0s;   animation-duration: 9s; }
.particle:nth-child(2)  { left: 12%; animation-delay: 1.5s; animation-duration: 7s; }
.particle:nth-child(3)  { left: 22%; animation-delay: 3s;   animation-duration: 11s; }
.particle:nth-child(4)  { left: 35%; animation-delay: 0.8s; animation-duration: 8s; }
.particle:nth-child(5)  { left: 50%; animation-delay: 2.2s; animation-duration: 9s; }
.particle:nth-child(6)  { left: 63%; animation-delay: 4s;   animation-duration: 7s; }
.particle:nth-child(7)  { left: 72%; animation-delay: 1s;   animation-duration: 12s; }
.particle:nth-child(8)  { left: 80%; animation-delay: 3.5s; animation-duration: 8s; }
.particle:nth-child(9)  { left: 88%; animation-delay: 0.5s; animation-duration: 10s; }
.particle:nth-child(10) { left: 95%; animation-delay: 2s;   animation-duration: 7s; }
.particle:nth-child(11) { left: 42%; animation-delay: 5s;   animation-duration: 9s; }
.particle:nth-child(12) { left: 58%; animation-delay: 3.8s; animation-duration: 11s; }
@keyframes particleFloat {
  0%   { bottom: -10px; opacity: 0; transform: translateX(0); }
  10%  { opacity: 0.6; }
  90%  { opacity: 0.3; }
  100% { bottom: 100vh; opacity: 0; transform: translateX(30px); }
}

/* ── HEADER IGUAL AO JOIAS ── */
.page-header {
  text-align: center;
  padding: 50px 20px 36px;
  border-bottom: 1px solid var(--border);
  background: linear-gradient(180deg, #fff 0%, var(--cream) 100%);
  position: relative;
  z-index: 1;
}

.header-eyebrow {
  display: block;
  font-size: .68rem;
  letter-spacing: 6px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 10px;
  font-family: var(--font-body);
}

.page-header h1 {
  font-family: var(--font-display);
  font-size: clamp(3rem, 7vw, 5rem);
  font-weight: 300;
  letter-spacing: 12px;
  color: var(--dark);
  margin: 0;
}

.header-divider {
  width: 120px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  margin: 20px auto;
}

.header-sub {
  font-size: .72rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--text-muted);
  font-family: var(--font-body);
}

/* ── FILTROS ── */
.filtros {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(250, 248, 244, 0.96);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  padding: 0 20px;
}

.filtros-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px 0;
  flex-wrap: wrap;
}

.search-box { position: relative; display: flex; align-items: center; }
.search-icon { position: absolute; left: 14px; color: var(--text-muted); width: 16px; height: 16px; }
.search-box input {
  padding: 11px 16px 11px 42px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: white;
  width: 240px;
  font-family: var(--font-body);
  font-size: .8rem;
  color: var(--dark);
  transition: all .3s ease;
}
.search-box input:focus { outline: none; border-color: var(--gold); box-shadow: 0 0 0 3px rgba(201,168,76,.1); }
.search-box input::placeholder { color: #bbb; font-weight: 300; }

.filtro-material { display: flex; gap: 8px; align-items: center; }

.btn-material {
  padding: 10px 18px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: white;
  font-family: var(--font-body);
  font-size: .75rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--text-muted);
  cursor: pointer;
  transition: all .3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}
.btn-material:hover  { border-color: var(--gold); color: var(--dark); }
.btn-material.active { background: var(--dark); border-color: var(--dark); color: white; }

.dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
.dourado-dot { background: linear-gradient(135deg, var(--gold-light), var(--gold-dark)); }
.prata-dot   { background: linear-gradient(135deg, var(--silver-light), var(--silver)); }

.select-wrapper { position: relative; margin-left: auto; }
.select-wrapper select {
  padding: 11px 40px 11px 16px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: white;
  font-family: var(--font-body);
  font-size: .78rem;
  color: var(--dark);
  appearance: none;
  cursor: pointer;
}
.select-wrapper select:focus { outline: none; border-color: var(--gold); }
.select-arrow { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted); pointer-events: none; width: 14px; height: 14px; }

/* ── CONTAINER E SEÇÕES ── */
.container { max-width: 1200px; margin: 0 auto; padding: 60px 24px 100px; }

.section-header { display: flex; align-items: center; gap: 24px; margin: 70px 0 40px; }
.section-header:first-child { margin-top: 0; }
.section-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, var(--border), transparent); }
.section-title { font-family: var(--font-display); font-size: 1.6rem; font-weight: 400; letter-spacing: 2px; color: var(--dark); white-space: nowrap; margin: 0; }
.section-gem  { color: var(--gold); font-size: .8rem; }
.prata-gem    { color: var(--silver); }

/* ── GRID ── */
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }

/* ── CARD ── */
.card {
  background: #fff;
  border: 1px solid rgba(0,0,0,.04);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: transform .5s cubic-bezier(.19,1,.22,1), box-shadow .5s ease;
}
.card:hover { transform: translateY(-10px); box-shadow: 0 25px 70px rgba(0,0,0,.12); border-color: rgba(201,168,76,.25); }

.card-badge {
  position: absolute;
  top: 14px; left: 14px;
  z-index: 2;
  font-family: var(--font-body);
  font-size: .6rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 2px;
}
.dourado-badge { background: rgba(201,168,76,.12); color: var(--gold-dark); border: 1px solid rgba(201,168,76,.3); }
.prata-badge   { background: rgba(138,157,181,.12); color: #5a7090; border: 1px solid rgba(138,157,181,.3); }

.image-wrapper {
  background: #fff;
  padding: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  height: 320px;
}
.image-wrapper img { width: 100%; height: 100%; object-fit: contain; transition: transform .9s cubic-bezier(.19,1,.22,1); }
.card:hover .image-wrapper img { transform: scale(1.25); }

.card-overlay { position: absolute; inset: 0; background: rgba(15,14,12,.5); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity .4s; }
.card:hover .card-overlay { opacity: 1; }
.card-overlay span { color: white; font-size: .7rem; font-weight: 500; letter-spacing: 3px; text-transform: uppercase; border-bottom: 1px solid rgba(201,168,76,.7); padding-bottom: 4px; }

.card-info { padding: 22px 24px 26px; border-top: 1px solid rgba(0,0,0,.04); }
.card-info h3 { font-family: var(--font-display); font-size: 1.15rem; font-weight: 400; color: var(--dark); margin: 0 0 4px; }
.card-material { font-size: .65rem; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; margin: 0 0 12px; }
.dourado-text { color: var(--gold); }
.prata-text   { color: var(--silver); }
.price { font-family: var(--font-display); font-size: 1.5rem; font-weight: 500; }

/* ── EMPTY ── */
.empty-state { text-align: center; padding: 80px 20px; color: var(--text-muted); }
.empty-gem { font-size: 3rem; color: var(--border); margin-bottom: 16px; }
.empty-state button { margin-top: 20px; padding: 12px 28px; background: var(--dark); color: white; border: none; font-family: var(--font-body); font-size: .75rem; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; }

/* ── MODAL ── */
.modal-overlay { position: fixed; inset: 0; background: rgba(10,9,7,.85); display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 20px; backdrop-filter: blur(8px); }

.modal-content { background: var(--cream); width: 100%; max-width: 920px; border-radius: 2px; position: relative; border: 1px solid var(--border); max-height: 90vh; overflow-y: auto; }

.modal-body { display: grid; grid-template-columns: 1fr 1fr; }

.modal-image-side { position: relative; background: white; display: flex; flex-direction: column; align-items: center; }

.modal-badge { align-self: flex-start; margin: 20px 20px 0; font-family: var(--font-body); font-size: .6rem; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; padding: 5px 12px; border-radius: 2px; }

/* ZOOM VIVARA */
.modal-image-container {
  position: relative;
  width: 100%;
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  overflow: hidden;
  cursor: crosshair;
  background: #fff;
}
.modal-image-container img {
  width: 100%; max-width: 380px; max-height: 380px;
  object-fit: contain;
  transition: transform .08s ease-out;
  transform: scale(1);
  transform-origin: center center;
  will-change: transform;
  pointer-events: none;
  user-select: none;
}
.zoom-hint {
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: .62rem;
  letter-spacing: 1px;
  color: #bbb;
  text-transform: uppercase;
  pointer-events: none;
  transition: opacity .3s;
}
.modal-image-container:hover .zoom-hint { opacity: 0; }

.modal-details { padding: 50px 44px; display: flex; flex-direction: column; justify-content: center; border-left: 1px solid var(--border); }

.modal-eyebrow { font-size: .62rem; font-weight: 500; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); margin: 0 0 12px; }

.modal-title { font-family: var(--font-display); font-size: 2.4rem; font-weight: 300; letter-spacing: 1px; color: var(--dark); margin: 0 0 16px; line-height: 1.1; }

.modal-divider { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
.modal-divider::before, .modal-divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }
.modal-gem { color: var(--gold); font-size: .55rem; }

.modal-description { font-size: .85rem; font-weight: 300; color: var(--text-muted); line-height: 1.75; margin: 0 0 24px; }

.modal-specs { display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; padding: 16px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.spec { display: flex; justify-content: space-between; align-items: center; }
.spec-label { font-size: .7rem; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; color: #aaa; }
.spec-value { font-size: .78rem; color: var(--dark); }

.modal-price { font-family: var(--font-display); font-size: 2rem; font-weight: 600; color: var(--dark); margin: 0 0 4px; }
.modal-installments { font-size: .72rem; color: var(--text-muted); margin: 0 0 24px; font-weight: 300; }

.modal-actions { display: flex; gap: 12px; margin-bottom: 16px; }
.btn-carrinho, .btn-comprar { flex: 1; padding: 14px 16px; border-radius: 2px; font-family: var(--font-body); font-size: .72rem; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer; transition: all .3s ease; }
.btn-carrinho { background: white; color: var(--dark); border: 1.5px solid var(--dark); display: flex; align-items: center; justify-content: center; gap: 8px; }
.btn-carrinho:hover { background: var(--dark); color: white; }
.btn-comprar { background: var(--gold); color: var(--dark); border: 1.5px solid var(--gold); }
.btn-comprar:hover { background: var(--gold-dark); border-color: var(--gold-dark); color: white; }

.modal-seguro { font-size: .65rem; color: #bbb; text-align: center; margin: 0; }

.close-x { position: absolute; top: 16px; right: 16px; width: 36px; height: 36px; background: rgba(255,255,255,.9); border: 1px solid var(--border); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; color: var(--text-muted); transition: all .3s ease; }
.close-x:hover { background: var(--dark); color: white; border-color: var(--dark); }

/* ── TOAST ── */
.toast { position: fixed; bottom: 30px; right: 30px; z-index: 9999; background: var(--dark); color: white; padding: 14px 22px; border-radius: 4px; font-family: var(--font-body); font-size: .78rem; display: flex; align-items: center; gap: 10px; box-shadow: 0 8px 30px rgba(0,0,0,.3); border-left: 3px solid var(--gold); }

/* ── ANIMAÇÕES ── */
.list-enter-active, .list-leave-active { transition: all .4s var(--ease-luxury); }
.list-enter-from, .list-leave-to { opacity: 0; transform: scale(.95) translateY(10px); }
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity .35s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.toast-fade-enter-active, .toast-fade-leave-active { transition: all .4s var(--ease-luxury); }
.toast-fade-enter-from, .toast-fade-leave-to { opacity: 0; transform: translateY(16px); }

/* ── RESPONSIVO ── */
@media (max-width: 1024px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) {
  .modal-body { grid-template-columns: 1fr; }
  .modal-image-container { min-height: 260px; }
  .modal-details { padding: 30px 24px; border-left: none; border-top: 1px solid var(--border); }
  .modal-title { font-size: 1.8rem; }
  .modal-actions { flex-direction: column; }
  .filtros-inner { gap: 12px; }
  .search-box input { width: 100%; }
  .select-wrapper { margin-left: 0; }
}
@media (max-width: 540px) {
  .grid { grid-template-columns: 1fr; }
  .filtro-material { flex-wrap: wrap; }
}
</style>