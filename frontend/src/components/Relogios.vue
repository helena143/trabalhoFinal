<template>
  <div class="relogios-page">

    <header class="page-header">
      <span class="header-eyebrow">Coleção Premium 2026</span>
      <h1>RÉLOGIOS</h1>
      <div class="header-divider"></div>
      <p class="header-sub">{{ produtosFiltrados.length }} relógios disponíveis</p>
    </header>

    <nav class="filtros-bar" :class="{ scrolled: isScrolled }">
      <div class="filtros-inner">

        <div class="filtros-left">
          <div class="cat-tabs">
            <button
              v-for="cat in categorias"
              :key="cat"
              :class="['cat-btn', { ativo: categoriaSelecionada === cat }]"
              @click="categoriaSelecionada = cat"
            >
              {{ cat }}
            </button>
          </div>

          <div class="v-divider"></div>

          <!-- FILTRO MATERIAL COM BOLINHAS -->
          <div class="cat-tabs">
            <button
              v-for="mat in materiais"
              :key="mat"
              :class="['cat-btn', { ativo: materialSelecionado === mat }]"
              @click="materialSelecionado = mat"
            >
              <span
                v-if="mat !== 'Todos'"
                class="dot-material"
                :class="mat === 'Dourado' ? 'dot-dourado' : 'dot-prata'"
              ></span>
              {{ mat }}
            </button>
          </div>
        </div>

        <div class="filtros-right">
          <div class="search-box">
            <span class="search-icon">⌕</span>
            <input v-model="busca" placeholder="Buscar relógio..." class="search-input" />
            <button v-if="busca" class="search-clear" @click="busca = ''">✕</button>
          </div>

          <select v-model="ordenacao" class="sort-select">
            <option value="">Ordenar</option>
            <option value="menor">Menor preço</option>
            <option value="maior">Maior preço</option>
            <option value="az">A → Z</option>
          </select>
        </div>

      </div>
    </nav>

    <main class="produtos-container">

      <!-- ESTADO VAZIO -->
      <div v-if="produtosDourado.length === 0 && produtosPrata.length === 0" class="vazio">
        <span>◇</span>
        <p>Nenhum relógio encontrado</p>
        <button @click="limparFiltros">Limpar filtros</button>
      </div>

      <!-- SEÇÃO DOURADOS -->
      <template v-if="materialSelecionado === 'Todos' || materialSelecionado === 'Dourado'">
        <div v-if="produtosDourado.length > 0" class="section-header">
          <div class="section-line"></div>
          <h2 class="section-title">
            <span class="section-gem dourado-gem">◆</span> Relógios Dourados
          </h2>
          <div class="section-line"></div>
        </div>

        <TransitionGroup name="list" tag="div" class="grid">
          <article
            v-for="produto in produtosDourado"
            :key="produto.id"
            class="card"
            @click="abrirModal(produto)"
          >
            <div class="card-img">
              <img :src="produto.imagem" :alt="produto.nome" loading="lazy" />
              <div class="card-overlay">VER DETALHES</div>
              <span class="card-cat-badge dourado-badge-card">{{ produto.categoria }}</span>
            </div>
            <div class="card-info">
              <p class="card-material dourado-text">Banho de Ouro 18k</p>
              <h3>{{ produto.nome }}</h3>
              <p class="card-price">R$ {{ produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</p>
            </div>
          </article>
        </TransitionGroup>
      </template>

      <!-- SEÇÃO PRATA -->
      <template v-if="materialSelecionado === 'Todos' || materialSelecionado === 'Prata'">
        <div v-if="produtosPrata.length > 0" class="section-header">
          <div class="section-line"></div>
          <h2 class="section-title">
            <span class="section-gem prata-gem">◆</span> Relógios em Prata
          </h2>
          <div class="section-line"></div>
        </div>

        <TransitionGroup name="list" tag="div" class="grid">
          <article
            v-for="produto in produtosPrata"
            :key="produto.id"
            class="card"
            @click="abrirModal(produto)"
          >
            <div class="card-img">
              <img :src="produto.imagem" :alt="produto.nome" loading="lazy" />
              <div class="card-overlay">VER DETALHES</div>
              <span class="card-cat-badge prata-badge-card">{{ produto.categoria }}</span>
            </div>
            <div class="card-info">
              <p class="card-material prata-text">Aço Prata Premium</p>
              <h3>{{ produto.nome }}</h3>
              <p class="card-price">R$ {{ produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</p>
            </div>
          </article>
        </TransitionGroup>
      </template>

    </main>

    <!-- MODAL ESTILO PINGENTES + ZOOM VIVARA -->
    <transition name="modal-anim">
      <div v-if="produtoSelecionado" class="modal-overlay" @click.self="fecharModal">
        <div class="modal-box">

          <button class="modal-close" @click="fecharModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>

          <div class="modal-body">

            <!-- LADO IMAGEM COM ZOOM VIVARA -->
            <div class="modal-image-side">
              <div
                class="modal-badge"
                :class="produtoSelecionado.cor === 'Dourado' ? 'dourado-badge' : 'prata-badge'"
              >
                {{ produtoSelecionado.cor === 'Dourado' ? 'Ouro 18k' : 'Aço Prata' }}
              </div>

              <div
                class="modal-image-container"
                @mousemove="moverZoom"
                @mouseleave="resetZoom"
              >
                <img
                  ref="zoomImg"
                  :src="produtoSelecionado.imagem"
                  :alt="produtoSelecionado.nome"
                />
                <!-- dica de zoom -->
                <div class="zoom-hint">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    <path d="M11 8v6M8 11h6"/>
                  </svg>
                  Passe o mouse para ampliar
                </div>
              </div>
            </div>

            <!-- LADO DETALHES -->
            <div class="modal-details">

              <p class="modal-eyebrow">
                Coleção IVY ·
                {{ produtoSelecionado.cor === 'Dourado' ? 'Série Dourada' : 'Série Prata' }}
              </p>

              <h2 class="modal-title">{{ produtoSelecionado.nome }}</h2>

              <div class="modal-divider-gem">
                <span class="modal-gem">◆</span>
              </div>

              <p class="modal-description">
                Relógio premium com acabamento sofisticado, design moderno e detalhes luxuosos
                para elevar seu estilo em qualquer ocasião. Confeccionado com
                {{ produtoSelecionado.cor === 'Dourado' ? 'aço dourado premium com banho de ouro 18K' : 'aço prata premium com polimento espelhado' }}.
              </p>

              <div class="modal-specs">
                <div class="spec">
                  <span class="spec-label">Categoria</span>
                  <span class="spec-value">{{ produtoSelecionado.categoria }}</span>
                </div>
                <div class="spec">
                  <span class="spec-label">Material</span>
                  <span
                    class="spec-value"
                    :class="produtoSelecionado.cor === 'Dourado' ? 'dourado-text' : 'prata-text'"
                  >
                    {{ produtoSelecionado.cor === 'Dourado' ? 'Aço com banho ouro 18k' : 'Aço Prata 925' }}
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

              <p class="modal-price">
                R$ {{ produtoSelecionado.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
              </p>
              <p class="modal-installments">
                ou 10x de R$ {{ (produtoSelecionado.preco / 10).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }} sem juros
              </p>

              <div class="modal-actions">
                <button class="btn-carrinho" @click="handleAddToCart">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  Adicionar à Sacola
                </button>
                <button class="btn-comprar" @click="handleComprarAgora">
  Comprar Agora
</button>
              </div>

              <p class="modal-seguro">🔒 Compra segura · Troca grátis em 30 dias</p>
            </div>

          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { addToCart } from '@/stores/cart'
import axios from 'axios'

const router = useRouter()
const isScrolled = ref(false)
const zoomImg = ref(null)

const categoriaSelecionada = ref('Todos')
const materialSelecionado = ref('Todos')
const busca = ref('')
const ordenacao = ref('')

const produtoSelecionado = ref(null)

const categorias = ['Todos', 'Feminino', 'Masculino', 'Luxo']
const materiais = ['Todos', 'Dourado', 'Prata']

const API_URL = 'http://localhost:3000'

const getImg = (name) => `${API_URL}/public/products/${name}`

const produtos = [
  { id: 'rel-1', mongoId: '6a2084bd6e1e4fdb36db6eaa', nome: 'Relógio Dourado Elegante', preco: 799,  imagem: getImg('relogio4.png'),  categoria: 'Luxo',      cor: 'Dourado' },
  { id: 'rel-2', mongoId: '6a2084bd6e1e4fdb36db6eab', nome: 'Relógio Prata Clássico',   preco: 599,  imagem: getImg('relogio7.png'),  categoria: 'Feminino',  cor: 'Prata'   },
  { id: 'rel-3', mongoId: '6a2084bd6e1e4fdb36db6eac', nome: 'Relógio Masculino',        preco: 799,  imagem: getImg('relogio8.png'),  categoria: 'Masculino', cor: 'Prata'   },
  { id: 'rel-4', mongoId: '6a2084bd6e1e4fdb36db6ead', nome: 'Relógio Diary',      preco: 499,  imagem: getImg('relogio5.png'),  categoria: 'Feminino',  cor: 'Prata'   },
  { id: 'rel-5', mongoId: '6a2084bd6e1e4fdb36db6eae', nome: 'Relógio Luxo Black',       preco: 1299, imagem: getImg('relogio6.png'),  categoria: 'Masculino', cor: 'Prata' },
  { id: 'rel-6', mongoId: '6a2084bd6e1e4fdb36db6eaf', nome: 'Relógio Star',    preco: 1299, imagem: getImg('relogio9.png'),  categoria: 'Masculino', cor: 'Prata'   },
  { id: 'rel-7', mongoId: '6a2084bd6e1e4fdb36db6eb0', nome: 'Relógio New Black III',   preco: 1299, imagem: getImg('relogio10.png'), categoria: 'Masculino', cor: 'Prata'   },
  { id: 'rel-8', mongoId: '6a2084bd6e1e4fdb36db6eb1', nome: 'Relógio III',              preco: 1299, imagem: getImg('relogio11.png'), categoria: 'Luxo',      cor: 'Prata'   },
  { id: 'rel-9', mongoId: '6a2084bd6e1e4fdb36db6eb2', nome: 'Relógio Luxo  IV',    preco: 1299, imagem: getImg('masculino.png'), categoria: 'Luxo',      cor: 'Prata'   },
  { id: 'rel-10',mongoId: '6a2084bd6e1e4fdb36db6eb3', nome: 'Relógio Boss',preco: 799,  imagem: getImg('relogio14.png'), categoria: 'Luxo',      cor: 'Prata'   },
  { id: 'rel-11',mongoId: '6a2084bd6e1e4fdb36db6eb4', nome: 'Relógio Rose',         preco: 799,  imagem: getImg('relogio15.png'), categoria: 'Feminino',      cor: 'Prata'   },
  { id: 'rel-12',mongoId: '6a2084bd6e1e4fdb36db6eb5', nome: 'Relógio Luxo Gold',             preco: 799,  imagem: getImg('relogio16.png'), categoria: 'Feminino',      cor: 'Dourado'   },
]
/* ── ZOOM VIVARA ── */
const moverZoom = (e) => {
  const container = e.currentTarget
  const img = container.querySelector('img')
  if (!img) return
  const rect = container.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  img.style.transformOrigin = `${x}% ${y}%`
  img.style.transform = 'scale(2.8)'
}

const resetZoom = (e) => {
  const container = e.currentTarget
  const img = container.querySelector('img')
  if (!img) return
  img.style.transformOrigin = 'center center'
  img.style.transform = 'scale(1)'
}

/* ── FILTROS ── */
const produtosFiltrados = computed(() => {
  let lista = [...produtos]
  if (categoriaSelecionada.value !== 'Todos')
    lista = lista.filter(p => p.categoria === categoriaSelecionada.value)
  if (materialSelecionado.value !== 'Todos')
    lista = lista.filter(p => p.cor === materialSelecionado.value)
  if (busca.value.trim())
    lista = lista.filter(p => p.nome.toLowerCase().includes(busca.value.toLowerCase()))
  if (ordenacao.value === 'menor') lista.sort((a, b) => a.preco - b.preco)
  if (ordenacao.value === 'maior') lista.sort((a, b) => b.preco - a.preco)
  if (ordenacao.value === 'az')    lista.sort((a, b) => a.nome.localeCompare(b.nome))
  return lista
})

const produtosDourado = computed(() =>
  produtosFiltrados.value.filter(p => p.cor === 'Dourado')
)

const produtosPrata = computed(() =>
  produtosFiltrados.value.filter(p => p.cor === 'Prata')
)

const limparFiltros = () => {
  categoriaSelecionada.value = 'Todos'
  materialSelecionado.value = 'Todos'
  busca.value = ''
  ordenacao.value = ''
}

/* ── MODAL ── */
const abrirModal = (produto) => {
  produtoSelecionado.value = produto
  document.body.style.overflow = 'hidden'
}

const fecharModal = () => {
  produtoSelecionado.value = null
  document.body.style.overflow = ''
}

const handleAddToCart = async () => {
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
    fecharModal()
    const toast = document.createElement('div')
    toast.textContent = `"${p.nome}" adicionado ao carrinho 🛒`
    toast.style.cssText = `position:fixed;bottom:30px;right:30px;z-index:9999;background:#0f0e0c;color:white;padding:14px 22px;border-radius:4px;font-size:13px;font-family:sans-serif;border-left:3px solid #c9a84c;box-shadow:0 8px 30px rgba(0,0,0,.3);`
    document.body.appendChild(toast)
    setTimeout(() => toast.remove(), 3000)
  } catch (error) {
    console.error('Erro ao adicionar ao carrinho:', error)
  }
}

const handleComprarAgora = async () => {
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
    fecharModal()
    router.push('/Checkout')
  } catch (error) {
    console.error('Erro ao comprar:', error)
  }
}

const onScroll = () => { isScrolled.value = window.scrollY > 80 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Jost:wght@300;400;500;600&display=swap');

.relogios-page {
  --gold:        #c9a84c;
  --gold-light:  #e2c97e;
  --gold-dark:   #a07830;
  --silver:      #8a9db5;
  --silver-light:#b8c8d8;
  --dark:        #0f0e0c;
  --cream:       #faf8f4;
  --border:      rgba(201,168,76,0.18);
  --text-muted:  #8a8173;
  --font-display: 'Cormorant Garamond', serif;
  --font-body:    'Jost', sans-serif;

  background: var(--cream);
  min-height: 100vh;
  font-family: var(--font-body);
  color: var(--dark);
}

/* ── HEADER ── */
.page-header {
  text-align: center;
  padding: 50px 20px 36px;
  border-bottom: 1px solid var(--border);
  background: linear-gradient(180deg, #fff 0%, var(--cream) 100%);
}

.header-eyebrow {
  display: block;
  font-size: 0.68rem;
  letter-spacing: 6px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 10px;
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
  font-size: 0.72rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--text-muted);
}

/* ── FILTROS ── */
.filtros-bar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(250,248,244,.94);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--border);
}

.filtros-inner {
  max-width: 1300px;
  margin: 0 auto;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.filtros-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.v-divider {
  width: 1px;
  height: 22px;
  background: var(--border);
}

.cat-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.cat-btn {
  background: white;
  border: 1px solid var(--border);
  padding: 10px 18px;
  border-radius: 4px;
  font-size: 0.72rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-muted);
  cursor: pointer;
  transition: all .28s ease;
  font-family: var(--font-body);
  display: flex;
  align-items: center;
  gap: 8px;
}

.cat-btn:hover {
  border-color: var(--gold);
  color: var(--dark);
}

.cat-btn.ativo {
  background: var(--dark);
  border-color: var(--dark);
  color: white;
}

/* BOLINHAS DE MATERIAL */
.dot-material {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
}

.dot-dourado {
  background: linear-gradient(135deg, var(--gold-light), var(--gold-dark));
}

.dot-prata {
  background: linear-gradient(135deg, var(--silver-light), var(--silver));
}

/* BUSCA */
.filtros-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.search-box { position: relative; }

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
}

.search-input {
  width: 240px;
  padding: 11px 16px 11px 38px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: white;
  font-family: var(--font-body);
  font-size: .8rem;
}

.search-input:focus { outline: none; border-color: var(--gold); }

.search-clear {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;
  cursor: pointer;
  color: #999;
}

.sort-select {
  padding: 11px 16px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: white;
  font-family: var(--font-body);
  font-size: 0.78rem;
}

/* ── GRID ── */
.produtos-container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 70px 24px 100px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
}

/* ── CARD ── */
.card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(0,0,0,.04);
  transition: transform .5s cubic-bezier(.19,1,.22,1), box-shadow .5s ease;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 25px 70px rgba(0,0,0,.12);
}

.card-img {
  position: relative;
  background: white;
  height: 320px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 24px;
  transition: transform .8s cubic-bezier(.19,1,.22,1);
}

.card:hover .card-img img { transform: scale(1.18); }

.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15,14,12,.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity .4s ease;
  color: white;
  font-size: 0.7rem;
  letter-spacing: 3px;
  text-transform: uppercase;
}

.card:hover .card-overlay { opacity: 1; }

.card-cat-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  background: rgba(201,168,76,.12);
  color: var(--gold-dark);
  border: 1px solid rgba(201,168,76,.3);
  padding: 5px 10px;
  border-radius: 2px;
  font-size: .6rem;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.card-info {
  padding: 24px;
  border-top: 1px solid rgba(0,0,0,.04);
}

.card-info h3 {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 400;
  margin: 0 0 8px;
}

.card-price {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--gold-dark);
}

/* ── VAZIO ── */
.vazio { text-align: center; padding: 100px 20px; }
.vazio span { font-size: 4rem; color: var(--gold); }
.vazio p { color: var(--text-muted); margin: 14px 0; }
.vazio button {
  padding: 12px 24px;
  background: var(--dark);
  border: none;
  color: white;
  cursor: pointer;
  letter-spacing: 2px;
  text-transform: uppercase;
}

/* ── MODAL OVERLAY ── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10,9,7,.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 20px;
  backdrop-filter: blur(8px);
}

.modal-box {
  background: var(--cream);
  width: 100%;
  max-width: 950px;
  max-height: 92vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid var(--border);
  border-radius: 4px;
}

.modal-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

/* ── LADO IMAGEM ── */
.modal-image-side {
  position: relative;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-badge {
  align-self: flex-start;
  margin: 20px 20px 0;
  font-family: var(--font-body);
  font-size: .6rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 5px 12px;
  border-radius: 2px;
}

.dourado-badge {
  background: rgba(201,168,76,.12);
  color: var(--gold-dark);
  border: 1px solid rgba(201,168,76,.3);
}

.prata-badge {
  background: rgba(138,157,181,.12);
  color: #5a7090;
  border: 1px solid rgba(138,157,181,.3);
}

/* ── ZOOM VIVARA ── */
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
  width: 100%;
  max-width: 380px;
  max-height: 380px;
  object-fit: contain;
  transition: transform .08s ease;
  transform: scale(1);
  transform-origin: center center;
  will-change: transform;
  pointer-events: none;
  user-select: none;
}

/* dica de zoom */
.zoom-hint {
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.62rem;
  letter-spacing: 1px;
  color: #bbb;
  text-transform: uppercase;
  font-family: var(--font-body);
  pointer-events: none;
  transition: opacity .3s;
}

.modal-image-container:hover .zoom-hint {
  opacity: 0;
}

/* ── DETALHES DO LADO ── */
.modal-details {
  padding: 50px 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid var(--border);
}

.modal-eyebrow {
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--gold);
  margin: 0 0 12px;
}

.modal-title {
  font-family: var(--font-display);
  font-size: 2.2rem;
  font-weight: 300;
  letter-spacing: 1px;
  color: var(--dark);
  margin: 0 0 16px;
  line-height: 1.1;
}

.modal-divider-gem {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.modal-divider-gem::before,
.modal-divider-gem::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

.modal-gem { color: var(--gold); font-size: .55rem; }

.modal-description {
  font-size: 0.85rem;
  font-weight: 300;
  color: var(--text-muted);
  line-height: 1.75;
  margin: 0 0 24px;
}

.modal-specs {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 28px;
  padding: 16px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.spec { display: flex; justify-content: space-between; align-items: center; }

.spec-label {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #aaa;
}

.spec-value { font-size: .78rem; color: var(--dark); }
.dourado-text { color: var(--gold); }
.prata-text   { color: var(--silver); }

.modal-price {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 600;
  color: var(--dark);
  margin: 0 0 4px;
}

.modal-installments {
  font-size: 0.72rem;
  color: var(--text-muted);
  margin: 0 0 24px;
  font-weight: 300;
}

.modal-actions { display: flex; gap: 12px; margin-bottom: 16px; }

.btn-carrinho,
.btn-comprar {
  flex: 1;
  padding: 14px 16px;
  border-radius: 2px;
  font-family: var(--font-body);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all .3s ease;
}

.btn-carrinho {
  background: white;
  color: var(--dark);
  border: 1.5px solid var(--dark);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-carrinho:hover { background: var(--dark); color: white; }

.btn-comprar {
  background: var(--gold);
  color: var(--dark);
  border: 1.5px solid var(--gold);
}

.btn-comprar:hover {
  background: var(--gold-dark);
  border-color: var(--gold-dark);
  color: white;
}

.modal-seguro {
  font-size: 0.65rem;
  color: #bbb;
  text-align: center;
  margin: 0;
  letter-spacing: .5px;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  background: rgba(255,255,255,.9);
  border: 1px solid var(--border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  color: var(--text-muted);
  transition: all .3s ease;
}

.modal-close:hover { background: var(--dark); color: white; border-color: var(--dark); }

/* ── ANIMAÇÕES ── */
.modal-anim-enter-active, .modal-anim-leave-active { transition: opacity .35s ease; }
.modal-anim-enter-from, .modal-anim-leave-to        { opacity: 0; }

/* ── RESPONSIVO ── */
@media (max-width: 1100px) { .grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 760px)  { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 520px)  { .grid { grid-template-columns: 1fr; } }

@media (max-width: 900px) {
  .modal-body { grid-template-columns: 1fr; }
  .modal-details { border-left: none; border-top: 1px solid var(--border); }
  .modal-image-container { min-height: 280px; }
}

@media (max-width: 768px) {
  .filtros-inner { flex-direction: column; align-items: stretch; }
  .search-input { width: 100%; }
  .filtros-right { width: 100%; }
  .modal-actions { flex-direction: column; }
  .modal-details { padding: 30px 24px; }
}

/* ── SEÇÕES DOURADO / PRATA ── */
.section-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin: 70px 0 36px;
}

.section-header:first-of-type { margin-top: 0; }

.section-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border), transparent);
}

.section-title {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 400;
  letter-spacing: 2px;
  color: var(--dark);
  white-space: nowrap;
  margin: 0;
}

.section-gem   { font-size: .8rem; }
.dourado-gem   { color: var(--gold); }
.prata-gem     { color: var(--silver); }

.card-material {
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin: 0 0 6px;
}

.dourado-text { color: var(--gold); }
.prata-text   { color: var(--silver); }

.dourado-badge-card {
  background: rgba(201,168,76,.12);
  color: var(--gold-dark);
  border: 1px solid rgba(201,168,76,.3);
}

.prata-badge-card {
  background: rgba(138,157,181,.12);
  color: #5a7090;
  border: 1px solid rgba(138,157,181,.3);
}

.list-enter-active, .list-leave-active { transition: all .4s cubic-bezier(.19,1,.22,1); }
.list-enter-from, .list-leave-to { opacity: 0; transform: scale(.95) translateY(10px); }
</style>