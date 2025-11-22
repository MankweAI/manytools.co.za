import FirstTimeBuyerCostsCalculator from "../../components/property/FirstTimeBuyerCostsCalculator";

export const metadata = {
  title: "First-Time Buyer Costs Calculator | Total Cash Needed (SA)",
  description:
    "Estimate the total cash needed to buy your first home in South Africa: deposit, transfer duty, legal fees, moving, setup, and contingency.",
};

// Structured Data (JSON-LD)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "First-Time Buyer Costs Calculator South Africa",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description:
    "Calculate the total upfront cash required to purchase a property: deposit, once-off legal costs, transfer duty, moving, setup, and contingency.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function FirstTimeBuyerCostsCalculatorPage() {
  const faqs = [
    {
      q: "What costs do I pay before transfer?",
      a: "Typically the deposit (if any), transfer duty, transfer attorney fees, bond registration attorney fees, and deeds office charges.",
    },
    {
      q: "What after-transfer costs should I plan for?",
      a: "Moving, immediate repairs, setup items (e.g., blinds, locks), and furniture/appliances. Add a contingency buffer for surprises.",
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
            First-Time Buyer Costs Calculator
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Plan your deposit, once-off costs and first-month setup budget.
          </p>
        </header>

        <section id="calculator-section" className="mb-16">
          <FirstTimeBuyerCostsCalculator />
        </section>

        <section id="faq">
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

