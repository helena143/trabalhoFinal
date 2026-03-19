<template>
  <footer class="footer">

    <!-- PARTE PRINCIPAL DO FOOTER -->
    <div class="footer-container">

      <!-- BLOCO ESQUERDO -->
      <div class="footer-left">

        <div class="footer-column">
          <h4>AJUDA</h4>
          <ul>
            <li>Dúvidas frequentes</li>
            <li>Sobre os pedidos</li>
            <li>Política de entrega</li>
            <li>Trocas e devoluções</li>
            <li>Guia de tamanhos</li>
          </ul>
        </div>

        <div class="footer-column">
          <h4>SOBRE NÓS</h4>
          <ul>
            <li>Conheça a IVY</li>
            <li>Trabalhe conosco</li>
            <li>Nossas lojas</li>
            <li>Política de privacidade</li>
          </ul>
        </div>

        <div class="footer-column">
          <h4>CONTATO</h4>
          <ul>
            <li>(31) 4130-8933</li>
            <li>4003-1627</li>
            <li>0800-550-0333</li>
          </ul>
        </div>

        <div class="footer-column">
          <h4>INFORMAÇÕES</h4>
          <ul>
            <li>Formas de pagamento</li>
            <li>Segurança</li>
          </ul>
        </div>

      </div>

      <!-- NEWSLETTER (DIREITA) -->
      <div class="footer-newsletter">
        <h4>Acompanhe nossas novidades</h4>
        <p>Cadastre seu e-mail para receber informações exclusivas</p>

        <form class="newsletter-form" @submit.prevent="subscribe">
          <input
            type="email"
            v-model="email"
            placeholder="E-MAIL"
            required
          />
          <button type="submit">CADASTRAR</button>
        </form>

        <p class="privacy-note">
          Tendo analisado e compreendido a
          <a href="#">Política de Privacidade</a>, declaro ter mais de 18 anos
          e aceito receber comunicados da <strong>IVY</strong>.
        </p>
      </div>

    </div>

    <!-- BARRA INFERIOR COM REDES SOCIAIS -->
    <div class="footer-bottom">
      <div class="footer-bottom-container">

        <!-- LIFE BY IVY + REDES SOCIAIS -->
        <div class="brand-social">
         <span class="footer-brand">LIFE BY <span>IVY</span></span>

         <div class="footer-social">

            <!-- INSTAGRAM -->
            <a href="#" class="social instagram" aria-label="Instagram">
            <svg viewBox="0 0 24 24" class="icon-social" fill="none"
            xmlns="http://www.w3.org/2000/svg">
             <rect x="3" y="3" width="18" height="18" rx="5"
             stroke="currentColor" stroke-width="1.6"/>
            <circle cx="12" cy="12" r="4"
            stroke="currentColor" stroke-width="1.6"/>
            <circle cx="17" cy="7" r="1"
            fill="currentColor"/>
            </svg>
        </a>

            <!-- FACEBOOK -->
            <a href="#" class="social facebook" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="#1877f2" d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.6.4-1 1-1z"/>
              </svg>
            </a>

            <!-- WHATSAPP -->
            <a href="#" class="social whatsapp" aria-label="WhatsApp">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="#25d366" d="M12 2a10 10 0 0 0-8.7 15l-1.3 5 5.1-1.4A10 10 0 1 0 12 2z"/>
                <path fill="#fff" d="M16.5 13.5c-.2-.1-1.1-.5-1.3-.6s-.5-.1-.7.1c-.2.2-.9.6-1.1.7-.2.1-.4.1-.6-.1-.2-.2-.7-.8-.8-.9-.1-.2-.1-.4 0-.6.1-.1.5-1 .5-1.2s0-.4-.1-.5c-.1-.1-.7-1.6-1-2.2-.3-.6-.6-.5-.7-.5s-.3 0-.5 0-.5.1-.7.3c-.2.2-.8.7-.8 1.7s.8 2 .9 2.1c.1.1 1.5 2.3 3.6 3.2.5.2.8.3 1.1.4.5.1.9.1 1.2.1.4 0 1.1-.4 1.2-.8.1-.4.1-.7.1-.8s-.1-.2-.3-.3z"/>
              </svg>
            </a>

          </div>
        </div>

        <span class="footer-copy">© 2026 IVY LTDA</span>
      </div>
    </div>

  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    subscribe() {
      alert(`Obrigado por se inscrever, ${this.email}!`);
      this.email = "";
    },
  },
};
</script>

<style scoped>
.footer {
  background: #f8f8f8;
  font-family: Arial, sans-serif;
  color: #222;
}

/* PARTE PRINCIPAL */
.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 20px;
  display: flex;
  gap: 40px;
}

.footer-left {
  flex: 2.5;
  display: flex;
  gap: 40px;
}

.footer-column h4 {
  font-size: 13px;
  margin-bottom: 12px;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column li {
  font-size: 13px;
  margin-bottom: 8px;
}

/* NEWSLETTER */
.footer-newsletter {
  flex: 1.8;
  background: #eee;
  padding: 28px;
}

.newsletter-form {
  display: flex;
  gap: 8px;
  margin: 12px 0;
}

.newsletter-form input {
  flex: 1;
  padding: 12px;
  border: 1px solid #ccc;
}

.newsletter-form button {
  padding: 12px 18px;
  background: #000;
  color: #fff;
  border: none;
}

.privacy-note {
  font-size: 11px;
  color: #555;
}

/* BARRA INFERIOR */
.footer-bottom {
  border-top: 1px solid #ddd;
  padding: 18px 20px;
}

.footer-bottom-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

/* LIFE BY IVY + REDES SOCIAIS */
.brand-social {
  display: flex;
  align-items: center;
  gap: 14px; /* distância elegante entre texto e ícones */
}

/* Texto estilo Vivara */
.footer-brand {
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #8a8a8a;
  font-weight: 400;
}

/* Destaque sutil na marca */
.footer-brand span {
  color: #000;
  font-weight: 600;
  letter-spacing: 4px;
}
/* REDES SOCIAIS */
.footer-social {
  display: flex;
  gap: 8px; /* distância entre os ícones */
}

.footer-social .social {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.footer-social svg {
  width: 22px;
  height: 22px;
}

/* HOVER */
.social.instagram:hover {
  transform: translateY(-4px) scale(1.1);
  box-shadow: 0 0 18px rgba(221, 42, 123, 0.6);
}

.social.facebook:hover {
  opacity: 0.8;
}

.social.whatsapp:hover {
  transform: translateY(-4px) scale(1.08);
  box-shadow: 0 0 18px rgba(37, 211, 102, 0.7);
}

.footer-copy {
  font-size: 12px;
  color: #555;
}

/* MOBILE */
@media (max-width: 900px) {
  .footer-container {
    flex-direction: column;
  }

  .footer-left {
    flex-wrap: wrap;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .footer-bottom-container {
    flex-direction: column;
    gap: 12px;
  }

  .brand-social {
    justify-content: center;
  }
}
</style>