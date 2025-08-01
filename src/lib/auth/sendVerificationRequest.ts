import { Resend } from "resend";
import { magicLinkEmail } from "./templates/magicLinkEmail";

export const sendVerificationRequest = async ({
  identifier,
  url,
  from,
}: {
  identifier: string;
  url: string;
  from: string;
}) => {
  const resend = new Resend(process.env.RESEND_API_KEY!);

  const html = magicLinkEmail({
    url,
  });

  const response = await resend.emails.send({
    from,
    to: identifier,
    subject: "Sign in to your account",
    html,
  });

  if (response.error) {
    throw new Error(`Resend error: ${response.error.message}`);
  }
};
