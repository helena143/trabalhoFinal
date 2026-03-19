<template>

<main class="gifts-page">

<!-- TOP BAR -->

<div class="top-bar">

<div class="top-item">
<Truck class="top-icon"/>
<span>Frete grátis acima de R$199</span>
</div>

<div class="top-item">
<CreditCard class="top-icon"/>
<span>Parcele em até 6x sem juros</span>
</div>

<div class="top-item">
<Gift class="top-icon"/>
<span>Embalagem especial para presente</span>
</div>

</div>


<!-- HERO -->

<section class="hero">

<img 
src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=2070"
class="hero-img"
>

</section>


<!-- BENEFÍCIOS -->

<section class="benefits">

<div class="benefit">
<Truck class="benefit-icon"/>
<p>Frete Grátis</p>
<small>acima de R$199</small>
</div>

<div class="benefit">
<CreditCard class="benefit-icon"/>
<p>Parcele</p>
<small>até 6x sem juros</small>
</div>

<div class="benefit">
<Gift class="benefit-icon"/>
<p>Embalagem Presente</p>
<small>especial</small>
</div>

<div class="benefit">
<Star class="benefit-icon"/>
<p>Produtos Premium</p>
<small>qualidade garantida</small>
</div>

</section>


<!-- PRODUTOS -->

<section class="products">

<h2>Sugestões de Presente</h2>

<div class="product-grid">

<div
class="product-card"
v-for="produto in presentes"
:key="produto.nome"
>

<img :src="produto.img">

<h4>{{ produto.nome }}</h4>

<p class="price">{{ produto.preco }}</p>

<button class="buy-btn">
Ver Produto
</button>

</div>

</div>

</section>


<!-- CTA -->

<section class="cta">

<h2>Surpreenda quem você ama</h2>
<p>Escolha o presente perfeito com a Ivy</p>

<button>Explorar Presentes</button>

</section>

</main>

</template>


<script setup>

import {
Truck,
CreditCard,
Gift,
Star
} from "lucide-vue-next"


const presentes = [

{
nome:"Perfume Elegance",
preco:"R$329,00",
img:"https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=987"
},

{
nome:"Colar Premium",
preco:"R$299,00",
img:"https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=987"
},

{
nome:"Relógio Clássico",
preco:"R$499,00",
img:"https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=987"
},

{
nome:"Kit Presente Lux",
preco:"R$459,00",
img:"https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=987"
}

]

</script>


<style scoped>

.gifts-page{
font-family:'Montserrat',sans-serif;
}


/* TOP BAR */

.top-bar{
display:flex;
justify-content:center;
gap:60px;
align-items:center;
background:#133F7C;
color:white;
padding:10px 20px;
font-size:14px;
flex-wrap:wrap;
}

.top-item{
display:flex;
align-items:center;
gap:8px;
}

.top-icon{
width:18px;
height:18px;
}


/* HERO */

.hero{
position:relative;
height:420px;
overflow:hidden;
}

.hero-img{
width:100%;
height:100%;
object-fit:cover;
}


/* BENEFÍCIOS */

.benefits{
display:grid;
grid-template-columns:repeat(4,1fr);
padding:40px 6%;
background:#f6f6f6;
text-align:center;
}

.benefit-icon{
width:28px;
height:28px;
color:#133F7C;
margin-bottom:8px;
}

.benefit p{
font-weight:600;
}


/* PRODUTOS */

.products{
padding:80px 6%;
text-align:center;
}

.product-grid{
margin-top:40px;
display:grid;
grid-template-columns:repeat(4,1fr);
gap:30px;
}

.product-card{
border:1px solid #eee;
padding:15px;
border-radius:10px;
transition:.3s;
}

.product-card:hover{
box-shadow:0 10px 25px rgba(0,0,0,0.1);
transform:translateY(-5px);
}

.product-card img{
width:100%;
height:260px;
object-fit:cover;
border-radius:8px;
}

.price{
color:#133F7C;
font-weight:600;
margin:8px 0;
}

.buy-btn{
background:#133F7C;
color:white;
border:none;
padding:10px 20px;
cursor:pointer;
border-radius:5px;
transition:.3s;
}

.buy-btn:hover{
background:#0d2f5c;
}


/* CTA */

.cta{
text-align:center;
padding:80px 20px;
background:#133F7C;
color:white;
}

.cta button{
margin-top:20px;
padding:12px 28px;
border:none;
background:white;
color:#133F7C;
cursor:pointer;
font-weight:600;
border-radius:5px;
}


/* RESPONSIVO */

@media(max-width:900px){

.benefits,
.product-grid{
grid-template-columns:1fr;
}

.hero{
height:250px;
}

}

</style>