import { Body, Head, Html } from "@react-email/components";
import { getTranslations } from "next-intl/server";

interface VerifyEmailProps {
  token: string;
}

const IMG_LOGO_URL = "https://res.cloudinary.com/dcj1y9ka5/image/upload/v1778895705/reclaim/app-logo_fy7cr3.svg";

export const VerifyEmail = async ({ token }: VerifyEmailProps) => {
  const t = await getTranslations("sign_up.verify_email");

  return (
    <Html>
      <Head />

      <Body
        style={{
          backgroundColor: "hsl(0, 0%, 100%)",
          margin: "0 auto",
        }}
      >
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          border={0}
          style={{
            padding: "10px",
            margin: "0 auto",
          }}
        >
          <tr>
            <td align="center">
              <table
                width="600"
                cellPadding="0"
                cellSpacing="0"
                border={0}
                style={{
                  margin: "0 auto",
                  padding: "20px 0",
                }}
              >
                {/* Logo */}
                <tr>
                  <td align="left" style={{ padding: "20px 0" }}>
                    <img src={IMG_LOGO_URL} alt="Reclaim Logo" width="40" height="40" />
                  </td>
                </tr>

                {/* Heading */}
                <tr>
                  <td>
                    <h1
                      style={{
                        fontSize: "32px",
                        lineHeight: "42px",
                        margin: "0 0 20px 0",
                        fontWeight: "bold",
                        color: "hsl(0, 0%, 4%)",
                      }}
                    >
                      {t("title")}
                    </h1>
                  </td>
                </tr>

                {/* Intro */}
                <tr>
                  <td>
                    <p
                      style={{
                        fontSize: "14px",
                        margin: "15px 0 0 0",
                        lineHeight: "22px",
                        color: "hsl(0, 0%, 44%)",
                      }}
                    >
                      {t("intro")}
                    </p>
                  </td>
                </tr>

                {/* Body */}
                <tr>
                  <td>
                    <p
                      style={{
                        fontSize: "14px",
                        margin: "20px 0 0 0",
                        lineHeight: "22px",
                        color: "hsl(0, 0%, 44%)",
                      }}
                    >
                      {t("body")}
                    </p>
                  </td>
                </tr>

                <tr>
                  <td>
                    <p
                      style={{
                        fontSize: "14px",
                        margin: "20px 0 0 0",
                        lineHeight: "22px",
                        color: "hsl(0, 0%, 44%)",
                      }}
                    >
                      {t("description")}
                    </p>

                    <a
                      href={token}
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "hsl(217, 91%, 60%)",
                        textDecoration: "none",
                      }}
                    >
                      {t("text_token_link")}
                    </a>
                  </td>
                </tr>

                <tr>
                  <td>
                    <p
                      style={{
                        fontSize: "14px",
                        marginTop: "30px",
                        lineHeight: "22px",
                        color: "hsl(0, 0%, 44%)",
                      }}
                    >
                      {t("explanation")}
                    </p>
                  </td>
                </tr>

                <tr>
                  <td>
                    <p
                      style={{
                        fontSize: "14px",
                        marginTop: "20px",
                        lineHeight: "22px",
                        color: "hsl(0, 0%, 44%)",
                      }}
                    >
                      {t("disclaimer")}
                    </p>
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td style={{ marginTop: "40px" }}>
                    <p
                      style={{
                        marginTop: "40px",
                        fontSize: "14px",
                        color: "hsl(0, 0%, 44%)",
                      }}
                    >
                      {t("outro")}
                    </p>

                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "hsl(0, 0%, 4%)",
                        margin: "0",
                      }}
                    >
                      {t("brand_sign")}
                    </p>
                  </td>
                </tr>

                {/* Outro */}
                <tr>
                  <td style={{ paddingTop: "40px" }}>
                    <p
                      style={{
                        fontSize: "11px",
                        color: "hsl(0, 0%, 55%)",
                        margin: 0,
                        lineHeight: "16px",
                      }}
                    >
                      ©2026 Reclaim Inc. <br />
                      {t("footer")}
                    </p>

                    <p
                      style={{
                        marginTop: "20px",
                        fontSize: "11px",
                        color: "hsl(0, 0%, 55%)",
                      }}
                    >
                      {t("rights_reserved")}
                    </p>
                  </td>
                </tr>

                {/* Watermark */}
                <tr>
                  <td style={{ position: "relative", height: "1px" }}>
                    <table
                      width="600"
                      cellPadding="0"
                      cellSpacing="0"
                      border={0}
                      style={{
                        position: "absolute",
                        right: "0",
                        bottom: "0",
                        opacity: 0.1,
                      }}
                    >
                      <tr>
                        <td align="right" style={{ paddingRight: "10px" }}>
                          <img src={IMG_LOGO_URL} width="120" alt="Reclaim Watermark" style={{ display: "block" }} />
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </Body>
    </Html>
  );
};
