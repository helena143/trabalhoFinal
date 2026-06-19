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
      subject: "Bem-vindo à Ivy Joias ",
      html: `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Bem-vindo à Ivy Joias</title>
</head>

<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f5f5f5;padding:40px 20px;">
  <tr>
    <td align="center">

      <table
        width="600"
        border="0"
        cellspacing="0"
        cellpadding="0"
        style="
          background-color:#ffffff;
          border-radius:12px;
          overflow:hidden;
          box-shadow:0 4px 20px rgba(0,0,0,0.08);
        "
      >

        <!-- HEADER -->
        <tr>
          <td
            align="center"
            style="
              background:#000000;
              padding:40px 20px;
            "
          >
            <h1
              style="
                margin:0;
                color:#ffffff;
                font-size:34px;
                letter-spacing:3px;
              "
            >
              IVY JOIAS
            </h1>

            <p
              style="
                color:#d4d4d4;
                margin-top:10px;
                font-size:14px;
              "
            >
              Elegância em cada detalhe
            </p>
          </td>
        </tr>

        <!-- CONTEÚDO -->
        <tr>
          <td style="padding:50px 40px;">

            <h2
              style="
                color:#111111;
                margin-top:0;
                margin-bottom:20px;
              "
            >
              Olá, ${name}! 
            </h2>

            <p
              style="
                color:#555555;
                font-size:16px;
                line-height:28px;
                margin-bottom:20px;
              "
            >
              Seja muito bem-vindo(a) à
              <strong>Ivy Joias</strong>.
            </p>

            <p
              style="
                color:#555555;
                font-size:16px;
                line-height:28px;
                margin-bottom:20px;
              "
            >
              Seu cadastro foi realizado com sucesso e agora você faz parte
              da nossa comunidade exclusiva.
            </p>

            <p
              style="
                color:#555555;
                font-size:16px;
                line-height:28px;
                margin-bottom:35px;
              "
            >
              Prepare-se para descobrir coleções sofisticadas,
              lançamentos exclusivos e peças criadas para marcar
              momentos especiais.
            </p>

            <table
              border="0"
              cellspacing="0"
              cellpadding="0"
              align="center"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#000000"
                  style="
                    border-radius:8px;
                  "
                >
                  <a
                    href="https://ivyjoias.com"
                    target="_blank"
                    style="
                      display:inline-block;
                      padding:15px 35px;
                      color:#ffffff;
                      text-decoration:none;
                      font-size:16px;
                      font-weight:bold;
                    "
                  >
                    Conhecer a Loja
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- DIVISÓRIA -->
        <tr>
          <td>
            <hr
              style="
                border:none;
                border-top:1px solid #eeeeee;
                margin:0;
              "
            />
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td
            align="center"
            style="
              background:#fafafa;
              padding:30px;
            "
          >

            <p
              style="
                color:#888888;
                font-size:14px;
                margin:0 0 10px 0;
              "
            >
              Obrigado por escolher a Ivy Joias 
            </p>

            <p
              style="
                color:#aaaaaa;
                font-size:12px;
                margin:0;
              "
            >
              © 2026 Ivy Joias. Todos os direitos reservados.
            </p>

          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Email enviado com sucesso",
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