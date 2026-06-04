<template>
  <div class="perfumes-page">

    <header class="page-header">
      <span class="header-eyebrow">Curadoria de Luxo</span>
      <h1>PERFUMES</h1>
      <div class="header-divider"></div>
      <p class="header-sub">{{ produtosFiltrados.length }} fragrâncias disponíveis</p>
    </header>

    <nav class="filtros-bar" :class="{ scrolled: isScrolled }">
      <div class="filtros-inner">

        <div class="filtros-left">
          <div class="cat-tabs">
            <button
              v-for="cat in familias"
              :key="cat"
              :class="['cat-btn', { ativo: familiaSelecionada === cat }]"
              @click="familiaSelecionada = cat"
            >
              {{ cat }}
            </button>
          </div>

          <div class="v-divider"></div>

          <div class="cat-tabs">
            <button
              v-for="gen in generos"
              :key="gen"
              :class="['cat-btn', { ativo: generoSelecionado === gen }]"
              @click="generoSelecionado = gen"
            >
              <span
                v-if="gen !== 'Todos'"
                class="dot-genero"
                :class="gen === 'Feminino' ? 'dot-feminino' : gen === 'Masculino' ? 'dot-masculino' : 'dot-unissex'"
              ></span>
              {{ gen }}
            </button>
          </div>
        </div>

        <div class="filtros-right">
          <div class="search-box">
            <span class="search-icon">⌕</span>
            <input v-model="busca" placeholder="Buscar perfume..." class="search-input" />
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

      <div v-if="produtosFiltrados.length === 0" class="vazio">
        <span>◇</span>
        <p>Nenhuma fragrância encontrada</p>
        <button @click="limparFiltros">Limpar filtros</button>
      </div>

      <!-- SEÇÃO FEMININO -->
      <template v-if="generoSelecionado === 'Todos' || generoSelecionado === 'Feminino'">
        <div v-if="produtosFeminino.length > 0" class="section-header">
          <div class="section-line"></div>
          <h2 class="section-title">
            <span class="section-gem feminino-gem">◆</span> Fragrâncias Femininas
          </h2>
          <div class="section-line"></div>
        </div>

        <TransitionGroup name="list" tag="div" class="grid">
          <article
            v-for="produto in produtosFeminino"
            :key="produto.id"
            class="card"
            @click="abrirModal(produto)"
          >
            <div class="card-img">
              <img :src="produto.imagem" :alt="produto.nome" loading="lazy" />
              <div class="card-overlay">VER DETALHES</div>
              <span class="card-cat-badge feminino-badge-card">{{ produto.familia }}</span>
            </div>
            <div class="card-info">
              <p class="card-genero feminino-text">Fragrância Feminina</p>
              <h3>{{ produto.nome }}</h3>
              <p class="card-price">R$ {{ produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</p>
            </div>
          </article>
        </TransitionGroup>
      </template>

      <!-- SEÇÃO MASCULINO -->
      <template v-if="generoSelecionado === 'Todos' || generoSelecionado === 'Masculino'">
        <div v-if="produtosMasculino.length > 0" class="section-header">
          <div class="section-line"></div>
          <h2 class="section-title">
            <span class="section-gem masculino-gem">◆</span> Fragrâncias Masculinas
          </h2>
          <div class="section-line"></div>
        </div>

        <TransitionGroup name="list" tag="div" class="grid">
          <article
            v-for="produto in produtosMasculino"
            :key="produto.id"
            class="card"
            @click="abrirModal(produto)"
          >
            <div class="card-img">
              <img :src="produto.imagem" :alt="produto.nome" loading="lazy" />
              <div class="card-overlay">VER DETALHES</div>
              <span class="card-cat-badge masculino-badge-card">{{ produto.familia }}</span>
            </div>
            <div class="card-info">
              <p class="card-genero masculino-text">Fragrância Masculina</p>
              <h3>{{ produto.nome }}</h3>
              <p class="card-price">R$ {{ produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</p>
            </div>
          </article>
        </TransitionGroup>
      </template>

      <!-- SEÇÃO UNISSEX -->
      <template v-if="generoSelecionado === 'Todos' || generoSelecionado === 'Unissex'">
        <div v-if="produtosUnissex.length > 0" class="section-header">
          <div class="section-line"></div>
          <h2 class="section-title">
            <span class="section-gem unissex-gem">◆</span> Fragrâncias Unissex
          </h2>
          <div class="section-line"></div>
        </div>

        <TransitionGroup name="list" tag="div" class="grid">
          <article
            v-for="produto in produtosUnissex"
            :key="produto.id"
            class="card"
            @click="abrirModal(produto)"
          >
            <div class="card-img">
              <img :src="produto.imagem" :alt="produto.nome" loading="lazy" />
              <div class="card-overlay">VER DETALHES</div>
              <span class="card-cat-badge unissex-badge-card">{{ produto.familia }}</span>
            </div>
            <div class="card-info">
              <p class="card-genero unissex-text">Fragrância Unissex</p>
              <h3>{{ produto.nome }}</h3>
              <p class="card-price">R$ {{ produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</p>
            </div>
          </article>
        </TransitionGroup>
      </template>

    </main>

    <!-- MODAL -->
    <transition name="modal-anim">
      <div v-if="produtoSelecionado" class="modal-overlay" @click.self="fecharModal">
        <div class="modal-box">

          <button class="modal-close" @click="fecharModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>

          <div class="modal-body">

            <!-- LADO IMAGEM COM ZOOM -->
            <div class="modal-image-side">
              <div
                class="modal-badge"
                :class="produtoSelecionado.genero === 'Feminino' ? 'feminino-badge' : produtoSelecionado.genero === 'Masculino' ? 'masculino-badge' : 'unissex-badge'"
              >
                {{ produtoSelecionado.genero }} · {{ produtoSelecionado.familia }}
              </div>

              <div
                class="modal-image-container"
                @mousemove="moverZoom"
                @mouseleave="resetZoom"
              >
                <img
                  :src="produtoSelecionado.imagem"
                  :alt="produtoSelecionado.nome"
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

            <!-- LADO DETALHES -->
            <div class="modal-details">

              <p class="modal-eyebrow">
                Coleção IVY · {{ produtoSelecionado.familia }}
              </p>

              <h2 class="modal-title">{{ produtoSelecionado.nome }}</h2>

              <div class="modal-divider-gem">
                <span class="modal-gem">◆</span>
              </div>

              <p class="modal-description">
                Uma fragrância exclusiva da linha {{ produtoSelecionado.nome }}, desenvolvida com notas
                selecionadas para proporcionar uma experiência sensorial única e marcante.
              </p>

              <div class="modal-notes">
                <div class="note-item"><span class="note-label">Topo</span><span class="note-value">Bergamota e Lavanda</span></div>
                <div class="note-item"><span class="note-label">Coração</span><span class="note-value">Jasmin e Rosa</span></div>
                <div class="note-item"><span class="note-label">Fundo</span><span class="note-value">Sândalo e Âmbar</span></div>
              </div>

              <div class="modal-specs">
                <div class="spec">
                  <span class="spec-label">Família</span>
                  <span class="spec-value">{{ produtoSelecionado.familia }}</span>
                </div>
                <div class="spec">
                  <span class="spec-label">Gênero</span>
                  <span
                    class="spec-value"
                    :class="produtoSelecionado.genero === 'Feminino' ? 'feminino-text' : produtoSelecionado.genero === 'Masculino' ? 'masculino-text' : 'unissex-text'"
                  >
                    {{ produtoSelecionado.genero }}
                  </span>
                </div>
                <div class="spec">
                  <span class="spec-label">Garantia</span>
                  <span class="spec-value">12 meses</span>
                </div>
                <div class="spec">
                  <span class="spec-label">Envio</span>
                  <span class="spec-value">Frete grátis para todo Brasil</span>
                </div>
              </div>

              <div class="options-group">
                <label class="vol-label">Selecione o volume:</label>
                <div class="vol-selector">
                  <button
                    v-for="volume in produtoSelecionado.volumes"
                    :key="volume.tamanho"
                    :class="['vol-btn', { active: volumeSelecionado?.tamanho === volume.tamanho }]"
                    @click="volumeSelecionado = volume"
                  >
                    {{ volume.tamanho }}
                  </button>
                </div>
              </div>

              <p class="modal-price">
                R$ {{ volumeSelecionado?.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
              </p>
              <p class="modal-installments">
                ou 10x de R$ {{ ((volumeSelecionado?.preco ?? 0) / 10).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }} sem juros
              </p>

              <div class="modal-actions">
                <button class="btn-carrinho" @click="handleAddToCart">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  Adicionar à Sacola
                </button>
                <button class="btn-comprar" @click="handleAddToCart">
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

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { addToCart } from '@/stores/cart'
import axios from 'axios'

interface IVolumePerfume {
  tamanho: string
  preco: number
}

interface IPerfume {
  id: string
  nome: string
  preco: number
  imagem: string
  familia: string
  genero: 'Feminino' | 'Masculino' | 'Unissex'
  volumes: IVolumePerfume[]
}

const router     = useRouter()
const isScrolled = ref(false)

const familiaSelecionada = ref('Todos')
const generoSelecionado  = ref('Todos')
const busca              = ref('')
const ordenacao          = ref('')

const produtoSelecionado = ref<IPerfume | null>(null)
const volumeSelecionado  = ref<IVolumePerfume | null>(null)
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const getImg = (name: string) =>
  `http://localhost:3000/public/products/${name}`

const perfumes: IPerfume[] = [
  { id: 'perf-1',  mongoId: '6a207cc96e1e4fdb36db6e98',  nome: 'IVY Elegance',  preco: 199.90, familia: 'Floral',   genero: 'Feminino',  imagem: getImg('perfume.png'),   volumes: [{ tamanho: '50ml', preco: 200 }, { tamanho: '100ml', preco: 400 }] },
  { id: 'perf-2', mongoId: '6a207cc96e1e4fdb36db6e99',  nome: 'IVY Gold',      preco: 249.90, familia: 'Oriental', genero: 'Feminino',  imagem: getImg('perfume1.png'),  volumes: [{ tamanho: '50ml', preco: 220 }, { tamanho: '100ml', preco: 420 }] },
  { id: 'perf-3', mongoId: '6a207cc96e1e4fdb36db6e9a', nome: 'IVY Black',     preco: 279.90, familia: 'Amadeirado', genero: 'Masculino', imagem: getImg('perfume2.png'),  volumes: [{ tamanho: '50ml', preco: 250 }, { tamanho: '100ml', preco: 450 }] },
  { id: 'perf-4', mongoId: '6a207cc96e1e4fdb36db6e9b', nome: 'IVY Rose',      preco: 189.90, familia: 'Floral',   genero: 'Feminino',  imagem: getImg('perfume3.png'),  volumes: [{ tamanho: '50ml', preco: 180 }, { tamanho: '100ml', preco: 350 }] },
  { id: 'perf-5', mongoId: '6a207cc96e1e4fdb36db6e9c',  nome: 'IVY Night',     preco: 299.90, familia: 'Oriental', genero: 'Masculino', imagem: getImg('perfume4.png'),  volumes: [{ tamanho: '50ml', preco: 290 }, { tamanho: '100ml', preco: 520 }] },
  { id: 'perf-6', mongoId: '6a207cc96e1e4fdb36db6e9d',  nome: 'IVY Luxury',    preco: 349.90, familia: 'Floral',   genero: 'Unissex',   imagem: getImg('perfume5.png'),  volumes: [{ tamanho: '50ml', preco: 320 }, { tamanho: '100ml', preco: 600 }] },
  { id: 'perf-7',  mongoId: '6a207cc96e1e4fdb36db6e9e', nome: 'IVY Diamond',   preco: 379.90, familia: 'Cítrico',  genero: 'Unissex',   imagem: getImg('perfume6.png'),  volumes: [{ tamanho: '50ml', preco: 350 }, { tamanho: '100ml', preco: 650 }] },
  { id: 'perf-8', mongoId: '6a207cc96e1e4fdb36db6e9f',  nome: 'IVY Prestige',  preco: 329.90, familia: 'Amadeirado', genero: 'Masculino', imagem: getImg('perfume8.png'),  volumes: [{ tamanho: '50ml', preco: 300 }, { tamanho: '100ml', preco: 580 }] },
  { id: 'perf-9',  mongoId: '6a207cc96e1e4fdb36db6ea0',  nome: 'IVY Crystal',   preco: 389.90, familia: 'Aquático', genero: 'Unissex',   imagem: getImg('perfume9.png'),  volumes: [{ tamanho: '50ml', preco: 370 }, { tamanho: '100ml', preco: 700 }] },
  { id: 'perf-10', mongoId: '6a207cc96e1e4fdb36db6ea1',  nome: 'IVY Royal',     preco: 419.90, familia: 'Oriental', genero: 'Feminino',  imagem: getImg('perfume10.png'), volumes: [{ tamanho: '50ml', preco: 390 }, { tamanho: '100ml', preco: 760 }] },
  { id: 'perf-11', mongoId: '6a207cc96e1e4fdb36db6ea2',  nome: 'IVY Essence',   preco: 289.90, familia: 'Floral',   genero: 'Feminino',  imagem: getImg('perfume11.png'), volumes: [{ tamanho: '50ml', preco: 270 }, { tamanho: '100ml', preco: 500 }] },
  { id: 'perf-12',  mongoId: '6a207cc96e1e4fdb36db6ea3' ,   nome: 'IVY Supreme',   preco: 459.90, familia: 'Amadeirado', genero: 'Masculino', imagem: getImg('perfume12.png'), volumes: [{ tamanho: '50ml', preco: 430 }, { tamanho: '100ml', preco: 820 }] },
  { id: 'perf-13', mongoId: '6a207cc96e1e4fdb36db6ea4' ,nome: 'IVY Infinite',  preco: 499.90, familia: 'Cítrico',  genero: 'Masculino', imagem: getImg('perfume13.png'), volumes: [{ tamanho: '50ml', preco: 470 }, { tamanho: '100ml', preco: 890 }] },
  { id: 'perf-14',  mongoId: '6a207cc96e1e4fdb36db6ea5' ,nome: 'IVY Elite',     preco: 549.90, familia: 'Oriental', genero: 'Unissex',   imagem: getImg('perfume14.png'), volumes: [{ tamanho: '50ml', preco: 500 }, { tamanho: '100ml', preco: 950 }] },
]

/* ── FILTROS ── */
const familias = computed<string[]>(() =>
  ['Todos', ...new Set(perfumes.map(p => p.familia))]
)

const generos = computed<string[]>(() =>
  ['Todos', ...new Set(perfumes.map(p => p.genero))]
)

const produtosFiltrados = computed(() => {
  let lista = [...perfumes]
  if (familiaSelecionada.value !== 'Todos')
    lista = lista.filter(p => p.familia === familiaSelecionada.value)
  if (generoSelecionado.value !== 'Todos')
    lista = lista.filter(p => p.genero === generoSelecionado.value)
  if (busca.value.trim())
    lista = lista.filter(p => p.nome.toLowerCase().includes(busca.value.toLowerCase()))
  if (ordenacao.value === 'menor') lista.sort((a, b) => a.preco - b.preco)
  if (ordenacao.value === 'maior') lista.sort((a, b) => b.preco - a.preco)
  if (ordenacao.value === 'az')    lista.sort((a, b) => a.nome.localeCompare(b.nome))
  return lista
})

const produtosFeminino  = computed(() => produtosFiltrados.value.filter(p => p.genero === 'Feminino'))
const produtosMasculino = computed(() => produtosFiltrados.value.filter(p => p.genero === 'Masculino'))
const produtosUnissex   = computed(() => produtosFiltrados.value.filter(p => p.genero === 'Unissex'))

const limparFiltros = () => {
  familiaSelecionada.value = 'Todos'
  generoSelecionado.value  = 'Todos'
  busca.value     = ''
  ordenacao.value = ''
}

/* ── ZOOM ── */
const moverZoom = (e: MouseEvent) => {
  const container = e.currentTarget as HTMLElement
  const img = container.querySelector('img') as HTMLImageElement
  if (!img) return
  const rect = container.getBoundingClientRect()
  const x = ((e.clientX - rect.left)  / rect.width)  * 100
  const y = ((e.clientY - rect.top)   / rect.height) * 100
  img.style.transformOrigin = `${x}% ${y}%`
  img.style.transform       = 'scale(2.8)'
}

const resetZoom = (e: MouseEvent) => {
  const container = e.currentTarget as HTMLElement
  const img = container.querySelector('img') as HTMLImageElement
  if (!img) return
  img.style.transformOrigin = 'center center'
  img.style.transform       = 'scale(1)'
}

/* ── MODAL ── */
const abrirModal = (produto: IPerfume) => {
  produtoSelecionado.value     = produto
  volumeSelecionado.value      = produto.volumes[0]
  document.body.style.overflow = 'hidden'
}

const fecharModal = () => {
  produtoSelecionado.value     = null
  document.body.style.overflow = ''
}

// handleAddToCart atualizado
const handleAddToCart = async () => {
  if (!produtoSelecionado.value || !volumeSelecionado.value) return

  const token = localStorage.getItem('token')
  if (!token) { router.push('/login'); return }

  const p      = produtoSelecionado.value
  const volume = volumeSelecionado.value

  try {
    await axios.post(
      `${apiUrl}/api/cart`,
      {
        productId: p.mongoId,
        name:      `${p.nome} (${volume.tamanho})`,
        price:     volume.preco,
        image:     p.imagem,
        quantity:  1
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    fecharModal()
    router.push('/carrinho')
  } catch (error) {
    console.error('Erro ao adicionar ao carrinho:', error)
  }
}
const onScroll = () => { isScrolled.value = window.scrollY > 80 }
onMounted(()   => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Jost:wght@300;400;500;600&display=swap');

.perfumes-page {
  --rose:        #c97b8a;
  --rose-light:  #e8b4be;
  --rose-dark:   #a0505f;
  --blue:        #6b8cae;
  --blue-light:  #a0bdd4;
  --violet:      #8b78b8;
  --violet-light:#b8aad8;
  --dark:        #0f0e0c;
  --cream:       #faf8f4;
  --border:      rgba(201, 123, 138, 0.18);
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
  font-size: .68rem;
  letter-spacing: 6px;
  text-transform: uppercase;
  color: var(--rose);
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
  background: linear-gradient(90deg, transparent, var(--rose), transparent);
  margin: 20px auto;
}

.header-sub {
  font-size: .72rem;
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
  margin: auto;
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
  font-size: .72rem;
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

.cat-btn:hover { border-color: var(--rose); color: var(--dark); }
.cat-btn.ativo  { background: var(--dark); border-color: var(--dark); color: white; }

.dot-genero {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
}

.dot-feminino  { background: linear-gradient(135deg, var(--rose-light), var(--rose-dark)); }
.dot-masculino { background: linear-gradient(135deg, var(--blue-light), var(--blue)); }
.dot-unissex   { background: linear-gradient(135deg, var(--violet-light), var(--violet)); }

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

.search-input:focus { outline: none; border-color: var(--rose); }

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
  font-size: .78rem;
}

/* ── GRID ── */
.produtos-container {
  max-width: 1300px;
  margin: auto;
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
  font-size: .7rem;
  letter-spacing: 3px;
  text-transform: uppercase;
}

.card:hover .card-overlay { opacity: 1; }

.card-cat-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  padding: 5px 10px;
  border-radius: 2px;
  font-size: .6rem;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.feminino-badge-card  { background: rgba(201,123,138,.12); color: var(--rose-dark); border: 1px solid rgba(201,123,138,.3); }
.masculino-badge-card { background: rgba(107,140,174,.12); color: #3a607a;          border: 1px solid rgba(107,140,174,.3); }
.unissex-badge-card   { background: rgba(139,120,184,.12); color: #5a4090;          border: 1px solid rgba(139,120,184,.3); }

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
  color: var(--rose-dark);
}

.card-genero {
  font-size: .65rem;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin: 0 0 6px;
}

.feminino-text  { color: var(--rose); }
.masculino-text { color: var(--blue); }
.unissex-text   { color: var(--violet); }

/* ── EMPTY ── */
.vazio { text-align: center; padding: 100px 20px; }
.vazio span { font-size: 4rem; color: var(--rose); }
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

/* ── SEÇÕES ── */
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

.section-gem  { font-size: .8rem; }
.feminino-gem  { color: var(--rose); }
.masculino-gem { color: var(--blue); }
.unissex-gem   { color: var(--violet); }

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

.feminino-badge  { background: rgba(201,123,138,.12); color: var(--rose-dark); border: 1px solid rgba(201,123,138,.3); }
.masculino-badge { background: rgba(107,140,174,.12); color: #3a607a;          border: 1px solid rgba(107,140,174,.3); }
.unissex-badge   { background: rgba(139,120,184,.12); color: #5a4090;          border: 1px solid rgba(139,120,184,.3); }

/* ── ZOOM ── */
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
  font-family: var(--font-body);
  pointer-events: none;
  transition: opacity .3s;
}

.modal-image-container:hover .zoom-hint { opacity: 0; }

/* ── LADO DETALHES ── */
.modal-details {
  padding: 50px 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid var(--border);
}

.modal-eyebrow {
  font-size: .62rem;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--rose);
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

.modal-gem { color: var(--rose); font-size: .55rem; }

.modal-description {
  font-size: .85rem;
  font-weight: 300;
  color: var(--text-muted);
  line-height: 1.75;
  margin: 0 0 20px;
}

/* NOTAS OLFATIVAS */
.modal-notes {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  padding: 14px 16px;
  background: rgba(201,123,138,.05);
  border-left: 2px solid var(--rose);
  border-radius: 0 4px 4px 0;
}

.note-item {
  display: flex;
  justify-content: space-between;
  font-size: .75rem;
}

.note-label {
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--rose);
  font-size: .65rem;
}

.note-value { color: var(--dark); }

.modal-specs {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  padding: 16px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.spec { display: flex; justify-content: space-between; align-items: center; }

.spec-label {
  font-size: .7rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #aaa;
}

.spec-value { font-size: .78rem; color: var(--dark); }

/* SELETOR DE VOLUME */
.options-group { margin-bottom: 20px; }

.vol-label {
  font-size: .68rem;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-muted);
  display: block;
  margin-bottom: 10px;
}

.vol-selector { display: flex; gap: 10px; }

.vol-btn {
  padding: 10px 22px;
  border: 1px solid var(--border);
  background: white;
  cursor: pointer;
  transition: .3s;
  font-family: var(--font-body);
  font-size: .78rem;
  border-radius: 2px;
}

.vol-btn.active {
  border-color: var(--dark);
  background: var(--dark);
  color: #fff;
}

.modal-price {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 600;
  color: var(--dark);
  margin: 0 0 4px;
}

.modal-installments {
  font-size: .72rem;
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
  font-size: .72rem;
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
  background: var(--rose);
  color: white;
  border: 1.5px solid var(--rose);
}

.btn-comprar:hover { background: var(--rose-dark); border-color: var(--rose-dark); }

.modal-seguro {
  font-size: .65rem;
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
.modal-anim-enter-from,  .modal-anim-leave-to      { opacity: 0; }

.list-enter-active, .list-leave-active { transition: all .4s cubic-bezier(.19,1,.22,1); }
.list-enter-from,   .list-leave-to     { opacity: 0; transform: scale(.95) translateY(10px); }

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