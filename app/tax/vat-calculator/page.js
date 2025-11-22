import VATCalculator from "../../components/tax/VATCalculator";

export const metadata = {
  title: "VAT Calculator South Africa | Free Value-Added Tax Calculator",
  description:
    "Calculate VAT on sales and purchases with our free calculator. Includes input VAT recovery and business type options for South Africa.",
};

// Structured Data (JSON-LD)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "VAT Calculator South Africa",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description:
    "Calculate VAT on sales and purchases with our free calculator. Includes input VAT recovery and business type options for South Africa.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function VATCalculatorPage() {
  const faqs = [
    {
      q: "What is VAT?",
      a: "VAT is Value-Added Tax, charged at 15% on goods and services in South Africa.",
    },
    {
      q: "What is zero-rated VAT?",
      a: "Zero-rated supplies are taxed at 0%, like basic food items.",
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
            VAT Calculator South Africa
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Estimate your VAT liability and recovery.
          </p>
        </header>
        <section id="calculator-section">
          <VATCalculator />
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
