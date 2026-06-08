<template>
  <div class="pagina-casamento">

    <!-- PARTÍCULAS DECORATIVAS -->
    <div class="particles">
      <span v-for="n in 14" :key="n" :class="`particle p${n}`"></span>
    </div>

    <!-- HEADER -->
    <header class="page-header">
      <span class="header-eyebrow">Coleção Premium</span>
      <h1>CASAMENTO</h1>
      <div class="header-divider"></div>
      <p class="header-sub">{{ produtosFiltrados.length }} peças disponíveis</p>
    </header>

    <!-- FILTROS STICKY -->
    <nav class="filtros">
      <div class="filtros-inner">

        <div class="search-box">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input v-model="busca" type="text" placeholder="Buscar joia..." />
        </div>

        <div class="filtro-categoria">
          <button
            v-for="f in filtros"
            :key="f.key"
            :class="['btn-filtro', { active: categoriaFiltro === f.key }]"
            @click="categoriaFiltro = f.key"
          >
            <span v-if="f.dot" class="dot" :class="f.dot"></span>
            {{ f.label }}
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

      <!-- SEÇÕES POR CATEGORIA -->
      <template v-for="secao in secoesFiltradas" :key="secao.key">
        <div v-if="secao.produtos.length > 0" class="section-header">
          <div class="section-line"></div>
          <h2 class="section-title">
            <span class="section-gem" :class="secao.gemClass">◆</span>
            {{ secao.titulo }}
          </h2>
          <div class="section-line"></div>
        </div>

        <TransitionGroup name="list" tag="section" class="grid">
          <article
            class="card"
            v-for="produto in secao.produtos"
            :key="produto.id"
            @click="abrirModal(produto)"
          >
            <div class="card-badge" :class="secao.badgeClass">{{ secao.badge }}</div>
            <div class="image-wrapper">
              <img :src="produto.imagem" :alt="produto.nome" />
              <div class="card-overlay"><span>Ver detalhes</span></div>
            </div>
            <div class="card-info">
              <h3>{{ produto.nome }}</h3>
              <p class="card-material" :class="secao.textClass">{{ secao.badge }}</p>
              <p class="price">{{ formatarPreco(produto.preco) }}</p>
            </div>
          </article>
        </TransitionGroup>
      </template>

      <!-- EMPTY STATE -->
      <div v-if="produtosFiltrados.length === 0" class="empty-state">
        <div class="empty-gem">◇</div>
        <p>Nenhuma peça encontrada para <strong>"{{ busca }}"</strong></p>
        <button @click="busca = ''; categoriaFiltro = ''">Limpar filtros</button>
      </div>

    </main>

    <!-- MODAL PRODUTO -->
    <Transition name="modal-fade">
      <div v-if="produtoSelecionado" class="modal-overlay" @click.self="fecharModal">
        <div class="modal-content">

          <button class="close-x" @click="fecharModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>

          <div class="modal-body">

            <!-- ESQUERDA: IMAGEM -->
            <div class="modal-image-side">
              <div class="modal-badge" :class="getBadgeClass(produtoSelecionado.categoria)">
                {{ getCategoryLabel(produtoSelecionado.categoria) }}
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
              <div class="modal-footer-info">
                <span>Frete grátis</span>
                <span class="sep">·</span>
                <span>Entrega expressa</span>
                <span class="sep">·</span>
                <span>Certificado</span>
              </div>
            </div>

            <!-- DIREITA: DETALHES -->
            <div class="modal-details">
              <p class="modal-eyebrow">Coleção Casamento · {{ getCategoryLabel(produtoSelecionado.categoria) }}</p>
              <h2 class="modal-title">{{ produtoSelecionado.nome }}</h2>

              <div class="modal-divider">
                <span class="modal-gem">◆</span>
              </div>

              <div class="stars-row">
                <span class="stars">★★★★★</span>
                <span class="avaliacoes">({{ produtoSelecionado.avaliacoes }} avaliações)</span>
              </div>

              <p class="modal-description">{{ produtoSelecionado.descricao }}</p>

              <div class="modal-specs">
                <div class="spec">
                  <span class="spec-label">Material</span>
                  <span class="spec-value" :class="getTextClass(produtoSelecionado.categoria)">
                    {{ getMaterial(produtoSelecionado.categoria) }}
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

              <!-- NUMERAÇÃO (só para anéis/alianças) -->
              <div class="campo" v-if="produtoSelecionado.temNumeracao !== false">
                <label class="campo-label">Numeração</label>
                <div class="sizes">
                  <button
                    v-for="t in tamanhos"
                    :key="t"
                    :class="{ ativo: tamSelecionado === t }"
                    @click="tamSelecionado = t"
                  >{{ t }}</button>
                </div>
              </div>

              <!-- MATERIAL -->
              <div class="campo">
                <label class="campo-label">Material</label>
                <div class="materials">
                  <button
                    v-for="m in materiais"
                    :key="m"
                    :class="{ ativo: matSelecionado === m }"
                    @click="matSelecionado = m"
                  >{{ m }}</button>
                </div>
              </div>

              <!-- QUANTIDADE -->
              <div class="campo">
                <label class="campo-label">Quantidade</label>
                <div class="quantidade">
                  <button @click="quantidade > 1 ? quantidade-- : null">−</button>
                  <span>{{ quantidade }}</span>
                  <button @click="quantidade++">+</button>
                </div>
              </div>

              <p class="modal-price">{{ formatarPreco(produtoSelecionado.preco) }}</p>
              <p class="modal-installments">
                ou 12x de {{ formatarPreco(produtoSelecionado.preco / 12) }} sem juros
              </p>

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
import { addToCart } from '@/stores/cart'


const router = useRouter()

const API_URL = 'http://localhost:3000'

/* ── STATE ── */
const busca           = ref('')
const ordenar         = ref('')
const categoriaFiltro = ref('')
const toastVisivel    = ref(false)
const toastMensagem   = ref('')
const produtoSelecionado = ref<any>(null)

const tamSelecionado = ref(12)
const matSelecionado = ref('Ouro 18k')
const quantidade     = ref(1)

const tamanhos = [10, 12, 14, 16, 18, 20]
const materiais = ['Ouro 18k', 'Platina', 'Ouro Rosê']

/* ── FILTROS ── */
const filtros = [
  { key: '',           label: 'Todos'        },
  { key: 'solitarios', label: 'Solitários',  dot: 'dourado-dot' },
  { key: 'aliancas',   label: 'Alianças',    dot: 'dourado-dot' },
  { key: 'noiva',      label: 'Para a Noiva',dot: 'rose-dot'    },
  { key: 'noivo',      label: 'Para o Noivo',dot: 'prata-dot'   },
]

/* ── PRODUTOS ── */
interface Produto {
  id: number | string
  nome: string
  preco: number
  categoria: string
  imagem: string
  descricao: string
  avaliacoes: number
  temNumeracao?: boolean
}

const produtos = ref([
  // SOLITÁRIOS
  { id: 'sol-1', mongoId: '6a20a97cac6b2f17f374182a', nome: 'Anel Luxo Diamond Premium',    preco: 3100, categoria: 'solitarios', imagem: `${API_URL}/public/products/anel4.png`,    avaliacoes: 62, temNumeracao: true, descricao: 'Solitário elegante em ouro 18k com pedra central premium de corte brilhante.' },
  { id: 'sol-2', mongoId: '6a20a97cac6b2f17f374182b', nome: 'Solitário Clássico',   preco: 3290, categoria: 'solitarios', imagem: `${API_URL}/public/products/prata.png`,    avaliacoes: 41, temNumeracao: true, descricao: 'Design clássico e atemporal com diamante central em cravação solitária.' },
  { id: 'sol-3', mongoId: '6a20a97cac6b2f17f374182c', nome: 'Solitário Halo',       preco: 5490, categoria: 'solitarios', imagem: `${API_URL}/public/products/dourada.png`,  avaliacoes: 55, temNumeracao: true, descricao: 'Corte halo com pedra central envolvida por diamantes menores.' },
  { id: 'sol-4', mongoId: '6a20a97cac6b2f17f374182d', nome: 'Anel  Diamante Cravejado',       preco: 2200, categoria: 'solitarios', imagem: `${API_URL}/public/products/anel5.png`,    avaliacoes: 38, temNumeracao: true, descricao: 'Aro cravejado com diamantes no estilo pavê.' },
  // ALIANÇAS
  { id: 'ali-1', mongoId: '6a20a97cac6b2f17f374182e', nome: 'Aliança Ouro Prata',preco: 2490, categoria: 'aliancas',  imagem: `${API_URL}/public/products/dp.png`,       avaliacoes: 47, temNumeracao: true, descricao: 'Aliança sofisticada em ouro 18k com acabamento premium.' },
  { id: 'ali-2', mongoId: '6a20a97cac6b2f17f374182f', nome: 'Aliança com Diamantes',preco: 3290, categoria: 'aliancas',  imagem: `${API_URL}/public/products/prata.png`,    avaliacoes: 35, temNumeracao: true, descricao: 'Modelo cravejado com diamantes de brilho intenso.' },
  { id: 'ali-3', mongoId: '6a20a97cac6b2f17f3741830', nome: 'Aliança Duo Brilho',   preco: 3890, categoria: 'aliancas',  imagem: `${API_URL}/public/products/alianças.png`, avaliacoes: 52, temNumeracao: true, descricao: 'Combinação perfeita de ouro polido e diamantes.' },
  { id: 'ali-4', mongoId: '6a20a97cac6b2f17f3741831', nome: 'Aliança Meia Volta',   preco: 2890, categoria: 'aliancas',  imagem: `${API_URL}/public/products/pratas.png`,   avaliacoes: 29, temNumeracao: true, descricao: 'Diamantes em meia volta que capturam a luz de todos os ângulos.' },
  // NOIVA
  { id: 'noiva-1', mongoId: '6a20a97cac6b2f17f3741832', nome: 'Brinco Pérola Royale',preco: 1290, categoria: 'noiva', imagem: `${API_URL}/public/products/brinconoiva.png`, avaliacoes: 53, temNumeracao: false, descricao: 'Design refinado com pérolas naturais e ouro 18k.' },
  { id: 'noiva-2', mongoId: '6a20a97cac6b2f17f3741833', nome: 'Brinco Prata',       preco: 2190, categoria: 'noiva', imagem: `${API_URL}/public/products/noiva.png`,       avaliacoes: 44, temNumeracao: false, descricao: 'Colar delicado em ouro 18k com pingente de diamante.' },
  { id: 'noiva-3', mongoId: '6a20a97cac6b2f17f3741834', nome: 'Brinco Dourado',    preco: 980,  categoria: 'noiva', imagem: `${API_URL}/public/products/noivad.png`,      avaliacoes: 37, temNumeracao: false, descricao: 'Pulseira em ouro 18k com detalhes em zircônia.' },
  { id: 'noiva-4', mongoId: 'S6a20a97cac6b2f17f3741835', nome: 'Conjunto Nupcial',    preco: 3490, categoria: 'noiva', imagem: `${API_URL}/public/products/noivado.png`,     avaliacoes: 61, temNumeracao: false, descricao: 'Conjunto completo de brinco, colar e pulseira em ouro 18k.' },
  // NOIVO
  { id: 'noivo-1', mongoId: '6a20a97cac6b2f17f3741836', nome: 'Abotoadura Elegance', preco: 890,  categoria: 'noivo', imagem: `${API_URL}/public/products/noivo.png`,    avaliacoes: 44, temNumeracao: false, descricao: 'Acessório masculino sofisticado com acabamento premium.' },
  { id: 'noivo-2', mongoId: '6a20a97cac6b2f17f3741837', nome: 'Corrente Premium',    preco: 1290, categoria: 'noivo', imagem: `${API_URL}/public/products/corrente.png`, avaliacoes: 58, temNumeracao: false, descricao: 'Corrente sofisticada em ouro 18k com design moderno.' },
  { id: 'noivo-3', mongoId: '6a20a97cac6b2f17f3741838', nome: 'Aliança Masculina',   preco: 1890, categoria: 'noivo', imagem: `${API_URL}/public/products/homen.png`,    avaliacoes: 49, temNumeracao: true,  descricao: 'Aliança masculina de design robusto em ouro 18k.' },
  { id: 'noivo-4', mongoId: '6a20a97cac6b2f17f3741839', nome: 'Cruz Veneziana',      preco: 1490, categoria: 'noivo', imagem: `${API_URL}/public/products/cruz.png`,     avaliacoes: 33, temNumeracao: false, descricao: 'Cruz veneziana em ouro 18k com acabamento polido.' },
])

/* ── CONFIG SEÇÕES ── */
const secoes = [
  {
    key: 'solitarios', titulo: 'Solitários',      badge: 'Ouro 18k',
    badgeClass: 'dourado-badge', textClass: 'dourado-text', gemClass: 'dourado-gem'
  },
  {
    key: 'aliancas',   titulo: 'Alianças',         badge: 'Ouro 18k',
    badgeClass: 'dourado-badge', textClass: 'dourado-text', gemClass: 'dourado-gem'
  },
  {
    key: 'noiva',      titulo: 'Para a Noiva',     badge: 'Coleção Noiva',
    badgeClass: 'rose-badge', textClass: 'rose-text', gemClass: 'rose-gem'
  },
  {
    key: 'noivo',      titulo: 'Para o Noivo',     badge: 'Coleção Noivo',
    badgeClass: 'prata-badge', textClass: 'prata-text', gemClass: 'prata-gem'
  },
]

/* ── COMPUTED ── */
const produtosFiltrados = computed(() => {
  let lista = produtos.value.filter(p => {
    const matchBusca = p.nome.toLowerCase().includes(busca.value.toLowerCase())
    const matchCat   = categoriaFiltro.value === '' || p.categoria === categoriaFiltro.value
    return matchBusca && matchCat
  })

  if (ordenar.value === 'menor') return [...lista].sort((a, b) => a.preco - b.preco)
  if (ordenar.value === 'maior') return [...lista].sort((a, b) => b.preco - a.preco)

  return lista
})

const secoesFiltradas = computed(() =>
  secoes.map(s => ({
    ...s,
    produtos: produtosFiltrados.value.filter(p => p.categoria === s.key)
  })).filter(s => categoriaFiltro.value === '' || s.key === categoriaFiltro.value)
)

/* ── HELPERS ── */
const getCategoryLabel = (cat: string) => {
  const map: Record<string, string> = {
    solitarios: 'Solitários', aliancas: 'Alianças',
    noiva: 'Para a Noiva', noivo: 'Para o Noivo'
  }
  return map[cat] || cat
}

const getBadgeClass = (cat: string) => {
  const map: Record<string, string> = {
    solitarios: 'dourado-badge', aliancas: 'dourado-badge',
    noiva: 'rose-badge', noivo: 'prata-badge'
  }
  return map[cat] || 'dourado-badge'
}

const getTextClass = (cat: string) => {
  const map: Record<string, string> = {
    solitarios: 'dourado-text', aliancas: 'dourado-text',
    noiva: 'rose-text', noivo: 'prata-text'
  }
  return map[cat] || 'dourado-text'
}

const getMaterial = (cat: string) => {
  const map: Record<string, string> = {
    solitarios: 'Ouro 18k com diamante',
    aliancas:   'Ouro 18k',
    noiva:      'Ouro 18k com pérolas',
    noivo:      'Ouro 18k / Prata 925'
  }
  return map[cat] || 'Ouro 18k'
}

const formatarPreco = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

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

/* ── MODAL ── */
const abrirModal = (p: any) => {
  produtoSelecionado.value = p
  quantidade.value = 1
  document.body.style.overflow = 'hidden'
}

const fecharModal = () => {
  produtoSelecionado.value = null
  document.body.style.overflow = ''
}

/* ── TOAST ── */
const showToast = (msg: string) => {
  toastMensagem.value = msg
  toastVisivel.value = true
  setTimeout(() => (toastVisivel.value = false), 3000)
}

/* ── CARRINHO ── */

import axios from 'axios'

// ...

const adicionarCarrinho = async () => {
  if (!produtoSelecionado.value) return
  const token = localStorage.getItem('token')
  if (!token) { router.push('/login'); return }
  const p = produtoSelecionado.value
  try {
    await axios.post(
      `${API_URL}/api/cart`,
      { productId: p.mongoId, name: p.nome, price: p.preco, image: p.imagem, quantity: quantidade.value },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    showToast(`"${p.nome}" adicionado ao carrinho 🛒`)
    fecharModal()
  } catch (error) {
    console.error('Erro ao adicionar ao carrinho:', error)
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
      { productId: p.mongoId, name: p.nome, price: p.preco, image: p.imagem, quantity: quantidade.value },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    localStorage.setItem('checkoutProduto', JSON.stringify(p))
    fecharModal()
    router.push({ name: 'Checkout' })
  } catch (error) {
    console.error('Erro ao comprar produto:', error)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

.pagina-casamento {
  --gold:        #c9a84c;
  --gold-light:  #e2c97e;
  --gold-dark:   #a07830;
  --rose:        #c4807a;
  --rose-light:  #dba8a3;
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
.particle:nth-child(1)  { left: 5%;  animation-delay: 0s;   animation-duration: 9s;  }
.particle:nth-child(2)  { left: 12%; animation-delay: 1.5s; animation-duration: 7s;  }
.particle:nth-child(3)  { left: 22%; animation-delay: 3s;   animation-duration: 11s; }
.particle:nth-child(4)  { left: 35%; animation-delay: 0.8s; animation-duration: 8s;  }
.particle:nth-child(5)  { left: 50%; animation-delay: 2.2s; animation-duration: 9s;  }
.particle:nth-child(6)  { left: 63%; animation-delay: 4s;   animation-duration: 7s;  }
.particle:nth-child(7)  { left: 72%; animation-delay: 1s;   animation-duration: 12s; }
.particle:nth-child(8)  { left: 80%; animation-delay: 3.5s; animation-duration: 8s;  }
.particle:nth-child(9)  { left: 88%; animation-delay: 0.5s; animation-duration: 10s; }
.particle:nth-child(10) { left: 95%; animation-delay: 2s;   animation-duration: 7s;  }
.particle:nth-child(11) { left: 42%; animation-delay: 5s;   animation-duration: 9s;  }
.particle:nth-child(12) { left: 58%; animation-delay: 3.8s; animation-duration: 11s; }
.particle:nth-child(13) { left: 28%; animation-delay: 6s;   animation-duration: 10s; }
.particle:nth-child(14) { left: 75%; animation-delay: 4.5s; animation-duration: 8s;  }

@keyframes particleFloat {
  0%   { bottom: -10px; opacity: 0; transform: translateX(0); }
  10%  { opacity: 0.6; }
  90%  { opacity: 0.3; }
  100% { bottom: 100vh; opacity: 0; transform: translateX(30px); }
}

/* ── HEADER ── */
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

/* ── FILTROS STICKY ── */
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
  gap: 16px;
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
  width: 220px;
  font-family: var(--font-body);
  font-size: .8rem;
  color: var(--dark);
  transition: all .3s ease;
}
.search-box input:focus { outline: none; border-color: var(--gold); box-shadow: 0 0 0 3px rgba(201,168,76,.1); }
.search-box input::placeholder { color: #bbb; font-weight: 300; }

.filtro-categoria { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }

.btn-filtro {
  padding: 10px 16px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: white;
  font-family: var(--font-body);
  font-size: .72rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--text-muted);
  cursor: pointer;
  transition: all .3s ease;
  display: flex;
  align-items: center;
  gap: 7px;
}
.btn-filtro:hover  { border-color: var(--gold); color: var(--dark); }
.btn-filtro.active { background: var(--dark); border-color: var(--dark); color: white; }

.dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
.dourado-dot { background: linear-gradient(135deg, var(--gold-light), var(--gold-dark)); }
.rose-dot    { background: linear-gradient(135deg, var(--rose-light), var(--rose)); }
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

/* ── CONTAINER ── */
.container { max-width: 1200px; margin: 0 auto; padding: 60px 24px 100px; position: relative; z-index: 1; }

.section-header { display: flex; align-items: center; gap: 24px; margin: 70px 0 40px; }
.section-header:first-child { margin-top: 0; }
.section-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, var(--border), transparent); }
.section-title { font-family: var(--font-display); font-size: 1.6rem; font-weight: 400; letter-spacing: 2px; color: var(--dark); white-space: nowrap; margin: 0; }
.section-gem  { font-size: .8rem; margin-right: 4px; }
.dourado-gem  { color: var(--gold); }
.rose-gem     { color: var(--rose); }
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
.rose-badge    { background: rgba(196,128,122,.12); color: #9a4a44; border: 1px solid rgba(196,128,122,.3); }
.prata-badge   { background: rgba(138,157,181,.12); color: #5a7090; border: 1px solid rgba(138,157,181,.3); }

.image-wrapper {
  background: #fff;
  padding: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  height: 280px;
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
.rose-text    { color: var(--rose); }
.prata-text   { color: var(--silver); }
.price { font-family: var(--font-display); font-size: 1.5rem; font-weight: 500; }

/* ── EMPTY ── */
.empty-state { text-align: center; padding: 80px 20px; color: var(--text-muted); }
.empty-gem { font-size: 3rem; color: var(--border); margin-bottom: 16px; }
.empty-state button { margin-top: 20px; padding: 12px 28px; background: var(--dark); color: white; border: none; font-family: var(--font-body); font-size: .75rem; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; border-radius: 2px; }

/* ── MODAL ── */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(10,9,7,.85);
  display: flex; align-items: center; justify-content: center;
  z-index: 2000; padding: 20px;
  backdrop-filter: blur(8px);
}

.modal-content {
  background: var(--cream);
  width: 100%; max-width: 960px;
  border-radius: 2px;
  position: relative;
  border: 1px solid var(--border);
  max-height: 92vh;
  overflow-y: auto;
}

.modal-body { display: grid; grid-template-columns: 1fr 1fr; }

.modal-image-side {
  position: relative; background: white;
  display: flex; flex-direction: column; align-items: center;
}

.modal-badge {
  align-self: flex-start;
  margin: 20px 20px 0;
  font-family: var(--font-body);
  font-size: .6rem; font-weight: 600;
  letter-spacing: 2px; text-transform: uppercase;
  padding: 5px 12px; border-radius: 2px;
}

.modal-image-container {
  position: relative;
  width: 100%; min-height: 380px;
  display: flex; align-items: center; justify-content: center;
  padding: 30px; overflow: hidden;
  cursor: crosshair; background: #fff;
}
.modal-image-container img {
  width: 100%; max-width: 340px; max-height: 340px;
  object-fit: contain;
  transition: transform .08s ease-out;
  transform: scale(1);
  transform-origin: center center;
  will-change: transform;
  pointer-events: none; user-select: none;
}
.zoom-hint {
  position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%);
  display: flex; align-items: center; gap: 6px;
  font-size: .62rem; letter-spacing: 1px; color: #bbb;
  text-transform: uppercase; pointer-events: none; transition: opacity .3s;
}
.modal-image-container:hover .zoom-hint { opacity: 0; }

.modal-footer-info {
  display: flex; align-items: center; gap: 10px;
  padding: 16px 20px;
  color: var(--text-muted); font-size: .68rem;
  font-weight: 400; letter-spacing: 1px; text-transform: uppercase;
}
.sep { color: var(--border); }

.modal-details {
  padding: 44px 44px;
  display: flex; flex-direction: column;
  border-left: 1px solid var(--border);
  overflow-y: auto;
}

.modal-eyebrow { font-size: .62rem; font-weight: 500; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); margin: 0 0 12px; }

.modal-title { font-family: var(--font-display); font-size: 2.2rem; font-weight: 300; letter-spacing: 1px; color: var(--dark); margin: 0 0 16px; line-height: 1.1; }

.modal-divider { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.modal-divider::before, .modal-divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }
.modal-gem { color: var(--gold); font-size: .55rem; }

.stars-row { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
.stars { color: var(--gold); font-size: 13px; letter-spacing: 2px; }
.avaliacoes { color: var(--text-muted); font-size: .78rem; }

.modal-description { font-size: .85rem; font-weight: 300; color: var(--text-muted); line-height: 1.75; margin: 0 0 20px; }

.modal-specs { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; padding: 16px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.spec { display: flex; justify-content: space-between; align-items: center; }
.spec-label { font-size: .7rem; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; color: #aaa; }
.spec-value { font-size: .78rem; color: var(--dark); }

/* CAMPOS */
.campo { margin-bottom: 16px; }
.campo-label { display: block; font-size: .65rem; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 10px; }

.sizes, .materials { display: flex; flex-wrap: wrap; gap: 8px; }
.sizes button, .materials button {
  padding: 7px 14px;
  border: 1px solid rgba(15,14,12,.12);
  border-radius: 2px;
  background: #fff;
  color: var(--dark);
  font-family: var(--font-body);
  font-size: .75rem; font-weight: 500;
  cursor: pointer; transition: all .25s;
}
.sizes button:hover, .materials button:hover { border-color: var(--gold); color: var(--gold); }
.sizes button.ativo, .materials button.ativo { background: var(--dark); border-color: var(--dark); color: #fff; }

.quantidade {
  display: inline-flex; align-items: center;
  border: 1px solid rgba(15,14,12,.12);
  border-radius: 2px; overflow: hidden;
}
.quantidade button {
  width: 40px; height: 40px;
  border: none; background: transparent;
  color: var(--dark); font-size: 18px;
  cursor: pointer; transition: background .2s;
  font-family: var(--font-body);
}
.quantidade button:hover { background: rgba(15,14,12,.05); }
.quantidade span {
  min-width: 38px; text-align: center;
  font-size: 15px; font-weight: 500; color: var(--dark);
  border-left: 1px solid rgba(15,14,12,.08);
  border-right: 1px solid rgba(15,14,12,.08);
  padding: 0 4px; line-height: 38px;
}

.modal-price { font-family: var(--font-display); font-size: 2rem; font-weight: 600; color: var(--dark); margin: 16px 0 4px; }
.modal-installments { font-size: .72rem; color: var(--text-muted); margin: 0 0 20px; font-weight: 300; }

.modal-actions { display: flex; gap: 12px; margin-bottom: 16px; }
.btn-carrinho, .btn-comprar {
  flex: 1; padding: 14px 16px; border-radius: 2px;
  font-family: var(--font-body); font-size: .72rem;
  font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;
  cursor: pointer; transition: all .3s ease;
}
.btn-carrinho {
  background: white; color: var(--dark); border: 1.5px solid var(--dark);
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.btn-carrinho:hover { background: var(--dark); color: white; }
.btn-comprar { background: var(--gold); color: var(--dark); border: 1.5px solid var(--gold); }
.btn-comprar:hover { background: var(--gold-dark); border-color: var(--gold-dark); color: white; }

.modal-seguro { font-size: .65rem; color: #bbb; text-align: center; margin: 0; }

.close-x {
  position: absolute; top: 16px; right: 16px;
  width: 36px; height: 36px;
  background: rgba(255,255,255,.9); border: 1px solid var(--border);
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  cursor: pointer; z-index: 10; color: var(--text-muted); transition: all .3s ease;
}
.close-x:hover { background: var(--dark); color: white; border-color: var(--dark); }

/* ── TOAST ── */
.toast {
  position: fixed; bottom: 30px; right: 30px; z-index: 9999;
  background: var(--dark); color: white; padding: 14px 22px; border-radius: 4px;
  font-family: var(--font-body); font-size: .78rem;
  display: flex; align-items: center; gap: 10px;
  box-shadow: 0 8px 30px rgba(0,0,0,.3); border-left: 3px solid var(--gold);
}

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
  .filtros-inner { gap: 10px; }
  .search-box input { width: 100%; }
  .select-wrapper { margin-left: 0; }
  .filtro-categoria { gap: 6px; }
}

@media (max-width: 540px) {
  .grid { grid-template-columns: 1fr; }
  .btn-filtro { font-size: .65rem; padding: 8px 12px; }
}
</style>