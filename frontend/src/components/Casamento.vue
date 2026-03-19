<template>
  <div class="casamento">

    <!-- BANNER -->
    <section class="banner">
      <h1>CASAMENTO</h1>
      <p>Joias que celebram o amor eterno</p>
    </section>

    <!-- CATEGORIAS -->
    <section class="categorias">
      <h2>COLEÇÃO DE CASAMENTO</h2>
      <p class="subtitulo">Escolhas por categorias</p>

      <div class="categorias-grid">

        <div class="categoria">
          <img src="/img/solitarias.png" alt="Solitários">
          <span>Solitários</span>
        </div>

        <div class="categoria">
          <img src="/img/aliancas.png" alt="Alianças">
          <span>Alianças</span>
        </div>

        <div class="categoria">
          <img src="/img/brinconoiva.png" alt="Brincos">
          <span>Para a noiva</span>
        </div>

        <div class="categoria">
          <img src="/img/noivo.png" alt="Noivo">
          <span>Para o Noivo</span>
        </div>

      </div>
    </section>

    <!-- ALIANÇAS DE CASAMENTO -->
    <section class="aliancas">
      <h2>ALIANÇAS DE CASAMENTO</h2>
      <p class="subtitulo">Modelos que simbolizam o amor eterno</p>

      <div class="produtos-grid">

        <div class="produto">
          <img src="/img/dp.png" alt="Aliança ouro">
          <h3>Aliança Ouro Clássica</h3>
          <p class="preco">R$ 2.490</p>
        </div>

        <div class="produto">
          <img src="/img/prata.png" alt="Aliança diamante">
          <h3>Aliança com Diamantes</h3>
          <p class="preco">R$ 3.290</p>
        </div>

        <div class="produto">
          <img src="/img/dourada.png" alt="Aliança moderna">
          <h3>Aliança Moderna</h3>
          <p class="preco">R$ 2.890</p>
        </div>

        <div class="produto">
          <img src="/img/brilho.png" alt="Aliança premium">
          <h3>Aliança Premium</h3>
          <p class="preco">R$ 3.990</p>
        </div>

      </div>

      <!-- BOTÃO VER TODOS -->
      <div class="ver-todos">
        <button>Ver Todos</button>
      </div>

    </section>

    <!-- ESCOLHA POR ESTILO -->
    <section class="estilos">
      <h2>ESCOLHA POR ESTILO</h2>
      <p class="subtitulo">Joias perfeitas para cada estilo de noiva</p>

      <div class="estilos-grid">
<div class="estilo">
  <div class="img-container">
    <img src="/img/classico.png" class="img1">
    <img src="/img/modelo2.png" class="img2">
  </div>
  <span>Clássico</span>
</div>

       <div class="estilo">
  <div class="img-container">
    <img src="/img/reld.png" class="img1">
    <img src="/img/modelo1.png" class="img2">
  </div>
  <span>Moderno</span>
</div>

       <div class="estilo">
  <div class="img-container">
    <img src="/img/delicado.png" class="img1">
    <img src="/img/modelo.png" class="img2">
  </div>
  <span>Minimalista</span>
</div>

       <div class="estilo">
  <div class="img-container">
    <img src="/img/cl.png" class="img1">
    <img src="/img/modelo4.png" class="img2">
  </div>
  <span>Luxo</span>
</div>
      </div>
    </section>

   <!-- FAIXA DE PREÇO -->
<section class="filtro-preco">

  <h2>FAIXA DE PREÇO</h2>
  <p class="subtitulo">Escolha o valor idea</p>

  <div class="preco-wrapper">

    <div class="precos">
      <span>R$ {{ precoMin }}</span>
      <span>R$ {{ precoMax }}</span>
    </div>

    <div class="sliders">
      <input
        type="range"
        min="0"
        max="5000"
        step="100"
        v-model="precoMin"
      >

      <input
        type="range"
        min="0"
        max="5000"
        step="100"
        v-model="precoMax"
      >
    </div>

  </div>

</section>
    <!-- BOTÃO VOLTAR -->
   <div class="voltar-inicio">
  <router-link to="/">
    <button>Voltar ao Início</button>
  </router-link>
</div>

  </div>
</template>

<script setup>

import { ref, computed } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const precoMin = ref(500)
const precoMax = ref(4000)

const produtos = ref([
  {
    nome: "Aliança Ouro Clássica",
    preco: 2490,
    img: "/img/dp.png"
  },
  {
    nome: "Aliança com Diamantes",
    preco: 3290,
    img: "/img/prata.png"
  },
  {
    nome: "Aliança Moderna",
    preco: 2890,
    img: "/img/dourada.png"
  },
  {
    nome: "Aliança Premium",
    preco: 3990,
    img: "/img/brilho.png"
  }
])

const produtosFiltrados = computed(() => {
  return produtos.value.filter(produto =>
    produto.preco >= precoMin.value &&
    produto.preco <= precoMax.value
  )
})

function voltarInicio(){
  router.push("/")
}

</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Montserrat:wght@300;400;500&display=swap');

.casamento{
  font-family: 'Montserrat', sans-serif;
}

/* BANNER */
.banner{
  height:300px;
  background:linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)),
  url("https://images.unsplash.com/photo-1519741497674-611481863552");
  background-size:cover;
  background-position:center;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  color:white;
}

.banner h1{
  font-family:'Playfair Display', serif;
  font-size:48px;
  letter-spacing:8px;
}

.banner p{
  font-size:15px;
}

/* CATEGORIAS */
.categorias{
  padding:60px 120px 40px 120px; /* aumentei as laterais */
  text-align:center;
}
.categoria{
  width:100%;
  max-width:260px;
  margin:0 auto;
}

.categorias h2{
  font-family:'Playfair Display', serif;
  font-size:34px;
}

.subtitulo{
  margin-top:8px;
  font-size:14px;
  letter-spacing:2px;
  text-transform:uppercase;
  color:#666;
}

.categorias-grid{
  display:flex;
  justify-content:center;
  gap:40px;
  margin-top:40px;
  flex-wrap:nowrap;

  padding:0 40px; /* 👈 espaço nas laterais */
}

.categoria{
  width:260px;
  border:2px solid #e5e5e5;
  padding:15px;
  background:white;
  text-align:center;
  transition:0.3s;
}

.categoria:hover{
  border-color:#0b2a5c;
}

.categoria img{
  width:100%;
  height:260px;
  object-fit:contain; /* 👈 NÃO corta */
  background:#fff;    /* evita fundo estranho */
}

.categoria span{
  display:block;
  margin-top:12px;
  font-size:14px;
  letter-spacing:2px;
  text-transform:uppercase;
}

/* ALIANÇAS */
.aliancas{
  padding:30px 80px 80px 80px;
  text-align:center;
}

.aliancas h2{
  font-family:'Playfair Display', serif;
  font-size:34px;
}

.produtos-grid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:30px;
  margin-top:40px;
}

.produto{
  background:white;
  padding:20px;
  border:1px solid #eee;
  transition:0.3s;
}

.produto:hover{
  border-color:#0b2a5c;
  transform:translateY(-5px);
}

.produto img{
  width:100%;
  height:220px;
  object-fit:contain;
}

.produto h3{
  font-size:14px;
  margin-top:10px;
}

.preco{
  font-weight:600;
  margin-top:5px;
}

/* BOTÃO VER TODOS */
.ver-todos{
  margin-top:50px;
}

.ver-todos button{
  padding:20px 70px;
  font-size:16px;
  text-transform:uppercase;
  background:#0b2a5c;
  color:white;
  border:2px solid #0b2a5c;
  cursor:pointer;
}

.ver-todos button:hover{
  background:white;
  color:#0b2a5c;
}

/* ESCOLHA POR ESTILO */

.estilos{
  padding:80px 120px; /* AUMENTEI o espaço interno */
  text-align:center;

  border:2px solid #d4af37;
  margin:60px 40px;   /* DIMINUÍ a margem lateral pra moldura crescer */
  background:#fff;

  box-shadow:0 10px 30px rgba(0,0,0,0.08);
  position:relative;
}


/* moldura interna */
.estilos::before{
  content:"";
  position:absolute;
  top:15px;
  left:15px;
  right:15px;
  bottom:15px;
  border:1px solid #e5e5e5;
}

.estilos h2{
  font-family:'Playfair Display', serif;
  font-size:34px;
}

/* GRID */
.estilos-grid{
  display:grid;
  grid-template-columns:repeat(4, 1fr);
  gap:40px; /* mais espaço */
  margin-top:40px;
  justify-items:center;
}

/* CARD MAIOR */
.estilo{
  width:100%;   /* em vez de 300px */
  max-width:300px; /* limita pra não ficar gigante */
  padding:20px;
  border:1px solid #eee;
  background:white;
  transition:0.3s;
  border-radius:10px;
}
/* HOVER */
.estilo:hover{
  border-color:#0b2a5c;
  transform:translateY(-8px);
}

/* IMAGEM MAIOR E AJUSTADA */
.estilo img{
  width:100%;
  height:380px;        /* AUMENTEI */
  object-fit:cover;
  border-radius:8px;
}

/* TEXTO */
.estilo span{
  display:block;
  margin-top:12px;
  font-size:16px;
}

/* FAIXA DE PREÇO PROFISSIONAL */

.filtro-preco{
  padding:20px 80px 60px 80px;
  margin-top:-50px;
  text-align:center;
}

.preco-wrapper{
  width:420px;
  margin:35px auto 0 auto;
}

.precos{
  display:flex;
  justify-content:space-between;
  font-size:15px;
  font-weight:600;
  margin-bottom:15px;
}

.sliders{
  display:flex;
  flex-direction:column;
  gap:12px;
}

.sliders input{
  width:100%;
  cursor:pointer;
}
/* trilho */

.range-slider input::-webkit-slider-runnable-track{
  height:4px;
  background:#ddd;
}
.estilos-grid{
  display:grid;
  grid-template-columns:repeat(4, minmax(0, 1fr));
  gap:40px;
  margin-top:40px;
}

/* bolinha */

.range-slider input::-webkit-slider-thumb{
  appearance:none;
  pointer-events:auto;
  width:18px;
  height:18px;
  border-radius:50%;
  background:white;
  border:2px solid #333;
  cursor:pointer;
  margin-top:-7px;
}
/* BOTÃO VOLTAR */

.voltar-inicio{
  text-align:center;
  margin-bottom:80px;
}

.voltar-inicio button{
  padding:18px 60px;
  font-size:15px;
  text-transform:uppercase;
  background:white;
  color:#0b2a5c;
  border:2px solid #0b2a5c;
  cursor:pointer;
  transition:0.3s;
}

.voltar-inicio button:hover{
  background:#0b2a5c;
  color:white;
}
/* container da imagem (só minimalista usa) */
.img-container{
  position:relative;
  width:100%;
  height:260px;
  overflow:hidden;
}

/* imagens sobrepostas */
.img-container img{
  position:absolute;
  width:100%;
  height:100%;
  object-fit:cover;
  top:0;
  left:0;
  transition:0.4s;
}

/* controle */
.img1{
  opacity:1;
}

.img2{
  opacity:0;
}

/* efeito só no minimalista */
.estilo:nth-child(3):hover .img1{
  opacity:0;
}

.estilo:nth-child(3):hover .img2{
  opacity:1;
}
/* efeito só no MODERNO (2º item) */
.estilo:nth-child(2):hover .img1{
  opacity:0;
}

.estilo:nth-child(2):hover .img2{
  opacity:1;
}
/* efeito só no CLÁSSICO */
.estilo:nth-child(1):hover .img1{
  opacity:0;
}

.estilo:nth-child(1):hover .img2{
  opacity:1;
}
/* efeito só no LUXO (4º item) */
.estilo:nth-child(4):hover .img1{
  opacity:0;
}

.estilo:nth-child(4):hover .img2{
  opacity:1;
}

</style>