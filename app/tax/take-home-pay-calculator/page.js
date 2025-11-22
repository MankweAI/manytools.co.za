import TakeHomePayCalculator from "../../components/tax/TakeHomePayCalculator";

export const metadata = {
  title:
    "Take Home Pay Calculator South Africa | Salary After Deductions Calculator",
  description:
    "Calculate your take-home pay after all deductions with our free calculator. Includes PAYE, UIF, SDL, and more for South Africa.",
};

// Structured Data (JSON-LD)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Take Home Pay Calculator South Africa",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description:
    "Calculate your take-home pay after all deductions with our free calculator. Includes PAYE, UIF, SDL, and more for South Africa.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function TakeHomePayCalculatorPage() {
  const faqs = [
    {
      q: "What is take-home pay?",
      a: "Take-home pay is your salary after all deductions like tax, UIF, and SDL.",
    },
    {
      q: "Are all deductions included?",
      a: "Yes, includes PAYE, UIF, SDL, and user-specified deductions.",
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
            Take Home Pay Calculator South Africa
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Estimate your net salary after all deductions.
          </p>
        </header>
        <section id="calculator-section">
          <TakeHomePayCalculator />
        </section>
        <section id="faq" className="mt-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 group"
                open={index === 0}
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
