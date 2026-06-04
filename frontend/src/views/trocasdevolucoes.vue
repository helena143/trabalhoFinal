<template>
  <div class="page">

    <!-- HERO -->
    <header class="hero">
      <div class="hero-inner">
        <span class="tag">SUPORTE PREMIUM</span>
        <h1>Trocas e Devoluções</h1>
        <p>
          Um processo simples, seguro e transparente para garantir sua melhor experiência.
        </p>
      </div>
    </header>

    <!-- INTRO -->
    <section class="intro">
      <p>
        Na IVY, cada detalhe importa. Caso precise realizar uma troca ou devolução,
        seguimos um processo rápido, organizado e totalmente seguro.
      </p>
    </section>

    <!-- CARDS -->
    <main class="grid">

      <article class="card">
        <div class="icon">
          <svg viewBox="0 0 24 24">
            <path d="M4 7l8-4 8 4-8 4-8-4z"/>
            <path d="M4 7v10l8 4 8-4V7"/>
          </svg>
        </div>
        <h3>Prazo para solicitação</h3>
        <p>Você pode solicitar troca ou devolução em até 7 dias após o recebimento do pedido.</p>
        <span>Direito do consumidor</span>
      </article>

      <article class="card">
        <div class="icon">
          <svg viewBox="0 0 24 24">
            <path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z"/>
          </svg>
        </div>
        <h3>Condição do produto</h3>
        <p>O item deve estar sem uso e com embalagem original preservada.</p>
        <span>Condição obrigatória</span>
      </article>

      <article class="card">
        <div class="icon">
          <svg viewBox="0 0 24 24">
            <path d="M3 7h12v8H3z"/>
            <path d="M15 9h4l2 3v3h-6z"/>
            <circle cx="7" cy="17" r="1.5"/>
            <circle cx="17" cy="17" r="1.5"/>
          </svg>
        </div>
        <h3>Logística reversa</h3>
        <p>Após aprovação, enviamos um código de postagem sem custo adicional.</p>
        <span>Envio gratuito</span>
      </article>

      <article class="card">
        <div class="icon">
          <svg viewBox="0 0 24 24">
            <rect x="3" y="5" width="18" height="14" rx="2"/>
            <path d="M3 9h18"/>
          </svg>
        </div>
        <h3>Reembolso ou troca</h3>
        <p>Você pode escolher entre reembolso ou troca por outro produto disponível.</p>
        <span>Processo rápido</span>
      </article>

    </main>

    <!-- SUPORTE -->
    <section class="support">
      <h2>Precisa de ajuda?</h2>
      <p>Nosso time está pronto para te atender com excelência.</p>

      <a class="btn" href="https://wa.me/5531999999999" target="_blank">
        💬 Falar com suporte
      </a>
    </section>

    <!-- WHATSAPP BOTÃO (SEM BOLA) -->
    <a
      class="whatsapp-float"
      href="https://wa.me/5531999999999?text=Olá,%20preciso%20de%20ajuda"
      target="_blank"
    >
      <svg viewBox="0 0 32 32">
        <path d="M19 17c-2-1-3-2-4-3s-2-2-3-3c-1-1-2-1-2 0-1 2-1 3 0 5 2 3 5 6 8 8 2 1 3 1 5 0 1-1 1-2 0-2-1-1-2-1-4-2z"/>
      </svg>
      <span>Suporte</span>
    </a>

  </div>
</template>

<script>
export default {
  name: "TrocasDevolucoes"
};
</script>

<style scoped>

/* BASE */
.page {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI";
  background: #f5f5f7;
  color: #1d1d1f;
  min-height: 100vh;
  padding-bottom: 80px;
}

/* HERO */
.hero {
  text-align: center;
  padding: 90px 20px 40px;
}

.hero-inner {
  max-width: 650px;
  margin: auto;
}

.tag {
  font-size: 11px;
  letter-spacing: 2px;
  color: #6e6e73;
}

.hero h1 {
  font-size: 40px;
  font-weight: 600;
  margin-top: 10px;
}

.hero p {
  margin-top: 10px;
  font-size: 15px;
  color: #6e6e73;
}

/* INTRO */
.intro {
  max-width: 720px;
  margin: 0 auto 30px;
  text-align: center;
  font-size: 14px;
  color: #6e6e73;
  padding: 0 20px;
}

/* GRID */
.grid {
  max-width: 950px;
  margin: auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

/* CARD */
.card {
  background: #fff;
  border-radius: 22px;
  padding: 26px;
  border: 1px solid #eee;
  box-shadow: 0 10px 30px rgba(0,0,0,0.04);
  transition: 0.3s;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 25px 60px rgba(0,0,0,0.08);
}

/* ICONES */
.icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: #f8f6f2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.icon svg {
  width: 20px;
  height: 20px;
  stroke: #1d1d1f;
  fill: none;
  stroke-width: 1.5;
}

.card:hover .icon {
  background: #1d1d1f;
}

.card:hover .icon svg {
  stroke: #fff;
}

/* TEXT */
h3 {
  font-size: 16px;
}

p {
  font-size: 13px;
  color: #6e6e73;
}

span {
  display: inline-block;
  margin-top: 10px;
  font-size: 12px;
  border-top: 1px solid #eee;
  padding-top: 8px;
}

/* SUPORTE */
.support {
  text-align: center;
  margin-top: 50px;
}

.btn {
  display: inline-block;
  margin-top: 16px;
  padding: 14px 20px;
  background: #1d1d1f;
  color: #fff;
  border-radius: 12px;
  text-decoration: none;
}

/* WHATSAPP SEM BOLINHA */
.whatsapp-float {
  position: fixed;
  bottom: 22px;
  right: 22px;

  padding: 12px 16px;
  background: #25d366;
  border-radius: 14px;

  display: flex;
  align-items: center;
  gap: 8px;

  color: #fff;
  text-decoration: none;

  box-shadow: 0 15px 40px rgba(0,0,0,0.2);
  transition: 0.3s;
}

.whatsapp-float svg {
  width: 20px;
  fill: #fff;
}

.whatsapp-float:hover {
  transform: translateY(-3px);
}

/* RESPONSIVO */
@media (max-width: 700px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .hero h1 {
    font-size: 30px;
  }
}

</style>