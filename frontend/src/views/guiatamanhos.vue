<template>
  <div class="page">

    <!-- HERO -->
    <header class="hero">

      <div class="hero-badge">
        <Sparkles
          :size="14"
          stroke-width="2"
        />

        GUIA OFICIAL IVY
      </div>

      <h1>
        Guia de Tamanhos
      </h1>

      <p>
        Descubra o ajuste ideal para suas joias IVY
        com conforto, precisão e elegância.
      </p>

    </header>

    <!-- QUICK GUIDE -->
    <section class="quick-guide">

      <!-- ANÉIS -->
      <div class="quick-card">

        <div class="quick-header">

          <div class="quick-icon">
            <Gem
              :size="24"
              stroke-width="2"
            />
          </div>

          <div>
            <h2>Anéis</h2>

            <p>
              Tabela oficial de medidas IVY
            </p>
          </div>

        </div>

        <div class="table-wrapper">

          <table>
            <thead>
              <tr>
                <th>Tamanho</th>
                <th>Diâmetro</th>
                <th>Circunferência</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>10</td>
                <td>15,3 mm</td>
                <td>48 mm</td>
              </tr>

              <tr>
                <td>12</td>
                <td>16,0 mm</td>
                <td>50 mm</td>
              </tr>

              <tr>
                <td>14</td>
                <td>17,3 mm</td>
                <td>54 mm</td>
              </tr>

              <tr>
                <td>16</td>
                <td>18,2 mm</td>
                <td>57 mm</td>
              </tr>

              <tr>
                <td>18</td>
                <td>19,0 mm</td>
                <td>60 mm</td>
              </tr>

              <tr>
                <td>20</td>
                <td>19,8 mm</td>
                <td>62 mm</td>
              </tr>

            </tbody>
          </table>

        </div>

      </div>

      <!-- COLARES -->
      <div class="quick-card">

        <div class="quick-header">

          <div class="quick-icon">
            <Diamond
              :size="24"
              stroke-width="2"
            />
          </div>

          <div>
            <h2>Colares e Correntes</h2>

            <p>
              Escolha o comprimento ideal
            </p>
          </div>

        </div>

        <div class="necklace-list">

          <div class="necklace-item">

            <div class="necklace-left">
              <div class="necklace-dot"></div>

              <strong>40 cm</strong>
            </div>

            <span>
              Colar rente ao pescoço
            </span>

          </div>

          <div class="necklace-item">

            <div class="necklace-left">
              <div class="necklace-dot"></div>

              <strong>45 cm</strong>
            </div>

            <span>
              Comprimento clássico
            </span>

          </div>

          <div class="necklace-item">

            <div class="necklace-left">
              <div class="necklace-dot"></div>

              <strong>50 cm</strong>
            </div>

            <span>
              Abaixo da clavícula
            </span>

          </div>

          <div class="necklace-item">

            <div class="necklace-left">
              <div class="necklace-dot"></div>

              <strong>60 cm</strong>
            </div>

            <span>
              Longo / estilo lariat
            </span>

          </div>

        </div>

      </div>

    </section>

    <!-- CARDS -->
    <main class="grid">

      <!-- ANÉIS -->
      <section class="card">

        <div class="card-top">
          <div class="icon">
            <Gem
              :size="26"
              stroke-width="2"
            />
          </div>

          <div class="card-badge">
            Mais Procurado
          </div>
        </div>

        <h3>Anéis</h3>

        <p>
          Utilize um anel existente como referência
          ou meça o diâmetro interno utilizando
          uma régua milimetrada.
        </p>

        <div class="card-tip">
          Evite medir dedos frios para maior precisão.
        </div>

      </section>

      <!-- PULSEIRAS -->
      <section class="card">

        <div class="card-top">

          <div class="icon">
            <CircleDot
              :size="26"
              stroke-width="2"
            />
          </div>

          <div class="card-badge">
            Ajuste Ideal
          </div>

        </div>

        <h3>Pulseiras</h3>

        <p>
          Meça o pulso e adicione aproximadamente
          1 cm para garantir conforto e elegância
          no uso diário.
        </p>

        <div class="card-tip">
          O ajuste confortável valoriza ainda mais a peça.
        </div>

      </section>

      <!-- COLARES -->
      <section class="card">

        <div class="card-top">

          <div class="icon">
            <Sparkles
              :size="26"
              stroke-width="2"
            />
          </div>

          <div class="card-badge">
            Elegância
          </div>

        </div>

        <h3>Colares</h3>

        <p>
          Comprimentos menores trazem sofisticação
          delicada, enquanto modelos longos criam
          um visual moderno e refinado.
        </p>

        <div class="card-tip">
          Escolha conforme o caimento desejado.
        </div>

      </section>

      <!-- BRINCOS -->
      <section class="card">

        <div class="card-top">

          <div class="icon">
            <Star
              :size="26"
              stroke-width="2"
            />
          </div>

          <div class="card-badge">
            Conforto
          </div>

        </div>

        <h3>Brincos</h3>

        <p>
          Considere peso, proporção e conforto
          para encontrar a peça perfeita
          para qualquer ocasião.
        </p>

        <div class="card-tip">
          Ideal para uso diário e eventos especiais.
        </div>

      </section>

    </main>

  </div>
</template>

<script setup lang="ts">
import {
  Sparkles,
  Gem,
  Diamond,
  CircleDot,
  Star,
} from "lucide-vue-next"
</script>

<style scoped>
.page {
  min-height: 100vh;

  padding:
    90px 20px 80px;

  background:
    linear-gradient(
      180deg,
      #ffffff 0%,
      #faf7f2 55%,
      #f7f3ec 100%
    );

  font-family:
    'Montserrat',
    sans-serif;

  color: #1f1f1f;
}

/* HERO */

.hero {
  max-width: 760px;
  margin: 0 auto 70px;

  text-align: center;
}

.hero-badge {
  width: fit-content;

  margin: 0 auto 20px;

  display: flex;
  align-items: center;
  gap: 8px;

  padding: 10px 18px;

  border-radius: 999px;

  background: #f7f1e7;

  border: 1px solid #eadbc0;

  color: #b08d57;

  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
}

.hero h1 {
  font-size: 52px;
  font-weight: 700;
  line-height: 1.1;

  color: #111;

  margin-bottom: 18px;
}

.hero p {
  max-width: 560px;

  margin: 0 auto;

  font-size: 16px;
  line-height: 1.8;

  color: #666;
}

/* QUICK GUIDE */

.quick-guide {
  max-width: 1120px;

  margin:
    0 auto 70px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.quick-card {
  background: rgba(255,255,255,0.9);

  backdrop-filter: blur(10px);

  border-radius: 28px;

  padding: 34px;

  border: 1px solid #ece6dc;

  box-shadow:
    0 20px 60px rgba(0,0,0,0.05);

  transition: 0.3s;
}

.quick-card:hover {
  transform: translateY(-6px);
}

.quick-header {
  display: flex;
  align-items: center;
  gap: 18px;

  margin-bottom: 28px;
}

.quick-icon {
  min-width: 58px;
  width: 58px;
  height: 58px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 18px;

  background:
    linear-gradient(
      135deg,
      #f5ead7,
      #fff9ef
    );

  color: #b08d57;
}

.quick-header h2 {
  font-size: 24px;
  font-weight: 700;

  margin-bottom: 5px;
}

.quick-header p {
  font-size: 14px;
  color: #8a8a8a;
}

/* TABLE */

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  padding-bottom: 16px;

  border-bottom: 1px solid #eee;

  text-align: left;

  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;

  color: #b08d57;
}

td {
  padding: 18px 0;

  border-bottom: 1px solid #f4f4f4;

  font-size: 14px;
  color: #444;
}

/* NECKLACES */

.necklace-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.necklace-item {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 18px 20px;

  border-radius: 18px;

  background: #fafafa;

  border: 1px solid #f1f1f1;

  transition: 0.2s;
}

.necklace-item:hover {
  border-color: #e3d1b3;
  transform: translateX(4px);
}

.necklace-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.necklace-dot {
  width: 10px;
  height: 10px;

  border-radius: 50%;

  background: #c8a36d;
}

.necklace-item strong {
  font-size: 15px;
  color: #111;
}

.necklace-item span {
  font-size: 14px;
  color: #666;
}

/* GRID */

.grid {
  max-width: 1120px;

  margin: auto;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

/* CARD */

.card {
  position: relative;

  background: rgba(255,255,255,0.92);

  backdrop-filter: blur(10px);

  border-radius: 28px;

  padding: 34px;

  border: 1px solid #ece6dc;

  overflow: hidden;

  transition: 0.35s;

  box-shadow:
    0 14px 40px rgba(0,0,0,0.04);
}

.card::before {
  content: "";

  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 4px;

  background:
    linear-gradient(
      90deg,
      #b08d57,
      #e9d6b7
    );
}

.card:hover {
  transform: translateY(-8px);

  box-shadow:
    0 28px 60px rgba(0,0,0,0.08);
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 22px;
}

.icon {
  width: 58px;
  height: 58px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 18px;

  background:
    linear-gradient(
      135deg,
      #f8efe1,
      #fffaf2
    );

  color: #b08d57;
}

.card-badge {
  padding: 8px 14px;

  border-radius: 999px;

  background: #faf5ec;

  color: #b08d57;

  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
}

.card h3 {
  font-size: 22px;
  font-weight: 700;

  margin-bottom: 14px;

  color: #111;
}

.card p {
  font-size: 14px;
  line-height: 1.9;

  color: #555;
}

.card-tip {
  margin-top: 22px;

  padding-top: 18px;

  border-top: 1px solid #f1f1f1;

  font-size: 13px;
  font-weight: 600;

  color: #b08d57;
}

/* RESPONSIVO */

@media (max-width: 920px) {

  .quick-guide,
  .grid {
    grid-template-columns: 1fr;
  }

  .hero h1 {
    font-size: 40px;
  }
}

@media (max-width: 640px) {

  .page {
    padding:
      60px 16px;
  }

  .hero {
    margin-bottom: 50px;
  }

  .hero h1 {
    font-size: 34px;
  }

  .hero p {
    font-size: 14px;
  }

  .quick-card,
  .card {
    padding: 24px;
  }

  .quick-header {
    align-items: flex-start;
  }

  .necklace-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .card-top {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
  }
}
</style>