<template>
  <div class="ivy-sale-page">

    <!-- TOAST -->
    <Transition name="toast-slide">
      <div v-if="toast.show" :class="['toast', `toast--${toast.type}`]" role="alert">
        <span class="toast-icon">{{ toast.type === 'success' ? '✓' : '✕' }}</span>
        {{ toast.msg }}
      </div>
    </Transition>

    <header class="page-header">
      <span class="header-eyebrow">Curadoria de Luxo</span>
      <h1>SALE</h1>
      <div class="header-divider"></div>
      <p class="header-sub">{{ filteredProducts.length }} peças selecionadas</p>
    </header>

    <nav class="filtros-bar" :class="{ scrolled: isScrolled }">
      <div class="filtros-inner">

        <div class="filtros-left">
          <div class="cat-tabs">
            <button
              :class="['cat-btn', { ativo: selectedCategories.length === 0 }]"
              @click="selectedCategories = []"
            >Todos</button>
            <button
              v-for="c in categories"
              :key="c"
              :class="['cat-btn', { ativo: selectedCategories.includes(c) }]"
              @click="toggleCategory(c)"
            >{{ c }}</button>
          </div>

          <div class="v-divider"></div>

          <div class="cat-tabs">
            <button
              :class="['cat-btn', { ativo: selectedMaterials.length === 0 }]"
              @click="selectedMaterials = []"
            >Todos Materiais</button>
            <button
              :class="['cat-btn', { ativo: selectedMaterials.includes('dourado') }]"
              @click="toggleMaterial('dourado')"
            >
              <span class="dot-material dot-dourado"></span> Dourado
            </button>
            <button
              :class="['cat-btn', { ativo: selectedMaterials.includes('prata') }]"
              @click="toggleMaterial('prata')"
            >
              <span class="dot-material dot-prata"></span> Prata
            </button>
            <button
              :class="['cat-btn', { ativo: selectedMaterials.includes('outro') }]"
              @click="toggleMaterial('outro')"
            >
              <span class="dot-material dot-outro"></span> Outros
            </button>
          </div>
        </div>

        <div class="filtros-right">
          <div class="search-box">
            <span class="search-icon">⌕</span>
            <input v-model="busca" placeholder="Buscar peça..." class="search-input" />
            <button v-if="busca" class="search-clear" @click="busca = ''">✕</button>
          </div>

          <select v-model="sortBy" class="sort-select">
            <option value="default">Destaques</option>
            <option value="low">Menor Preço</option>
            <option value="high">Maior Preço</option>
          </select>
        </div>

      </div>
    </nav>

    <main class="produtos-container">

      <!-- ESTADO VAZIO -->
      <div v-if="produtosDourado.length === 0 && produtosPrata.length === 0 && produtosOutro.length === 0" class="vazio">
        <span>◇</span>
        <p>Nenhuma peça encontrada para os filtros selecionados</p>
        <button @click="clearFilters">Limpar filtros</button>
      </div>

      <!-- SEÇÃO DOURADOS -->
      <template v-if="selectedMaterials.length === 0 || selectedMaterials.includes('dourado')">
        <div v-if="produtosDourado.length > 0" class="section-header">
          <div class="section-line"></div>
          <h2 class="section-title">✦ Ouro</h2>
          <div class="section-line"></div>
        </div>

        <TransitionGroup name="list" tag="div" class="grid">
          <article
            v-for="p in produtosDourado"
            :key="p.id"
            class="card"
            @click="openModal(p)"
            @mouseenter="hovered = p.id"
            @mouseleave="hovered = null"
          >
            <div class="card-img">
              <div class="img-reveal-box">
                <img :src="p.image" :alt="p.name" class="product-img primary" :class="{ hidden: hovered === p.id }" loading="lazy" />
                <img :src="p.image2 || p.image" :alt="p.name" class="product-img secondary" :class="{ visible: hovered === p.id }" />
              </div>
              <div class="card-overlay">VER DETALHES</div>
              <span class="card-cat-badge dourado-badge-card">{{ p.category }}</span>
              <div v-if="p.oldPrice && p.oldPrice > p.price" class="discount-badge">
                -{{ computedDiscount(p) }}%
              </div>
            </div>
            <div class="card-info">
              <p class="card-material dourado-text">{{ p.material }}</p>
              <h3>{{ p.name }}</h3>
              <div class="price-row">
                <span v-if="p.oldPrice && p.oldPrice > p.price" class="old-price">{{ format(p.oldPrice) }}</span>
                <span class="card-price">{{ format(p.price) }}</span>
              </div>
            </div>
          </article>
        </TransitionGroup>
      </template>

      <!-- SEÇÃO PRATA -->
      <template v-if="selectedMaterials.length === 0 || selectedMaterials.includes('prata')">
        <div v-if="produtosPrata.length > 0" class="section-header">
          <div class="section-line"></div>
          <h2 class="section-title">◈ Prata</h2>
          <div class="section-line"></div>
        </div>

        <TransitionGroup name="list" tag="div" class="grid">
          <article
            v-for="p in produtosPrata"
            :key="p.id"
            class="card"
            @click="openModal(p)"
            @mouseenter="hovered = p.id"
            @mouseleave="hovered = null"
          >
            <div class="card-img">
              <div class="img-reveal-box">
                <img :src="p.image" :alt="p.name" class="product-img primary" :class="{ hidden: hovered === p.id }" loading="lazy" />
                <img :src="p.image2 || p.image" :alt="p.name" class="product-img secondary" :class="{ visible: hovered === p.id }" />
              </div>
              <div class="card-overlay">VER DETALHES</div>
              <span class="card-cat-badge prata-badge-card">{{ p.category }}</span>
              <div v-if="p.oldPrice && p.oldPrice > p.price" class="discount-badge">
                -{{ computedDiscount(p) }}%
              </div>
            </div>
            <div class="card-info">
              <p class="card-material prata-text">{{ p.material }}</p>
              <h3>{{ p.name }}</h3>
              <div class="price-row">
                <span v-if="p.oldPrice && p.oldPrice > p.price" class="old-price">{{ format(p.oldPrice) }}</span>
                <span class="card-price">{{ format(p.price) }}</span>
              </div>
            </div>
          </article>
        </TransitionGroup>
      </template>

      <!-- SEÇÃO OUTROS (Relógios, Perfumes, etc.) -->
      <template v-if="selectedMaterials.length === 0 || selectedMaterials.includes('outro')">
        <div v-if="produtosOutro.length > 0" class="section-header">
          <div class="section-line"></div>
          <h2 class="section-title">◉ Outros</h2>
          <div class="section-line"></div>
        </div>

        <TransitionGroup name="list" tag="div" class="grid">
          <article
            v-for="p in produtosOutro"
            :key="p.id"
            class="card"
            @click="openModal(p)"
            @mouseenter="hovered = p.id"
            @mouseleave="hovered = null"
          >
            <div class="card-img">
              <div class="img-reveal-box">
                <img :src="p.image" :alt="p.name" class="product-img primary" :class="{ hidden: hovered === p.id }" loading="lazy" />
                <img :src="p.image2 || p.image" :alt="p.name" class="product-img secondary" :class="{ visible: hovered === p.id }" />
              </div>
              <div class="card-overlay">VER DETALHES</div>
              <span class="card-cat-badge outro-badge-card">{{ p.category }}</span>
              <div v-if="p.oldPrice && p.oldPrice > p.price" class="discount-badge">
                -{{ computedDiscount(p) }}%
              </div>
            </div>
            <div class="card-info">
              <p class="card-material outro-text">{{ p.material }}</p>
              <h3>{{ p.name }}</h3>
              <div class="price-row">
                <span v-if="p.oldPrice && p.oldPrice > p.price" class="old-price">{{ format(p.oldPrice) }}</span>
                <span class="card-price">{{ format(p.price) }}</span>
              </div>
            </div>
          </article>
        </TransitionGroup>
      </template>

    </main>

    <!-- MODAL PRODUTO -->
    <Transition name="modal-anim">
      <div v-if="selectedProduct" class="modal-overlay" @click.self="closeModal">
        <div class="modal-box">

          <button class="modal-close" @click="closeModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>

          <div class="modal-body">

            <!-- IMAGEM -->
            <div class="modal-image-side">
              <div
                class="modal-badge"
                :class="
                  getMaterialType(selectedProduct) === 'dourado' ? 'dourado-badge' :
                  getMaterialType(selectedProduct) === 'prata'   ? 'prata-badge'   :
                  'outro-badge'
                "
              >
                {{
                  getMaterialType(selectedProduct) === 'dourado' ? 'Ouro 18k' :
                  getMaterialType(selectedProduct) === 'prata'   ? 'Prata 925' :
                  selectedProduct.material
                }}
              </div>

              <div class="modal-image-container" @mousemove="handleZoom" @mouseleave="resetZoom">
                <img
                  :src="selectedProduct.image"
                  :alt="selectedProduct.name"
                />
                <div class="zoom-hint">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    <path d="M11 8v6M8 11h6"/>
                  </svg>
                  Passe o mouse para ampliar
                </div>
              </div>
            </div>

            <!-- DETALHES -->
            <div class="modal-details">
              <p class="modal-eyebrow">Coleção IVY · {{ selectedProduct.category }}</p>
              <h2 class="modal-title">{{ selectedProduct.name }}</h2>

              <div class="modal-divider-gem">
                <span class="modal-gem">◆</span>
              </div>

              <p class="modal-description">{{ selectedProduct.desc }}</p>

              <div class="modal-specs">
                <div class="spec">
                  <span class="spec-label">Composição</span>
                  <span class="spec-value">{{ selectedProduct.material }}</span>
                </div>
                <div class="spec">
                  <span class="spec-label">Referência</span>
                  <span class="spec-value">#IVY-{{ selectedProduct.id }}2026</span>
                </div>
                <div class="spec">
                  <span class="spec-label">Disponibilidade</span>
                  <span class="spec-value">Pronta Entrega</span>
                </div>
                <div class="spec">
                  <span class="spec-label">Acabamento</span>
                  <span
                    class="spec-value"
                    :class="
                      getMaterialType(selectedProduct) === 'dourado' ? 'dourado-text' :
                      getMaterialType(selectedProduct) === 'prata'   ? 'prata-text'   :
                      'outro-text'
                    "
                  >
                    {{
                      getMaterialType(selectedProduct) === 'dourado' ? '✦ Peça Dourada' :
                      getMaterialType(selectedProduct) === 'prata'   ? '◈ Peça em Prata' :
                      '◉ ' + selectedProduct.material
                    }}
                  </span>
                </div>
              </div>

              <div class="modal-pricing">
                <span v-if="selectedProduct.oldPrice && selectedProduct.oldPrice > selectedProduct.price" class="modal-old-price">
                  {{ format(selectedProduct.oldPrice) }}
                </span>
                <span class="modal-price">{{ format(selectedProduct.price) }}</span>
              </div>
              <p class="modal-installments">ou 10x de {{ format(selectedProduct.price / 10) }} sem juros</p>

              <div class="modal-actions">
                <button class="btn-carrinho" :disabled="addingToCart" @click.stop="addToCart(selectedProduct)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  {{ addingToCart ? 'Adicionando...' : 'Adicionar à Sacola' }}
                </button>
                <button class="btn-comprar" :disabled="buyingNow" @click.stop="buyNow(selectedProduct)">
                  {{ buyingNow ? 'Aguarde...' : 'Comprar Agora →' }}
                </button>
              </div>

              <p class="modal-seguro">🔒 Compra segura · Troca grátis em 30 dias</p>
            </div>

          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { addToCart as addToCartStore } from '@/stores/cart'

const router = useRouter()

// ── TOAST ──
const toast = ref({ show: false, msg: '', type: 'success' })
let toastTimer = null

const showToast = (msg, type = 'success') => {
  clearTimeout(toastTimer)
  toast.value = { show: true, msg, type }
  toastTimer = setTimeout(() => { toast.value.show = false }, 2800)
}

// ── ESTADOS ──
const isScrolled         = ref(false)
const hovered            = ref(null)
const sortBy             = ref('default')
const selectedCategories = ref([])
const selectedMaterials  = ref([])
const busca              = ref('')
const selectedProduct    = ref(null)
const addingToCart       = ref(false)
const buyingNow          = ref(false)

// ── AUTH ──
const checkAuth = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    showToast('Faça login para continuar', 'error')
    setTimeout(() => router.push('/login'), 1200)
    return false
  }
  return true
}

// ── ADICIONAR À SACOLA ──
const addToCart = async (product) => {
  if (!checkAuth()) return
  addingToCart.value = true
  try {
    await addToCartStore({
      _id:   String(product.id),
      name:  product.name,
      price: product.price,
      image: product.image
    })
    showToast(`${product.name} adicionado à sacola ✓`)
  } catch {
    showToast('Erro ao adicionar. Tente novamente.', 'error')
  } finally {
    addingToCart.value = false
  }
}

// ── COMPRAR AGORA ──
const buyNow = async (product) => {
  if (!checkAuth()) return
  buyingNow.value = true
  try {
    await addToCartStore({
      _id:   String(product.id),
      name:  product.name,
      price: product.price,
      image: product.image
    })
    closeModal()
    router.push('/Checkout')
  } catch {
    showToast('Erro ao processar. Tente novamente.', 'error')
    buyingNow.value = false
  }
}

// ── ZOOM ──
const handleZoom = (e) => {
  const container = e.currentTarget
  const img = container.querySelector('img')
  if (!img) return
  const rect = container.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  img.style.transformOrigin = `${x}% ${y}%`
  img.style.transform = 'scale(2.8)'
}

const resetZoom = () => {
  const img = document.querySelector('.modal-image-container img')
  if (!img) return
  img.style.transformOrigin = 'center center'
  img.style.transform = 'scale(1)'
}

// ── FILTROS ──
const categories = ['Anéis','Brincos','Pulseiras','Colares','Pingentes','Aliança','Perfume','Relógios']

const toggleCategory = (cat) => {
  if (selectedCategories.value.includes(cat))
    selectedCategories.value = selectedCategories.value.filter(c => c !== cat)
  else selectedCategories.value.push(cat)
}

const toggleMaterial = (mat) => {
  if (selectedMaterials.value.includes(mat))
    selectedMaterials.value = selectedMaterials.value.filter(m => m !== mat)
  else selectedMaterials.value.push(mat)
}

const clearFilters = () => {
  selectedCategories.value = []
  selectedMaterials.value  = []
  busca.value              = ''
  sortBy.value             = 'default'
}

// ── MATERIAL ──
const getMaterialType = (p) => {
  const mat = (p.material || '').toLowerCase()
  if (mat.includes('ouro') || mat.includes('dourado') || mat.includes('gold')) return 'dourado'
  if (mat.includes('prata') || mat.includes('ródio') || mat.includes('rodio')) return 'prata'
  return 'outro'
}

// ── MODAL ──
const openModal = (product) => {
  selectedProduct.value = product
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedProduct.value = null
  document.body.style.overflow = ''
}

const handleEsc = (e) => {
  if (e.key === 'Escape' && selectedProduct.value) closeModal()
}

const onScroll = () => { isScrolled.value = window.scrollY > 80 }

onMounted(() => {
  window.addEventListener('keydown', handleEsc)
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEsc)
  window.removeEventListener('scroll', onScroll)
  clearTimeout(toastTimer)
  document.body.style.overflow = ''
})

// ── DESCONTO ──
const computedDiscount = (p) => {
  if (!p.oldPrice || p.oldPrice <= p.price) return 0
  return Math.round((1 - p.price / p.oldPrice) * 100)
}

// ── PRODUTOS ──
const products = ref([
  { id: 1,  name: 'Colar Riviera',      category: 'Colares',   price: 850,  oldPrice: 1200, image: 'http://localhost:3000/public/products/chome.png',    material: 'Prata 925 com Banho de Ródio',             desc: 'O Colar Riviera é um ícone de sofisticação.' },
  { id: 2,  name: 'Colar Ponto de luz', category: 'Colares',   price: 700,  oldPrice: 980,  image: 'http://localhost:3000/public/products/colar4.png',    material: 'Colar em Prata 925',  desc: 'A malha Veneziana é famosa por sua resistência.' },
  { id: 3,  name: 'Relógio Luxo Black', category: 'Relógios',  price: 130,  oldPrice: 200,  image: 'http://localhost:3000/public/products/relogio6.png',  material: 'Pérola de Água Doce Selecionada',          desc: 'Nada supera o charme das pérolas.' },
  { id: 5,  name: 'Colar Rubi',         category: 'Colares',   price: 3000, oldPrice: 3400, image: 'http://localhost:3000/public/products/rubi.png',      material: 'Prata de Lei 925 Polida',                  desc: 'Inspirado nas grandes maisons.' },
  { id: 6,  name: 'IVY Bomb Black',          category: 'Perfume',   price: 100,  oldPrice: 189,  image: 'http://localhost:3000/public/products/perfume3.png',  material: 'Eau de Parfum Premium',                    desc: 'Perfume intenso e sofisticado.' },
  { id: 7,  name: 'Aliança de Ouro',    category: 'Aliança',   price: 2500, oldPrice: 3890, image: 'http://localhost:3000/public/products/alianças.png',  material: 'Ouro Amarelo 18k',                         desc: 'Elegância clássica e acabamento premium.' },
  { id: 8,  name: 'Pulseira Berloque',  category: 'Pulseiras', price: 580,  oldPrice: 800,  image: 'http://localhost:3000/public/products/berloque.png',  material: 'Prata 925 e Zircônia Cristal',             desc: 'Pulseira luxuosa com brilho intenso.' },
  { id: 9,  name: 'Cruz Veneziana',   category: 'Colares', price: 120,  oldPrice: 190,  image: 'http://localhost:3000/public/products/cruz.png',      material: 'Prata Maciça 925',                         desc: 'Símbolo clássico com design moderno.' },
  { id: 14, name: 'Berloque Charm',     category: 'Pingentes', price: 87,   oldPrice: 120,  image: 'http://localhost:3000/public/products/berloque6.png', material: 'Prata 925',                                desc: 'Peça delicada e sofisticada.' },
  { id: 15, name: 'Aliança Solitário',  category: 'Aliança',   price: 320,  oldPrice: 450,  image: 'http://localhost:3000/public/products/brilho.png',    material: 'Ouro Branco 18k',                          desc: 'Sofisticação e luxo em uma peça única.' },
  { id: 16, name: 'Anel de Noivado',    category: 'Aliança',   price: 980,  oldPrice: 1400, image: 'http://localhost:3000/public/products/dourada.png',   material: 'Ouro 18k e Diamante',                      desc: 'Anel elegante com acabamento premium.' },
  { id: 17, name: 'IVY Rose',        category: 'Perfume',   price: 100,  oldPrice: 199,  image: 'http://localhost:3000/public/products/perfume.png',   material: 'Eau de Parfum 50ml',                       desc: 'Notas florais sofisticadas.' },
  { id: 19, name: 'Relógio Dourado Elegante',   category: 'Relógios',  price: 540,  oldPrice: 700,  image: 'http://localhost:3000/public/products/relogio4.png',  material: 'Aço Inox', desc: 'Relógio sofisticado e elegante.' },
  { id: 20, name: 'Relógio Star',      category: 'Relógios',  price: 390,  oldPrice: 520,  image: 'http://localhost:3000/public/products/relogio9.png',  material: 'Silicone Premium',                         desc: 'Design esportivo e moderno.' }
])

// ── COMPUTED ──
const filteredProducts = computed(() => {
  let list = [...products.value]
  if (selectedCategories.value.length) list = list.filter(p => selectedCategories.value.includes(p.category))
  if (selectedMaterials.value.length)  list = list.filter(p => selectedMaterials.value.includes(getMaterialType(p)))
  if (busca.value.trim())              list = list.filter(p => p.name.toLowerCase().includes(busca.value.toLowerCase()))
  if (sortBy.value === 'low')  list.sort((a, b) => a.price - b.price)
  if (sortBy.value === 'high') list.sort((a, b) => b.price - a.price)
  return list
})

const produtosDourado = computed(() =>
  filteredProducts.value.filter(p => getMaterialType(p) === 'dourado')
)

const produtosPrata = computed(() =>
  filteredProducts.value.filter(p => getMaterialType(p) === 'prata')
)

const produtosOutro = computed(() =>
  filteredProducts.value.filter(p => getMaterialType(p) === 'outro')
)

const format = (v) => {
  if (v == null) return ''
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Jost:wght@300;400;500;600&display=swap');

.ivy-sale-page {
  --gold:        #c9a84c;
  --gold-light:  #e2c97e;
  --gold-dark:   #a07830;
  --silver:      #8a9db5;
  --silver-light:#b8c8d8;
  --outro:       #7a8a7a;
  --outro-light: #a8b8a8;
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

/* ── TOAST ── */
.toast {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 24px;
  border-radius: 8px;
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.3px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  white-space: nowrap;
  pointer-events: none;
}
.toast--success { background: var(--dark); color: #fff; border-left: 3px solid var(--gold); }
.toast--error   { background: #1a0a0a;     color: #fff; border-left: 3px solid #c0392b; }
.toast-icon     { font-size: 0.75rem; opacity: 0.8; }
.toast-slide-enter-active, .toast-slide-leave-active { transition: all 0.35s cubic-bezier(0.19,1,0.22,1); }
.toast-slide-enter-from, .toast-slide-leave-to { opacity: 0; transform: translateX(-50%) translateY(16px); }

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
.filtros-left  { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.filtros-right { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.v-divider     { width: 1px; height: 22px; background: var(--border); }
.cat-tabs      { display: flex; gap: 8px; flex-wrap: wrap; }

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
.cat-btn:hover  { border-color: var(--gold); color: var(--dark); }
.cat-btn.ativo  { background: var(--dark); border-color: var(--dark); color: white; }

.dot-material { width: 9px; height: 9px; border-radius: 50%; display: inline-block; flex-shrink: 0; }
.dot-dourado  { background: linear-gradient(135deg, var(--gold-light), var(--gold-dark)); }
.dot-prata    { background: linear-gradient(135deg, var(--silver-light), var(--silver)); }
.dot-outro    { background: linear-gradient(135deg, var(--outro-light), var(--outro)); }

.search-box    { position: relative; }
.search-icon   { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #aaa; }
.search-input  { width: 240px; padding: 11px 16px 11px 38px; border: 1px solid var(--border); border-radius: 4px; background: white; font-family: var(--font-body); font-size: .8rem; }
.search-input:focus { outline: none; border-color: var(--gold); }
.search-clear  { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); border: none; background: none; cursor: pointer; color: #999; }
.sort-select   { padding: 11px 16px; border: 1px solid var(--border); border-radius: 4px; background: white; font-family: var(--font-body); font-size: 0.78rem; }

/* ── GRID ── */
.produtos-container { max-width: 1300px; margin: 0 auto; padding: 70px 24px 100px; }
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
  transform: translateY(-6px);
  border-color: rgba(201,169,110,0.3);
  box-shadow: 0 20px 40px -15px rgba(0,0,0,0.08);
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
.img-reveal-box { position: relative; width: 100%; height: 100%; }
.product-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 24px;
  transition: 0.8s ease;
}
.primary.hidden { opacity: 0; }
.secondary { opacity: 0; transform: scale(1.05); }
.secondary.visible { opacity: 1; transform: scale(1); }

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
  font-size: .6rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 2px;
}
.discount-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  background: var(--dark);
  color: white;
  font-size: .65rem;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 2px;
  letter-spacing: 1px;
}
.card-info { padding: 24px; border-top: 1px solid rgba(0,0,0,.04); }
.card-info h3 { font-family: var(--font-display); font-size: 1.2rem; font-weight: 400; margin: 0 0 8px; }
.card-material { font-size: 0.65rem; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; margin: 0 0 6px; }
.price-row { display: flex; align-items: center; gap: 10px; }
.old-price  { color: #bbb; text-decoration: line-through; font-size: 0.85rem; }
.card-price { font-family: var(--font-display); font-size: 1.5rem; color: var(--gold-dark); }

/* ── VAZIO ── */
.vazio { text-align: center; padding: 100px 20px; }
.vazio span { font-size: 4rem; color: var(--gold); }
.vazio p { color: var(--text-muted); margin: 14px 0; }
.vazio button { padding: 12px 24px; background: var(--dark); border: none; color: white; cursor: pointer; letter-spacing: 2px; text-transform: uppercase; }

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
.modal-body { display: grid; grid-template-columns: 1fr 1fr; }

/* ── IMAGEM MODAL ── */
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
.dourado-badge { background: rgba(201,168,76,.12); color: var(--gold-dark); border: 1px solid rgba(201,168,76,.3); }
.prata-badge   { background: rgba(138,157,181,.12); color: #5a7090; border: 1px solid rgba(138,157,181,.3); }
.outro-badge   { background: rgba(122,138,122,.12); color: #4a5e4a; border: 1px solid rgba(122,138,122,.3); }

.modal-image-container {
  position: relative;
  width: 100%;
  min-height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  overflow: hidden;
  cursor: crosshair;
  background: #fff;
  flex: 1;
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
.modal-image-container:hover .zoom-hint { opacity: 0; }

/* ── DETALHES MODAL ── */
.modal-details {
  padding: 50px 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid var(--border);
}
.modal-eyebrow { font-size: 0.62rem; font-weight: 500; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); margin: 0 0 12px; }
.modal-title   { font-family: var(--font-display); font-size: 2.2rem; font-weight: 300; letter-spacing: 1px; color: var(--dark); margin: 0 0 16px; line-height: 1.1; }
.modal-divider-gem { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
.modal-divider-gem::before,
.modal-divider-gem::after { content: ''; flex: 1; height: 1px; background: var(--border); }
.modal-gem { color: var(--gold); font-size: .55rem; }
.modal-description { font-size: 0.85rem; font-weight: 300; color: var(--text-muted); line-height: 1.75; margin: 0 0 24px; }

.modal-specs { display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; padding: 16px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.spec { display: flex; justify-content: space-between; align-items: center; }
.spec-label { font-size: 0.7rem; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; color: #aaa; }
.spec-value { font-size: .78rem; color: var(--dark); }
.dourado-text { color: var(--gold); }
.prata-text   { color: var(--silver); }
.outro-text   { color: var(--outro); }

.modal-pricing { display: flex; align-items: center; gap: 12px; margin-bottom: 4px; }
.modal-old-price { color: #bbb; text-decoration: line-through; font-size: 0.85rem; }
.modal-price { font-family: var(--font-display); font-size: 2rem; font-weight: 600; color: var(--dark); }
.modal-installments { font-size: 0.72rem; color: var(--text-muted); margin: 0 0 24px; font-weight: 300; }

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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.btn-carrinho { background: white; color: var(--dark); border: 1.5px solid var(--dark); }
.btn-carrinho:hover:not(:disabled) { background: var(--dark); color: white; }
.btn-carrinho:disabled { opacity: .5; cursor: not-allowed; }

.btn-comprar { background: var(--gold); color: var(--dark); border: 1.5px solid var(--gold); }
.btn-comprar:hover:not(:disabled) { background: var(--gold-dark); border-color: var(--gold-dark); color: white; }
.btn-comprar:disabled { opacity: .5; cursor: not-allowed; }

.modal-seguro { font-size: 0.65rem; color: #bbb; text-align: center; margin: 0; letter-spacing: .5px; }

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

/* ── SEÇÕES ── */
.section-header { display: flex; align-items: center; gap: 24px; margin: 70px 0 36px; }
.section-header:first-of-type { margin-top: 0; }
.section-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, var(--border), transparent); }
.section-title { font-family: var(--font-display); font-size: 1.6rem; font-weight: 400; letter-spacing: 2px; color: var(--dark); white-space: nowrap; margin: 0; }

.dourado-badge-card { background: rgba(201,168,76,.12); color: var(--gold-dark); border: 1px solid rgba(201,168,76,.3); }
.prata-badge-card   { background: rgba(138,157,181,.12); color: #5a7090; border: 1px solid rgba(138,157,181,.3); }
.outro-badge-card   { background: rgba(122,138,122,.12); color: #4a5e4a; border: 1px solid rgba(122,138,122,.3); }

/* ── ANIMAÇÕES ── */
.modal-anim-enter-active { animation: modalIn 0.3s ease; }
.modal-anim-leave-active { animation: modalIn 0.2s ease reverse; }
@keyframes modalIn {
  from { opacity: 0; transform: scale(0.97) translateY(16px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
.list-enter-active, .list-leave-active { transition: all .4s cubic-bezier(.19,1,.22,1); }
.list-enter-from, .list-leave-to { opacity: 0; transform: scale(.95) translateY(10px); }

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
</style>