<template>
  <main class="luxury-home">

    <!-- TOP BAR -->
    <div class="announcement-bar">
      FRETE GRÁTIS ACIMA DE R$ 299 • 10% OFF NO PIX • GARANTIA VITALÍCIA
    </div>

    <!-- HERO -->
    <section class="hero">
      <div class="hero-grid">

        <div class="hero-img">
          <img src="/img/colar1.jpg" />
        </div>

        <div class="hero-img bw">
          <img src="/img/colar3.jpg" />
        </div>

        <div class="hero-img">
          <img src="/img/colar2.jpg" />
        </div>

      </div>
    </section>

    <!-- LANÇAMENTOS -->
    <section class="section">
      <div class="section-header">
        <span>Lançamentos</span>
        <h2>Novidades da Coleção</h2>
      </div>

      <div class="product-grid">

        <div class="product-card">
          <img src="/img/colar.png" />
          <h4>Colar Aurora</h4>
          <p class="price">R$ 459,00</p>
        </div>

        <div class="product-card">
          <img src="/img/colar.png" />
          <h4>Colar Elegance</h4>
          <p class="price">R$ 399,00</p>
        </div>

        <div class="product-card">
          <img src="/img/colar.png" />
          <h4>Colar Signature</h4>
          <p class="price">R$ 349,00</p>
        </div>

        <div class="product-card">
          <img src="/img/colar.png" />
          <h4>Colar Premium</h4>
          <p class="price">R$ 299,00</p>
        </div>

      </div>
    </section>

    <!-- PEÇAS MAIS DESEJADAS -->
    <section class="section bg-light">
      <div class="section-header">
        <span>Destaques</span>
        <h2>Peças Mais Desejadas</h2>
      </div>

      <div class="product-grid">

        <div class="product-card">
          <img src="/img/colar.png" />
          <h4>Colar Lux</h4>
          <p class="price">R$ 329,00</p>
        </div>

        <div class="product-card">
          <img src="/img/pulseira.png" />
          <h4>Pulseira Diamond</h4>
          <p class="price">R$ 259,00</p>
        </div>

        <div class="product-card">
          <img src="/img/anel.png" />
          <h4>Anel Diamond</h4>
          <p class="price">R$ 279,00</p>
        </div>

        <div class="product-card">
          <img src="/img/relogio.png" />
          <h4>Relógio Premium</h4>
          <p class="price">R$ 499,00</p>
        </div>

      </div>
    </section>

    <!-- CATEGORIAS -->
    <section class="categories">

      <div class="cat-card">
        <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338" />
        <div class="overlay">
          <span>Alta Joalheria</span>
          <h3>Joias em Prata 925</h3>
        </div>
      </div>

      <div class="cat-card">
        <img src="https://images.unsplash.com/photo-1541643600914-78b084683601" />
        <div class="overlay">
          <span>Fragrâncias</span>
          <h3>Perfumes de Nicho</h3>
        </div>
      </div>

      <div class="cat-card">
        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" />
        <div class="overlay">
          <span>Lançamento</span>
          <h3>Relógios Premium</h3>
        </div>
      </div>

    </section>

  </main>
</template>

<script setup>
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&family=Montserrat:wght@300;400;500;600&display=swap');

:root {
  --navy: #133F7C;
  --purple: #6B63A3;
  --light: #F6F6F6;
}

.luxury-home {
  font-family: 'Montserrat', sans-serif;
  color: #1a1a1a;
}

.announcement-bar {
  background: var(--navy);
  color: #fff;
  text-align: center;
  padding: 12px;
  font-size: 10px;
  letter-spacing: 2px;
}

.hero {
  padding: 60px 2%;
}

.hero-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1600px;
  margin: auto;
}

.hero-img {
  height: 600px;
  overflow: hidden;
  margin-top: -60px;
}

.hero-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bw {
  filter: grayscale(100%);
}

.section {
  padding: 120px 5%;
  text-align: center;
}

.bg-light {
  background: var(--light);
}

.section-header span {
  font-size: 11px;
  letter-spacing: 4px;
  color: var(--purple);
  text-transform: uppercase;
}

.section-header h2 {
  font-family: 'Cinzel', serif;
  font-size: 36px;
  color: var(--navy);
  margin: 15px 0 60px;
  font-weight: 400;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 35px;
  max-width: 1400px;
  margin: auto;
}

.product-card img {
  width: 100%;
  height: 380px;
  object-fit: cover;
  margin-bottom: 15px;
}

.price {
  font-weight: 600;
  color: var(--navy);
}

.categories {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 120px 5%;
  max-width: 1600px;
  margin: auto;
}

.cat-card {
  position: relative;
  height: 520px;
  overflow: hidden;
}

.cat-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  bottom: 40px;
  left: 40px;
  color: #fff;
}

.overlay span {
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
}

.overlay h3 {
  font-family: 'Cinzel', serif;
  font-size: 28px;
  margin-top: 8px;
}

.benefits {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  padding: 100px 10%;
  background: var(--navy);
  color: #fff;
  text-align: center;
}

@media (max-width: 900px) {
  .hero-grid,
  .product-grid,
  .categories,
  .benefits {
    grid-template-columns: 1fr;
  }

  .hero-img {
    margin-top: 0;
  }
}
</style>