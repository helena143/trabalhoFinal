<template>
  <main class="orders-page">

    <!-- HERO EDITORIAL -->
    <section class="hero">
      <div class="hero-left">
        <div class="hero-label">
          <span class="label-line"></span>
          <span>Central IVY</span>
        </div>
        <h1>
          <span class="h1-thin">Sobre</span><br/>
          <span class="h1-bold">Pedidos</span>
        </h1>
        <p class="hero-desc">
          Acompanhe informações importantes sobre compras,
          pagamentos, rastreios, alterações e entregas
          da sua experiência IVY.
        </p>
      </div>

      <div class="hero-right">
        <div class="hero-stat">
          <span class="stat-num">24h</span>
          <span class="stat-label">Prazo de resposta</span>
        </div>
        <div class="hero-stat">
          <span class="stat-num">100%</span>
          <span class="stat-label">Compra protegida</span>
        </div>
        <div class="hero-stat">
          <span class="stat-num">5★</span>
          <span class="stat-label">Suporte especializado</span>
        </div>
      </div>
    </section>

    <!-- TÓPICOS -->
    <section class="topics">
      <div class="topics-header">
        <span class="section-tag">DÚVIDAS FREQUENTES</span>
        <div class="tag-line"></div>
      </div>

      <div class="topics-grid">

        <article class="topic-card" v-for="(topic, i) in topics" :key="i"
          :class="{ featured: topic.featured }"
        >
          <div class="topic-number">{{ String(i + 1).padStart(2, '0') }}</div>
          <div class="topic-icon">
            <component :is="topic.icon" :size="22" stroke-width="1.5" />
          </div>
          <h3>{{ topic.title }}</h3>
          <p>{{ topic.desc }}</p>
          <div class="topic-arrow">→</div>
        </article>

      </div>
    </section>

    <!-- BANNER GARANTIAS -->
    <section class="guarantees">
      <div class="g-item" v-for="g in guarantees" :key="g.label">
        <component :is="g.icon" :size="18" stroke-width="1.5" />
        <span>{{ g.label }}</span>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="cta">
      <div class="cta-inner">
        <div class="cta-tag">PRECISA DE AJUDA?</div>
        <h2>Nossa equipe está<br/><em>sempre aqui</em></h2>
        <p>Disponível para resolver qualquer dúvida sobre seu pedido com agilidade e atenção.</p>
        <button class="cta-btn" @click="$router.push('/atendimento')">
          <span>Falar com suporte</span>
          <span class="btn-arrow">↗</span>
        </button>
      </div>
      <div class="cta-deco">
        <div class="deco-ring ring-1"></div>
        <div class="deco-ring ring-2"></div>
        <div class="deco-ring ring-3"></div>
        <span class="deco-word">IVY</span>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import {
  ShoppingBag, Truck, XCircle, MapPin,
  Clock3, CreditCard, ShieldCheck,
  PackageCheck, Headphones
} from 'lucide-vue-next'

const topics = [
  {
    icon: ShoppingBag,
    title: 'Como faço um pedido?',
    desc: 'Escolha seus produtos favoritos, adicione ao carrinho e finalize a compra preenchendo seus dados e endereço de entrega.',
    featured: true,
  },
  {
    icon: Truck,
    title: 'Como acompanhar meu pedido?',
    desc: 'Assim que o pedido for enviado, você receberá um código de rastreio por e-mail para acompanhar a entrega em tempo real.',
  },
  {
    icon: XCircle,
    title: 'Posso cancelar um pedido?',
    desc: 'O cancelamento pode ser realizado antes do envio do produto. Entre em contato com nosso suporte o quanto antes.',
  },
  {
    icon: MapPin,
    title: 'Posso alterar meu endereço?',
    desc: 'Alterações são permitidas apenas antes do despacho do pedido. Após o envio não é possível modificar o destino.',
  },
  {
    icon: Clock3,
    title: 'O pedido atrasou. E agora?',
    desc: 'Caso o prazo informado seja ultrapassado, nossa equipe verificará imediatamente junto à transportadora responsável.',
    featured: true,
  },
  {
    icon: CreditCard,
    title: 'Formas de pagamento',
    desc: 'Aceitamos cartão de crédito, PIX e boleto bancário com total segurança e proteção em todas as transações.',
  },
]

const guarantees = [
  { icon: PackageCheck, label: 'Envio rápido e seguro' },
  { icon: ShieldCheck,  label: 'Compra 100% protegida' },
  { icon: Headphones,   label: 'Suporte especializado' },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

.orders-page {
  --gold: #b08d57;
  --gold-light: #d4b07a;
  --dark: #0e0e0e;
  --text: #2a2a2a;
  --muted: #888;
  --border: #e8e4de;
  --bg: #faf8f5;

  min-height: 100vh;
  background: var(--bg);
  font-family: 'DM Sans', sans-serif;
  color: var(--text);
  overflow-x: hidden;
}

/* ── HERO ── */
.hero {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 40px 64px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  border-bottom: 1px solid var(--border);
}

.hero-label {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.62rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--gold);
  font-weight: 500;
  margin-bottom: 20px;
}

.label-line {
  display: block;
  width: 28px;
  height: 1px;
  background: var(--gold);
}

h1 {
  font-family: 'Cormorant Garamond', serif;
  line-height: 0.95;
  margin: 0 0 24px;
}

.h1-thin {
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 300;
  color: var(--muted);
  display: block;
}

.h1-bold {
  font-size: clamp(3.8rem, 9vw, 7rem);
  font-weight: 600;
  color: var(--dark);
  display: block;
  margin-top: -4px;
}

.hero-desc {
  font-size: 0.9rem;
  line-height: 1.85;
  color: var(--muted);
  max-width: 420px;
}

.hero-right {
  display: flex;
  flex-direction: column;
  gap: 0;
  border-left: 1px solid var(--border);
  padding-left: 60px;
}

.hero-stat {
  padding: 24px 0;
  border-bottom: 1px solid var(--border);
}
.hero-stat:last-child { border-bottom: none; }

.stat-num {
  display: block;
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.8rem;
  font-weight: 300;
  color: var(--dark);
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

/* ── TOPICS ── */
.topics {
  max-width: 1200px;
  margin: 0 auto;
  padding: 72px 40px;
}

.topics-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 48px;
}

.section-tag {
  font-size: 0.62rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--gold);
  font-weight: 500;
  white-space: nowrap;
}

.tag-line {
  flex: 1;
  height: 1px;
  background: var(--border);
}

.topics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
}

.topic-card {
  position: relative;
  background: var(--bg);
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: background 0.3s;
  cursor: default;
}

.topic-card:hover {
  background: #fff;
}

.topic-card.featured {
  background: var(--dark);
}

.topic-card.featured h3,
.topic-card.featured p,
.topic-card.featured .topic-number,
.topic-card.featured .topic-arrow {
  color: rgba(255,255,255,0.9);
}

.topic-card.featured .topic-icon {
  color: var(--gold-light);
  background: rgba(255,255,255,0.06);
}

.topic-card.featured p {
  color: rgba(255,255,255,0.5);
}

.topic-number {
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.72rem;
  font-weight: 400;
  color: var(--border);
  letter-spacing: 0.1em;
}

.topic-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: rgba(176,141,87,0.08);
  color: var(--gold);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
}

.topic-card h3 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--dark);
  line-height: 1.3;
  margin: 0;
}

.topic-card p {
  font-size: 0.8rem;
  line-height: 1.8;
  color: var(--muted);
  margin: 0;
  flex: 1;
}

.topic-arrow {
  font-size: 1rem;
  color: var(--border);
  margin-top: 8px;
  transition: color 0.2s, transform 0.2s;
}

.topic-card:hover .topic-arrow {
  color: var(--gold);
  transform: translate(3px, -3px);
}

/* ── GUARANTEES ── */
.guarantees {
  max-width: 1200px;
  margin: 0 auto 0;
  padding: 0 40px 72px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.g-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 24px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #fff;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text);
  letter-spacing: 0.02em;
}

.g-item svg { color: var(--gold); flex-shrink: 0; }

/* ── CTA ── */
.cta {
  margin: 0 40px 80px;
  max-width: 1120px;
  margin-left: auto;
  margin-right: auto;
  background: var(--dark);
  border-radius: 20px;
  padding: 64px 72px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 40px;
  overflow: hidden;
  position: relative;
}

.cta-inner { position: relative; z-index: 2; }

.cta-tag {
  font-size: 0.6rem;
  letter-spacing: 0.38em;
  text-transform: uppercase;
  color: var(--gold);
  font-weight: 500;
  margin-bottom: 16px;
}

.cta-inner h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 300;
  color: #fff;
  line-height: 1.2;
  margin: 0 0 14px;
}

.cta-inner h2 em {
  font-style: italic;
  color: var(--gold-light);
}

.cta-inner p {
  font-size: 0.85rem;
  line-height: 1.8;
  color: rgba(255,255,255,0.5);
  max-width: 440px;
  margin: 0 0 32px;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  background: var(--gold);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer;
  transition: background 0.25s, transform 0.2s;
}
.cta-btn:hover { background: var(--gold-light); transform: translateY(-2px); }

.btn-arrow {
  font-size: 1rem;
  line-height: 1;
  transition: transform 0.2s;
}
.cta-btn:hover .btn-arrow { transform: translate(2px, -2px); }

/* DECO */
.cta-deco {
  position: relative;
  width: 200px;
  height: 200px;
  flex-shrink: 0;
}

.deco-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.06);
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}
.ring-1 { width: 120px; height: 120px; }
.ring-2 { width: 160px; height: 160px; border-color: rgba(176,141,87,0.15); }
.ring-3 { width: 200px; height: 200px; }

.deco-word {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
  font-weight: 300;
  letter-spacing: 0.5em;
  color: rgba(255,255,255,0.08);
  white-space: nowrap;
}

/* ── RESPONSIVE ── */
@media (max-width: 960px) {
  .hero { grid-template-columns: 1fr; gap: 40px; padding: 60px 24px 48px; }
  .hero-right { border-left: none; border-top: 1px solid var(--border); padding-left: 0; padding-top: 32px; flex-direction: row; flex-wrap: wrap; gap: 0; }
  .hero-stat { flex: 1; min-width: 140px; border-bottom: none; border-right: 1px solid var(--border); padding: 16px 24px; }
  .hero-stat:last-child { border-right: none; }
  .topics { padding: 48px 24px; }
  .topics-grid { grid-template-columns: 1fr 1fr; }
  .guarantees { padding: 0 24px 48px; grid-template-columns: 1fr; }
  .cta { margin: 0 24px 60px; padding: 40px; }
  .cta-deco { display: none; }
}

@media (max-width: 640px) {
  .topics-grid { grid-template-columns: 1fr; }
  .cta { padding: 32px 28px; }
  .h1-bold { font-size: 3.2rem; }
  .h1-thin { font-size: 2.4rem; }
}
</style>