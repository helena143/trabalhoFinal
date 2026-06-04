<template>
  <div class="container">

    <div class="box">

      <!-- FORM -->
      <div class="form">

        <h2 v-if="!success">Criar conta</h2>

        <!-- 🔥 MENSAGEM BONITA -->
        <div v-if="success" class="success">
          Conta criada com sucesso 
        </div>

        <template v-if="!success">
          <input v-model="name" placeholder="Nome" />
          <input v-model="email" placeholder="Email" />
          <input v-model="password" type="password" placeholder="Senha" />

          <button @click="handleRegister">
            Cadastrar
          </button>
        </template>

      </div>

      <!-- IMAGEM -->
      <div class="image"></div>

    </div>

  </div>
</template>
<style>
.success{
  font-size:18px;
  color:#003366;
  text-align:center;
  animation:fade .6s ease;
}

@keyframes fade{
  from{
    opacity:0;
    transform:translateY(10px);
  }
  to{
    opacity:1;
    transform:translateY(0);
  }
}
</style>