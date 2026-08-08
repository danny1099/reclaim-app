import type { GeneratedCopies } from "@/modules/connection/types";

export function validateCopies(copies: GeneratedCopies): void {
  const days = ["day1", "day3", "day7"] as const;
  for (const day of days) {
    if (!copies[day]?.subject || !copies[day]?.body) {
      throw new Error(`Invalid copy email ${day}: missing subject o body`);
    }
    if (!copies[day].body.includes("{{UPDATE_CARD_LINK}}")) {
      throw new Error(`Copy ${day} does not contain the placeholder {{UPDATE_CARD_LINK}}`);
    }
  }
}

export function renderBasicHtml(bodyText: string, brandName: string | null): string {
  const name = brandName ?? "Tu comunidad";
  const paragraphs = bodyText
    .split("\n")
    .filter(Boolean)
    .map((p) => `<p style="margin:0 0 16px;line-height:1.6;">${p}</p>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${name}</title>
</head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 20px;">
    <tr>
      <td>
        <table width="600" cellpadding="0" cellspacing="0" align="center"
               style="background:#ffffff;border-radius:8px;padding:40px;max-width:600px;">
          <tr>
            <td style="color:#18181b;font-size:15px;">
              ${paragraphs}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
