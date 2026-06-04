import { transporter } from "../config/mail";

interface SendMailProps {
  to: string;
  subject: string;
  html: string;
}

export const sendMail = async ({
  to,
  subject,
  html,
}: SendMailProps) => {
  await transporter.sendMail({
    from: `"Ivy Store" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};