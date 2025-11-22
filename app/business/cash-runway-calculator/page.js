import CashRunwayCalculator from "../../components/business/CashRunwayCalculator";

export const metadata = {
  title: "Cash Runway Calculator (South Africa) | Months Until Run-out",
  description:
    "Estimate your startup or SME cash runway. Model revenue growth, gross margin, operating costs, and AR/AP days to project a run-out date.",
};

// Structured Data (JSON-LD)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Cash Runway Calculator South Africa",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description:
    "Simulate monthly cash runway with revenue growth, gross margin, opex growth and AR/AP timing. Estimate run-out date and break-even month.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function CashRunwayCalculatorPage() {
  const faqs = [
    {
      q: "What is cash runway?",
      a: "Cash runway estimates how long your business can operate before cash runs out, given current burn and growth assumptions.",
    },
    {
      q: "Why include AR/AP days?",
      a: "Cash inflows/outflows are delayed by payment terms. Debtor days delay receipts; creditor days delay payments.",
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
            Cash Runway Calculator
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Project months to depletion and an estimated run-out date.
          </p>
        </header>

        <section id="calculator-section" className="mb-16">
          <CashRunwayCalculator />
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

