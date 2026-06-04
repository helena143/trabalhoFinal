<template>
  <main class="support-portal">
    <div class="content-wrapper">

      <!-- Topo -->
      <nav class="top-nav">
        <div class="logo">
          Support<span>Ivy</span>
        </div>

        <div class="nav-status">
          <span class="pulse-dot"></span>
          Atendimento Online
        </div>
      </nav>

      <!-- Hero -->
      <header class="hero-section">
        <h1>Central de Suporte</h1>

        <p>
          Encontre soluções rápidas ou fale diretamente com nossa equipe.
        </p>

        <div class="search-bar">

          <!-- ÍCONE SEARCH -->
          <Search
            :size="18"
            stroke-width="2"
          />

          <input
            type="text"
            v-model="searchQuery"
            @focus="showSuggestions = true"
            @blur="setTimeout(() => showSuggestions = false, 150)"
            placeholder="Como podemos ajudar você hoje?"
          />

          <div
            v-if="showSuggestions && filteredSuggestions.length > 0"
            class="suggestions-dropdown"
          >
            <div
              v-for="s in filteredSuggestions"
              :key="s"
              class="suggestion-item"
              @click="selectSuggestion(s)"
            >
              {{ s }}
            </div>
          </div>

        </div>
      </header>

      <!-- Canais -->
      <section class="channels-grid">

        <!-- WHATSAPP -->
        <div
          class="channel-card primary"
          @click="openWhatsApp"
        >

          <div class="card-header">

            <div class="icon-box">
              <MessageCircle
                :size="28"
                stroke-width="2"
              />
            </div>

            <span class="tag">
              Tempo real
            </span>

          </div>

          <div class="card-body">
            <h3>WhatsApp</h3>

            <p>
              Atendimento prioritário pelo WhatsApp
              com nossa equipe.
            </p>
          </div>

          <div class="card-footer">
            <span>Iniciar conversa</span>
            →
          </div>

        </div>

        <!-- EMAIL -->
        <div
          class="channel-card"
          @click="showEmailForm = true"
        >

          <div class="card-header">

            <div class="icon-box secondary">
              <Mail
                :size="28"
                stroke-width="2"
              />
            </div>

          </div>

          <div class="card-body">
            <h3>Enviar E-mail / Ticket</h3>

            <p>
              Registre sua dúvida por escrito.
              Respondemos em até 24h.
            </p>
          </div>

          <div class="card-footer">
            <span>Abrir ticket</span>
            →
          </div>

        </div>

      </section>

      <!-- FORMULÁRIO -->
      <section
        v-if="showEmailForm"
        class="ticket-form-section"
      >

        <h2 class="section-title">
          Enviar Mensagem
        </h2>

        <div class="ticket-form">

          <div class="tf-group">
            <label>Seu Nome</label>

            <input
              v-model="ticket.name"
              class="tf-input"
              placeholder="Nome completo"
            />
          </div>

          <div class="tf-group">
            <label>E-mail</label>

            <input
              v-model="ticket.email"
              class="tf-input"
              type="email"
              placeholder="seu@email.com"
            />
          </div>

          <div class="tf-group">
            <label>Assunto</label>

            <select
              v-model="ticket.subject"
              class="tf-input tf-select"
            >
              <option value="">
                Selecione um assunto
              </option>

              <option value="rastreio">
                Rastreio de pedido
              </option>

              <option value="troca">
                Troca ou devolução
              </option>

              <option value="pagamento">
                Problema com pagamento
              </option>

              <option value="produto">
                Dúvida sobre produto
              </option>

              <option value="outro">
                Outro
              </option>
            </select>

          </div>

          <div class="tf-group">
            <label>Mensagem</label>

            <textarea
              v-model="ticket.message"
              class="tf-input tf-textarea"
              placeholder="Descreva sua dúvida ou problema em detalhes..."
              rows="5"
            ></textarea>
          </div>

          <p
            v-if="ticketStatus"
            class="ticket-status"
            :class="ticketStatusType"
          >
            {{ ticketStatus }}
          </p>

          <div class="tf-actions">

            <button
              class="tf-cancel"
              @click="showEmailForm = false"
            >
              Cancelar
            </button>

            <button
              class="tf-submit"
              @click="submitTicket"
              :disabled="sendingTicket"
            >
              {{ sendingTicket ? 'Enviando...' : 'Enviar Mensagem' }}
            </button>

          </div>

        </div>
      </section>

      <!-- FAQ -->
      <section class="faq-section">

        <h2 class="section-title">
          Perguntas Frequentes
        </h2>

        <div class="faq-list">

          <div
            v-for="(item, i) in faqFiltered"
            :key="i"
            class="faq-item"
          >

            <button
              class="faq-question"
              @click="toggleFaq(i)"
              :class="{ open: openFaq === i }"
            >

              <span>
                {{ item.q }}
              </span>

              <span class="faq-icon">
                {{ openFaq === i ? '−' : '+' }}
              </span>

            </button>

            <div
              v-if="openFaq === i"
              class="faq-answer"
            >
              {{ item.a }}
            </div>

          </div>

        </div>

      </section>

      <!-- AUTOATENDIMENTO -->
      <section class="self-service">

        <h2 class="section-title">
          Autoatendimento
        </h2>

        <div class="actions-list">

          <!-- PEDIDOS -->
          <div
            class="action-item"
           @click="$router.push('/sobrepedidos')"
          >

            <div class="action-icon">
              <Package
                :size="22"
                stroke-width="2"
              />
            </div>

            <div class="action-label">
              Meus Pedidos
            </div>

            <div class="action-arrow">
              →
            </div>

          </div>

          <!-- TROCAS -->
          <div
            class="action-item"
            @click="$router.push('/trocasdevolucoes')"
          >

            <div class="action-icon">
              <RefreshCcw
                :size="22"
                stroke-width="2"
              />
            </div>

            <div class="action-label">
              Trocas e Devoluções
            </div>

            <div class="action-arrow">
              →
            </div>

          </div>

          <!-- DÚVIDAS -->
          <div
            class="action-item"
            @click="$router.push('/duvidas')"
          >

            <div class="action-icon">
              <HelpCircle
                :size="22"
                stroke-width="2"
              />
            </div>

            <div class="action-label">
              Dúvidas Frequentes
            </div>

            <div class="action-arrow">
              →
            </div>

          </div>

          <!-- GUIA -->
          <div
            class="action-item"
            @click="$router.push('/guiatamanhos')"
          >

            <div class="action-icon">
              <Ruler
                :size="22"
                stroke-width="2"
              />
            </div>

            <div class="action-label">
              Guia de Tamanhos
            </div>

            <div class="action-arrow">
              →
            </div>

          </div>

        </div>

      </section>

    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import api from "../services/api"

import {
  Search,
  MessageCircle,
  Mail,
  Package,
  RefreshCcw,
  HelpCircle,
  Ruler,
} from 'lucide-vue-next'

// =========================
// SEARCH
// =========================

const searchQuery = ref('')

const showSuggestions = ref(false)

// =========================
// UI STATES
// =========================

const showEmailForm = ref(false)

const openFaq = ref<number | null>(null)

// =========================
// SUGESTÕES
// =========================

const suggestions = [
  "Como rastrear meu pedido?",
  "Segunda via de nota fiscal",
  "Esqueci minha senha",
  "Política de trocas e devoluções",
  "Prazo de entrega",
  "Cancelar um pedido",
  "Formas de pagamento",
  "Garantia dos produtos"
]

const filteredSuggestions = computed(() => {

  if (!searchQuery.value) {
    return suggestions
  }

  return suggestions.filter((s) =>

    s
      .toLowerCase()
      .includes(
        searchQuery.value.toLowerCase()
      )
  )
})

const selectSuggestion = (
  suggestion: string
) => {

  searchQuery.value =
    suggestion

  showSuggestions.value =
    false
}

// =========================
// FAQ
// =========================

const faqs = [
  {
    q: "Como rastrear meu pedido?",
    a: "Após o envio do pedido você receberá um email com o código de rastreio."
  },

  {
    q: "Qual o prazo de entrega?",
    a: "O prazo varia conforme sua região e método de envio."
  },

  {
    q: "Como fazer troca ou devolução?",
    a: "Você pode solicitar em até 7 dias após o recebimento."
  },

  {
    q: "Meu pagamento foi aprovado?",
    a: "PIX é aprovado rapidamente. Cartão pode levar alguns minutos."
  },

  {
    q: "Os produtos possuem garantia?",
    a: "Todos possuem garantia contra defeitos de fabricação."
  },

  {
    q: "Posso cancelar meu pedido?",
    a: "Sim, desde que ainda não tenha sido enviado."
  },
]

const faqFiltered = computed(() => {

  if (!searchQuery.value) {
    return faqs
  }

  return faqs.filter((faq) =>

    faq.q
      .toLowerCase()
      .includes(
        searchQuery.value.toLowerCase()
      )

    ||

    faq.a
      .toLowerCase()
      .includes(
        searchQuery.value.toLowerCase()
      )
  )
})

const toggleFaq = (
  index: number
) => {

  openFaq.value =

    openFaq.value === index
      ? null
      : index
}

// =========================
// TICKET
// =========================

const ticket = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const sendingTicket = ref(false)

const ticketStatus = ref('')

const ticketStatusType = ref('success')

// =========================
// ENVIAR TICKET
// =========================

const submitTicket = async () => {

  if (
    !ticket.value.name ||
    !ticket.value.email ||
    !ticket.value.subject ||
    !ticket.value.message
  ) {

    ticketStatus.value =
      'Preencha todos os campos'

    ticketStatusType.value =
      'error'

    return
  }

  try {

    sendingTicket.value = true

    const response =
      await api.post(
        "/support/ticket",
        {
          name: ticket.value.name,
          email: ticket.value.email,
          subject: ticket.value.subject,
          message: ticket.value.message,
        }
      )

    ticketStatus.value =
      response.data.message

    ticketStatusType.value =
      'success'

    ticket.value = {
      name: '',
      email: '',
      subject: '',
      message: '',
    }

    setTimeout(() => {

      showEmailForm.value =
        false

      ticketStatus.value =
        ''

    }, 2500)

  } catch (error: any) {

    ticketStatus.value =

      error.response?.data?.message ||

      'Erro ao enviar mensagem'

    ticketStatusType.value =
      'error'

  } finally {

    sendingTicket.value =
      false
  }
}

// =========================
// WHATSAPP
// =========================

const openWhatsApp = () => {

  const message = encodeURIComponent(
    "Olá! Gostaria de falar com o suporte da IVY Store."
  )

  window.open(
    `https://wa.me/5531999999999?text=${message}`,
    "_blank"
  )
}
</script>

<style scoped>
.support-portal {
  background: #fafafa;
  min-height: 100vh;
  padding-bottom: 60px;
  font-family: 'Montserrat', sans-serif;
}

.content-wrapper {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 24px;
}

.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0;
}

.logo {
  font-size: 1.2rem;
  font-weight: 700;
  color: #111;
}

.logo span {
  color: #c9a96e;
}

.nav-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.78rem;
  color: #777;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: #1e9b58;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.5;
    transform: scale(1.3);
  }
}

.hero-section {
  text-align: center;
  padding: 60px 0 40px;
}

.hero-section h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.hero-section p {
  color: #777;
  margin-bottom: 30px;
}

.search-bar {
  position: relative;
  max-width: 560px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 18px;
  padding: 14px 20px;
  gap: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
}

.search-bar input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 0.95rem;
  font-family: inherit;
  background: transparent;
}

.suggestions-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  z-index: 100;
  overflow: hidden;
}

.suggestion-item {
  padding: 13px 20px;
  cursor: pointer;
  font-size: 0.88rem;
}

.suggestion-item:hover {
  background: #f5f5f5;
}

/* CANAIS */

.channels-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 36px 0;
}

.channel-card {
  background: white;
  border: 1px solid #ebebeb;
  border-radius: 20px;
  padding: 28px;
  cursor: pointer;
  transition: 0.2s;
}

.channel-card:hover {
  border-color: #c9a96e;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  transform: translateY(-2px);
}

.channel-card.primary {
  border-color: #111;
  background: #111;
  color: white;
}

.channel-card.primary h3 {
  color: white;
}

.channel-card.primary p {
  color: #aaa;
}

.channel-card.primary .card-footer {
  color: #c9a96e;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tag {
  font-size: 0.7rem;
  background: #c9a96e22;
  color: #c9a96e;
  padding: 4px 10px;
  border-radius: 999px;
}

.card-body h3 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 6px;
}

.card-body p {
  font-size: 0.85rem;
  color: #888;
}

.card-footer {
  margin-top: 16px;
  font-size: 0.82rem;
  font-weight: 600;
  color: #111;
}

/* FORM */

.ticket-form-section {
  background: white;
  border: 1px solid #ebebeb;
  border-radius: 24px;
  padding: 36px;
  margin-bottom: 36px;
}

.ticket-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.tf-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tf-group label {
  font-size: 0.75rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #888;
}

.tf-input {
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  padding: 14px 16px;
  font-size: 0.9rem;
  font-family: inherit;
  outline: none;
}

.tf-input:focus {
  border-color: #111;
}

.tf-textarea {
  resize: vertical;
  height: 120px;
}

.tf-actions {
  display: flex;
  gap: 12px;
}

.tf-cancel {
  flex: 1;
  height: 50px;
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  cursor: pointer;
  font-family: inherit;
}

.tf-submit {
  flex: 2;
  height: 50px;
  background: #111;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  font-family: inherit;
}

.ticket-status {
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 0.85rem;
}

.ticket-status.success {
  background: #f0faf5;
  color: #1e9b58;
}

.ticket-status.error {
  background: #fff5f5;
  color: #e74c3c;
}

/* FAQ */

.faq-section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 20px;
  letter-spacing: 1px;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.faq-item {
  background: white;
  border: 1px solid #ebebeb;
  border-radius: 14px;
  overflow: hidden;
}

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  font-family: inherit;
}

.faq-answer {
  padding: 0 20px 18px;
  color: #666;
  font-size: 0.88rem;
  line-height: 1.7;
}

/* AUTOATENDIMENTO */

.self-service {
  margin-bottom: 40px;
}

.actions-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 20px;
  background: white;
  border: 1px solid #ebebeb;
  border-radius: 14px;
  cursor: pointer;
  transition: 0.15s;
}

.action-item:hover {
  border-color: #c9a96e;
}

.action-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c9a96e;
}

.action-label {
  flex: 1;
  font-size: 0.9rem;
  font-weight: 600;
}

.action-arrow {
  color: #c9a96e;
  font-size: 1rem;
}

@media (max-width: 640px) {

  .channels-grid {
    grid-template-columns: 1fr;
  }

  .hero-section h1 {
    font-size: 1.8rem;
  }
}
</style>