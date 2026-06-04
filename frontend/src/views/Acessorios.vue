<template>
  <main class="acessorios">

    <!-- HERO -->
    <section class="hero">
      <h1>ACESSÓRIOS</h1>
      <p>Peças sofisticadas para completar seu estilo</p>
    </section>

    <!-- PRODUTOS -->
    <section class="products">

      <div class="products-grid">

        <div
          class="product"
          v-for="produto in produtos"
          :key="produto._id"
        >

          <div class="product-img">
            <img :src="produto.image" />

            <button class="btn">
              Adicionar ao carrinho
            </button>
          </div>

          <h4>{{ produto.name }}</h4>
          <p class="desc">{{ produto.description }}</p>
          <p class="price">R$ {{ produto.price }}</p>

        </div>

      </div>

    </section>

  </main>
</template>

<script setup>
import { ref, onMounted } from "vue"
import api from "@/services/api"

const produtos = ref([])

const getProducts = async () => {
  try {
    const res = await api.get("/products")

    // FILTRA só acessórios
    produtos.value = res.data.filter(
      item => item.category === "acessorios"
    )

  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  getProducts()
})
</script>

<style scoped>

/* BASE */

.acessorios{
  font-family:'Montserrat', sans-serif;
}

/* HERO */

.hero{
  padding:60px 6%;
  text-align:center;
  border-bottom:1px solid #eee;
}

.hero h1{
  font-family:'Playfair Display', serif;
  font-size:36px;
  letter-spacing:6px;
  color:#003366;
}

.hero p{
  margin-top:10px;
  color:#666;
  font-size:14px;
}

/* PRODUTOS */

.products{
  padding:60px 6%;
}

.products-grid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:40px;
}

/* CARD */

.product{
  text-align:center;
  transition:.3s;
}

.product:hover{
  transform:translateY(-6px);
}

/* IMG */

.product-img{
  background:#fafafa;
  padding:30px;
  border-radius:10px;
  position:relative;
}

.product-img img{
  height:220px;
  object-fit:contain;
}

/* BOTÃO */

.btn{
  position:absolute;
  bottom:15px;
  left:50%;
  transform:translateX(-50%) translateY(15px);
  opacity:0;

  background:#003366;
  color:#fff;
  border:none;
  padding:10px 20px;
  border-radius:25px;
  font-size:11px;
  letter-spacing:1.5px;
  cursor:pointer;

  transition:.3s;
}

/* aparecer no hover */

.product:hover .btn{
  opacity:1;
  transform:translateX(-50%) translateY(0);
}

/* TEXTO */

.desc{
  font-size:13px;
  color:#666;
  margin-top:5px;
}

.price{
  color:#003366;
  font-weight:600;
  margin-top:5px;
}

/* RESPONSIVO */

@media (max-width:1000px){
  .products-grid{
    grid-template-columns:repeat(2,1fr);
  }
}

@media (max-width:500px){
  .products-grid{
    grid-template-columns:1fr;
  }
}

</style>