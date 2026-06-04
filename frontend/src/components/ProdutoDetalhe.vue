<template>
  <div class="produto-detalhe">

    <!-- Loading -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Carregando produto...</p>
    </div>

    <!-- Erro -->
    <div v-else-if="erro" class="erro-box">
      <p>{{ erro }}</p>
      <router-link to="/" class="btn-voltar">← Voltar ao início</router-link>
    </div>

    <!-- Produto -->
    <template v-else-if="produto">
      <div class="breadcrumb">
        <router-link to="/">Início</router-link>
        <span>/</span>
        <router-link :to="categoriaRota">{{ produto.category?.name }}</router-link>
        <span>/</span>
        <span>{{ produto.name }}</span>
      </div>

      <div class="produto-grid">
        <!-- Imagem -->
        <div class="produto-img-col">
          <div class="img-principal">
            <img :src="imagemUrl(produto.image)" :alt="produto.name" />
            <span v-if="produto.stock <= 3 && produto.stock > 0" class="badge-stock">
              Últimas {{ produto.stock }} unidades!
            </span>
            <span v-if="produto.stock === 0" class="badge-esgotado">Esgotado</span>
          </div>
        </div>

        <!-- Detalhes -->
        <div class="produto-info-col">
          <span class="categoria-tag">{{ produto.category?.name?.toUpperCase() }}</span>
          <h1 class="nome">{{ produto.name }}</h1>

          <div class="preco-bloco">
            <p class="preco-pix">
              R$ {{ (produto.price * 0.9).toFixed(2) }}
              <span class="pix-badge">-10% no PIX</span>
            </p>
            <p class="preco-cartao">
              R$ {{ produto.price.toFixed(2) }}
              <span class="parcela">ou 10x de R$ {{ (produto.price / 10).toFixed(2) }} sem juros</span>
            </p>
          </div>

          <!-- Quantidade -->
          <div class="qty-row" v-if="produto.stock > 0">
            <span class="label">Quantidade</span>
            <div class="qty-control">
              <button @click="qtd > 1 && qtd--">−</button>
              <span>{{ qtd }}</span>
              <button @click="qtd < produto.stock && qtd++">+</button>
            </div>
            <span class="stock-info">{{ produto.stock }} disponíveis</span>
          </div>

          <!-- Ações -->
          <div class="acoes">
            <button
              class="btn-carrinho"
              :disabled="produto.stock === 0 || adicionando"
              @click="adicionarCarrinho"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              {{ adicionando ? 'Adicionando...' : 'Adicionar ao Carrinho' }}
            </button>

            <button
              class="btn-comprar"
              :disabled="produto.stock === 0"
              @click="comprarAgora"
            >
              {{ produto.stock === 0 ? 'Produto Esgotado' : 'Comprar Agora' }}
            </button>
          </div>

          <!-- Sucesso -->
          <Transition name="fade">
            <div v-if="sucessoMsg" class="sucesso-msg">
              ✓ {{ sucessoMsg }}
            </div>
          </Transition>

          <!-- Info adicional -->
          <div class="info-extra">
            <div class="info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              <span>Frete grátis acima de R$ 299</span>
            </div>
            <div class="info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/></svg>
              <span>Troca em até 30 dias</span>
            </div>
            <div class="info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>Garantia de 12 meses</span>
            </div>
            <div class="info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              <span>Até 10x sem juros</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Produtos relacionados -->
      <section v-if="relacionados.length" class="relacionados">
        <h2>Você também pode gostar</h2>
        <div class="relacionados-grid">
          <div
            v-for="rel in relacionados"
            :key="rel._id"
            class="rel-card"
            @click="$router.push(`/produto/${rel._id}`)"
          >
            <div class="rel-img">
              <img :src="imagemUrl(rel.image)" :alt="rel.name" />
            </div>
            <p class="rel-nome">{{ rel.name }}</p>
            <p class="rel-preco">R$ {{ rel.price.toFixed(2) }}</p>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { getProdutoPorId, getProdutos, adicionarAoCarrinho, imagemUrl } from "@/services/api"

const route = useRoute()
const router = useRouter()

const produto = ref(null)
const relacionados = ref([])
const loading = ref(true)
const erro = ref(null)
const qtd = ref(1)
const adicionando = ref(false)
const sucessoMsg = ref("")

const categoriaRota = computed(() => {
  const nome = produto.value?.category?.name?.toLowerCase()
  const mapa = {
    "relógios": "/relogios",
    "joias": "/joias",
    "perfumes": "/perfumes",
    "casamento": "/casamento",
    "pingentes": "/pingentes",
    "sale": "/sale",
  }
  return mapa[nome] || "/"
})

async function carregarProduto(id) {
  loading.value = true
  erro.value = null
  qtd.value = 1
  try {
    produto.value = await getProdutoPorId(id)
    // Busca relacionados da mesma categoria
    const todos = await getProdutos({ category: produto.value.category?._id })
    relacionados.value = todos.filter(p => p._id !== id).slice(0, 4)
  } catch (e) {
    erro.value = "Produto não encontrado."
  } finally {
    loading.value = false
  }
}

onMounted(() => carregarProduto(route.params.id))
watch(() => route.params.id, (id) => { if (id) carregarProduto(id) })

async function adicionarCarrinho() {
  const token = localStorage.getItem("token")
  if (!token) {
    router.push("/login")
    return
  }
  adicionando.value = true
  try {
    await adicionarAoCarrinho(produto.value._id, qtd.value)
    sucessoMsg.value = "Produto adicionado ao carrinho!"
    setTimeout(() => { sucessoMsg.value = "" }, 3000)
  } catch (e) {
    alert("Erro ao adicionar ao carrinho. Faça login para continuar.")
    router.push("/login")
  } finally {
    adicionando.value = false
  }
}

async function comprarAgora() {
  await adicionarCarrinho()
  if (!erro.value) router.push("/carrinho")
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

.produto-detalhe {
  font-family: 'DM Sans', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px 80px;
  min-height: 80vh;
}

/* ── Loading ── */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  min-height: 50vh;
  color: #999;
}
.spinner {
  width: 40px; height: 40px;
  border: 3px solid #eee;
  border-top-color: #d4af37;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Erro ── */
.erro-box {
  text-align: center;
  padding: 80px 20px;
  color: #777;
}
.btn-voltar {
  display: inline-block;
  margin-top: 16px;
  color: #d4af37;
  text-decoration: none;
  font-size: 14px;
}

/* ── Breadcrumb ── */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #999;
  margin-bottom: 32px;
}
.breadcrumb a { color: #999; text-decoration: none; }
.breadcrumb a:hover { color: #d4af37; }
.breadcrumb span:last-child { color: #333; }

/* ── Layout principal ── */
.produto-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}

/* ── Imagem ── */
.img-principal {
  position: relative;
  background: #f8f8f8;
  border-radius: 2px;
  overflow: hidden;
  aspect-ratio: 1;
}
.img-principal img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.badge-stock {
  position: absolute;
  top: 16px; left: 16px;
  background: #e74c3c;
  color: #fff;
  font-size: 11px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 2px;
  letter-spacing: 0.5px;
}
.badge-esgotado {
  position: absolute;
  top: 16px; left: 16px;
  background: #888;
  color: #fff;
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 2px;
}

/* ── Info ── */
.produto-info-col { display: flex; flex-direction: column; gap: 20px; }

.categoria-tag {
  font-size: 11px;
  letter-spacing: 4px;
  color: #d4af37;
  font-weight: 500;
}
.nome {
  font-family: 'Cormorant Garamond', serif;
  font-size: 36px;
  font-weight: 500;
  color: #0a192f;
  line-height: 1.2;
  margin: 0;
}

/* ── Preço ── */
.preco-bloco { display: flex; flex-direction: column; gap: 4px; }
.preco-pix {
  display: flex; align-items: center; gap: 10px;
  font-size: 26px; font-weight: 600; color: #0a192f;
}
.pix-badge {
  background: #e8f5e9; color: #388e3c;
  font-size: 11px; padding: 2px 8px; border-radius: 20px; font-weight: 500;
}
.preco-cartao { font-size: 14px; color: #888; }
.parcela { margin-left: 6px; font-size: 13px; }

/* ── Quantidade ── */
.qty-row {
  display: flex; align-items: center; gap: 16px;
  flex-wrap: wrap;
}
.label { font-size: 13px; color: #666; }
.qty-control {
  display: flex; align-items: center; gap: 0;
  border: 1px solid #ddd; border-radius: 2px;
  overflow: hidden;
}
.qty-control button {
  background: none; border: none;
  width: 36px; height: 36px;
  cursor: pointer; font-size: 18px; color: #333;
  transition: background 0.2s;
}
.qty-control button:hover { background: #f5f5f5; }
.qty-control span {
  width: 44px; text-align: center;
  font-size: 15px; font-weight: 500; color: #333;
  border-left: 1px solid #ddd; border-right: 1px solid #ddd;
  line-height: 36px;
}
.stock-info { font-size: 12px; color: #aaa; }

/* ── Botões ── */
.acoes { display: flex; flex-direction: column; gap: 12px; }
.btn-carrinho, .btn-comprar {
  width: 100%;
  padding: 14px 20px;
  border: none; border-radius: 2px;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px; font-weight: 500;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: all 0.25s;
  display: flex; align-items: center; justify-content: center; gap: 10px;
}
.btn-carrinho {
  background: #fff; color: #0a192f;
  border: 1.5px solid #0a192f;
}
.btn-carrinho:hover:not(:disabled) { background: #0a192f; color: #fff; }
.btn-comprar {
  background: #d4af37; color: #fff;
}
.btn-comprar:hover:not(:disabled) { background: #b8962e; }
.btn-carrinho:disabled, .btn-comprar:disabled {
  opacity: 0.4; cursor: not-allowed;
}

/* ── Sucesso ── */
.sucesso-msg {
  background: #e8f5e9; color: #2e7d32;
  padding: 10px 16px; border-radius: 4px;
  font-size: 13px; font-weight: 500;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ── Info Extra ── */
.info-extra {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #eee;
}
.info-item {
  display: flex; align-items: center; gap: 8px;
  font-size: 12px; color: #666;
}
.info-item svg { color: #d4af37; flex-shrink: 0; }

/* ── Relacionados ── */
.relacionados { margin-top: 80px; }
.relacionados h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 28px; font-weight: 500;
  color: #0a192f; margin-bottom: 28px;
}
.relacionados-grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.rel-card {
  cursor: pointer;
  transition: transform 0.2s;
}
.rel-card:hover { transform: translateY(-4px); }
.rel-img {
  aspect-ratio: 1; background: #f8f8f8;
  border-radius: 2px; overflow: hidden; margin-bottom: 10px;
}
.rel-img img { width: 100%; height: 100%; object-fit: cover; }
.rel-nome { font-size: 14px; color: #333; margin: 0 0 4px; }
.rel-preco { font-size: 14px; font-weight: 600; color: #0a192f; margin: 0; }

/* ── Responsivo ── */
@media (max-width: 768px) {
  .produto-grid { grid-template-columns: 1fr; gap: 32px; }
  .relacionados-grid { grid-template-columns: repeat(2, 1fr); }
  .nome { font-size: 28px; }
  .info-extra { grid-template-columns: 1fr; }
}
</style>