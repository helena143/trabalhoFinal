<template>
  <section class="auth-page">

    <!-- BACKGROUND -->
    <div class="bg-elements">

      <div class="blur blur1"></div>
      <div class="blur blur2"></div>

      <div class="grid"></div>

    </div>

    <!-- CONTAINER -->
    <div
      class="auth-container"
      :class="{ active: isRegistering }"
    >

      <!-- WHITE PANEL (vai pro lado) -->
      <div class="moving-panel">

        <div class="moving-content">

          <span class="moving-mini">
            {{ isRegistering ? 'CRIAR CONTA' : 'BEM-VINDA DE VOLTA' }}
          </span>

          <Transition
            mode="out-in"
            name="fade-up"
          >

            <div :key="isRegistering">

              <h1>
                {{ isRegistering ? 'Entre para o universo IVY.' : 'Sua elegância espera por você.' }}
              </h1>

              <p>
                {{ isRegistering
                  ? 'Crie sua conta para acessar uma experiência sofisticada e exclusiva.'
                  : 'Entre na sua conta para continuar sua jornada de estilo e sofisticação.'
                }}
              </p>

            </div>

          </Transition>
        </div>

      </div>

      <!-- BLUE PANEL (formulário) -->
      <div class="form-panel">

        <div class="form-card">

          <!-- LOGO -->
          <div class="logo-area">

            <div class="logo-circle">
              IVY
            </div>

          </div>

          <!-- SWITCH -->
          <div class="toggle-area">

            <button
              type="button"
              :class="{ active: !isRegistering }"
              @click="switchMode(false)"
            >
              Entrar
            </button>

            <button
              type="button"
              :class="{ active: isRegistering }"
              @click="switchMode(true)"
            >
              Cadastro
            </button>

            <div
              class="toggle-indicator"
              :class="{ move: isRegistering }"
            ></div>

          </div>

          <!-- TOP -->
          <div class="form-top">

            <h2>
              {{
                isRegistering
                  ? "Criar Conta"
                  : "Entrar"
              }}
            </h2>

            <p>
              {{
                isRegistering
                  ? "Preencha seus dados abaixo."
                  : "Digite seus dados para acessar sua conta."
              }}
            </p>

          </div>

          <!-- FORM -->
          <form
            class="auth-form"
            @submit.prevent="handleAuth"
          >

            <!-- NAME -->
            <Transition name="slide">

              <div
                v-if="isRegistering"
                class="input-group"
              >

                <label>Nome</label>

                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Digite seu nome"
                />

              </div>

            </Transition>

            <!-- EMAIL -->
            <div class="input-group">

              <label>E-mail</label>

              <input
                v-model="form.email"
                type="email"
                placeholder="Digite seu e-mail"
                required
              />

            </div>

            <!-- PASSWORD -->
            <div class="input-group">

              <div class="label-row">

                <label>Senha</label>

                <a
                  v-if="!isRegistering"
                  href="#"
                >
                  Esqueceu?
                </a>

              </div>

              <div class="password-wrap">

                <input
                  v-model="form.password"
                  :type="showPw ? 'text' : 'password'"
                  placeholder="Digite sua senha"
                  required
                />

                <button
                  type="button"
                  class="show-password"
                  @click="showPw = !showPw"
                >
                  {{
                    showPw
                      ? "Ocultar"
                      : "Mostrar"
                  }}
                </button>

              </div>

            </div>

            <!-- ERROR -->
            <Transition name="fade">

              <div
                v-if="error"
                class="message error"
              >
                {{ error }}
              </div>

            </Transition>

            <!-- SUCCESS -->
            <Transition name="fade">

              <div
                v-if="successMsg"
                class="message success"
              >
                {{ successMsg }}
              </div>

            </Transition>

            <!-- BUTTON -->
            <button
              class="submit-btn"
              :disabled="loading"
            >

              <span v-if="!loading">

                {{
                  isRegistering
                    ? "CRIAR CONTA"
                    : "ENTRAR"
                }}

              </span>

              <div
                v-else
                class="loader"
              ></div>

            </button>

          </form>

        </div>

      </div>

    </div>

  </section>
</template>

<script setup>
import { ref, reactive } from "vue"
import { useRouter } from "vue-router"
import axios from "axios"

const router = useRouter()

const isRegistering = ref(false)
const showPw = ref(false)
const loading = ref(false)
const error = ref("")
const successMsg = ref("")

const form = reactive({
  name: "",
  email: "",
  password: ""
})

const switchMode = (mode) => {
  isRegistering.value = mode
  error.value = ""
  successMsg.value = ""
  form.name = ""
  form.email = ""
  form.password = ""
}

const handleAuth = async () => {
  try {
    loading.value = true
    error.value = ""
    successMsg.value = ""

    if (!form.email || !form.password) {
      error.value = "Preencha todos os campos"
      loading.value = false
      return
    }

    if (isRegistering.value && !form.name) {
      error.value = "Digite seu nome"
      loading.value = false
      return
    }

    // REGISTER
    if (isRegistering.value) {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          name: form.name,
          email: form.email,
          password: form.password
        }
      )

      successMsg.value = response.data.message || "Conta criada com sucesso"
      setTimeout(() => {
        switchMode(false)
      }, 1500)
    }
    // LOGIN
    else {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email: form.email,
          password: form.password
        }
      )

      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      localStorage.setItem("role", response.data.user.role)

      successMsg.value = "Login realizado com sucesso"

      setTimeout(() => {
        if (response.data.user.role === "admin") {
          router.push("/admin")
        } else {
          router.push("/perfil")
        }
      }, 1200)
    }

  } catch (err) {
    console.log(err)
    error.value = err?.response?.data?.error || "Erro interno"
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@500;600;700&display=swap');

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

:root{
  --navy:#07142b;
  --navy2:#10284f;
  --white:#ffffff;
  --light:#f4f7fb;
  --line:#dbe4f0;
  --soft:#7f8ba0;
}

.auth-page{
  min-height:100vh;
  background: linear-gradient(135deg, #eef4fb, #f8fbff);
  overflow:hidden;
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:24px;
  font-family:'Inter',sans-serif;
}

/* BG */
.bg-elements{
  position:absolute;
  inset:0;
}

.blur{
  position:absolute;
  border-radius:50%;
  filter:blur(100px);
}

.blur1{
  width:300px;
  height:300px;
  background: rgba(7,20,43,.12);
  top:-100px;
  left:-80px;
}

.blur2{
  width:280px;
  height:280px;
  background: rgba(16,40,79,.10);
  bottom:-80px;
  right:-60px;
}

.grid{
  position:absolute;
  inset:0;
  background-image:
    linear-gradient(rgba(7,20,43,.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(7,20,43,.03) 1px, transparent 1px);
  background-size:40px 40px;
}

/* CONTAINER */
.auth-container{
  position:relative;
  width:980px;
  max-width:100%;
  min-height:580px;
}

/* =====================================================
   MOVING PANEL (vai pro lado) → BRANCO
   ===================================================== */
.moving-panel{
  position:absolute;
  left:0;
  top:0;
  width:50%;
  height:100%;
  border-radius:28px;
  background: #ffffff;
  overflow:hidden;
  z-index:1;
  transition: transform .8s cubic-bezier(.77,0,.18,1);
  box-shadow: 0 25px 60px rgba(7,20,43,.22);
}

.auth-container.active .moving-panel{
  transform:translateX(100%);
}

.moving-panel::before{
  content:"";
  position:absolute;
  width:400px;
  height:400px;
  border-radius:50%;
  border:1px solid rgba(7,20,43,.05);
  top:-150px;
  right:-150px;
}

.moving-content{
  height:100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  padding:50px;
  color: var(--navy);
}

.moving-mini{
  font-size:10px;
  font-weight:700;
  letter-spacing:3px;
  opacity:.7;
  margin-bottom:16px;
}

.moving-content h1{
  font-family:'Playfair Display',serif;
  font-size:52px;
  line-height:1;
  margin-bottom:18px;
}

.moving-content p{
  max-width:340px;
  line-height:1.8;
  color: var(--soft);
  font-size:13px;
}

/* =====================================================
   FORM PANEL (onde está Entrar/Criar Conta) → AZUL
   ===================================================== */
.form-panel{
  position:absolute;
  right:0;
  top:0;
  width:50%;
  height:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:2;
  transition: transform .8s cubic-bezier(.77,0,.18,1);
}

.auth-container.active .form-panel{
  transform:translateX(-100%);
}

.form-card{
  width:100%;
  max-width:420px;
  background: rgba(7,20,43,.92);
  backdrop-filter:blur(20px);
  border-radius:28px;
  padding:38px;
  border: 1px solid rgba(255,255,255,.1);
  box-shadow: 0 15px 50px rgba(0,0,0,.25);
}

/* LOGO */
.logo-area{
  display:flex;
  justify-content:center;
  margin-bottom:20px;
}

.logo-circle{
  width:56px;
  height:56px;
  border-radius:50%;
  background: linear-gradient(135deg, #ffffff, #dbe4f0);
  color: var(--navy);
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:14px;
  font-weight:800;
  letter-spacing:2px;
  box-shadow: 0 12px 30px rgba(0,0,0,.3);
}

/* TOGGLE */
.toggle-area{
  position:relative;
  display:flex;
  background: rgba(255,255,255,.08);
  padding:4px;
  border-radius:14px;
  margin-bottom:24px;
}

.toggle-area button{
  flex:1;
  height:44px;
  border:none;
  background:none;
  cursor:pointer;
  position:relative;
  z-index:2;
  border-radius:11px;
  font-size:12px;
  font-weight:700;
  color: rgba(255,255,255,.5);
}

.toggle-area button.active{
  color: var(--navy);
}

.toggle-indicator{
  position:absolute;
  top:4px;
  left:4px;
  width:calc(50% - 4px);
  height:44px;
  border-radius:11px;
  background: #ffffff;
  transition:.45s cubic-bezier(.77,0,.18,1);
  box-shadow:0 8px 20px rgba(0,0,0,.2);
}
.toggle-indicator.move{
  transform:translateX(100%);
}

/* TOP */
.form-top{
  margin-bottom:24px;
}

.form-top h2{
  font-family:'Playfair Display',serif;
  font-size:38px;
  color: #ffffff;
  margin-bottom:8px;
}

.form-top p{
  color: rgba(255,255,255,.6);
  line-height:1.7;
  font-size:12px;
}

/* FORM */
.auth-form{
  display:flex;
  flex-direction:column;
  gap:14px;
}

.input-group label{
  display:block;
  margin-bottom:6px;
  font-size:10px;
  font-weight:700;
  letter-spacing:1.5px;
  text-transform:uppercase;
  color: rgba(255,255,255,.7);
}

.input-group input{
  width:100%;
  height:50px;
  border-radius:14px;
  border:1px solid rgba(255,255,255,.15);
  background: rgba(255,255,255,.06);
  padding:0 16px;
  outline:none;
  font-size:13px;
  color: #ffffff;
  transition:.35s;
}

.input-group input::placeholder{
  color: rgba(255,255,255,.35);
}

.input-group input:focus{
  border-color: rgba(255,255,255,.4);
  box-shadow: 0 0 0 4px rgba(255,255,255,.06);
  background: rgba(255,255,255,.1);
}

.label-row{
  display:flex;
  align-items:center;
  justify-content:space-between;
}

.label-row a{
  color: rgba(255,255,255,.7);
  text-decoration:none;
  font-size:10px;
  font-weight:600;
}

.label-row a:hover{
  color: #ffffff;
}

.password-wrap{
  position:relative;
}

.show-password{
  position:absolute;
  top:50%;
  right:14px;
  transform:translateY(-50%);
  border:none;
  background:none;
  cursor:pointer;
  color: rgba(255,255,255,.6);
  font-size:10px;
  font-weight:700;
}

.show-password:hover{
  color: #ffffff;
}

/* MESSAGE */
.message{
  padding:12px;
  border-radius:14px;
  font-size:12px;
}

.error{
  background: rgba(220,38,38,.12);
  border:1px solid rgba(220,38,38,.25);
  color:#f87171;
}

.success{
  background: rgba(21,128,61,.12);
  border:1px solid rgba(21,128,61,.25);
  color:#4ade80;
}

/* BUTTON */
.submit-btn{
  height:52px;
  border:none;
  border-radius:16px;
  background: #ffffff;
  color: var(--navy);
  cursor:pointer;
  font-size:11px;
  font-weight:800;
  letter-spacing:3px;
  transition:.4s;
  margin-top:4px;
}

.submit-btn:hover{
  transform:translateY(-3px);
  box-shadow: 0 15px 30px rgba(0,0,0,.3);
  background: #f4f7fb;
}

/* LOADER */
.loader{
  width:16px;
  height:16px;
  border-radius:50%;
  border:2px solid rgba(7,20,43,.2);
  border-top-color: var(--navy);
  margin:auto;
  animation:spin .6s linear infinite;
}

@keyframes spin{
  to{ transform:rotate(360deg); }
}

/* ANIMATIONS */
.fade-enter-active, .fade-leave-active{ transition:opacity .3s; }
.fade-enter-from, .fade-leave-to{ opacity:0; }

.fade-up-enter-active, .fade-up-leave-active{ transition:all .4s ease; }
.fade-up-enter-from{ opacity:0; transform:translateY(20px); }
.fade-up-leave-to{ opacity:0; transform:translateY(-20px); }

.slide-enter-active, .slide-leave-active{ transition:all .35s ease; }
.slide-enter-from{ opacity:0; transform:translateX(-20px); }
.slide-leave-to{ opacity:0; transform:translateX(20px); }

/* RESPONSIVE */
@media(max-width:1100px){
  .auth-container{ min-height:auto; }
  .moving-panel{ display:none; }
  .form-panel{ position:relative; width:100%; transform:none !important; }
  .form-card{ max-width:100%; }
}

@media(max-width:700px){
  .auth-page{ padding:16px; }
  .form-card{ padding:28px 20px; border-radius:24px; }
  .form-top h2{ font-size:32px; }
}
</style>