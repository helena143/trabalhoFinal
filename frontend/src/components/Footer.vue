<template>
  <footer class="footer">

    <!-- FAIXA SUPERIOR GOLD -->
    <div class="footer-topbar">
      <span>✦ Frete Grátis em compras acima de R$ 299</span>
      <span class="sep">|</span>
      <span>✦ Até 10x sem juros</span>
      <span class="sep">|</span>
      <span>✦ Troca facilitada</span>
    </div>

    <!-- CORPO DO FOOTER -->
    <div class="footer-body">
      <div class="footer-container">

        <!-- COLUNA: AJUDA -->
        <div class="footer-col">
          <h4>AJUDA</h4>
          <ul>
            <li @click="openModal('duvidas')">Dúvidas frequentes</li>
            <li @click="openModal('pedidos')">Sobre os pedidos</li>
            <li @click="openModal('entrega')">Política de entrega</li>
            <li @click="openModal('trocas')">Trocas e devoluções</li>
            <li @click="openModal('tamanhos')">Guia de tamanhos</li>
          </ul>
        </div>

        <!-- COLUNA: SOBRE NÓS -->
        <div class="footer-col">
          <h4>SOBRE NÓS</h4>
          <ul>
            <li @click="openModal('conheca')">Conheça a IVY</li>
            <li @click="openModal('trabalhe')">Trabalhe conosco</li>
            <li @click="openModal('privacidade')">Política de privacidade</li>
          </ul>
        </div>

        <!-- COLUNA: CONTATO -->
        <div class="footer-col">
          <h4>CONTATO</h4>
          <ul>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="13" height="13"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6 6l.93-.93a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2.01z"/></svg>
              (31) 4130-8933
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="13" height="13"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6 6l.93-.93a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2.01z"/></svg>
              4003-1627
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="13" height="13"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6 6l.93-.93a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2.01z"/></svg>
              0800-550-0333
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="13" height="13"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              contato@ivy.com.br
            </li>
          </ul>
        </div>

        <!-- COLUNA: INFORMAÇÕES -->
        <div class="footer-col">
          <h4>INFORMAÇÕES</h4>
          <ul>
            <li @click="openModal('pagamento')">Formas de pagamento</li>
            <li @click="openModal('seguranca')">Segurança</li>
          </ul>
          <div class="payment-icons">
            <span class="pay-badge">VISA</span>
            <span class="pay-badge">MC</span>
            <span class="pay-badge">PIX</span>
            <span class="pay-badge">BOLETO</span>
          </div>
        </div>

        <!-- NEWSLETTER -->
        <div class="footer-newsletter">
          <h4>NOVIDADES EXCLUSIVAS</h4>
          <p>Receba curadoria especial e ofertas antes de todos</p>
          <form class="newsletter-form" @submit.prevent="subscribe">
            <input type="email" v-model="email" placeholder="Seu e-mail" required />
            <button type="submit">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </form>
          <p v-if="subscribed" class="sub-ok">✓ Obrigada! Você agora faz parte da IVY.</p>
          <p class="privacy-note">
            Ao cadastrar, você aceita nossa <span @click="openModal('privacidade')" class="priv-link">Política de Privacidade</span>.
          </p>
        </div>

      </div>
    </div>

    <!-- RODAPÉ INFERIOR -->
    <div class="footer-bottom">
      <div class="footer-bottom-inner">

        <div class="brand-social">
          <span class="footer-brand">LIFE BY <strong>IVY</strong></span>
          <div class="footer-social">

            <!-- INSTAGRAM -->
            <a href="https://instagram.com" target="_blank" class="social-btn instagram" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" width="18" height="18">
                <rect x="3" y="3" width="18" height="18" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17" cy="7" r="1" fill="currentColor"/>
              </svg>
            </a>

            <!-- FACEBOOK -->
            <a href="https://facebook.com" target="_blank" class="social-btn facebook" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.6.4-1 1-1z"/>
              </svg>
            </a>

            <!-- WHATSAPP -->
            <a href="https://wa.me/5531413089333" target="_blank" class="social-btn whatsapp" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M12 2a10 10 0 0 0-8.7 15l-1.3 5 5.1-1.4A10 10 0 1 0 12 2z"/>
                <path fill="#fff" d="M16.5 13.5c-.2-.1-1.1-.5-1.3-.6s-.5-.1-.7.1c-.2.2-.9.6-1.1.7-.2.1-.4.1-.6-.1-.2-.2-.7-.8-.8-.9-.1-.2-.1-.4 0-.6.1-.1.5-1 .5-1.2s0-.4-.1-.5c-.1-.1-.7-1.6-1-2.2-.3-.6-.6-.5-.7-.5s-.3 0-.5 0-.5.1-.7.3c-.2.2-.8.7-.8 1.7s.8 2 .9 2.1c.1.1 1.5 2.3 3.6 3.2.5.2.8.3 1.1.4.5.1.9.1 1.2.1.4 0 1.1-.4 1.2-.8.1-.4.1-.7.1-.8s-.1-.2-.3-.3z"/>
              </svg>
            </a>

            <!-- TIKTOK -->
            <a href="https://tiktok.com" target="_blank" class="social-btn tiktok" aria-label="TikTok">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.01a8.16 8.16 0 0 0 4.78 1.52V7.1a4.85 4.85 0 0 1-1.01-.41z"/>
              </svg>
            </a>

          </div>
        </div>

        <span class="footer-copy">© 2026 IVY LTDA — CNPJ 00.000.000/0001-00</span>
      </div>
    </div>

    <!-- ===== MODAIS ===== -->
    <Transition name="modal-fade">
      <div v-if="activeModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-box">
          <button class="modal-close" @click="closeModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <h2 class="modal-title">{{ modalContent.title }}</h2>
          <div class="modal-body" v-html="modalContent.body"></div>
        </div>
      </div>
    </Transition>

  </footer>
</template>

<script>
const MODALS = {
  duvidas: {
    title: 'Dúvidas Frequentes',
    body: `
      <div class="faq">
        <div class="faq-item"><h4>Como rastrear meu pedido?</h4><p>Após a confirmação do envio, você receberá um código de rastreamento por e-mail. Acesse o site dos Correios ou da transportadora com esse código.</p></div>
        <div class="faq-item"><h4>Posso alterar meu pedido após a confirmação?</h4><p>Alterações podem ser feitas em até 2 horas após a compra, entrando em contato com nossa equipe pelo (31) 4130-8933.</p></div>
        <div class="faq-item"><h4>As joias são revestidas ou maciças?</h4><p>Trabalhamos com peças em ouro 18k maciço, prata 925 e versões banhadas a ouro com garantia de até 1 ano no banho.</p></div>
        <div class="faq-item"><h4>Fazem personalizações?</h4><p>Sim! Entre em contato conosco para encomendas personalizadas. Prazo médio de 15 a 30 dias úteis.</p></div>
        <div class="faq-item"><h4>O produto vem em embalagem para presente?</h4><p>Todos os produtos IVY são entregues em nossa caixa exclusiva, lacrada com fita de cetim e cartão personalizado.</p></div>
      </div>
    `
  },
  pedidos: {
    title: 'Sobre os Pedidos',
    body: `
      <p>Após a confirmação do pagamento, seu pedido entra em processamento imediatamente.</p>
      <ul class="modal-list">
        <li><strong>Prazo de separação:</strong> até 2 dias úteis</li>
        <li><strong>Prazo de envio:</strong> conforme a transportadora (PAC ou SEDEX)</li>
        <li><strong>Confirmação:</strong> você receberá e-mails em cada etapa</li>
        <li><strong>Nota fiscal:</strong> enviada por e-mail após o despacho</li>
      </ul>
      <p>Dúvidas? Fale com a gente: <strong>contato@ivy.com.br</strong></p>
    `
  },
  entrega: {
    title: 'Política de Entrega',
    body: `
      <p>A IVY trabalha com as melhores transportadoras para garantir que sua joia chegue com segurança.</p>
      <ul class="modal-list">
        <li><strong>Frete Grátis</strong> em pedidos acima de R$ 299</li>
        <li><strong>PAC:</strong> 7 a 15 dias úteis</li>
        <li><strong>SEDEX:</strong> 1 a 5 dias úteis</li>
        <li><strong>Retirada em loja:</strong> disponível em BH/MG</li>
      </ul>
      <p>Em caso de extravio ou avaria, entre em contato em até 7 dias após o recebimento.</p>
    `
  },
  trocas: {
    title: 'Trocas e Devoluções',
    body: `
      <p>Sua satisfação é nossa prioridade. A IVY aceita trocas e devoluções em até <strong>30 dias corridos</strong> após o recebimento.</p>
      <ul class="modal-list">
        <li>Produto deve estar sem uso e na embalagem original</li>
        <li>Solicite a troca pelo e-mail contato@ivy.com.br</li>
        <li>O frete de devolução é por conta da IVY</li>
        <li>Reembolso em até 10 dias úteis após análise</li>
      </ul>
      <p>Peças personalizadas ou gravadas não são elegíveis para troca, exceto em caso de defeito de fabricação.</p>
    `
  },
  tamanhos: {
    title: 'Guia de Tamanhos',
    body: `
      <p>Encontre o tamanho perfeito para suas joias IVY.</p>
      <h4 style="margin: 16px 0 8px; color: #0a192f;">Anéis</h4>
      <table class="size-table">
        <tr><th>Tamanho</th><th>Diâmetro (mm)</th><th>Circunferência (mm)</th></tr>
        <tr><td>10</td><td>15,3</td><td>48</td></tr>
        <tr><td>12</td><td>16,0</td><td>50</td></tr>
        <tr><td>14</td><td>17,3</td><td>54</td></tr>
        <tr><td>16</td><td>18,2</td><td>57</td></tr>
        <tr><td>18</td><td>19,0</td><td>60</td></tr>
        <tr><td>20</td><td>19,8</td><td>62</td></tr>
      </table>
      <h4 style="margin: 16px 0 8px; color: #0a192f;">Colares e Correntes</h4>
      <ul class="modal-list">
        <li>40 cm — colar rente ao pescoço</li>
        <li>45 cm — comprimento clássico</li>
        <li>50 cm — abaixo da clavícula</li>
        <li>60 cm — longo/colar lariat</li>
      </ul>
    `
  },
  conheca: {
    title: 'Conheça a IVY',
    body: `
      <p>A <strong>IVY</strong> nasceu da paixão por joias autênticas que contam histórias. Fundada em Belo Horizonte em 2018, somos uma marca de alta joalheria que une design contemporâneo às técnicas tradicionais do ofício.</p>
      <p style="margin-top: 12px">Cada peça é desenvolvida por nossos designers e produzida por ourives certificados, garantindo qualidade e rastreabilidade em todo o processo.</p>
      <p style="margin-top: 12px">Nossa missão: criar peças que durem gerações e carregam emoções únicas.</p>
      <div style="margin-top: 20px; padding: 16px; background: #f8f6f1; border-left: 3px solid #d4af37;">
        <em>"Elegância não é ser notada, é ser lembrada." — Fundadoras IVY</em>
      </div>
    `
  },
  trabalhe: {
    title: 'Trabalhe Conosco',
    body: `
      <p>Faça parte do time IVY e contribua com a construção de uma das mais inovadoras marcas de joalheria do Brasil.</p>
      <h4 style="margin: 16px 0 8px; color: #0a192f;">Vagas Abertas</h4>
      <ul class="modal-list">
        <li><strong>Designer de Joias</strong> — BH/MG (presencial)</li>
        <li><strong>Especialista em E-commerce</strong> — Remoto</li>
        <li><strong>Atendente de Loja</strong> — BH/MG (presencial)</li>
        <li><strong>Social Media</strong> — Remoto/Híbrido</li>
      </ul>
      <p style="margin-top: 16px">Envie seu currículo para: <strong>rh@ivy.com.br</strong></p>
    `
  },
  privacidade: {
    title: 'Política de Privacidade',
    body: `
      <p>A IVY respeita e protege a privacidade de seus usuários, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei 13.709/2018).</p>
      <h4 style="margin: 16px 0 8px; color: #0a192f;">Dados que coletamos</h4>
      <ul class="modal-list">
        <li>Nome e e-mail para cadastro e newsletter</li>
        <li>Endereço para entrega de pedidos</li>
        <li>Dados de navegação (cookies anônimos)</li>
      </ul>
      <h4 style="margin: 16px 0 8px; color: #0a192f;">Como usamos</h4>
      <ul class="modal-list">
        <li>Processar pedidos e enviar atualizações</li>
        <li>Enviar comunicados com seu consentimento</li>
        <li>Melhorar nossa experiência de compra</li>
      </ul>
      <p style="margin-top: 12px">Nunca vendemos seus dados a terceiros. Para solicitar exclusão: <strong>privacidade@ivy.com.br</strong></p>
    `
  },
  pagamento: {
    title: 'Formas de Pagamento',
    body: `
      <ul class="modal-list">
        <li><strong>Cartão de Crédito:</strong> Visa, Mastercard, Elo, American Express — até 10x sem juros</li>
        <li><strong>PIX:</strong> 10% de desconto à vista</li>
        <li><strong>Boleto Bancário:</strong> vencimento em 3 dias úteis</li>
        <li><strong>Cartão de Débito:</strong> à vista</li>
      </ul>
      <p style="margin-top: 16px">Parcelamento mínimo de R$ 30 por parcela. Valores sujeitos à análise de crédito.</p>
      <div style="margin-top: 16px; display: flex; gap: 8px; flex-wrap: wrap;">
        <span class="pay-badge-lg">VISA</span>
        <span class="pay-badge-lg">MASTERCARD</span>
        <span class="pay-badge-lg">ELO</span>
        <span class="pay-badge-lg">PIX</span>
        <span class="pay-badge-lg">BOLETO</span>
        <span class="pay-badge-lg">AMEX</span>
      </div>
    `
  },
  seguranca: {
    title: 'Segurança',
    body: `
      <p>Sua segurança é nossa prioridade. O site IVY utiliza tecnologia de ponta para proteger seus dados.</p>
      <ul class="modal-list">
        <li><strong>SSL 256 bits:</strong> toda comunicação é criptografada</li>
        <li><strong>PCI DSS:</strong> conformidade com os padrões de segurança de cartões</li>
        <li><strong>Autenticação:</strong> tokens JWT com expiração automática</li>
        <li><strong>Monitoramento 24/7:</strong> sistema antifraude ativo</li>
      </ul>
      <p style="margin-top: 12px">Nunca enviamos e-mails solicitando sua senha. Em caso de suspeita, entre em contato imediatamente.</p>
    `
  }
}

export default {
  name: 'Footer',
  data() {
    return {
      email: '',
      subscribed: false,
      activeModal: null
    }
  },
  computed: {
    modalContent() {
      return this.activeModal ? MODALS[this.activeModal] : { title: '', body: '' }
    }
  },
  methods: {
    subscribe() {
      if (!this.email) return
      this.subscribed = true
      this.email = ''
      setTimeout(() => { this.subscribed = false }, 5000)
    },
    openModal(key) {
      this.activeModal = key
      document.body.style.overflow = 'hidden'
    },
    closeModal() {
      this.activeModal = null
      document.body.style.overflow = ''
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');

.footer {
  font-family: 'DM Sans', sans-serif;
  color: #222;
  background: #fff;
}

/* TOPBAR */
.footer-topbar {
  background: #0a192f;
  color: rgba(255,255,255,0.7);
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  text-align: center;
  padding: 12px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.sep { color: rgba(255,255,255,0.2); }

/* BODY */
.footer-body {
  background: #f7f5f1;
  border-top: 1px solid #ece9e2;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 30px;
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}

/* COLUNAS */
.footer-col {
  flex: 1;
  min-width: 140px;
}

.footer-col h4 {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #0a192f;
  margin-bottom: 18px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}

.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-col li {
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
  line-height: 1.4;
}

.footer-col li:hover { color: #0a192f; }

/* PAYMENT ICONS */
.payment-icons {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 14px;
}

.pay-badge {
  padding: 3px 7px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #555;
  background: white;
}

/* NEWSLETTER */
.footer-newsletter {
  flex: 1.6;
  min-width: 240px;
  background: #0a192f;
  padding: 32px;
  border-radius: 2px;
  color: white;
}

.footer-newsletter h4 {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 2.5px;
  margin-bottom: 10px;
}

.footer-newsletter p {
  font-size: 13px;
  color: rgba(255,255,255,0.55);
  margin-bottom: 20px;
  line-height: 1.5;
}

.newsletter-form {
  display: flex;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 6px;
  overflow: hidden;
}

.newsletter-form input {
  flex: 1;
  padding: 13px 16px;
  background: rgba(255,255,255,0.08);
  border: none;
  outline: none;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  color: white;
}

.newsletter-form input::placeholder { color: rgba(255,255,255,0.3); }

.newsletter-form button {
  padding: 0 18px;
  background: #d4af37;
  border: none;
  cursor: pointer;
  color: #0a192f;
  display: flex;
  align-items: center;
  transition: background 0.2s;
}
.newsletter-form button:hover { background: #c9a423; }

.sub-ok {
  color: #86efac !important;
  font-size: 12px !important;
  margin-top: 10px !important;
  margin-bottom: 0 !important;
}

.privacy-note {
  font-size: 11px !important;
  color: rgba(255,255,255,0.3) !important;
  margin-top: 12px !important;
  margin-bottom: 0 !important;
}

.priv-link {
  color: rgba(255,255,255,0.5);
  cursor: pointer;
  text-decoration: underline;
}
.priv-link:hover { color: #d4af37; }

/* FOOTER BOTTOM */
.footer-bottom {
  border-top: 1px solid #e8e4dc;
  padding: 20px 30px;
  background: #f7f5f1;
}

.footer-bottom-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
}

.brand-social {
  display: flex;
  align-items: center;
  gap: 20px;
}

.footer-brand {
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #aaa;
  font-weight: 300;
}

.footer-brand strong {
  color: #0a192f;
  font-weight: 600;
  letter-spacing: 4px;
}

.footer-social { display: flex; gap: 6px; }

.social-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  border: 1px solid #e0dcd6;
  text-decoration: none;
  transition: all 0.25s;
  background: white;
}

.social-btn:hover { transform: translateY(-3px); }
.social-btn.instagram:hover { color: #e1306c; border-color: #e1306c; box-shadow: 0 4px 14px rgba(225,48,108,0.25); }
.social-btn.facebook:hover { color: #1877f2; border-color: #1877f2; box-shadow: 0 4px 14px rgba(24,119,242,0.25); }
.social-btn.whatsapp:hover { color: #25d366; border-color: #25d366; box-shadow: 0 4px 14px rgba(37,211,102,0.25); }
.social-btn.tiktok:hover { color: #000; border-color: #000; box-shadow: 0 4px 14px rgba(0,0,0,0.15); }

.footer-copy {
  font-size: 11px;
  color: #bbb;
  letter-spacing: 0.5px;
}

/* ===== MODAIS ===== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10,25,47,0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.modal-box {
  background: white;
  border-radius: 4px;
  max-width: 560px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  padding: 40px;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: #aaa;
  padding: 4px;
  transition: color 0.2s;
}
.modal-close:hover { color: #0a192f; }

.modal-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 28px;
  color: #0a192f;
  font-weight: 500;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
}

.modal-body {
  font-size: 14px;
  line-height: 1.7;
  color: #555;
}

/* TRANSITIONS */
.modal-fade-enter-active, .modal-fade-leave-active { transition: all 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal-fade-enter-from .modal-box { transform: translateY(20px); }

@media (max-width: 768px) {
  .footer-container { flex-direction: column; }
  .footer-topbar { gap: 10px; }
  .sep { display: none; }
  .footer-bottom-inner { flex-direction: column; text-align: center; }
}
</style>

<!-- ESTILOS GLOBAIS PARA OS MODAIS -->
<style>
.faq { display: flex; flex-direction: column; gap: 18px; }
.faq-item h4 { font-size: 14px; font-weight: 600; color: #0a192f; margin-bottom: 6px; }
.faq-item p { font-size: 13px; color: #666; line-height: 1.6; }

.modal-list { padding-left: 18px; margin: 8px 0; display: flex; flex-direction: column; gap: 8px; }
.modal-list li { font-size: 13px; color: #555; line-height: 1.5; }

.size-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.size-table th { background: #f5f5f5; padding: 10px; text-align: left; font-weight: 600; border: 1px solid #eee; color: #0a192f; }
.size-table td { padding: 9px 10px; border: 1px solid #eee; color: #555; }
.size-table tr:nth-child(even) td { background: #fafafa; }

.pay-badge-lg { padding: 6px 12px; background: #0a192f; color: white; font-size: 10px; font-weight: 600; border-radius: 4px; letter-spacing: 1px; }
</style>
