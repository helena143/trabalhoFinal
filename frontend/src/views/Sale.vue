<template>

<main class="sale-page">

  <!-- TOP BAR -->
  <div class="top-bar">
    FRETE GRÁTIS ACIMA DE R$ 199 • 10% OFF NO PIX • GARANTIA VITALÍCIA
  </div>

  <!-- HERO / BANNER -->
  <section class="hero">
    <img :src="banner" class="hero-img" />
    <div class="hero-text">
      <h1>Produtos em Sale</h1>
      <p>Aproveite descontos incríveis nos nossos itens premium</p>
    </div>
  </section>

  <!-- PRODUTOS EM SALE -->
  <section class="sale-section">

    <div class="section-header">
      <span>Promoções</span>
      <h2>Produtos em Sale</h2>
    </div>

    <div class="sale-grid">
      <div 
        class="sale-card" 
        v-for="produto in saleProducts" 
        :key="produto.nome"
      >

        <div class="img-container">
          <img :src="produto.img" />
          <div class="discount-badge">-{{ produto.desconto }}%</div>
        </div>

        <h4>{{ produto.nome }}</h4>
        <p class="old-price">{{ produto.precoAntigo }}</p>
        <p class="price">{{ produto.preco }}</p>
        <button class="buy-btn">Ver Produto</button>

      </div>
    </div>

  </section>

</main>

</template>

<script setup>
//import banner from "../img/banner-sale.png"
import perfume from "../img/perfumeP.png"
import colar from "../img/colarP.png"


const saleProducts = [
  {
    nome: "Perfume Elegance",
    precoAntigo: "R$ 399,00",
    preco: "R$ 329,00",
    desconto: 18,
    img: perfume
  },
  {
    nome: "Colar Premium",
    precoAntigo: "R$ 349,00",
    preco: "R$ 299,00",
    desconto: 14,
    img: colar
  },
  {
    nome: "Relógio Clássico",
    precoAntigo: "R$ 599,00",
    preco: "R$ 499,00",
    desconto: 17,
    img: relogio
  }
]
</script>

<style scoped>
.sale-page{
  font-family:'Montserrat',sans-serif;
}

/* TOP BAR */
.top-bar{
  background:#133F7C;
  color:white;
  text-align:center;
  padding:12px;
  font-size:11px;
  letter-spacing:2px;
}

/* HERO */
.hero{
  position:relative;
  height:400px;
  overflow:hidden;
  margin-bottom:60px;
}

.hero-img{
  width:100%;
  height:100%;
  object-fit:cover;
}

.hero-text{
  position:absolute;
  bottom:40px;
  left:60px;
  color:white;
}

.hero-text h1{
  font-size:42px;
  margin-bottom:10px;
}

.hero-text p{
  font-size:16px;
}

/* SALE SECTION */
.sale-section{
  padding:60px 6%;
  text-align:center;
  background:#f6f6f6;
}

.section-header span{
  font-size:12px;
  letter-spacing:3px;
  color:#6B63A3;
  text-transform:uppercase;
}

.section-header h2{
  font-family:'Cinzel', serif;
  font-size:36px;
  color:#133F7C;
  margin:15px 0 60px;
}

/* GRID SALE */
.sale-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:30px;
  max-width:1400px;
  margin:auto;
}

.sale-card{
  background:white;
  border-radius:10px;
  overflow:hidden;
  padding:15px;
  border:1px solid #eee;
  transition:.3s;
  position:relative;
}

.sale-card:hover{
  box-shadow:0 10px 25px rgba(0,0,0,0.1);
}

.img-container{
  position:relative;
}

.img-container img{
  width:100%;
  height:260px;
  object-fit:cover;
  border-radius:8px;
}

.discount-badge{
  position:absolute;
  top:10px;
  left:10px;
  background:#FF4D4F;
  color:white;
  font-weight:600;
  padding:6px 10px;
  border-radius:5px;
  font-size:12px;
}

.sale-card h4{
  margin:12px 0 6px;
  color:#133F7C;
}

.old-price{
  text-decoration: line-through;
  color:#999;
  font-size:14px;
}

.price{
  font-weight:600;
  color:#133F7C;
  margin:4px 0 12px;
}

.buy-btn{
  background:#133F7C;
  color:white;
  border:none;
  padding:10px 20px;
  cursor:pointer;
  border-radius:5px;
}

/* RESPONSIVO */
@media(max-width:900px){
  .sale-grid{
    grid-template-columns:1fr;
  }
  .hero-text{
    left:20px;
  }
}
</style>