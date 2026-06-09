<template>
  <div class="cart-page">
    <div class="container">

      <!-- LOADING -->
      <div v-if="loading" class="empty-state">
        <Loader2 :size="40" class="spin" />
        <p style="margin-top:20px; color:var(--muted)">Carregando sua sacola...</p>
      </div>

      <!-- CARRINHO VAZIO -->
      <div v-else-if="cart.items.length === 0" class="empty-state">
        <ShoppingBag :size="52" stroke-width="1.5" />
        <h1>Sua sacola está vazia</h1>
        <p>Descubra peças exclusivas cuidadosamente selecionadas para eternizar momentos especiais.</p>
        <router-link to="/" class="btn-primary">Explorar Coleções</router-link>
      </div>

      <!-- CARRINHO COM ITENS -->
      <div v-else>

        <!-- FRETE -->
        <div class="shipping-bar">
          <div class="shipping-top">
            <Truck :size="15" />
            <span v-if="amountToFreeShipping > 0">
              Faltam <strong>R$ {{ amountToFreeShipping.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</strong> para frete grátis
            </span>
            <span v-else class="free-success">Frete grátis desbloqueado ✓</span>
          </div>
          <div class="shipping-progress">
            <div class="shipping-fill" :style="{ width: Math.min((getTotal() / 1500) * 100, 100) + '%' }"></div>
          </div>
        </div>

        <!-- GRID -->
        <div class="cart-grid">

          <!-- PRODUTOS -->
          <section>
            <div class="cart-header">
              <h2>Minha Sacola</h2>
              <span>{{ cart.items.length }} {{ cart.items.length === 1 ? 'item' : 'itens' }}</span>
            </div>

            <TransitionGroup name="fade-list">
              <div v-for="item in cart.items" :key="item._id" class="product-card">

                <div class="product-image">
                  <img :src="getImageUrl(item.image)" :alt="item.name" @error="onImgError" />
                </div>

                <div class="product-content">
                  <div class="product-top">
                    <div>
                      <h3>{{ item.name }}</h3>
                      <small>Ref: {{ item._id ? String(item._id).substring(0, 6).toUpperCase() : 'SEM-ID' }}</small>
                    </div>
                    <button class="remove-btn" @click="handleRemoveItem(item._id)" title="Remover item">
                      <X :size="18" />
                    </button>
                  </div>

                  <div class="product-bottom">
                    <div class="qty-box">
                      <button @click="handleQuantity(item, -1)" :disabled="item.quantity <= 1">−</button>
                      <span>{{ item.quantity }}</span>
                      <button @click="handleQuantity(item, 1)">+</button>
                    </div>
                    <strong>R$ {{ (item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</strong>
                  </div>

                
                </div>

              </div>
            </TransitionGroup>

            <div class="clear-wrapper">
             <button
  class="clear-btn"
  @click="showClearModal = true"
  :disabled="clearLoading"
>
                <Loader2 v-if="clearLoading" :size="14" class="spin" />
                <Trash2 v-else :size="14" />
                {{ clearLoading ? 'Limpando...' : 'Limpar Sacola' }}
              </button>
            </div>
          </section>

          <!-- RESUMO -->
          <aside class="summary">
            <div class="summary-box">
              <h2>Resumo</h2>

              <!-- CEP -->
              <div class="field">
                <label>Calcular Frete</label>
                <div class="input-row">
                  <input type="text" v-model="zipCode" placeholder="00000-000" maxlength="9" @input="maskCep" />
                  <button @click="handleShipping" :disabled="shippingLoading">
                    <Loader2 v-if="shippingLoading" class="spin" :size="15" />
                    <span v-else>OK</span>
                  </button>
                </div>
              </div>

              <!-- CUPOM -->
              <div class="field">
                <label>Cupom</label>
                <div class="input-row">
                  <input type="text" v-model="couponInput" placeholder="Código" :disabled="discount > 0" />
                  <button @click="applyCoupon" :disabled="discount > 0">
                    {{ discount > 0 ? 'Aplicado ✓' : 'Aplicar' }}
                  </button>
                </div>
              </div>

              <!-- TOTAIS -->
              <div class="totals">
                <div class="line">
                  <span>Subtotal</span>
                  <strong>R$ {{ getTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</strong>
                </div>
                <div class="line">
                  <span>Frete</span>
                  <strong>{{ shippingValue === 0 ? 'Grátis' : `R$ ${shippingValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` }}</strong>
                </div>
                <div class="line discount" v-if="discount > 0">
                  <span>Desconto</span>
                  <strong>− R$ {{ discount.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</strong>
                </div>
                <div class="final-total">
                  <span>Total</span>
                  <strong>R$ {{ finalTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</strong>
                </div>
              </div>

              <!-- ERRO -->
              <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>

              <!-- FINALIZAR -->
              <button class="checkout-btn" @click="handleFinalize" :disabled="checkoutLoading">
                <Loader2 v-if="checkoutLoading" class="spin" :size="18" />
                <span v-else>Finalizar Compra</span>
              </button>

              <p class="modal-seguro">🔒 Compra segura · Troca grátis em 30 dias</p>
            </div>
          </aside>

        </div>
      </div>
    </div>
  </div>
  <!-- MODAL LIMPAR SACOLA -->
<Transition name="modal-fade">
  <div
    v-if="showClearModal"
    class="modal-overlay"
    @click.self="showClearModal = false"
  >
    <div class="modal-card">
<div class="modal-icon">
  <AlertTriangle :size="36" />
</div>
      <h2>Limpar Sacola?</h2>

      <p>
        Todos os produtos serão removidos da sua sacola.
        Esta ação não poderá ser desfeita.
      </p>

      <div class="modal-actions">
        <button
          class="btn-cancel"
          @click="showClearModal = false"
        >
          Cancelar
        </button>

        <button
          class="btn-confirm"
          @click="handleClearCart"
        >
          Sim, remover tudo
        </button>
      </div>

    </div>
  </div>
</Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { cart, getTotal } from '@/stores/cart'

const router = useRouter()
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// ── STATES ──
const loading = ref(false)
const clearLoading = ref(false)
const zipCode = ref('')
const shippingValue = ref(0)
const shippingLoading = ref(false)
const couponInput = ref('')
const discount = ref(0)
const checkoutLoading = ref(false)
const errorMsg = ref('')
const showClearModal = ref(false)

// ── CUPONS ──
const CUPONS: Record<string, number> = {
  WELCOME15: 0.15,
  IVY10: 0.10,
}

// ── AUTH ──
const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/login')
    return null
  }
  return { Authorization: `Bearer ${token}` }
}

// ── IMAGEM ──
const getImageUrl = (image?: string | null): string => {
  if (!image || image === 'undefined' || image === 'null') return ''
  if (image.startsWith('http')) return image
  const clean = image.startsWith('/') ? image : `/public/products/${image}`
  return `${apiUrl}${clean}`
}

const onImgError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.style.display = 'none'
}

const maskCep = () => {
  let v = zipCode.value.replace(/\D/g, '').slice(0, 8)
  if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5)
  zipCode.value = v
}

// ── COMPUTED ──
const amountToFreeShipping = computed(() => Math.max(0, 1500 - getTotal()))
const finalTotal = computed(() =>
  Math.max(0, getTotal() + shippingValue.value - discount.value)
)

// ── NORMALIZA ITEM (CORRIGIDO) ──
const normalizeItem = (raw: any) => {
  const p =
    raw?.product && typeof raw.product === 'object'
      ? raw.product
      : raw?.productId && typeof raw.productId === 'object'
        ? raw.productId
        : raw

  const _id = String(p?._id ?? raw?._id ?? raw?.productId ?? '')

  return {
    _id,
    productId: _id, // 🔥 ESSENCIAL para evitar erro TS
    name: String(p?.name ?? raw?.name ?? 'Produto'),
    price: Number(p?.price ?? raw?.price ?? 0),
    image: String(p?.image ?? raw?.image ?? ''),
    quantity: Number(raw?.quantity ?? 1),
  }
}

// ── LOAD CART ──
const loadCart = async () => {
  const headers = getAuthHeader()
  if (!headers) return

  loading.value = true
  errorMsg.value = ''

  try {
    const { data } = await axios.get(`${apiUrl}/api/cart`, { headers })

    const rawItems: any[] =
      Array.isArray(data) ? data :
      Array.isArray(data?.items) ? data.items :
      Array.isArray(data?.data?.items) ? data.data.items :
      Array.isArray(data?.cart?.items) ? data.cart.items :
      []

    cart.items = rawItems
      .filter(Boolean)
      .map(normalizeItem)
      .filter(i => i._id)

  } catch (err: any) {
    const status = err.response?.status

    if (status === 401) {
      localStorage.removeItem('token')
      router.push('/login')
    } else {
      errorMsg.value = 'Erro ao carregar carrinho'
    }
  } finally {
    loading.value = false
  }
}

onMounted(loadCart)

// ── REMOVER ITEM ──
const handleRemoveItem = async (id: string) => {
  const headers = getAuthHeader()
  if (!headers) return

  cart.items = cart.items.filter(i => i._id !== id)

  try {
    await axios.delete(`${apiUrl}/api/cart/item/${id}`, { headers })
  } catch {
    errorMsg.value = 'Erro ao remover item'
  }
}

// ── ALTERAR QUANTIDADE ──
const handleQuantity = async (item: any, change: number) => {
  const headers = getAuthHeader()
  if (!headers) return

  const newQty = item.quantity + change
  if (newQty < 1) return

  const oldQty = item.quantity
  item.quantity = newQty

  try {
    await axios.put(
      `${apiUrl}/api/cart/update`,
      { productId: item.productId, quantity: newQty },
      { headers }
    )
  } catch {
    item.quantity = oldQty
  }
}

// ── LIMPAR CARRINHO ──
const handleClearCart = async () => {
  const headers = getAuthHeader()
  if (!headers) return

  const snapshot = [...cart.items]
  cart.items = []
  clearLoading.value = true

  try {
    await axios.delete(`${apiUrl}/api/cart/clear`, { headers })
  } catch {
    cart.items = snapshot
  } finally {
    clearLoading.value = false
  }
}

// ✔ FUNÇÃO QUE ESTAVA FALTANDO
const confirmClearCart = async () => {
  showClearModal.value = false
  await handleClearCart()
}

// ── FRETE ──
const handleShipping = async () => {
  const clean = zipCode.value.replace(/\D/g, '')
  if (clean.length < 8) {
    errorMsg.value = 'CEP inválido'
    return
  }

  shippingLoading.value = true

  try {
    const { data } = await axios.get(`https://viacep.com.br/ws/${clean}/json/`)

    if (data.erro) {
      errorMsg.value = 'CEP não encontrado'
      return
    }

    const total = getTotal()

    if (total >= 1500) {
      shippingValue.value = 0
      return
    }

    shippingValue.value = 20
  } catch {
    errorMsg.value = 'Erro ao calcular frete'
  } finally {
    shippingLoading.value = false
  }
}

// ── CUPOM ──
const applyCoupon = () => {
  const code = couponInput.value.trim().toUpperCase()

  if (!CUPONS[code]) {
    errorMsg.value = 'Cupom inválido'
    return
  }

  discount.value = getTotal() * CUPONS[code]
  errorMsg.value = ''
}

// ── FINALIZAR ──
const handleFinalize = async () => {
  if (!cart.items.length) {
    errorMsg.value = 'Carrinho vazio'
    return
  }

  router.push('/Checkout')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Jost:wght@300;400;500;600&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

.cart-page {
  min-height: 100vh;
  background: #fff;
  padding: 70px 0;
  font-family: 'Jost', sans-serif;
  --dark: #0a1220;
  --muted: #8a8a98;
}

.container { max-width: 1180px; margin: auto; padding: 0 24px; }

.empty-state {
  min-height: 70vh;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; text-align: center;
}
.empty-state h1 { font-size: 52px; margin: 24px 0 14px; font-family: 'Cormorant Garamond', serif; }
.empty-state p  { max-width: 500px; color: var(--muted); line-height: 1.8; }

.btn-primary {
  margin-top: 34px; background: var(--dark); color: #fff;
  padding: 18px 42px; text-decoration: none;
  text-transform: uppercase; letter-spacing: 3px; font-size: 11px;
}

.shipping-bar  { margin-bottom: 44px; }
.shipping-top  { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; color: var(--muted); font-size: 13px; }
.shipping-progress { height: 2px; background: #eee; }
.shipping-fill { height: 100%; background: var(--dark); transition: width .4s; }
.free-success  { color: #2d8653; }

.cart-grid { display: grid; grid-template-columns: 1fr 380px; gap: 70px; }

.cart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 34px; padding-bottom: 16px; border-bottom: 1px solid #f1f1f1; }
.cart-header h2   { font-size: 34px; font-family: 'Cormorant Garamond', serif; }
.cart-header span { color: var(--muted); font-size: 13px; }

.product-card { display: flex; gap: 24px; margin-bottom: 28px; padding-bottom: 28px; border-bottom: 1px solid #f5f5f5; }

.product-image {
  overflow: hidden; flex-shrink: 0;
  background: #f5f5f5;
  width: 120px; height: 150px;
  display: flex; align-items: center; justify-content: center;
}
.product-image img { width: 120px; height: 150px; object-fit: cover; display: block; transition: transform .4s; }
.product-image:hover img { transform: scale(1.08); }

.product-content { flex: 1; display: flex; flex-direction: column; gap: 12px; min-width: 0; }
.product-top    { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
.product-top h3 { font-size: 17px; font-weight: 500; line-height: 1.3; }
.product-top small { color: #aaa; font-size: 11px; display: block; margin-top: 4px; }

.remove-btn { border: none; background: none; cursor: pointer; color: #bbb; flex-shrink: 0; padding: 2px; transition: color .2s; }
.remove-btn:hover { color: #c0392b; }

.product-bottom { display: flex; justify-content: space-between; align-items: center; }

.qty-box { display: flex; border: 1px solid #eee; }
.qty-box button { width: 36px; height: 36px; border: none; background: none; cursor: pointer; font-size: 18px; line-height: 1; }
.qty-box button:disabled { opacity: .3; cursor: not-allowed; }
.qty-box span { width: 36px; display: flex; align-items: center; justify-content: center; font-size: 14px; }

.buy-now-btn {
  width: 100%; padding: 10px 0;
  border: 1.5px solid var(--dark); background: transparent;
  color: var(--dark); font-family: 'Jost', sans-serif;
  font-size: 11px; letter-spacing: 2.5px; text-transform: uppercase;
  cursor: pointer; transition: background .25s, color .25s;
}
.buy-now-btn:hover:not(:disabled) { background: var(--dark); color: #fff; }
.buy-now-btn:disabled { opacity: .4; cursor: not-allowed; }

.clear-wrapper { display: flex; justify-content: flex-end; margin-top: 4px; }
.clear-btn {
  border: none; background: none; display: flex; align-items: center; gap: 6px;
  cursor: pointer; color: #aaa; font-family: 'Jost', sans-serif; font-size: 13px;
  padding: 6px 0; transition: color .2s;
}
.clear-btn:hover:not(:disabled) { color: #c0392b; }
.clear-btn:disabled { opacity: .5; cursor: not-allowed; }

.summary-box { background: #faf8f4; padding: 36px; position: sticky; top: 30px; }
.summary-box h2 { font-size: 30px; margin-bottom: 28px; font-family: 'Cormorant Garamond', serif; }

.field { margin-bottom: 24px; }
.field label { display: block; margin-bottom: 10px; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); }

.input-row { display: flex; border-bottom: 1px solid #ddd; }
.input-row input { flex: 1; border: none; background: none; padding: 12px 0; outline: none; font-family: 'Jost', sans-serif; font-size: 14px; }
.input-row button { border: none; background: none; cursor: pointer; padding-left: 10px; font-family: 'Jost', sans-serif; }
.input-row button:disabled { opacity: .4; cursor: not-allowed; }

.totals { margin-top: 30px; border-top: 1px solid #eee; padding-top: 24px; }
.line   { display: flex; justify-content: space-between; margin-bottom: 16px; font-size: 14px; }
.discount strong { color: #2d8653; }

.final-total { display: flex; justify-content: space-between; align-items: center; margin-top: 26px; padding-top: 24px; border-top: 1px solid #eee; }
.final-total strong { font-size: 30px; font-family: 'Cormorant Garamond', serif; }

.error-msg { color: #c0392b; font-size: 12px; margin-top: 12px; text-align: center; }

.checkout-btn {
  width: 100%; height: 58px; border: none;
  background: var(--dark); color: #fff; margin-top: 30px; cursor: pointer;
  text-transform: uppercase; letter-spacing: 3px; font-family: 'Jost', sans-serif;
  display: flex; align-items: center; justify-content: center; transition: opacity .3s;
}
.checkout-btn:disabled { opacity: .5; cursor: not-allowed; }

.modal-seguro { font-size: 11px; color: #bbb; text-align: center; margin-top: 14px; }

.spin { animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.fade-list-enter-active, .fade-list-leave-active { transition: all .35s ease; }
.fade-list-enter-from, .fade-list-leave-to { opacity: 0; transform: translateY(10px); }

@media (max-width: 980px) {
  .cart-grid { grid-template-columns: 1fr; }
  .summary-box { position: static; }
}
@media (max-width: 600px) {
  .product-card { flex-direction: column; }
  .product-image img { width: 100%; height: 260px; }
  .empty-state h1 { font-size: 40px; }
}
/* ===== MODAL LIMPAR SACOLA ===== */

.modal-overlay{
  position: fixed;
  inset: 0;
  background: rgba(10,18,32,.75);
  backdrop-filter: blur(8px);
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:9999;
}

.modal-card{
  width: 480px;
  max-width: calc(100vw - 40px);
  background: #fff;
  border-radius: 28px;
  padding: 40px;
  text-align:center;
  box-shadow:
    0 30px 80px rgba(0,0,0,.18);
  border: 1px solid rgba(212,175,55,.2);
}

.modal-icon{
  width: 82px;
  height: 82px;
  margin: 0 auto 22px;
  border-radius: 50%;

  display:flex;
  align-items:center;
  justify-content:center;

  background: linear-gradient(
    135deg,
    #d4af37,
    #f2d675
  );

  color:#0a1220;
}

.modal-card h2{
  font-family: 'Cormorant Garamond', serif;
  font-size: 40px;
  color: #0a1220;
  margin-bottom: 12px;
}

.modal-card p{
  color: #7a7a7a;
  line-height: 1.8;
  font-size: 14px;
  margin-bottom: 28px;
}

.modal-actions{
  display:flex;
  gap:14px;
}

.btn-cancel,
.btn-confirm{
  flex:1;
  height:56px;
  border:none;
  border-radius:14px;
  cursor:pointer;
  font-family:'Jost', sans-serif;
  text-transform:uppercase;
  letter-spacing:2px;
  transition:.3s;
}

.btn-cancel{
  background:#f3f3f3;
  color:#666;
}

.btn-cancel:hover{
  transform:translateY(-2px);
}

.btn-confirm{
  background:#0a1220;
  color:#fff;
}

.btn-confirm:hover{
  background:#d4af37;
  color:#0a1220;
  transform:translateY(-2px);
}

/* animação */

.modal-fade-enter-active,
.modal-fade-leave-active{
  transition:.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to{
  opacity:0;
}

.modal-fade-enter-from .modal-card,
.modal-fade-leave-to .modal-card{
  transform:translateY(20px) scale(.95);
}
</style>