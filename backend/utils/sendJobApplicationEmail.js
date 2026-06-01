import SendEmail from "./SendEmail.js";

/**
 * Sends a clean, brand-aligned confirmation email to the candidate.
 */
export const sendJobApplicationEmail = async ({
  fullName,
  email,
  position,
}) => {
  const emailTemplate = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Application Received</title>
      <style type="text/css">
        body { width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; margin: 0; padding: 0; }
        img { outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
        a img { border: none; }
        table td { border-collapse: collapse; }
      </style>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 40px 20px; margin: 0;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);">
        <tr>
          <td style="padding: 40px;">
            <!-- Brand Badge Header -->
            <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
              <tr>
                <td style="background-color: #f1f5f9; color: #334155; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 6px 14px; border-radius: 9999px;">
                  Oasis Ascend Careers
                </td>
              </tr>
            </table>

            <!-- Heading -->
            <h2 style="margin: 0 0 16px 0; color: #0f172a; font-size: 26px; font-weight: 700; letter-spacing: -0.02em; line-height: 1.2;">
              Application Received
            </h2>

            <!-- Message Body -->
            <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
              Hello <strong style="color: #0f172a;">${fullName}</strong>,
            </p>

            <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
              Thank you for taking the time to apply for the <strong style="color: #0f172a;">${position}</strong> position. We appreciate your interest in joining our team.
            </p>

            <!-- Callout Card Box -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fafafa; border-left: 4px solid #0f172a; border-radius: 4px 8px 8px 4px; margin-bottom: 32px;">
              <tr>
                <td style="padding: 20px 24px;">
                  <p style="margin: 0; color: #475569; font-size: 15px; line-height: 1.6;">
                    Our hiring team has safely received your submission and resume portfolio. We will carefully evaluate your credentials and reach out to establish next steps if your alignment matches our current scope.
                  </p>
                </td>
              </tr>
            </table>

            <!-- Divider Line -->
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 0 0 24px 0;" />

            <!-- Signature block Layout -->
            <table border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="color: #64748b; font-size: 14px; margin: 0 0 4px 0;">Warm regards,</p>
                  <p style="color: #0f172a; font-size: 15px; font-weight: 600; margin: 0;">Oasis Ascend Recruitment Team</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  return SendEmail({
    to: email,
    subject: `Application Received - ${position}`,
    html: emailTemplate,
  });
};

/**
 * Sends a highly scannable, beautifully styled notification table layout to the admin dashboard email.
 */
export const sendAdminJobApplicationEmail = async ({
  fullName,
  email,
  phone,
  experience,
  notes,
  position,
  resumeUrl,
}) => {
  const emailTemplate = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>New Job Application</title>
      <style type="text/css">
        body { width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; margin: 0; padding: 0; }
        table td { border-collapse: collapse; }
      </style>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 40px 20px; margin: 0;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 640px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);">
        <tr>
          <td style="padding: 40px;">
            <!-- Alert Header Status -->
            <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
              <tr>
                <td style="background-color: #fff7ed; color: #c2410c; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 6px 14px; border-radius: 9999px; border: 1px solid #ffedd5;">
                  Internal Notifications Portal
                </td>
              </tr>
            </table>

            <!-- Main Heading -->
            <h2 style="margin: 0 0 8px 0; color: #0f172a; font-size: 24px; font-weight: 700; letter-spacing: -0.02em;">
              New Job Application
            </h2>
            <p style="margin: 0 0 28px 0; color: #64748b; font-size: 15px;">
              A new candidate profile submission entry has been logged.
            </p>

            <!-- Structured Data Field Presentation Layout Table -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; margin-bottom: 32px;">
              <!-- Field Row -->
              <tr style="background-color: #fafafa; border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 14px 20px; font-size: 14px; font-weight: 600; color: #64748b; width: 28%; text-transform: uppercase; letter-spacing: 0.02em;">Position</td>
                <td style="padding: 14px 20px; font-size: 15px; font-weight: 600; color: #0f172a;">${position}</td>
              </tr>
              <!-- Field Row -->
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 14px 20px; font-size: 14px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.02em;">Name</td>
                <td style="padding: 14px 20px; font-size: 15px; color: #0f172a; font-weight: 500;">${fullName}</td>
              </tr>
              <!-- Field Row -->
              <tr style="background-color: #fafafa; border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 14px 20px; font-size: 14px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.02em;">Email</td>
                <td style="padding: 14px 20px; font-size: 15px; color: #0f172a;">
                  <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <!-- Field Row -->
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 14px 20px; font-size: 14px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.02em;">Phone</td>
                <td style="padding: 14px 20px; font-size: 15px; color: #0f172a;">${phone}</td>
              </tr>
              <!-- Field Row -->
              <tr style="background-color: #fafafa; border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 14px 20px; font-size: 14px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.02em;">Experience</td>
                <td style="padding: 14px 20px; font-size: 15px; color: #0f172a;">${experience}</td>
              </tr>
              <!-- Field Row -->
              <tr>
                <td style="padding: 16px 20px; font-size: 14px; font-weight: 600; color: #64748b; vertical-align: top; text-transform: uppercase; letter-spacing: 0.02em;">Notes</td>
                <td style="padding: 16px 20px; font-size: 14px; color: #475569; line-height: 1.5; white-space: pre-wrap;">${notes || "<em>No additional comment provided</em>"}</td>
              </tr>
            </table>

            <!-- Professional Centered CTA Button Layer -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td align="center" style="padding-top: 8px;">
                  <table border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center" style="background-color: #0f172a; border-radius: 10px;">
                        <a href="${resumeUrl}" target="_blank" style="display: inline-block; padding: 14px 36px; font-size: 15px; font-weight: 600; color: #ffffff; text-decoration: none; tracking-wide: 0.01em;">
                          Review Resume File
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  return SendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `New Application - ${position}`,
    html: emailTemplate,
  });
};