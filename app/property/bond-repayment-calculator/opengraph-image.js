// FILE: app/property/bond-repayment-calculator/opengraph-image.js
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Bond Repayment Calculator Result";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params, searchParams }) {
  // Get price from URL query params (e.g. ?price=2500000)
  const priceParam = searchParams?.price;
  const price = priceParam
    ? Number(priceParam).toLocaleString("en-ZA")
    : "Home Loan";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a", // slate-900
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #334155 2%, transparent 0%), radial-gradient(circle at 75px 75px, #334155 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1e293b", // slate-800
            border: "1px solid #334155",
            borderRadius: "20px",
            padding: "40px 80px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            style={{
              color: "#10b981", // emerald-500
              fontSize: 24,
              fontWeight: 600,
              marginBottom: 20,
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            manytools.co.za
          </div>

          <div
            style={{
              color: "white",
              fontSize: 60,
              fontWeight: 900,
              lineHeight: 1.1,
              textAlign: "center",
              marginBottom: 10,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Bond Repayment</span>
            <span style={{ color: "#94a3b8", fontSize: 40, marginTop: 10 }}>
              {priceParam ? `on R${price}` : "Calculator"}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 30,
              padding: "10px 30px",
              backgroundColor: "#10b981",
              borderRadius: "50px",
              color: "#064e3b",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            Instant Calculation 2025
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
