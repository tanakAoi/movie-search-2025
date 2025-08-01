import { Resend } from "resend";

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

  const response = await resend.emails.send({
    from,
    to: identifier,
    subject: "Sign in to your account",
    html: `
      <p>Click the link below to sign in:</p>
      <p><a href="${url}"><b>Sign in</b></a></p>
    `,
  });

  if (response.error) {
    throw new Error(`Resend error: ${response.error.message}`);
  }
};
