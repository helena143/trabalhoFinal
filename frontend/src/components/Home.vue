<template>
  <main class="home">
    <!-- HERO SECTION -->
    <section class="hero">
      <div class="hero-grid">
        <div class="hero-item side">
          <img :src="hero.left" alt="Coleção IVY Esquerda" />
        </div>
        <div class="hero-item center">
          <img :src="hero.center" alt="Destaque Principal IVY" />
          <div class="overlay">
            <div class="content">
              <span class="tag">IVY HIGH JEWELRY</span>
              <h1>Elegância que<br />impressiona</h1>
              <p>Joias autorais e atemporais lapidadas para eternizar os seus momentos mais inesquecíveis.</p>
              <div class="hero-btns">
                <router-link to="/joias" class="btn-hero">EXPLORAR COLEÇÃO</router-link>
                <router-link to="/sale" class="btn-hero ghost">VER OFERTAS</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="hero-item side">
          <img :src="hero.right" alt="Coleção IVY Direita" />
        </div>
      </div>
    </section>

    <!-- PROPÓSITO / BENEFÍCIOS -->
    <section class="benefits-section">
      <div class="benefits">
        <div class="benefit" v-for="(b, index) in benefits" :key="index">
          <div class="benefit-icon" v-html="b.icon" />
          <div class="benefit-texts">
            <p class="b-title">{{ b.title }}</p>
            <p class="b-sub">{{ b.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CATEGORIAS EM DESTAQUE -->
    <section class="categories-section" data-reveal>
      <div class="section-header">
        <p>Navegue por Categoria</p>
        <h2>As Suas Preferidas</h2>
      </div>
      <div class="categories-grid">
        <div 
          v-for="cat in categories" 
          :key="cat.title" 
          class="category-card"
          @click="goToCategory(cat.route)"
        >
          <img :src="cat.image" :alt="cat.title" loading="lazy" />
          <div class="category-overlay">
            <h3>{{ cat.title }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- MAIS VENDIDOS (LAYOUT ASSIMÉTRICO) -->
    <section class="best-sellers">
      <div class="section-header">
        <p>Favoritos da Temporada</p>
        <h2>Os Mais Desejados</h2>
      </div>
      <div class="best-layout" data-reveal v-if="bestSellers.length > 0">
        <div class="featured-product" @click="openModal(bestSellers[0])">
          <img :src="bestSellers[0].image" :alt="bestSellers[0].name" />
          <div class="featured-overlay"></div>
          <div class="featured-content">
            <span class="featured-badge">Peça de Destaque</span>
            <h3>{{ bestSellers[0].name }}</h3>
            <p>{{ bestSellers[0].description }}</p>
            <strong>R$ {{ formatPrice(bestSellers[0].price) }}</strong>
            <div class="featured-btns">
              <button class="btn-feat-buy" @click.stop="buyNow(bestSellers[0])">Comprar</button>
              <button class="btn-feat-bag" @click.stop="addToCart(bestSellers[0])">Sacola</button>
            </div>
          </div>
        </div>
        <div class="best-side">
          <div
            v-for="product in bestSellers.slice(1, 4)"
            :key="product.id"
            class="mini-product"
            @click="openModal(product)"
          >
            <div class="mini-img">
              <img :src="product.image" :alt="product.name" loading="lazy" />
            </div>
            <div class="mini-info">
              <p class="mini-cat">IVY Collection</p>
              <h4>{{ product.name }}</h4>
              <p class="mini-price">R$ {{ formatPrice(product.price) }}</p>
              <div class="mini-btns">
                <button class="btn-mini-buy" @click.stop="buyNow(product)">Comprar</button>
                <button class="btn-mini-bag" @click.stop="addToCart(product)">+ Sacola</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- COUNTDOWN NAMORADOS -->
    <section class="countdown-section">
      <div class="countdown-bg" :style="{ backgroundImage: `url(${bannerCountdown})` }"></div>
      <div class="countdown-overlay"></div>
      <div class="countdown-inner">
        <span class="limited-badge" data-reveal> EDIÇÃO LIMITADA</span>
        <h2 data-reveal>Dia dos Namorados IVY</h2>
        <p data-reveal>Garanta o presente perfeito com design exclusivo e caixa de veludo premium antes do término do cronômetro.</p>
        <div class="countdown-timer" data-reveal>
          <div v-for="(val, key) in countdown" :key="key" class="timer-unit">
            <span class="timer-num">{{ String(val).padStart(2, '0') }}</span>
            <span class="timer-label">{{ timerLabels[key] }}</span>
          </div>
        </div>
        <button class="btn-gold" data-reveal @click="goToCollection">VER COLEÇÃO EXCLUSIVA</button>
      </div>
    </section>

    <!-- VITRINE DE PRODUTOS COMPLETA -->
    <section class="products">
      <div class="section-header">
        <p>Seleção Especial</p>
        <h2>Coleção Namorados</h2>
      </div>
      <div class="grid grid-4">
        <div
          v-for="product in valentinesCollection"
          :key="product.id"
          class="ivy-card"
          @click="openModal(product)"
          data-reveal
        >
          <div class="card-img-wrap">
            <img :src="product.image" :alt="product.name" loading="lazy" />
            <span class="card-badge" v-if="product.badge">{{ product.badge }}</span>
            <div class="card-quick-view">VER DETALHES</div>
          </div>
          <div class="card-body">
            <p class="card-cat">{{ product.category }}</p>
            <h3 class="card-name">{{ product.name }}</h3>
            <p class="card-desc">{{ product.description }}</p>

            <div class="card-rating">
              <span v-for="s in 5" :key="s" class="star" :class="{ filled: s <= product.stars }">★</span>
              <span class="rating-count">({{ product.reviews }})</span>
            </div>

            <div class="card-tags">
              <span v-for="tag in product.tags" :key="tag" class="card-tag">{{ tag }}</span>
            </div>

            <div class="card-price-row">
              <div>
                <span class="card-price">R$ {{ formatPrice(product.price) }}</span>
                <span class="card-installment">10x R$ {{ formatPrice(product.price / 10) }}</span>
              </div>
              <span class="card-pix" v-if="product.pixDiscount">PIX {{ product.pixDiscount }}% off</span>
            </div>
          </div>
          <hr class="card-divider" />
          <div class="card-footer">
            <div class="card-btn-group">
              <button class="btn-buy-now" @click.stop="buyNow(product)">Comprar</button>
              <button class="btn-add-bag" @click.stop="addToCart(product)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </button>
            </div>
            <p class="card-frete"> Frete grátis</p>
          </div>
        </div>
      </div>
    </section>

    <!-- MODAL DE PRODUTO -->
    <Transition name="modal-fade">
      <div v-if="selectedProduct" class="modal" @click.self="closeModal">
        <div class="modal-box">
          <button class="modal-close-btn" @click="closeModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <div class="modal-grid">
            <div class="modal-img-wrap">
              <img :src="selectedProduct.image" :alt="selectedProduct.name" />
            </div>
            <div class="modal-details">
              <span class="modal-tag">IVY Luxury</span>
              <h2>{{ selectedProduct.name }}</h2>
              <p class="modal-desc">{{ selectedProduct.description }}</p>
              <div class="modal-price-block">
                <p class="modal-price">R$ {{ formatPrice(selectedProduct.price) }}</p>
                <p class="modal-installment">ou 10x de R$ {{ formatPrice(selectedProduct.price / 10) }} sem juros</p>
              </div>
              <div class="modal-info">
                <div class="info-row"><span>✓</span> Acabamento feito à mão em Ouro 18K / Prata 925</div>
                <div class="info-row"><span>✓</span> Certificado de Autenticidade e Garantia de 1 Ano</div>
                <div class="info-row"><span>✓</span> Embalagem Premium de Veludo Inclusa</div>
                <div class="info-row"><span>✓</span> Frete com Seguro Total Gratuito</div>
              </div>
              <div class="modal-btn-group">
                <button class="btn-buy-modal" @click="buyNow(selectedProduct)">Comprar Agora</button>
                <button class="btn-add-modal" @click="addToCart(selectedProduct)">Adicionar à Sacola</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- TOAST NOTIFICATION -->
    <Transition name="toast-slide">
      <div v-if="toast.show" class="toast-notification" :class="toast.type">
        <div class="toast-content">
          <svg v-if="toast.type === 'success'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><polyline points="20 6 9 17 4 12"/></svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span>{{ toast.message }}</span>
        </div>
      </div>
    </Transition>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import { addToCart as storeAddToCart } from "@/stores/cart"
import { useRouter } from "vue-router"

const router = useRouter()

const hero = {
  left:   "http://localhost:3000/public/products/colarHome1.jpg",
  center: "http://localhost:3000/public/products/colarHome2.jpg",
  right:  "http://localhost:3000/public/products/colarHome3.jpg",
}

const bannerCountdown = "http://localhost:3000/public/products/banner233.png"

const benefits = [
  { icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`, title: "Frete Grátis", desc: "Em todo o Brasil acima de R$ 299" },
  { icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`, title: "Parcelamento Facilitado", desc: "Até 10x sem juros nos cartões" },
  { icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`, title: "Ambiente Criptografado", desc: "Segurança SSL de ponta a ponta" },
  { icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`, title: "Certificado de Garantia", desc: "12 meses de cobertura total" },
]

const bestSellers = ref([
  { id: 1, name: "Anel Imperial Gold",    price: 2490, description: "Lapidação brilhante com banho reforçado de ouro 18k.", image: "http://localhost:3000/public/products/anel1.png" },
  { id: 2, name: "Relógio III",            price: 1299, description: "Zircônias selecionadas com cravação artesanal impecável.", image: "http://localhost:3000/public/products/relogio11.png" },
  { id: 3, name: "Pulseira Diamond",       price: 459,  description: "Delicada e minimalista, o acessório ideal para o seu dia a dia.", image: "http://localhost:3000/public/products/pulseira4.png" },
  { id: 4, name: "Anel Coração Diamante",  price: 3600, description: "Sofisticação marcante com pedraria em tom profundo e acabamento polido.", image: "http://localhost:3000/public/products/coracao2.png" },
])

const valentinesCollection = ref([
  {
    id: 5, name: "Brinco Diamante Premium", price: 2100,
    description: "Símbolo do amor eterno cravejado com micro-zircônias selecionadas à mão. Acabamento em ouro branco 18k.",
    image: "http://localhost:3000/public/products/brinco2.png",
    badge: "Novo", category: "Alta Joalheria",
    stars: 5, reviews: 48, pixDiscount: 10,
    tags: ["Ouro 18k", "Zircônias", "Garantia 1 ano"],
  },
  {
    id: 6, name: "Anel Solitário Diamond", price: 2490,
    description: "O clássico atemporal redesenhado para a mulher moderna. Solitário em prata 925 com diamante central.",
    image: "http://localhost:3000/public/products/anel2.png",
    badge: "Destaque", category: "Anéis Premium",
    stars: 5, reviews: 62, pixDiscount: 10,
    tags: ["Prata 925", "Diamante", "Caixa veludo"],
  },
  {
    id: 7, name: "Colar de Rubi", price: 3400,
    description: "Fluidez e brilho natural para composições noturnas. Rubis lapidados em corrente de ouro amarelo 18k.",
    image: "http://localhost:3000/public/products/rubi.png",
    badge: "Limitado", category: "Colares Autorais",
    stars: 4, reviews: 31, pixDiscount: 10,
    tags: ["Ouro amarelo", "Rubi natural", "Edição limitada"],
  },
  {
    id: 8, name: "Pulseira Riviera Premium", price: 2800,
    description: "Uma linha contínua de luz e sofisticação para o seu pulso. Zircônias em degradê com fecho em ouro.",
    image: "http://localhost:3000/public/products/pulseira12.png",
    badge: "Best Seller", category: "Pulseiras Exclusivas",
    stars: 5, reviews: 74, pixDiscount: 10,
    tags: ["Ouro 18k", "Zircônias", "Frete grátis"],
  },
])

const categories = [
  { title: "Anéis Premium",        image: "http://localhost:3000/public/products/anel2.png",      route: "/joias" },
  { title: "Colares Autoriais",    image: "http://localhost:3000/public/products/rubi.png",        route: "/joias" },
  { title: "Pulseiras Exclusivas", image: "http://localhost:3000/public/products/pulseira12.png",  route: "/joias" },
  { title: "Brincos Finos",        image: "http://localhost:3000/public/products/brinco2.png",     route: "/joias" },
]

const targetDate = new Date("2026-06-12T23:59:59").getTime()
const countdown = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })
const timerLabels = { days: "Dias", hours: "Horas", minutes: "Min", seconds: "Seg" }
let countdownTimer = null

const updateCountdown = () => {
  const diff = targetDate - Date.now()
  if (diff <= 0) { clearInterval(countdownTimer); return }
  countdown.value = {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000)  / 60000),
    seconds: Math.floor((diff % 60000)    / 1000),
  }
}

const selectedProduct = ref(null)
const openModal  = (p) => { selectedProduct.value = p; document.body.style.overflow = "hidden" }
const closeModal = ()  => { selectedProduct.value = null; document.body.style.overflow = "" }


const addToCart = (product) => {
  const user = localStorage.getItem("user")

  if (!user) {
    showToast("Faça login para adicionar produtos à sacola.", "error")
    router.push("/login")
    return
  }

  storeAddToCart(product)
  closeModal()
  router.push("/carrinho")
}

const buyNow = (product) => {
  const user = localStorage.getItem("user")

  if (!user) {
    showToast("Faça login para continuar.", "error")
    router.push("/login")
    return
  }

  storeAddToCart(product)
  closeModal()
  router.push("/checkout")
}

const toast = ref({ show: false, message: "", type: "success" })
let toastTimer = null
const showToast = (message, type = "success") => {
  toast.value = { show: true, message, type }
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toast.value.show = false }, 3500)
}

const formatPrice    = (value) => value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const goToCollection = () => router.push("/joias")
const goToCategory   = (route) => router.push(route)

let observer = null
onMounted(() => {
  updateCountdown()
  countdownTimer = setInterval(updateCountdown, 1000)
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target) }
    })
  }, { threshold: 0.05, rootMargin: "0px 0px -20px 0px" })
  document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el))
})
onUnmounted(() => { clearInterval(countdownTimer); clearTimeout(toastTimer); observer?.disconnect() })
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Forum&family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap');

.home { font-family: "Inter", sans-serif; background: #fcfbfa; color: #1a1a1a; overflow-x: hidden; -webkit-font-smoothing: antialiased; }

[data-reveal] { opacity: 0; transform: translateY(30px); transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1); }
[data-reveal].is-visible { opacity: 1; transform: translateY(0); }

.hero-grid { display: grid; grid-template-columns: 0.9fr 1.5fr 0.9fr; height: 90vh; background: #111; }
.hero-item { position: relative; overflow: hidden; height: 100%; }
.hero-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 1.5s cubic-bezier(0.16, 1, 0.3, 1); filter: brightness(0.9); }
.hero-item:hover img { transform: scale(1.03); }
@media (max-width: 960px) { .hero-grid { grid-template-columns: 1fr; } .hero-item.side { display: none; } }

.overlay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 40px; background: linear-gradient(to top, rgba(17,17,17,0.85) 15%, rgba(17,17,17,0.3) 100%); }
.content { max-width: 580px; text-align: center; color: #ffffff; }

.tag { display: inline-block; padding: 6px 16px; border: 1px solid rgba(212,175,55,0.5); font-size: 9px; font-weight: 600; letter-spacing: 4px; text-transform: uppercase; color: #d4af37; margin-bottom: 24px; }

.content h1 { font-family: "Forum", serif; font-size: clamp(50px, 6vw, 90px); font-weight: 400; line-height: 1; letter-spacing: -1px; margin-bottom: 20px; color: #fff; text-shadow: 0 4px 40px rgba(0,0,0,0.35); }

.content p { font-size: 15px; font-weight: 300; line-height: 1.8; opacity: 0.85; margin-bottom: 35px; color: #f5f5f5; }

.hero-btns { display: flex; justify-content: center; gap: 16px; }
.btn-hero { height: 50px; padding: 0 30px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); background: #ffffff; color: #111111; }
.btn-hero:hover { background: #d4af37; color: #ffffff; transform: translateY(-2px); }
.btn-hero.ghost { background: transparent; border: 1px solid #ffffff; color: #ffffff; }
.btn-hero.ghost:hover { background: #ffffff; color: #111111; }

.benefits-section { background: #ffffff; border-bottom: 1px solid #eeeae6; }
.benefits { max-width: 1400px; margin: auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); padding: 40px 24px; gap: 30px; }
.benefit { display: flex; align-items: center; gap: 16px; }
.benefit-icon { width: 44px; height: 44px; border-radius: 50%; background: #faf8f5; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #b5942b; }
.benefit-icon svg { width: 20px; height: 20px; }
.b-title { font-size: 13px; font-weight: 600; color: #111; letter-spacing: 0.5px; }
.b-sub { font-size: 11px; color: #777; margin-top: 3px; font-weight: 300; }

.section-header { text-align: center; margin-bottom: 60px; padding: 0 20px; }
.section-header p { color: #d4af37; font-size: 11px; font-weight: 600; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 12px; }
.section-header h2 { font-family: "Cormorant Garamond", serif; font-size: clamp(32px, 3.5vw, 46px); font-weight: 300; color: #111; }

.categories-section { padding: 90px 6% 40px; max-width: 1600px; margin: 0 auto; }
.categories-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
.category-card { position: relative; height: 320px; overflow: hidden; cursor: pointer; background: #f0ece6; }
.category-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 1.2s ease; }
.category-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%); display: flex; align-items: flex-end; padding: 24px; transition: background 0.4s; }
.category-overlay h3 { font-family: "Cormorant Garamond", serif; font-size: 24px; font-weight: 400; color: #fff; letter-spacing: 0.5px; }
.category-card:hover img { transform: scale(1.05); }
.category-card:hover .category-overlay { background: linear-gradient(to top, rgba(181,148,43,0.6) 0%, transparent 100%); }

.best-sellers { padding: 80px 6%; max-width: 1600px; margin: 0 auto; }
.best-layout { display: grid; grid-template-columns: 1.3fr 1fr; gap: 30px; }
@media (max-width: 1024px) { .best-layout { grid-template-columns: 1fr; } }

.featured-product { position: relative; height: 100%; min-height: 550px; overflow: hidden; cursor: pointer; display: flex; align-items: flex-end; background: #e0dbd5; }
.featured-product img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 1.2s ease; }
.featured-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(17,17,17,0.9) 0%, rgba(17,17,17,0.2) 60%); }
.featured-content { position: relative; z-index: 2; padding: 45px; color: #fff; max-width: 500px; }
.featured-badge { display: inline-block; padding: 4px 12px; background: #d4af37; color: #111; font-size: 9px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 14px; }
.featured-content h3 { font-family: "Cormorant Garamond", serif; font-size: 38px; font-weight: 300; line-height: 1.2; margin-bottom: 10px; }
.featured-content p { font-size: 13px; font-weight: 300; opacity: 0.75; line-height: 1.6; margin-bottom: 20px; }
.featured-content strong { font-family: "Cormorant Garamond", serif; font-size: 30px; font-weight: 400; display: block; margin-bottom: 24px; color: #d4af37; }
.featured-btns { display: flex; gap: 12px; }

.btn-feat-buy, .btn-mini-buy, .btn-buy-now, .btn-buy-modal { height: 44px; padding: 0 24px; border: none; font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: all 0.3s; background: #d4af37; color: #fff; }
.btn-feat-buy:hover, .btn-mini-buy:hover, .btn-buy-now:hover, .btn-buy-modal:hover { background: #b5942b; }
.btn-feat-bag, .btn-mini-bag { height: 44px; padding: 0 20px; border: 1px solid rgba(255,255,255,0.3); background: transparent; color: #fff; font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: all 0.3s; }
.btn-feat-bag:hover { background: #ffffff; color: #111111; }

.best-side { display: flex; flex-direction: column; gap: 20px; justify-content: space-between; }
.mini-product { background: #ffffff; border: 1px solid #eeeae6; display: flex; cursor: pointer; transition: all 0.4s; height: calc(33.333% - 14px); min-height: 170px; }
.mini-img { width: 150px; background: #faf8f5; overflow: hidden; flex-shrink: 0; }
.mini-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s; }
.mini-info { padding: 24px; display: flex; flex-direction: column; justify-content: center; flex: 1; }
.mini-cat { font-size: 9px; color: #b5942b; letter-spacing: 2px; text-transform: uppercase; font-weight: 600; margin-bottom: 4px; }
.mini-info h4 { font-family: "Cormorant Garamond", serif; font-size: 21px; font-weight: 400; color: #111; margin-bottom: 6px; }
.mini-price { font-family: "Cormorant Garamond", serif; font-size: 20px; font-weight: 500; color: #111; margin-bottom: 14px; }
.mini-btns { display: flex; gap: 8px; }
.mini-btns .btn-mini-buy { height: 36px; padding: 0 16px; }
.mini-btns .btn-mini-bag { height: 36px; padding: 0 14px; border-color: #eeeae6; color: #111; }
.mini-btns .btn-mini-bag:hover { border-color: #111; color: #111; }
.mini-product:hover { transform: translateX(6px); border-color: #d4af37; }
.mini-product:hover .mini-img img { transform: scale(1.05); }

.countdown-section { position: relative; min-height: 480px; display: flex; align-items: center; justify-content: center; background: #111; }
.countdown-bg { position: absolute; inset: 0; background-size: cover; background-position: center; filter: brightness(0.4) grayscale(20%); }
.countdown-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(17,17,17,0.4), rgba(17,17,17,0.8)); }
.countdown-inner { position: relative; z-index: 2; text-align: center; max-width: 680px; padding: 60px 24px; color: #fff; display: flex; flex-direction: column; align-items: center; gap: 20px; }
.limited-badge { padding: 6px 16px; background: rgba(212,175,55,0.15); border: 1px solid #fffefc; color: #ffffff; font-size: 9px; font-weight: 600; letter-spacing: 3px; }
.countdown-inner h2 { font-family: "Cormorant Garamond", serif; font-size: clamp(34px, 4vw, 54px); font-weight: 300; }
.countdown-inner p { font-size: 14px; font-weight: 300; opacity: 0.8; line-height: 1.7; }
.countdown-timer { display: flex; gap: 14px; margin: 10px 0; }
.timer-unit { display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); width: 85px; height: 90px; }
.timer-num { font-family: "Cormorant Garamond", serif; font-size: 38px; font-weight: 300; color: #ffffff; }
.timer-label { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: #a3a3a3; margin-top: 2px; }
.btn-gold { height: 50px; padding: 0 32px; background: #ffffff; color: #111; border: none; font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: all 0.4s; }
.btn-gold:hover { background: #d4af37; color: #fff; transform: translateY(-2px); }

.products { padding: 90px 6%; max-width: 1600px; margin: 0 auto; }
.grid { display: grid; gap: 24px; }
.grid-4 { grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); }

.ivy-card { background: #ffffff; border: 1px solid #eeeae6; position: relative; display: flex; flex-direction: column; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.ivy-card:hover { transform: translateY(-6px); border-color: #d4af37; box-shadow: 0 16px 40px rgba(181,148,43,0.08); }

.card-img-wrap { position: relative; height: 280px; overflow: hidden; background: #faf8f5; }
.card-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 1.2s; }
.ivy-card:hover .card-img-wrap img { transform: scale(1.04); }

.card-quick-view { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(17,17,17,0.82); color: #fff; text-align: center; padding: 12px; font-size: 9px; font-weight: 600; letter-spacing: 3px; transform: translateY(100%); transition: transform 0.35s; }
.ivy-card:hover .card-quick-view { transform: translateY(0); }

.card-badge { position: absolute; top: 14px; left: 14px; background: #111; color: #fff; font-size: 8px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; padding: 4px 10px; }

.card-body { padding: 20px 20px 10px; flex: 1; display: flex; flex-direction: column; gap: 8px; }
.card-cat { font-size: 9px; color: #b5942b; letter-spacing: 2px; text-transform: uppercase; font-weight: 600; }
.card-name { font-family: "Cormorant Garamond", serif; font-size: 22px; font-weight: 400; color: #111; margin: 0; line-height: 1.2; }
.card-desc { font-size: 12px; color: #777; line-height: 1.7; font-weight: 300; }

.card-rating { display: flex; align-items: center; gap: 2px; }
.star { font-size: 13px; color: #ddd; line-height: 1; }
.star.filled { color: #d4af37; }
.rating-count { font-size: 11px; color: #aaa; margin-left: 5px; }

.card-tags { display: flex; flex-wrap: wrap; gap: 5px; }
.card-tag { font-size: 10px; color: #666; background: #f7f5f1; border: 1px solid #ece9e2; padding: 3px 8px; }

.card-price-row { display: flex; align-items: flex-end; justify-content: space-between; margin-top: 4px; }
.card-price { font-family: "Cormorant Garamond", serif; font-size: 22px; font-weight: 500; color: #111; display: block; }
.card-installment { font-size: 11px; color: #999; font-weight: 300; display: block; margin-top: 2px; }
.card-pix { font-size: 10px; background: rgba(34,197,94,0.08); color: #16a34a; border: 1px solid rgba(34,197,94,0.2); padding: 4px 8px; font-weight: 500; white-space: nowrap; align-self: flex-end; }

.card-divider { border: none; border-top: 1px solid #f5f3f0; margin: 0; }
.card-footer { padding: 12px 20px 18px; display: flex; flex-direction: column; gap: 6px; }
.card-btn-group { display: flex; gap: 8px; }

.btn-buy-now { flex: 1; height: 42px; background: #111; color: #fff; border: none; font-size: 9px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: background 0.3s; }
.btn-buy-now:hover { background: #d4af37; }

.btn-add-bag { width: 42px; height: 42px; background: transparent; border: 1px solid #eeeae6; color: #888; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s; flex-shrink: 0; }
.btn-add-bag:hover { border-color: #111; color: #111; }

.card-frete { font-size: 10px; color: #aaa; text-align: center; }

.modal { position: fixed; inset: 0; background: rgba(17,17,17,0.6); backdrop-filter: blur(8px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; }
.modal-box { background: #ffffff; width: 100%; max-width: 900px; position: relative; animation: modal-show 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes modal-show { from { opacity: 0; transform: scale(0.96) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
.modal-close-btn { position: absolute; top: 20px; right: 20px; background: transparent; border: none; cursor: pointer; color: #111; z-index: 5; }
.modal-grid { display: grid; grid-template-columns: 1.1fr 1fr; }
@media (max-width: 768px) { .modal-grid { grid-template-columns: 1fr; } }
.modal-img-wrap { background: #faf8f5; height: 100%; min-height: 400px; }
.modal-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
.modal-details { padding: 45px; display: flex; flex-direction: column; justify-content: center; }
.modal-tag { font-size: 9px; color: #b5942b; letter-spacing: 3px; text-transform: uppercase; font-weight: 600; margin-bottom: 8px; }
.modal-details h2 { font-family: "Cormorant Garamond", serif; font-size: 32px; font-weight: 400; color: #111; margin-bottom: 12px; }
.modal-desc { font-size: 13px; color: #666; line-height: 1.7; font-weight: 300; margin-bottom: 24px; }
.modal-price-block { background: #faf8f5; padding: 16px 20px; margin-bottom: 24px; border-left: 2px solid #d4af37; }
.modal-price { font-family: "Cormorant Garamond", serif; font-size: 26px; font-weight: 500; color: #111; }
.modal-installment { font-size: 11px; color: #777; margin-top: 4px; font-weight: 300; }
.modal-info { display: flex; flex-direction: column; gap: 10px; margin-bottom: 30px; }
.info-row { font-size: 11px; color: #444; font-weight: 300; display: flex; align-items: center; gap: 8px; }
.info-row span { color: #d4af37; font-weight: 600; }
.modal-btn-group { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 10px; }
.btn-buy-modal { height: 48px; }
.btn-add-modal { height: 48px; border: 1px solid #eeeae6; background: transparent; color: #111; font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: all 0.3s; }
.btn-add-modal:hover { background: #111; color: #fff; border-color: #111; }

.toast-notification { position: fixed; bottom: 30px; right: 30px; background: #111; color: #fff; padding: 16px 24px; z-index: 110; box-shadow: 0 20px 40px rgba(0,0,0,0.15); border-left: 3px solid #d4af37; }
.toast-content { display: flex; align-items: center; gap: 12px; font-size: 12px; font-weight: 500; letter-spacing: 0.5px; }
.toast-content svg { color: #d4af37; flex-shrink: 0; }

.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.4s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.toast-slide-enter-active, .toast-slide-leave-active { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.toast-slide-enter-from, .toast-slide-leave-to { opacity: 0; transform: translateY(20px); }
</style>