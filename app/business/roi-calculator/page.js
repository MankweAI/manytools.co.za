import ROICalculator from "../../components/business/ROICalculator";

export const metadata = {
  title: "ROI Calculator (South Africa) | Return on Investment & Payback",
  description:
    "Calculate simple and annualized ROI, payback period, and total net gain. Free South African ROI calculator for projects and small businesses.",
};

// Structured Data (JSON-LD)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ROI Calculator South Africa",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description:
    "Estimate simple ROI, annualized ROI, payback period and total net gain using revenue/costs or net profit mode. Ideal for SA SMEs and projects.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function ROICalculatorPage() {
  const faqs = [
    {
      q: "What is simple ROI?",
      a: "Simple ROI = (Total Net Gain ÷ Initial Investment) × 100%. Net gain includes profits over the period plus any salvage value, minus the initial investment.",
    },
    {
      q: "What is annualized ROI?",
      a: "An approximation of average yearly return over the holding period derived from simple ROI. For precise cash flows, use IRR/NPV models.",
    },
    {
      q: "How is payback calculated?",
      a: "Payback is estimated as Initial Investment ÷ Annual Net Profit (ignores salvage value timing).",
    },
  ];

  return (
    <main className="bg-slate-50 min-h-screen font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ROI Calculator
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Estimate return on investment, payback period and net gain.
          </p>
        </header>

        <section id="calculator-section" className="mb-16">
          <ROICalculator />
        </section>

        <section id="faq">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 group"
                open={i === 0}
              >
                <summary className="font-semibold text-lg text-slate-800 cursor-pointer list-none flex justify-between items-center">
                  {faq.q}
                  <div className="text-slate-500 transition-transform duration-200 group-open:rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </summary>
                <p className="mt-4 text-slate-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
