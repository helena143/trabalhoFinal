<template>
  <div class="relogios">

    <!-- BANNER -->
    <section class="banner">
      <h1>RELÓGIOS</h1>
      <p>Elegância e sofisticação para todos os momentos</p>
    </section>

    <!-- FILTRO -->
    <section class="filtros">
      <button>TODOS</button>
      <button>FEMININO</button>
      <button>MASCULINO</button>
      <button>LUXO da helena</button>
    </section>

    <!-- PRODUTOS -->
    <section class="produtos">

      <div class="produtos-grid">

        <div class="produto" v-for="produto in produtos" :key="produto.nome">
          <img :src="produto.img" :alt="produto.nome">

          <span class="nome">{{ produto.nome }}</span>
          <span class="preco">{{ produto.preco }}</span>
        </div>

      </div>

    </section>

  </div>
</template>

<script>
export default {
  data(){
    return{
      produtos:[
        {
          nome:"Relógio Dourado Elegante",
          preco:"R$ 799,00",
          img:" /img/relogio4.png"
        },
        {
          nome:"Relógio Prata Clássico",
          preco:"R$ 599,00",
          img:"/img/relogio7.png"
        },
        {
          nome:"Relógio Minimalista",
          preco:"R$ 499,00",
          img:"/img/relogio5.png"
        },
        {
          nome:"Relógio Luxo Preto",
          preco:"R$ 1.299,00",
          img:"/img/relogio6.png"
        }
      ]
    }
  }
}
</script>

<style scoped>

/* BANNER */
.banner{
  background:#f8f8f8;
  padding:80px 20px;
  text-align:center;
}

.banner h1{
  font-family:'Playfair Display', serif;
  font-size:42px;
}

.banner p{
  margin-top:10px;
  color:#666;
}

/* FILTROS */
.filtros{
  display:flex;
  justify-content:center;
  gap:20px;
  margin:40px 0;
}

.filtros button{
  padding:10px 25px;
  border:1px solid #ccc;
  background:white;
  cursor:pointer;
  transition:0.3s;
}

.filtros button:hover{
  border-color:#0b2a5c;
  color:#0b2a5c;
}

/* PRODUTOS */
.produtos{
  padding:40px 80px;
}

.produtos-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit, minmax(250px, 1fr));
  gap:40px;
}

/* CARD */
.produto{
  text-align:center;
  transition:0.3s;
}

.produto img{
  width:100%;
  height:320px;
  object-fit:cover;
  transition:0.4s;
}

/* HOVER ZOOM */
.produto:hover img{
  transform:scale(1.05);
}

/* TEXTO */
.nome{
  display:block;
  margin-top:15px;
  font-size:14px;
}

.preco{
  display:block;
  margin-top:8px;
  font-weight:bold;
}

</style>