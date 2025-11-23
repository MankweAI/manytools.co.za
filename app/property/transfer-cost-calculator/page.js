import TransferCostCalculator from "../../components/property/TransferCostCalculator";
import NextSteps from "../../components/NextSteps";
import ProFeatures from "../../components/ProFeatures";

export const metadata = {
  title: "Transfer Cost Calculator | South Africa Property Transfer Costs",
  description:
    "Estimate property transfer costs in South Africa: transfer duty, attorney fees, deeds office and optional bond registration costs.",
};

// Structured Data (JSON-LD)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Transfer Cost Calculator South Africa",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description:
    "Free South African transfer cost calculator. Estimate transfer duty, transfer attorney fees, deeds office and bond registration costs.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function TransferCostCalculatorPage() {
  const faqs = [
    {
      q: "What are transfer costs?",
      a: "They include SARS transfer duty, transfer attorney fees, deeds office charges and sundries. If you’re taking a bond, add bond registration attorney fees.",
    },
    {
      q: "Can transfer costs be financed?",
      a: "Banks generally do not finance transfer duty or transfer attorney fees. Some may include bond registration costs. Confirm with your bank.",
    },
  ];

  return (
    <main className="bg-orange-50 min-h-screen font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-5xl mx-auto p-4 sm:p-8">
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Transfer Cost Calculator
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Estimate transfer duty, legal fees and optional bond costs.
          </p>
        </header>

        <div className="space-y-16">
          <section id="calculator-section">
            <TransferCostCalculator />
          </section>

          <section id="faq">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">FAQs</h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 group"
                  open={idx === 0}
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

          <section>
            <ProFeatures />
          </section>
          <section>
            <NextSteps />
          </section>
        </div>
      </div>
    </main>
  );
}
