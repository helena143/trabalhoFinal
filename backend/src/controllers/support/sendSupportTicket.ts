import { Request, Response } from "express";
import { sendMail } from "../../services/sendMail";

export const sendSupportTicket = async (
  req: Request,
  res: Response
) => {
  try {

    const {
      name,
      email,
      subject,
      message,
    } = req.body;

    if (
      !name ||
      !email ||
      !subject ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message: "Preencha todos os campos",
      });
    }

    // EMAIL PARA A LOJA
    await sendMail({
      to: process.env.EMAIL_USER!,

      subject: `🎫 Novo Ticket - ${subject}`,

      html: `
        <div
          style="
            font-family:Arial;
            padding:30px;
          "
        >

          <h1>
            Novo Ticket de Suporte
          </h1>

          <p>
            <b>Nome:</b> ${name}
          </p>

          <p>
            <b>Email:</b> ${email}
          </p>

          <p>
            <b>Assunto:</b> ${subject}
          </p>

          <p>
            <b>Mensagem:</b>
          </p>

          <div
            style="
              background:#f5f5f5;
              padding:20px;
              border-radius:12px;
            "
          >
            ${message}
          </div>

        </div>
      `,
    });

    // EMAIL AUTOMÁTICO PARA CLIENTE
    await sendMail({
      to: email,

      subject: "Recebemos sua mensagem 💎",

      html: `
        <div
          style="
            font-family:Arial;
            background:#111;
            color:white;
            padding:40px;
            border-radius:20px;
          "
        >

          <h1 style="color:#d4af37;">
            Ivy Store
          </h1>

          <p>
            Olá, ${name}
          </p>

          <p>
            Recebemos seu ticket de suporte.
          </p>

          <p>
            Nossa equipe responderá em até 24h.
          </p>

          <div
            style="
              margin-top:30px;
              color:#999;
              font-size:14px;
            "
          >
            Atendimento Premium Ivy Store
          </div>

        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Ticket enviado com sucesso",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Erro ao enviar ticket",
    });
  }
};