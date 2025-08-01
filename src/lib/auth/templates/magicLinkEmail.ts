import { siteConfig } from "@/lib/config";

export const magicLinkEmail = ({ url }: { url: string }) => `
  <body style="font-family: sans-serif; background-color: #f9fafb; padding: 20px;">
    <table width="100%" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
      <tr>
        <td align="center" style="font-size: 24px; font-weight: bold; color: #333;">
          🔐 Sign in to ${siteConfig.siteName}
        </td>
      </tr>
      <tr>
        <td style="padding: 20px 0; color: #555; font-size: 16px;">
          Click the button below to securely sign in:
        </td>
      </tr>
      <tr>
        <td align="center">
          <a href="${url}" style="background-color: #800020; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 16px; display: inline-block;">
            👉 Sign in now
          </a>
        </td>
      </tr>
      <tr>
        <td style="padding-top: 30px; color: #999; font-size: 12px;">
          If you didn’t request this email, you can safely ignore it.<br />
          This link will expire in 10 minutes.
        </td>
      </tr>
    </table>
  </body>
`;
