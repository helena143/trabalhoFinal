<template>
  <section class="sobre">
    <div class="hero">
      <div class="hero-content">
        <span class="subtitle">Desde 2024</span>
        <h1>Conheça a IVY</h1>
        <div class="divider"></div>
        <p>Elegância que acompanha cada momento da sua história</p>
      </div>
    </div>

    <div class="container">
      <div class="content-grid">
        <div class="text-block">
          <h2 class="section-title">Nossa Essência</h2>
          <p>
            A <strong>IVY</strong> nasceu com o propósito de transformar sentimentos em joias. 
            Não entregamos apenas metais preciosos; entregamos legados.
          </p>
          <p>
            Cada peça é criada com delicadeza, significado e atenção aos mínimos detalhes, 
            unindo o artesanato tradicional ao design contemporâneo.
          </p>
          <div class="quote">
            "Criamos símbolos de momentos inesquecíveis para cada fase da sua vida."
          </div>
        </div>

        <div class="image-wrapper">
          <div class="image-border"></div>
        <img src="/img/sobre.png" alt="Joia elegante"/>
        </div>
      </div>
    </div>

    <div class="valores-section">
      <div class="container">
        <div class="valores-grid">
          <div class="valor-card">
            <div class="icon"></div>
            <h3>Qualidade</h3>
            <p>Materiais nobres certificados e um acabamento manual impecável.</p>
          </div>

          <div class="valor-card">
            <div class="icon"></div>
            <h3>Elegância</h3>
            <p>Design sofisticado que transcende tendências passageiras.</p>
          </div>

          <div class="valor-card">
            <div class="icon"></div>
            <h3>Exclusividade</h3>
            <p>Cada detalhe é pensado para que sua joia seja tão única quanto você.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SobreIvy"
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

:root {
  --primary-color: #1a1a1a;
  --accent-color: #c5a059; /* Tom dourado suave */
  --text-muted: #666;
  --bg-light: #fcfcfc;
  --transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.sobre {
  background: #fff;
  color: var(--primary-color);
  font-family: 'Montserrat', sans-serif;
  overflow-x: hidden;
}

/* --- HERO SECTION --- */
.hero {
  height: 80vh;
  min-height: 500px;
  background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), 
              url("https://images.unsplash.com/photo-1608042314453-ae338d80c427") center/cover no-repeat fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.hero-content {
  padding: 40px;
  color: #fff;
  backdrop-filter: blur(4px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  max-width: 600px;
  animation: fadeIn 1.2s ease-out;
}

.subtitle {
  text-transform: uppercase;
  letter-spacing: 5px;
  font-size: 12px;
  display: block;
  margin-bottom: 10px;
  color: #c5a059;
}

.hero-content h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(32px, 5vw, 52px);
  margin-bottom: 20px;
}

.divider {
  width: 60px;
  height: 2px;
  background: #c5a059;
  margin: 20px auto;
}

/* --- LAYOUT --- */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 25px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  padding: 100px 0;
  align-items: center;
}

.text-block {
  animation: slideInLeft 1s ease;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  margin-bottom: 30px;
  position: relative;
}

.text-block p {
  line-height: 1.8;
  color: var(--text-muted);
  margin-bottom: 20px;
  font-size: 16px;
}

.quote {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: 20px;
  border-left: 3px solid #c5a059;
  padding-left: 20px;
  margin-top: 30px;
  color: #444;
}

/* --- IMAGEM COM DECORAÇÃO --- */
.image-wrapper {
  position: relative;
  animation: fadeIn 1.5s ease;
}

.image-border {
  position: absolute;
  top: 20px;
  left: 20px;
  right: -20px;
  bottom: -20px;
  border: 2px solid #eee;
  z-index: 0;
  border-radius: 8px;
}

.image-wrapper img {
  width: 100%;
  height: auto;
  position: relative;
  z-index: 1;
  border-radius: 8px;
  transition: var(--transition);
  filter: grayscale(20%);
}

.image-wrapper:hover img {
  transform: translateY(-10px);
  filter: grayscale(0%);
}

/* --- VALORES --- */
.valores-section {
  background: #f9f9f9;
  padding: 100px 0;
}

.valores-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.valor-card {
  background: #fff;
  padding: 50px 30px;
  text-align: center;
  border-radius: 8px;
  transition: var(--transition);

  border: 1.5px solid #c5a059; /* 👈 BORDA FIXA DOURADA */
}



.icon {
  font-size: 32px;
  margin-bottom: 20px;
  display: block;
}

.valor-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  letter-spacing: 1px;
}
.valor-card p {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: 15px;
}

/* --- ANIMAÇÕES --- */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}

/* --- RESPONSIVIDADE --- */
@media (max-width: 968px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 50px;
    padding: 60px 0;
  }
  
  .image-wrapper {
    order: -1; /* Imagem aparece antes do texto no mobile */
  }

  .hero {
    height: 60vh;
  }
}
</style>