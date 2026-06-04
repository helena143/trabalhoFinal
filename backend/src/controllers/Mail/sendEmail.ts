import { Request, Response } from "express";
import { sendMail } from "../../services/sendMail";

export const sendEmail = async (
  req: Request,
  res: Response
) => {
  try {

    const { email, name } = req.body;

    console.log("BODY:", req.body);

    await sendMail({
      to: email,
      subject: "Bem-vindo à Luxury Store",
      html: `
        <div style="font-family: Arial;">
          <h1>Olá, ${name}</h1>

          <p>
            Seu cadastro foi realizado com sucesso.
          </p>

          <b>Luxury Store</b>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Email enviado",
    });

  } catch (error: any) {

    console.log("ERRO REAL EMAIL:");
    console.log(error);

    return res.status(500).json({
      success: false,
      error: error.message,
      full: error,
    });
  }
};