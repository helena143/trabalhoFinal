<template>
  <main class="ivy-engine" :class="currentTheme">
    <div class="viewport">
      <nav class="top-bar">
        <div class="brand">IVY<span>STUDIO</span></div>
        <div class="system-status">Preferências de Visualização</div>
      </nav>

      <div class="content">
        <header class="hero">
          <div class="kicker">Configurações</div>
          <h1 class="serif-title">Personalização<span>.</span></h1>
        </header>

        <div class="settings-grid">
          
          <section class="control-group">
            <header class="group-header">
              <span class="num">01</span>
              <div class="label">
                <h3>Modo de Visualização</h3>
                <p>Escolha o tom que melhor se adapta à sua iluminação.</p>
              </div>
            </header>

            <div class="theme-grid">
              <button @click="setTheme('light')" :class="['theme-card', { active: currentTheme === 'light' }]">
                <div class="preview light-preview">Aa</div>
                <span>Claro</span>
              </button>

              <button @click="setTheme('dark')" :class="['theme-card', { active: currentTheme === 'dark' }]">
                <div class="preview dark-preview">Aa</div>
                <span>Escuro</span>
              </button>
            </div>
          </section>

          <hr class="separator" />

          <section class="control-group">
            <header class="group-header">
              <span class="num">02</span>
              <div class="label">
                <h3>Tamanho da Fonte</h3>
                <p>Ajuste para uma leitura mais nítida e confortável.</p>
              </div>
            </header>

            <div class="accessibility-controls">
              <div class="preview-area" :style="{ fontSize: fontSize + 'px' }">
                A elegância está na clareza dos detalhes.
              </div>
              
              <div class="interaction-zone">
                <div class="stepper-container">
                  <button @click="adjustFont(-2)" class="step-btn" aria-label="Diminuir fonte">A-</button>
                  
                  <div class="range-wrapper">
                    <input 
                      type="range" min="14" max="32" 
                      v-model="fontSize" @input="applyFontSize"
                      class="navy-slider"
                    >
                    <div class="range-labels">
                      <span>14px</span>
                      <span class="val">{{ percent }}%</span>
                      <span>32px</span>
                    </div>
                  </div>

                  <button @click="adjustFont(2)" class="step-btn" aria-label="Aumentar fonte">A+</button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer class="bottom-actions">
          <button @click="reset" class="btn-text">Redefinir</button>
          <button @click="save" class="btn-main">Salvar Alterações</button>
        </footer>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const fontSize = ref(18)
const currentTheme = ref('light')

const percent = computed(() => Math.round((fontSize.value / 16) * 100))

const applyFontSize = () => {
  document.documentElement.style.fontSize = fontSize.value + 'px'
}

const adjustFont = (val) => {
  const next = Number(fontSize.value) + val
  if (next >= 14 && next <= 32) {
    fontSize.value = next
    applyFontSize()
  }
}

const setTheme = (t) => { currentTheme.value = t }

const save = () => {
  localStorage.setItem('ivy-v4-prefs', JSON.stringify({
    size: fontSize.value,
    theme: currentTheme.value
  }))
  const btn = document.querySelector('.btn-main')
  btn.innerText = 'Preferências Salvas'
  setTimeout(() => btn.innerText = 'Salvar Alterações', 2000)
}

const reset = () => {
  fontSize.value = 18
  currentTheme.value = 'light'
  applyFontSize()
}

onMounted(() => {
  const saved = JSON.parse(localStorage.getItem('ivy-v4-prefs'))
  if (saved) {
    fontSize.value = saved.size
    currentTheme.value = saved.theme
  }
  applyFontSize()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Playfair+Display:ital,wght@1,400&display=swap');

/* VARIÁVEIS DE COR (VIVARA NAVY & WHITE) */
.light { --bg: #FFFFFF; --text: #0A192F; --card: #F4F7FA; --border: #E5E5E5; --accent: #0A192F; }
.dark { --bg: #0A192F; --text: #FFFFFF; --card: #15253A; --border: #1D2D44; --accent: #FFFFFF; }

.ivy-engine {
  min-height: 100vh;
  background-color: var(--bg);
  color: var(--text);
  font-family: 'Montserrat', sans-serif;
  transition: all 0.4s ease;
}

.viewport { max-width: 800px; margin: 0 auto; padding: 0 25px; }

/* TOP BAR */
.top-bar {
  display: flex; justify-content: space-between; align-items: center;
  height: 90px; border-bottom: 1px solid var(--border);
  font-size: 11px; letter-spacing: 2px; font-weight: 600; text-transform: uppercase;
}
.brand span { font-weight: 300; opacity: 0.5; }

/* HERO */
.hero { padding: 60px 0; text-align: center; }
.kicker { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 4px; opacity: 0.6; margin-bottom: 10px; }
.serif-title { font-family: 'Playfair Display', serif; font-size: 3rem; margin: 0; font-style: italic; }

/* SETTINGS GRID */
.settings-grid { display: flex; flex-direction: column; gap: 50px; padding-bottom: 40px; }
.separator { width: 100%; border: 0; border-top: 1px solid var(--border); }

.group-header { text-align: center; margin-bottom: 30px; }
.num { font-size: 1rem; color: var(--border); border: 1px solid var(--border); width: 30px; height: 30px; display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; margin-bottom: 15px; }
.label h3 { font-size: 1.3rem; font-weight: 600; margin: 0 0 8px 0; }
.label p { font-size: 0.95rem; opacity: 0.7; max-width: 450px; margin: 0 auto; }

/* THEME GRID */
.theme-grid { display: flex; gap: 20px; justify-content: center; }
.theme-card {
  background: var(--card); border: 2px solid var(--border); width: 140px;
  padding: 20px; cursor: pointer; transition: 0.3s;
  display: flex; flex-direction: column; align-items: center; gap: 15px;
}
.theme-card span { font-size: 11px; font-weight: 600; text-transform: uppercase; color: var(--text); }
.theme-card.active { border-color: var(--accent); }

.preview { width: 100%; height: 50px; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 600; }
.light-preview { background: #FFFFFF; color: #0A192F; border: 1px solid #E5E5E5; }
.dark-preview { background: #0A192F; color: #FFFFFF; }

/* ACCESSIBILITY CONTROLS */
.preview-area {
  padding: 50px 30px; text-align: center; background: var(--card);
  border: 1px solid var(--border); margin-bottom: 30px; font-weight: 400;
}

.stepper-container { display: flex; align-items: center; gap: 20px; }
.step-btn {
  width: 50px; height: 50px; background: transparent; color: var(--text);
  border: 1px solid var(--text); cursor: pointer; font-weight: 600; font-size: 1.1rem;
}
.step-btn:hover { background: var(--text); color: var(--bg); }

.range-wrapper { flex: 1; display: flex; flex-direction: column; gap: 12px; }
.navy-slider { -webkit-appearance: none; width: 100%; height: 2px; background: var(--border); outline: none; }
.navy-slider::-webkit-slider-thumb {
  -webkit-appearance: none; width: 22px; height: 22px; background: var(--text); 
  border-radius: 50%; cursor: pointer; border: 3px solid var(--bg);
}

.range-labels { display: flex; justify-content: space-between; font-size: 11px; font-weight: 600; opacity: 0.6; }
.range-labels .val { color: var(--text); opacity: 1; font-size: 14px; }

/* FOOTER */
.bottom-actions { 
  padding: 60px 0 100px; display: flex; justify-content: space-between; align-items: center; 
  border-top: 1px solid var(--border);
}
.btn-main {
  background: var(--text); color: var(--bg); padding: 18px 45px;
  border: none; font-size: 12px; font-weight: 600; letter-spacing: 2px;
  text-transform: uppercase; cursor: pointer; transition: 0.3s;
}
.btn-text {
  background: none; border: none; color: var(--text); font-size: 11px;
  text-decoration: underline; cursor: pointer; text-transform: uppercase; font-weight: 600; opacity: 0.6;
}

@media (max-width: 600px) {
  .theme-grid { flex-direction: row; }
  .bottom-actions { flex-direction: column-reverse; gap: 20px; }
  .btn-main { width: 100%; }
}
</style>