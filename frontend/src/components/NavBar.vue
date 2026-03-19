<template>
  <header class="header">

    <!-- ================= TOP BAR ================= -->
    <div class="top-bar">
      <div class="top-left">
        <RouterLink to="/atendimento">
          Atendimento ao Cliente
        </RouterLink>
      </div>

      <!-- TEXTO CENTRAL -->
      <div class="top-center">
        {{ currentMessage }}
      </div>

      <!-- ACESSIBILIDADE (ESTILO VIVARA) -->
      <div class="top-right accessibility">
        <Accessibility class="access-icon" />
        <span>Acessibilidade</span>
      </div>
    </div>

    <!-- ================= NAV PRINCIPAL ================= -->
    <div class="main-nav">

      <!-- CEP -->
      <div class="left">
        <MapPin class="icon dark" />
        <input
          type="text"
          class="cep-input"
          placeholder="Informe seu CEP"
          v-model="cep"
        />
      </div>

      <!-- LOGO -->
      <div class="logo">IVY</div>

      <!-- BUSCA + ÍCONES -->
      <div class="right">
        <div class="search-container">
          <Search class="icon" />
          <input
            type="text"
            class="search-input"
            placeholder="Buscar produtos"
            v-model="searchText"
          />
        </div>

        <User class="icon" />
        <ShoppingBag class="icon" />
      </div>

    </div>

    <!-- ================= CATEGORIAS ================= -->
    <nav class="categories">
      <RouterLink to="/" class="category-item">
        JOIAS <ChevronDown class="arrow" />
      </RouterLink>
      
       <RouterLink to="/acessorios" class="category-item">
        ACESSÓRIOS <ChevronDown class="arrow" />
      </RouterLink>

       <RouterLink to="/casamento" class="category-item">
        CASAMENTO <ChevronDown class="arrow" />
      </RouterLink>

      <RouterLink to="/perfumes" class="category-item">
        PERFUMES <ChevronDown class="arrow" />
      </RouterLink>

      <RouterLink to="/relogios" class="category-item">
        RELÓGIOS <ChevronDown class="arrow" />
      </RouterLink>

     
      <RouterLink to="/presentes" class="category-item">
        PRESENTES <ChevronDown class="arrow" />
      </RouterLink>

      <RouterLink to="/sale" class="category-item sale">
        SALE <ChevronDown class="arrow" />
      </RouterLink>
    </nav>

  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import {
  Search,
  ShoppingBag,
  User,
  MapPin,
  ChevronDown,
  Accessibility
} from "lucide-vue-next"

const cep = ref("")
const searchText = ref("")

const messages = [
  "Frete grátis acima de R$ 799",
  "Ganhe brinde em compras acima de R$ 500",
  "10% OFF no PIX"
]

const currentMessage = ref(messages[0])
let index = 0
let intervalId

onMounted(() => {
  intervalId = setInterval(() => {
    index = (index + 1) % messages.length
    currentMessage.value = messages[index]
  }, 4000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
.header {
  background: #fff;
  font-family: 'Montserrat', sans-serif;
}

/* ================= TOP BAR ================= */
.top-bar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 10px 30px;
  background: #004080;
  color: #fff;
  font-size: 13px;
}

.top-left a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
}

.top-center {
  text-align: center;
  letter-spacing: 2px;
}

/* ACESSIBILIDADE VIVARA STYLE */
.accessibility {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  opacity: 0.9;
  cursor: pointer;
}

.accessibility:hover {
  opacity: 1;
}

.access-icon {
  width: 16px;
}

/* ================= NAV ================= */
.main-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 26px 80px;
  position: relative;
}

.left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cep-input {
  border: none;
  border-bottom: 1px solid #003366;
  outline: none;
  font-size: 13px;
  width: 140px;
}

.logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Playfair Display', serif;
  font-size: 44px;
  letter-spacing: 10px;
  color: #003366;
}

.right {
  display: flex;
  align-items: center;
  gap: 18px;
}

.search-container {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 50px;
  padding: 6px 14px;
}

.search-input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 13px;
}

/* ÍCONES */
.icon {
  width: 20px;
  color: #003366;
  cursor: pointer;
}

/* ================= CATEGORIAS ================= */
.categories {
  display: flex;
  justify-content: center;
  gap: 90px;
  padding: 14px 0;
}

/* REMOVIDA A LINHA CINZA ❌ */
/* (não existe mais border-top aqui) */

.category-item {
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: #003366;
  font-size: 13px;
  letter-spacing: 3px;
}

.arrow {
  width: 14px;
}

.sale {
  color: #3399ff;
}

/* ================= RESPONSIVO ================= */
@media (max-width: 900px) {
  .main-nav {
    flex-direction: column;
    gap: 15px;
  }

  .logo {
    position: static;
    transform: none;
  }

  .categories {
    flex-direction: column;
    gap: 20px;
  }
}
</style>