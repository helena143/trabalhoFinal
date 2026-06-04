<template>
  <div class="checkout-page">

    <!-- EMPTY -->
    <div v-if="!product" class="empty-state">
      <div class="empty-content">
        <div class="empty-icon">🧺</div>
        <h2>Sua sacola está vazia</h2>
        <p>Explore nossa coleção premium e encontre a joia perfeita.</p>
        <button @click="$router.push('/')" class="btn-primary">Explorar Coleção</button>
      </div>
    </div>

    <!-- CHECKOUT -->
    <div v-else class="checkout-container">

      <!-- HEADER -->
      <header class="checkout-header">
        <span class="brand-subtitle">Pagamento Seguro</span>
        <h1 class="title">Finalizar Compra</h1>
      </header>

      <div class="checkout-grid">

        <!-- FORM -->
        <div class="forms-column">

          <!-- ENDEREÇO -->
          <section class="checkout-section">
            <div class="section-header">
              <span class="step-number">1</span>
              <h3>Endereço de Entrega</h3>
            </div>

            <div class="input-grid">
              <div class="input-group full">
                <input v-model="form.name" placeholder=" " />
                <label>Nome Completo</label>
              </div>
              <div class="input-group">
                <input v-model="form.cep" @input="formatCEP" @blur="searchCep" placeholder=" " />
                <label>CEP</label>
              </div>
              <div class="input-group">
                <input v-model="form.city" placeholder=" " />
                <label>Cidade</label>
              </div>
              <div class="input-group">
                <input v-model="form.neighborhood" placeholder=" " />
                <label>Bairro</label>
              </div>
              <div class="input-group">
                <input v-model="form.state" placeholder=" " />
                <label>Estado</label>
              </div>
              <div class="input-group full">
                <input v-model="form.address" placeholder=" " />
                <label>Endereço</label>
              </div>
              <div class="input-group">
                <input v-model="form.number" placeholder=" " />
                <label>Número</label>
              </div>
            </div>
          </section>

          <!-- PAGAMENTO -->
          <section class="checkout-section">
            <div class="section-header">
              <span class="step-number">2</span>
              <h3>Método de Pagamento</h3>
            </div>

            <div class="payment-tabs">
              <div class="tab-item" :class="{ active: payment === 'pix' }" @click="payment = 'pix'">
                <div class="dot"></div>
                Pix
              </div>
              <div class="tab-item" :class="{ active: payment === 'card' }" @click="payment = 'card'">
                <div class="dot"></div>
                Cartão
              </div>
              <div class="tab-item" :class="{ active: payment === 'boleto' }" @click="payment = 'boleto'">
                <div class="dot"></div>
                Boleto
              </div>
            </div>

            <!-- PIX -->
            <div v-if="payment === 'pix'" class="payment-content">
              <div class="payment-box">
                <div class="qr-container">
                  <img :src="`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${pixCode}`" />
                </div>
                <div class="pix-info">
                  <h4>Pagamento via Pix</h4>
                  <p>Escaneie o QR Code ou copie o código Pix.</p>

                  <div class="copy-box" :class="{ copiado: pixCopiado }" @click="copyPix">
                    <div class="copy-code-area">
                      <svg v-if="!pixCopiado" class="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="15" height="15">
                        <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                      </svg>
                      <svg v-else class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="15" height="15">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      <code>{{ pixCode.substring(0, 22) }}...</code>
                    </div>
                    <Transition name="btn-flip">
                      <span v-if="!pixCopiado" key="copiar" class="copy-label">Copiar</span>
                      <span v-else key="copiado" class="copy-label copiado-label">Copiado!</span>
                    </Transition>
                  </div>

                  <Transition name="hint-fade">
                    <p v-if="pixCopiado" class="copy-hint">
                      ✅ Código copiado com sucesso! Cole no seu app de pagamento.
                    </p>
                  </Transition>

                </div>
              </div>
            </div>

            <!-- CARD -->
            <div v-if="payment === 'card'" class="payment-content">
              <div class="input-grid">
                <div class="input-group full">
                  <input v-model="card.number" @input="formatCard" placeholder=" " />
                  <label>Número do Cartão</label>
                </div>
                <div class="input-group full">
                  <input v-model="card.name" placeholder=" " />
                  <label>Nome no Cartão</label>
                </div>
                <div class="input-group">
                  <input v-model="card.exp" @input="formatExp" placeholder=" " />
                  <label>MM/AA</label>
                </div>
                <div class="input-group">
                  <input v-model="card.cvv" placeholder=" " />
                  <label>CVV</label>
                </div>
              </div>
            </div>

            <!-- BOLETO -->
            <div v-if="payment === 'boleto'" class="payment-content">
              <div class="boleto-box">
                <h4>Boleto Bancário</h4>
                <p>O boleto será gerado automaticamente após finalizar a compra.</p>
              </div>
            </div>

          </section>
        </div>

        <!-- RESUMO -->
        <aside class="order-summary">
          <div class="summary-wrapper">
            <h3>Resumo do Pedido</h3>
            <div class="product-mini">
              <div>
                <p class="p-name">{{ product.nome }}</p>
                <p class="p-qty">Quantidade: 01</p>
              </div>
              <span class="p-price">{{ formatPrice(productPrice) }}</span>
            </div>
            <div class="price-breakdown">
              <div class="row">
                <span>Subtotal</span>
                <span>{{ formatPrice(productPrice) }}</span>
              </div>
              <div class="row">
                <span>Entrega</span>
                <span class="free-badge">Grátis</span>
              </div>
              <div class="row total-row">
                <span>Total</span>
                <span>{{ formatPrice(productPrice) }}</span>
              </div>
            </div>
            <button class="btn-checkout" @click="finish" :disabled="loading">
              <span v-if="!loading">Finalizar Compra</span>
              <span v-else class="btn-loader"></span>
            </button>
            <div class="security-footer">
              <p>🛡️ Compra 100% Protegida</p>
              <span>Ambiente criptografado com tecnologia SSL</span>
            </div>
          </div>
        </aside>

      </div>

      <!-- MODAL SUCESSO -->
      <Transition name="fade-overlay">
        <div v-if="success" class="modal-overlay">
          <div class="success-modal">
            <div class="success-circle">✓</div>
            <span class="success-tag">PAGAMENTO APROVADO</span>
            <h2>Pedido Finalizado!</h2>
            <p>Sua compra foi confirmada com sucesso.</p>
            <div class="success-info">
              <div class="info-row">
                <span>Produto</span>
                <strong>{{ product.nome ?? product.name }}</strong>
              </div>
              <div class="info-row">
                <span>Total</span>
                <strong>{{ formatPrice(productPrice) }}</strong>
              </div>
            </div>
            <button class="success-button" @click="$router.push('/')">Voltar para Loja</button>
          </div>
        </div>
      </Transition>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"

const product = ref(null)

onMounted(() => {
  const data = localStorage.getItem("checkoutProduto")
  if (data) product.value = JSON.parse(data)
})

const form = ref({ name: "", cep: "", address: "", number: "", city: "", neighborhood: "", state: "" })
const card = ref({ number: "", name: "", exp: "", cvv: "" })
const payment   = ref("pix")
const loading   = ref(false)
const success   = ref(false)
const pixCopiado = ref(false)

const pixKey = "31973064727"

const productPrice = computed(() =>
  Number(product.value?.preco ?? product.value?.price ?? 0)
)

const formatPrice = (value) =>
  Number(value || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

const formatCEP = (e) => {
  let v = e.target.value.replace(/\D/g, "")
  if (v.length > 5) v = v.replace(/(\d{5})(\d)/, "$1-$2")
  form.value.cep = v
}

const formatCard = (e) => {
  let v = e.target.value.replace(/\D/g, "")
  card.value.number = v.match(/.{1,4}/g)?.join(" ") || ""
}

const formatExp = (e) => {
  let v = e.target.value.replace(/\D/g, "")
  if (v.length > 2) v = v.replace(/(\d{2})(\d)/, "$1/$2")
  card.value.exp = v
}

const searchCep = async () => {
  const cep = form.value.cep.replace(/\D/g, "")
  if (cep.length !== 8) return
  try {
    const res  = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const data = await res.json()
    if (!data.erro) {
      form.value.address      = data.logradouro
      form.value.city         = data.localidade
      form.value.neighborhood = data.bairro
      form.value.state        = data.uf
    }
  } catch (e) { console.log(e) }
}

const pixCode = computed(() =>
  product.value ? `${pixKey}${productPrice.value}` : ""
)

const copyPix = async () => {
  try {
    await navigator.clipboard.writeText(pixCode.value)
    pixCopiado.value = true
    setTimeout(() => (pixCopiado.value = false), 2500)
  } catch {
    alert("Erro ao copiar.")
  }
}

const finish = () => {
  loading.value = true
  setTimeout(() => { loading.value = false; success.value = true }, 1800)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@500;600&display=swap');

* { box-sizing: border-box; }

.checkout-page {
  min-height: 100vh;
  padding: 40px 20px;
  background: radial-gradient(circle at top, #f8f5f0, #fafafa 45%);
  font-family: 'Inter', sans-serif;
}

.checkout-container { max-width: 1180px; margin: 0 auto; }

.checkout-header { text-align: center; margin-bottom: 45px; }
.brand-subtitle  { font-size: 11px; letter-spacing: 4px; color: #b38e5d; font-weight: 700; }
.title           { font-size: 42px; margin-top: 10px; color: #111; font-family: 'Playfair Display', serif; }

.checkout-grid { display: grid; grid-template-columns: 1fr 380px; gap: 28px; }

.checkout-section,
.summary-wrapper { background: #fff; border-radius: 24px; padding: 34px; box-shadow: 0 10px 40px rgba(0,0,0,.05); }

.section-header { display: flex; align-items: center; gap: 14px; margin-bottom: 28px; }
.step-number    { width: 30px; height: 30px; border-radius: 50%; background: #111; color: #fff; display: flex; align-items: center; justify-content: center; }

.input-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
.input-group { position: relative; }
.input-group.full { grid-column: span 2; }

input { width: 100%; border: none; border-bottom: 1px solid #ddd; padding: 24px 0 10px; background: transparent; outline: none; }
input:focus { border-color: #b38e5d; }
label { position: absolute; top: 24px; left: 0; color: #999; transition: .2s; pointer-events: none; }
input:focus + label, input:not(:placeholder-shown) + label { top: 3px; font-size: 11px; color: #b38e5d; font-weight: 700; }

.payment-tabs { display: flex; flex-direction: column; gap: 12px; margin-bottom: 25px; }
.tab-item     { display: flex; align-items: center; gap: 12px; padding: 18px; border: 1px solid #ececec; border-radius: 14px; cursor: pointer; }
.tab-item.active { border-color: #111; background: #faf7f2; }
.dot { width: 18px; height: 18px; border: 1px solid #bbb; border-radius: 50%; position: relative; }
.tab-item.active .dot::after { content: ""; position: absolute; inset: 4px; border-radius: 50%; background: #111; }

.payment-box { display: flex; gap: 24px; align-items: flex-start; background: #fafafa; border-radius: 20px; padding: 24px; }
.qr-container { background: #fff; padding: 12px; border-radius: 14px; flex-shrink: 0; }
.qr-container img { width: 180px; display: block; }

.pix-info h4 { font-size: 15px; font-weight: 600; margin: 0 0 6px; color: #111; }
.pix-info > p { font-size: 13px; color: #888; margin: 0 0 16px; }

/* ── COPY BOX ── */
.copy-box {
  border: 1.5px dashed #c9a84c;
  padding: 12px 14px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background: #fff;
  cursor: pointer;
  transition: all .35s cubic-bezier(.22,1,.36,1);
  position: relative;
  overflow: hidden;
}

.copy-box::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(201,168,76,.08), transparent);
  opacity: 0;
  transition: opacity .3s;
}

.copy-box:hover::before { opacity: 1; }

.copy-box:hover {
  border-color: #a07830;
  box-shadow: 0 4px 16px rgba(201,168,76,.18);
  transform: translateY(-1px);
}

/* estado copiado */
.copy-box.copiado {
  border-style: solid;
  border-color: #27ae60;
  background: #f0faf4;
  box-shadow: 0 4px 20px rgba(39,174,96,.15);
  transform: translateY(-1px);
}

.copy-box.copiado::before {
  background: linear-gradient(135deg, rgba(39,174,96,.06), transparent);
  opacity: 1;
}

.copy-code-area {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.copy-icon   { color: #b38e5d; flex-shrink: 0; transition: color .3s; }
.check-icon  { color: #27ae60; flex-shrink: 0; }

code {
  font-size: 12px;
  color: #555;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color .3s;
}

.copy-box.copiado code { color: #1a8a44; }

.copy-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #b38e5d;
  white-space: nowrap;
  flex-shrink: 0;
  transition: color .3s;
}

.copiado-label { color: #27ae60; }

/* hint abaixo */
.copy-hint {
  margin: 10px 0 0;
  font-size: 12px;
  color: #27ae60;
  font-weight: 500;
}

/* animações */
.btn-flip-enter-active,
.btn-flip-leave-active { transition: all .2s ease; position: absolute; right: 14px; }
.btn-flip-enter-from   { opacity: 0; transform: translateY(8px); }
.btn-flip-leave-to     { opacity: 0; transform: translateY(-8px); }

.copy-label { position: relative; }

.hint-fade-enter-active, .hint-fade-leave-active { transition: all .35s ease; }
.hint-fade-enter-from, .hint-fade-leave-to { opacity: 0; transform: translateY(-6px); }

/* ── / COPY BOX ── */

.boleto-box { background: #fafafa; padding: 24px; border-radius: 18px; }
.boleto-box h4 { margin: 0 0 8px; }

.summary-wrapper { position: sticky; top: 20px; }
.product-mini { display: flex; justify-content: space-between; margin: 24px 0; padding-bottom: 20px; border-bottom: 1px solid #eee; }
.p-name  { font-weight: 600; }
.p-qty   { font-size: 13px; color: #888; margin-top: 5px; }
.p-price { font-weight: 700; }

.price-breakdown .row { display: flex; justify-content: space-between; margin-bottom: 14px; }
.total-row { border-top: 1px solid #eee; padding-top: 18px; margin-top: 18px; font-weight: 700; font-size: 20px; }
.free-badge { color: #27ae60; font-weight: 700; }

.btn-checkout { width: 100%; height: 58px; border: none; border-radius: 14px; background: #111; color: #fff; font-weight: 700; margin: 28px 0; cursor: pointer; font-size: 15px; transition: opacity .2s; }
.btn-checkout:disabled { opacity: .6; cursor: not-allowed; }
.btn-loader { width: 22px; height: 22px; border: 2px solid rgba(255,255,255,.3); border-top-color: #fff; border-radius: 50%; display: inline-block; animation: spin .7s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.security-footer { text-align: center; }
.security-footer p    { font-size: 13px; font-weight: 700; }
.security-footer span { font-size: 11px; color: #999; }

.empty-state   { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
.empty-content { text-align: center; }
.empty-icon    { font-size: 60px; margin-bottom: 20px; }
.btn-primary   { margin-top: 20px; padding: 14px 24px; border: none; border-radius: 12px; background: #111; color: #fff; cursor: pointer; }

.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.75); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 99999; animation: fadeIn .3s ease; }
.success-modal { width: 100%; max-width: 480px; background: #fff; border-radius: 30px; padding: 45px; text-align: center; animation: popup .35s ease; box-shadow: 0 40px 80px rgba(0,0,0,.18); }
.success-circle { width: 95px; height: 95px; margin: 0 auto 25px; border-radius: 50%; background: linear-gradient(135deg, #41d16f, #27ae60); color: #fff; font-size: 42px; display: flex; align-items: center; justify-content: center; }
.success-tag  { display: inline-block; font-size: 11px; letter-spacing: 4px; font-weight: 700; color: #b38e5d; margin-bottom: 16px; }
.success-modal h2 { font-size: 38px; margin-bottom: 14px; color: #111; font-family: 'Playfair Display', serif; }
.success-modal p  { color: #666; line-height: 1.7; margin-bottom: 30px; }
.success-info { background: #fafafa; padding: 22px; border-radius: 18px; margin-bottom: 28px; }
.info-row { display: flex; justify-content: space-between; margin-bottom: 14px; }
.info-row:last-child { margin-bottom: 0; }
.success-button { width: 100%; height: 58px; border: none; border-radius: 16px; background: #111; color: #fff; font-weight: 600; cursor: pointer; }

@keyframes popup  { from { opacity: 0; transform: scale(.85) translateY(30px); } to { opacity: 1; transform: scale(1) translateY(0); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.fade-overlay-enter-active, .fade-overlay-leave-active { transition: opacity .3s; }
.fade-overlay-enter-from, .fade-overlay-leave-to { opacity: 0; }

@media (max-width: 900px) {
  .checkout-grid { grid-template-columns: 1fr; }
  .payment-box   { flex-direction: column; text-align: center; }
  .copy-code-area { justify-content: center; }
}

@media (max-width: 600px) {
  .checkout-page { padding: 20px 14px; }
  .checkout-section, .summary-wrapper, .success-modal { padding: 24px; }
  .input-grid { grid-template-columns: 1fr; }
  .input-group.full { grid-column: span 1; }
  .title { font-size: 30px; }
  .success-modal h2 { font-size: 30px; }
}
</style>