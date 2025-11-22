import BreakEvenCalculator from "../../components/business/BreakEvenCalculator";

export const metadata = {
  title: "Break-Even Calculator (South Africa) | Units & Revenue to Break Even",
  description:
    "Calculate your break-even point in units and revenue. Includes contribution margin, margin of safety, and profit at expected sales.",
};

// Structured Data (JSON-LD)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Break-Even Calculator South Africa",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description:
    "Free break-even calculator for South Africa. Compute break-even units and revenue, contribution margin, margin of safety, and profit at expected sales.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function BreakEvenCalculatorPage() {
  const faqs = [
    {
      q: "What is break-even?",
      a: "The point where total revenue equals total costs. No profit, no loss.",
    },
    {
      q: "What is contribution margin?",
      a: "Selling price per unit minus variable cost per unit. It contributes toward covering fixed costs.",
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
            Break-Even Calculator
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Find the sales volume and revenue needed to break even.
          </p>
        </header>

        <section id="calculator-section" className="mb-16">
          <BreakEvenCalculator />
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
