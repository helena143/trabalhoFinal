<template>
  <AdminLayout>

    <div class="settings-grid">

      <div class="settings-card">

        <h2>Informações da Loja</h2>

        <input
          v-model="store.name"
          placeholder="Nome da loja"
        />

        <input
          v-model="store.email"
          placeholder="Email"
        />

        <input
          v-model="store.phone"
          placeholder="Telefone"
        />

        <button>
          Salvar
        </button>

      </div>

      <div class="settings-card">

        <h2>Personalização</h2>

        <div class="theme-options">

          <div class="theme active"></div>
          <div class="theme"></div>
          <div class="theme"></div>

        </div>

        <button>
          Atualizar Tema
        </button>

      </div>

    </div>

  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

const store = ref({
  name:'IVY Luxury',
  email:'contato@ivy.com',
  phone:'(31) 99999-9999'
})
</script>

<style scoped>
.settings-grid{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:20px;
}

.settings-card{
  background:#151515;
  border:1px solid #222;
  border-radius:24px;
  padding:30px;
}

.settings-card h2{
  margin-bottom:25px;
}

.settings-card input{
  width:100%;
  height:54px;
  background:#0f0f0f;
  border:1px solid #222;
  border-radius:14px;
  padding:0 16px;
  color:white;
  margin-bottom:16px;
}

.settings-card button{
  height:50px;
  padding:0 24px;
  border:none;
  border-radius:14px;
  background:#d4af7f;
  color:black;
  font-weight:700;
  cursor:pointer;
}

.theme-options{
  display:flex;
  gap:14px;
  margin-bottom:24px;
}

.theme{
  width:70px;
  height:70px;
  border-radius:18px;
  background:#222;
  border:2px solid transparent;
  cursor:pointer;
}

.theme.active{
  border-color:#d4af7f;
}
</style>