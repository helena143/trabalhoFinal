<template>
  <div class="checkout-page">

    <!-- EMPTY STATE -->
    <div v-if="!hasItems" class="empty-state">
      <div class="empty-inner">
        <div class="empty-emblem">◇</div>
        <h2>Sua sacola está vazia</h2>
        <p>Explore nossa coleção e encontre a peça perfeita para você.</p>
        <button @click="$router.push('/')" class="btn-voltar">Explorar Coleção</button>
      </div>
    </div>

    <!-- CHECKOUT -->
    <div v-else class="checkout-wrap">

      <!-- HEADER -->
      <header class="checkout-header">
        <div class="header-eyebrow">Coleção IVY · Pagamento Seguro</div>
        <h1>Finalizar Compra</h1>
        <div class="header-line"></div>
      </header>

      <div class="checkout-grid">

        <!-- ── COLUNA FORMULÁRIOS ── -->
        <div class="col-forms">

          <!-- ENDEREÇO -->
          <section class="card-section">
            <div class="card-section-header">
              <span class="step-badge">01</span>
              <div>
                <h3>Endereço de Entrega</h3>
                <p>Onde sua joia será entregue</p>
              </div>
            </div>

            <div class="form-grid">
              <div class="field full">
                <input v-model="form.name" id="f-name" placeholder=" " autocomplete="off" />
                <label for="f-name">Nome Completo</label>
                <div class="field-line"></div>
              </div>
              <div class="field">
                <input v-model="form.cep" id="f-cep" @input="formatCEP" @blur="searchCep" placeholder=" " maxlength="9" />
                <label for="f-cep">CEP</label>
                <div class="field-line"></div>
              </div>
              <div class="field">
                <input v-model="form.state" id="f-state" placeholder=" " maxlength="2" />
                <label for="f-state">Estado</label>
                <div class="field-line"></div>
              </div>
              <div class="field">
                <input v-model="form.city" id="f-city" placeholder=" " />
                <label for="f-city">Cidade</label>
                <div class="field-line"></div>
              </div>
              <div class="field">
                <input v-model="form.neighborhood" id="f-bairro" placeholder=" " />
                <label for="f-bairro">Bairro</label>
                <div class="field-line"></div>
              </div>
              <div class="field full">
                <input v-model="form.address" id="f-addr" placeholder=" " />
                <label for="f-addr">Endereço</label>
                <div class="field-line"></div>
              </div>
              <div class="field">
                <input v-model="form.number" id="f-num" placeholder=" " />
                <label for="f-num">Número</label>
                <div class="field-line"></div>
              </div>
              <div class="field">
                <input v-model="form.complement" id="f-comp" placeholder=" " />
                <label for="f-comp">Complemento</label>
                <div class="field-line"></div>
              </div>
            </div>
          </section>

          <!-- PAGAMENTO -->
          <section class="card-section">
            <div class="card-section-header">
              <span class="step-badge">02</span>
              <div>
                <h3>Método de Pagamento</h3>
                <p>Escolha como deseja pagar</p>
              </div>
            </div>

            <div class="payment-tabs">
              <button
                v-for="tab in paymentTabs"
                :key="tab.id"
                :class="['payment-tab', { active: payment === tab.id }]"
                @click="payment = tab.id"
              >
                <span class="tab-radio"><span class="tab-radio-dot"></span></span>
                <span class="tab-icon">{{ tab.icon }}</span>
                <span class="tab-label">{{ tab.label }}</span>
                <span v-if="tab.badge" class="tab-badge">{{ tab.badge }}</span>
              </button>
            </div>

            <!-- PIX -->
            <Transition name="fade-slide">
              <div v-if="payment === 'pix'" class="payment-body pix-body">
                <div class="qr-wrap">
                  <div class="qr-frame">
                    <img :src="`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${pixCode}&margin=10`" alt="QR Code Pix" />
                  </div>
                  <div class="qr-corner qr-tl"></div>
                  <div class="qr-corner qr-tr"></div>
                  <div class="qr-corner qr-bl"></div>
                  <div class="qr-corner qr-br"></div>
                </div>

                <div class="pix-details">
                  <p class="pix-title">Pague com Pix</p>
                  <p class="pix-desc">Escaneie o QR Code ou copie o código abaixo. O pagamento é confirmado em segundos.</p>

                  <div :class="['copy-row', { copied: pixCopiado }]" @click="copyPix" role="button">
                    <div class="copy-left">
                      <Transition name="icon-swap" mode="out-in">
                        <svg v-if="!pixCopiado" key="copy" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="14" height="14">
                          <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                        </svg>
                        <svg v-else key="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14">
                          <path d="M20 6 9 17l-5-5"/>
                        </svg>
                      </Transition>
                      <code>{{ pixCode.substring(0, 28) }}...</code>
                    </div>
                    <span class="copy-action">{{ pixCopiado ? 'Copiado!' : 'Copiar' }}</span>
                  </div>

                  <Transition name="hint-pop">
                    <p v-if="pixCopiado" class="pix-hint">✓ Cole o código no app do seu banco para pagar</p>
                  </Transition>
                </div>
              </div>
            </Transition>

            <!-- CARTÃO -->
            <Transition name="fade-slide">
              <div v-if="payment === 'card'" class="payment-body card-body">
                <div class="card-preview" :class="{ flipped: cardFlipped }">
                  <div class="card-front">
                    <div class="card-chip">
                      <div class="chip-lines">
                        <span></span><span></span><span></span>
                      </div>
                    </div>
                    <div class="card-number-display">
                      {{ card.number || '•••• •••• •••• ••••' }}
                    </div>
                    <div class="card-bottom-row">
                      <div>
                        <div class="card-label-small">Titular</div>
                        <div class="card-holder-display">{{ card.name || 'NOME NO CARTÃO' }}</div>
                      </div>
                      <div>
                        <div class="card-label-small">Validade</div>
                        <div class="card-exp-display">{{ card.exp || 'MM/AA' }}</div>
                      </div>
                    </div>
                    <div class="card-brand">◆ IVY</div>
                  </div>
                  <div class="card-back">
                    <div class="card-stripe"></div>
                    <div class="card-cvv-row">
                      <span class="card-label-small">CVV</span>
                      <div class="cvv-box">{{ card.cvv || '•••' }}</div>
                    </div>
                  </div>
                </div>

                <div class="form-grid" style="margin-top: 24px">
                  <div class="field full">
                    <input v-model="card.number" id="c-num" @input="formatCard" placeholder=" " maxlength="19" />
                    <label for="c-num">Número do Cartão</label>
                    <div class="field-line"></div>
                  </div>
                  <div class="field full">
                    <input v-model="card.name" id="c-name" placeholder=" " style="text-transform:uppercase" />
                    <label for="c-name">Nome no Cartão</label>
                    <div class="field-line"></div>
                  </div>
                  <div class="field">
                    <input v-model="card.exp" id="c-exp" @input="formatExp" placeholder=" " maxlength="5" />
                    <label for="c-exp">Validade (MM/AA)</label>
                    <div class="field-line"></div>
                  </div>
                  <div class="field">
                    <input v-model="card.cvv" id="c-cvv" placeholder=" " maxlength="4"
                      @focus="cardFlipped = true" @blur="cardFlipped = false" />
                    <label for="c-cvv">CVV</label>
                    <div class="field-line"></div>
                  </div>
                  <div class="field full installments-field">
                    <label class="static-label">Parcelas</label>
                    <select v-model="parcelas" class="select-parcelas">
                      <option v-for="n in 12" :key="n" :value="n">
                        {{ n }}x de {{ formatPrice(total / n) }}{{ n === 1 ? ' (à vista)' : ' sem juros' }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </Transition>

            <!-- BOLETO -->
            <Transition name="fade-slide">
              <div v-if="payment === 'boleto'" class="payment-body boleto-body">
                <div class="boleto-icon">
                  <svg viewBox="0 0 80 40" width="80" height="40">
                    <rect x="0"  y="0" width="4"  height="40" fill="#0f0e0c"/>
                    <rect x="6"  y="0" width="2"  height="40" fill="#0f0e0c"/>
                    <rect x="10" y="0" width="6"  height="40" fill="#0f0e0c"/>
                    <rect x="18" y="0" width="2"  height="40" fill="#0f0e0c"/>
                    <rect x="22" y="0" width="4"  height="40" fill="#0f0e0c"/>
                    <rect x="28" y="0" width="2"  height="40" fill="#0f0e0c"/>
                    <rect x="32" y="0" width="6"  height="40" fill="#0f0e0c"/>
                    <rect x="40" y="0" width="4"  height="40" fill="#0f0e0c"/>
                    <rect x="46" y="0" width="2"  height="40" fill="#0f0e0c"/>
                    <rect x="50" y="0" width="6"  height="40" fill="#0f0e0c"/>
                    <rect x="58" y="0" width="2"  height="40" fill="#0f0e0c"/>
                    <rect x="62" y="0" width="4"  height="40" fill="#0f0e0c"/>
                    <rect x="68" y="0" width="2"  height="40" fill="#0f0e0c"/>
                    <rect x="72" y="0" width="6"  height="40" fill="#0f0e0c"/>
                  </svg>
                </div>
                <p class="boleto-title">Boleto Bancário</p>
                <p class="boleto-desc">Seu boleto será gerado após confirmar o pedido. O prazo de vencimento é de <strong>3 dias úteis</strong>. O pagamento pode levar até 2 dias úteis para ser confirmado.</p>
                <div class="boleto-alert">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16">
                    <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
                  </svg>
                  O estoque será reservado por 72h após a emissão
                </div>
              </div>
            </Transition>
          </section>

        </div>

        <!-- ── RESUMO ── -->
        <aside class="col-summary">
          <div class="summary-sticky">

            <h3 class="summary-title">Resumo do Pedido</h3>

            <!-- ITENS -->
            <div class="items-list">
              <div v-for="item in cart.items" :key="item._id" class="item-row">
                <div class="item-img-wrap">
                  <img v-if="item.image" :src="item.image" :alt="item.name" class="item-img" />
                  <div v-else class="item-img-placeholder">◆</div>
                  <span class="item-qty-badge">{{ item.quantity }}</span>
                </div>
                <div class="item-meta">
                  <p class="item-name">{{ item.name }}</p>
                  <p class="item-unit">{{ formatPrice(item.price) }} cada</p>
                </div>
                <span class="item-subtotal">{{ formatPrice(item.price * item.quantity) }}</span>
              </div>
            </div>

            <!-- TOTAIS -->
            <div class="totals">
              <div class="total-row">
                <span>Subtotal</span>
                <span>{{ formatPrice(total) }}</span>
              </div>
              <div class="total-row">
                <span>Frete</span>
                <span class="free-tag">Grátis</span>
              </div>
              <div class="total-row grand">
                <span>Total</span>
                <span>{{ formatPrice(total) }}</span>
              </div>
              <p v-if="payment === 'card' && parcelas > 1" class="parcel-info">
                {{ parcelas }}x de {{ formatPrice(total / parcelas) }} sem juros
              </p>
            </div>

            <!-- CTA -->
            <button class="btn-finish" @click="finish" :disabled="loading">
              <span v-if="!loading">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Confirmar Pedido
              </span>
              <span v-else class="loader"></span>
            </button>

            <div class="trust-row">
              <div class="trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span>SSL Seguro</span>
              </div>
              <div class="trust-sep">·</div>
              <div class="trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Entrega Rastreada</span>
              </div>
              <div class="trust-sep">·</div>
              <div class="trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <span>Troca Grátis</span>
              </div>
            </div>

          </div>
        </aside>

      </div>
    </div>

    <!-- ── MODAL SUCESSO ── -->
    <Transition name="modal-in">
      <div v-if="success" class="success-overlay" @click.self="$router.push('/')">
        <div class="success-box">
          <div class="success-gem-ring">
            <div class="success-gem">◆</div>
          </div>
          <div class="success-tag">Pedido Confirmado</div>
          <h2>Obrigada pela sua compra!</h2>
          <p>Seu pedido foi recebido e está sendo processado. Você receberá um e-mail de confirmação em breve.</p>

          <div class="success-details">
            <div class="detail-row">
              <span>Itens</span>
              <strong>{{ successSnapshot.count }} produto(s)</strong>
            </div>
            <div class="detail-row">
              <span>Pagamento</span>
              <strong>{{ paymentLabel }}</strong>
            </div>
            <div class="detail-row">
              <span>Total</span>
              <strong>{{ formatPrice(successSnapshot.total) }}</strong>
            </div>
            <div class="detail-row">
              <span>Entrega</span>
              <strong>Em até 5 dias úteis</strong>
            </div>
          </div>

          <button class="success-btn" @click="$router.push('/')">
            Continuar Comprando
          </button>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from "vue"
import { useRouter } from "vue-router"
import { cart, getTotal, loadCart, clearCart } from "@/stores/cart"

const router = useRouter()

onMounted(async () => {
  await loadCart()
})

const hasItems = computed(() => cart.items.length > 0)
const total    = computed(() => getTotal())

const form = reactive({
  name: "", cep: "", address: "", number: "",
  complement: "", city: "", neighborhood: "", state: ""
})

const card = reactive({ number: "", name: "", exp: "", cvv: "" })
const cardFlipped = ref(false)
const parcelas    = ref(1)
const payment     = ref("pix")
const loading     = ref(false)
const success     = ref(false)
const pixCopiado  = ref(false)

const pixKey = "31973064727"

const paymentTabs = [
  { id: "pix",    icon: "⚡", label: "Pix",              badge: "Instantâneo" },
  { id: "card",   icon: "💳", label: "Cartão de Crédito", badge: null },
  { id: "boleto", icon: "📄", label: "Boleto Bancário",   badge: null },
]

const paymentLabel = computed(() => {
  const map = { pix: "Pix", card: "Cartão de Crédito", boleto: "Boleto Bancário" }
  return map[payment.value] || payment.value
})

const successSnapshot = reactive({ count: 0, total: 0 })

const formatPrice = (value) =>
  Number(value || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

const formatCEP = (e) => {
  let v = e.target.value.replace(/\D/g, "")
  if (v.length > 5) v = v.replace(/(\d{5})(\d)/, "$1-$2")
  form.cep = v
}

const formatCard = (e) => {
  let v = e.target.value.replace(/\D/g, "")
  card.number = v.match(/.{1,4}/g)?.join(" ") || ""
}

const formatExp = (e) => {
  let v = e.target.value.replace(/\D/g, "")
  if (v.length > 2) v = v.replace(/(\d{2})(\d)/, "$1/$2")
  card.exp = v
}

const searchCep = async () => {
  const cep = form.cep.replace(/\D/g, "")
  if (cep.length !== 8) return
  try {
    const res  = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const data = await res.json()
    if (!data.erro) {
      form.address      = data.logradouro
      form.city         = data.localidade
      form.neighborhood = data.bairro
      form.state        = data.uf
    }
  } catch (e) { console.log(e) }
}

const pixCode = computed(() =>
  hasItems.value ? `00020126360014BR.GOV.BCB.PIX0114${pixKey}5204000053039865802BR5913IVY JOIAS6009SAO PAULO62070503***6304${total.value.toFixed(2)}` : ""
)

const copyPix = async () => {
  try {
    await navigator.clipboard.writeText(pixCode.value)
    pixCopiado.value = true
    setTimeout(() => (pixCopiado.value = false), 2500)
  } catch {
    alert("Erro ao copiar o código.")
  }
}

const finish = () => {
  loading.value = true
  successSnapshot.count = cart.items.length
  successSnapshot.total = total.value
  setTimeout(() => {
    loading.value = false
    success.value = true
    clearCart()
    localStorage.removeItem("checkoutProduto")
  }, 1800)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Jost:wght@300;400;500;600&display=swap');

/* ── TOKENS ── */
.checkout-page {
  --gold:        #c9a84c;
  --gold-light:  #e2c97e;
  --gold-dark:   #a07830;
  --dark:        #0f0e0c;
  --cream:       #faf8f4;
  --cream-deep:  #f3efe8;
  --white:       #ffffff;
  --border:      rgba(201,168,76,0.18);
  --border-soft: rgba(0,0,0,0.07);
  --text:        #0f0e0c;
  --text-muted:  #8a8173;
  --text-light:  #b5ad9f;
  --green:       #2a7a4b;
  --font-display:'Cormorant Garamond', serif;
  --font-body:   'Jost', sans-serif;
  --ease:        cubic-bezier(0.19, 1, 0.22, 1);
  --shadow:      0 20px 60px rgba(0,0,0,0.07);
  --radius:      16px;

  min-height: 100vh;
  background: var(--cream);
  font-family: var(--font-body);
  color: var(--text);
}

/* ── EMPTY ── */
.empty-state {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-inner {
  text-align: center;
  padding: 60px 40px;
}

.empty-emblem {
  font-size: 3.5rem;
  color: var(--gold);
  display: block;
  margin-bottom: 24px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-10px); }
}

.empty-inner h2 {
  font-family: var(--font-display);
  font-size: 2.2rem;
  font-weight: 300;
  margin: 0 0 12px;
}

.empty-inner p {
  color: var(--text-muted);
  font-size: .9rem;
  margin: 0 0 32px;
}

.btn-voltar {
  padding: 14px 36px;
  background: var(--dark);
  color: white;
  border: none;
  border-radius: 4px;
  font-family: var(--font-body);
  font-size: .72rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  transition: background .3s;
}

.btn-voltar:hover { background: var(--gold-dark); }

/* ── LAYOUT ── */
.checkout-wrap {
  max-width: 1240px;
  margin: 0 auto;
  padding: 60px 24px 100px;
}

/* ── HEADER ── */
.checkout-header {
  text-align: center;
  margin-bottom: 56px;
}

.header-eyebrow {
  display: block;
  font-size: .65rem;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 14px;
}

.checkout-header h1 {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  letter-spacing: 8px;
  margin: 0 0 20px;
  color: var(--dark);
}

.header-line {
  width: 100px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  margin: 0 auto;
}

/* ── GRID ── */
.checkout-grid {
  display: grid;
  grid-template-columns: 1fr 390px;
  gap: 32px;
  align-items: start;
}

.col-forms { display: flex; flex-direction: column; gap: 24px; }

/* ── CARD SECTION ── */
.card-section {
  background: var(--white);
  border-radius: var(--radius);
  padding: 36px 40px;
  border: 1px solid var(--border-soft);
  box-shadow: var(--shadow);
}

.card-section-header {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border);
}

.step-badge {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 300;
  color: var(--gold);
  line-height: 1;
  flex-shrink: 0;
}

.card-section-header h3 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0 0 4px;
}

.card-section-header p {
  font-size: .75rem;
  color: var(--text-muted);
  margin: 0;
  letter-spacing: .5px;
}

/* ── FORM ── */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px 24px;
}

.field { position: relative; }
.field.full { grid-column: span 2; }

.field input,
.field select {
  width: 100%;
  border: none;
  border-bottom: 1px solid #ddd;
  padding: 22px 0 8px;
  background: transparent;
  outline: none;
  font-family: var(--font-body);
  font-size: .88rem;
  color: var(--dark);
  transition: border-color .3s;
}

.field input:focus { border-color: transparent; }
.field input:focus ~ .field-line { transform: scaleX(1); }

.field label {
  position: absolute;
  top: 22px;
  left: 0;
  font-size: .8rem;
  color: var(--text-light);
  pointer-events: none;
  transition: all .25s var(--ease);
  letter-spacing: .3px;
}

.field input:focus + label,
.field input:not(:placeholder-shown) + label {
  top: 4px;
  font-size: .62rem;
  color: var(--gold);
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.field-line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gold);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .35s var(--ease);
}

/* installments select */
.installments-field { margin-top: 8px; }

.static-label {
  display: block;
  font-size: .62rem;
  color: var(--gold);
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.select-parcelas {
  width: 100%;
  padding: 12px 0;
  border: none;
  border-bottom: 1px solid #ddd;
  background: transparent;
  font-family: var(--font-body);
  font-size: .85rem;
  color: var(--dark);
  cursor: pointer;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23c9a84c' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 4px center;
}

/* ── PAYMENT TABS ── */
.payment-tabs {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 28px;
}

.payment-tab {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  background: var(--cream);
  border: 1.5px solid var(--border-soft);
  border-radius: 10px;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: .8rem;
  color: var(--text-muted);
  text-align: left;
  transition: all .3s var(--ease);
  letter-spacing: .5px;
}

.payment-tab:hover { border-color: var(--gold); color: var(--dark); }

.payment-tab.active {
  border-color: var(--dark);
  background: var(--white);
  color: var(--dark);
  box-shadow: 0 4px 20px rgba(0,0,0,.06);
}

.tab-radio {
  width: 18px;
  height: 18px;
  border: 1.5px solid currentColor;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tab-radio-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--dark);
  opacity: 0;
  transition: opacity .2s;
}

.payment-tab.active .tab-radio-dot { opacity: 1; }

.tab-icon  { font-size: 1.1rem; }
.tab-label { flex: 1; font-weight: 500; }

.tab-badge {
  font-size: .6rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 20px;
  background: rgba(201,168,76,.15);
  color: var(--gold-dark);
}

/* ── PIX ── */
.payment-body { animation: bodyIn .35s var(--ease); }
@keyframes bodyIn { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform: translateY(0); } }

.pix-body {
  display: flex;
  gap: 32px;
  align-items: flex-start;
  background: var(--cream);
  border-radius: 12px;
  padding: 28px;
}

.qr-wrap {
  position: relative;
  flex-shrink: 0;
}

.qr-frame {
  background: white;
  padding: 14px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,.08);
}

.qr-frame img { width: 160px; display: block; }

.qr-corner {
  position: absolute;
  width: 18px;
  height: 18px;
  border-color: var(--gold);
  border-style: solid;
}

.qr-tl { top: -4px; left: -4px; border-width: 2px 0 0 2px; border-radius: 3px 0 0 0; }
.qr-tr { top: -4px; right: -4px; border-width: 2px 2px 0 0; border-radius: 0 3px 0 0; }
.qr-bl { bottom: -4px; left: -4px; border-width: 0 0 2px 2px; border-radius: 0 0 0 3px; }
.qr-br { bottom: -4px; right: -4px; border-width: 0 2px 2px 0; border-radius: 0 0 3px 0; }

.pix-title {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 400;
  margin: 0 0 8px;
}

.pix-desc {
  font-size: .8rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0 0 18px;
}

.copy-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 14px;
  border: 1.5px dashed var(--gold);
  border-radius: 8px;
  cursor: pointer;
  transition: all .3s;
  background: white;
}

.copy-row:hover { border-color: var(--gold-dark); box-shadow: 0 4px 16px rgba(201,168,76,.15); }

.copy-row.copied {
  border-style: solid;
  border-color: var(--green);
  background: #f0faf4;
}

.copy-left {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--gold-dark);
  min-width: 0;
}

.copy-row.copied .copy-left { color: var(--green); }

code {
  font-size: .7rem;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.copy-action {
  font-size: .65rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--gold-dark);
  white-space: nowrap;
  flex-shrink: 0;
  transition: color .3s;
}

.copy-row.copied .copy-action { color: var(--green); }

.pix-hint {
  font-size: .72rem;
  color: var(--green);
  margin: 10px 0 0;
  font-weight: 500;
}

/* ── CARTÃO ── */
.card-body { padding: 4px 0; }

.card-preview {
  width: 100%;
  max-width: 360px;
  height: 200px;
  perspective: 1000px;
  margin: 0 auto;
  position: relative;
  transform-style: preserve-3d;
  transition: transform .6s var(--ease);
}

.card-preview.flipped { transform: rotateY(180deg); }

.card-front,
.card-back {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 24px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  background: linear-gradient(135deg, var(--dark) 0%, #2a2622 60%, var(--dark) 100%);
  color: white;
  overflow: hidden;
}

.card-front::before {
  content: '';
  position: absolute;
  top: -60px;
  right: -60px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(201,168,76,.2) 0%, transparent 70%);
  border-radius: 50%;
}

.card-back { transform: rotateY(180deg); }

.card-chip {
  width: 40px;
  height: 30px;
  background: linear-gradient(135deg, var(--gold-light), var(--gold-dark));
  border-radius: 5px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.chip-lines {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.chip-lines span {
  display: block;
  width: 24px;
  height: 1px;
  background: rgba(0,0,0,.3);
}

.card-number-display {
  font-size: 1.05rem;
  letter-spacing: 4px;
  margin-bottom: 24px;
  font-family: 'Courier New', monospace;
  opacity: .9;
}

.card-bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.card-label-small {
  font-size: .55rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: .6;
  margin-bottom: 4px;
}

.card-holder-display,
.card-exp-display {
  font-size: .8rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  opacity: .9;
}

.card-brand {
  position: absolute;
  top: 22px;
  right: 24px;
  font-family: var(--font-display);
  font-size: .9rem;
  color: var(--gold);
  letter-spacing: 2px;
}

.card-stripe {
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  height: 44px;
  background: rgba(0,0,0,.6);
}

.card-cvv-row {
  position: absolute;
  bottom: 36px;
  right: 28px;
  text-align: right;
}

.cvv-box {
  margin-top: 6px;
  background: white;
  color: var(--dark);
  padding: 6px 16px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: .9rem;
  letter-spacing: 3px;
}

/* ── BOLETO ── */
.boleto-body {
  text-align: center;
  padding: 36px 24px;
  background: var(--cream);
  border-radius: 12px;
}

.boleto-icon { margin-bottom: 20px; opacity: .7; }

.boleto-title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 400;
  margin: 0 0 10px;
}

.boleto-desc {
  font-size: .82rem;
  color: var(--text-muted);
  line-height: 1.65;
  max-width: 400px;
  margin: 0 auto 20px;
}

.boleto-alert {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: .72rem;
  color: var(--text-muted);
  background: white;
  border: 1px solid var(--border);
  padding: 10px 16px;
  border-radius: 6px;
}

/* ── SUMMARY ── */
.col-summary { position: relative; }

.summary-sticky {
  position: sticky;
  top: 24px;
  background: var(--white);
  border-radius: var(--radius);
  padding: 36px 32px;
  border: 1px solid var(--border-soft);
  box-shadow: var(--shadow);
}

.summary-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0 0 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border);
}

/* ── ITENS ── */
.items-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border);
  max-height: 320px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}

.item-row {
  display: flex;
  align-items: center;
  gap: 14px;
}

.item-img-wrap {
  position: relative;
  flex-shrink: 0;
}

.item-img {
  width: 58px;
  height: 58px;
  object-fit: contain;
  border-radius: 10px;
  background: var(--cream);
  padding: 6px;
  border: 1px solid var(--border);
}

.item-img-placeholder {
  width: 58px;
  height: 58px;
  border-radius: 10px;
  background: var(--cream);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gold);
  font-size: 1.1rem;
}

.item-qty-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  background: var(--dark);
  color: white;
  border-radius: 50%;
  font-size: .62rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-meta { flex: 1; min-width: 0; }

.item-name {
  font-size: .82rem;
  font-weight: 500;
  color: var(--dark);
  margin: 0 0 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-unit {
  font-size: .7rem;
  color: var(--text-light);
  margin: 0;
}

.item-subtotal {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 500;
  color: var(--dark);
  flex-shrink: 0;
}

/* ── TOTALS ── */
.totals { margin-bottom: 28px; }

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: .82rem;
  color: var(--text-muted);
  padding: 10px 0;
  border-bottom: 1px solid rgba(0,0,0,.04);
}

.total-row.grand {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--dark);
  border-bottom: none;
  padding-top: 16px;
  margin-top: 6px;
  border-top: 1.5px solid var(--border);
}

.free-tag {
  color: var(--green);
  font-weight: 600;
}

.parcel-info {
  font-size: .72rem;
  color: var(--text-muted);
  text-align: right;
  margin: 6px 0 0;
}

/* ── CTA ── */
.btn-finish {
  width: 100%;
  height: 56px;
  background: var(--dark);
  color: white;
  border: none;
  border-radius: 8px;
  font-family: var(--font-body);
  font-size: .75rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all .3s var(--ease);
  margin-bottom: 20px;
}

.btn-finish:hover:not(:disabled) {
  background: var(--gold-dark);
  box-shadow: 0 8px 30px rgba(160,120,48,.35);
  transform: translateY(-2px);
}

.btn-finish:disabled { opacity: .6; cursor: not-allowed; }

.loader {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,255,255,.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin .7s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* ── TRUST ── */
.trust-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: .65rem;
  color: var(--text-light);
  letter-spacing: .5px;
  text-transform: uppercase;
}

.trust-sep { color: var(--border); font-size: .8rem; }

/* ── SUCCESS MODAL ── */
.success-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10,9,7,.88);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.success-box {
  background: var(--cream);
  border-radius: 20px;
  padding: 52px 48px;
  width: 100%;
  max-width: 480px;
  text-align: center;
  border: 1px solid var(--border);
  box-shadow: 0 40px 100px rgba(0,0,0,.25);
}

.success-gem-ring {
  width: 90px;
  height: 90px;
  margin: 0 auto 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--gold-light), var(--gold-dark));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 10px rgba(201,168,76,.12), 0 0 0 20px rgba(201,168,76,.06);
  animation: ringPop .6s var(--ease) both;
}

@keyframes ringPop {
  from { transform: scale(0) rotate(-30deg); opacity: 0; }
  to   { transform: scale(1) rotate(0deg);   opacity: 1; }
}

.success-gem {
  font-size: 2rem;
  color: white;
  text-shadow: 0 2px 8px rgba(0,0,0,.2);
}

.success-tag {
  display: inline-block;
  font-size: .58rem;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: var(--gold);
  font-weight: 700;
  margin-bottom: 14px;
}

.success-box h2 {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 300;
  color: var(--dark);
  margin: 0 0 12px;
}

.success-box > p {
  font-size: .82rem;
  color: var(--text-muted);
  line-height: 1.7;
  margin: 0 0 30px;
}

.success-details {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 20px 24px;
  margin-bottom: 28px;
  text-align: left;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-size: .78rem;
  border-bottom: 1px solid rgba(0,0,0,.04);
}

.detail-row:last-child { border-bottom: none; padding-bottom: 0; }

.detail-row span { color: var(--text-muted); }
.detail-row strong { color: var(--dark); font-weight: 600; }

.success-btn {
  width: 100%;
  height: 52px;
  background: var(--dark);
  color: white;
  border: none;
  border-radius: 6px;
  font-family: var(--font-body);
  font-size: .72rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  transition: background .3s;
}

.success-btn:hover { background: var(--gold-dark); }

/* ── TRANSITIONS ── */
.fade-slide-enter-active, .fade-slide-leave-active { transition: all .3s var(--ease); }
.fade-slide-enter-from, .fade-slide-leave-to { opacity: 0; transform: translateY(8px); }

.icon-swap-enter-active, .icon-swap-leave-active { transition: all .2s ease; }
.icon-swap-enter-from, .icon-swap-leave-to { opacity: 0; transform: scale(.6); }

.hint-pop-enter-active, .hint-pop-leave-active { transition: all .3s var(--ease); }
.hint-pop-enter-from, .hint-pop-leave-to { opacity: 0; transform: translateY(-6px); }

.modal-in-enter-active { transition: opacity .35s ease; }
.modal-in-enter-active .success-box { animation: boxIn .45s var(--ease) both; }
.modal-in-leave-active { transition: opacity .3s ease; }
.modal-in-enter-from, .modal-in-leave-to { opacity: 0; }

@keyframes boxIn {
  from { opacity: 0; transform: scale(.88) translateY(30px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

/* ── RESPONSIVE ── */
@media (max-width: 960px) {
  .checkout-grid { grid-template-columns: 1fr; }
  .col-summary { order: -1; }
  .summary-sticky { position: static; }
}

@media (max-width: 640px) {
  .checkout-wrap { padding: 40px 16px 80px; }
  .card-section { padding: 24px 20px; }
  .form-grid { grid-template-columns: 1fr; }
  .field.full { grid-column: span 1; }
  .pix-body { flex-direction: column; align-items: center; text-align: center; }
  .success-box { padding: 36px 24px; }
  .summary-sticky { padding: 24px 20px; }
  .checkout-header h1 { letter-spacing: 4px; }
}
</style>