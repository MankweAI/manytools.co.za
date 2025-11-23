// FILE: app/property/capital-gains-tax-calculator/page.js
import CapitalGainsTaxCalculator from "../../components/property/CapitalGainsTaxCalculator";
import NextSteps from "../../components/NextSteps";
import ProFeatures from "../../components/ProFeatures";

export const metadata = {
  title: "Capital Gains Tax Calculator (Property) | South Africa CGT (2025)",
  description:
    "Calculate South African Capital Gains Tax (CGT) on property sales. Our free tool supports primary residence exclusion, capital improvements, agent commission, and all taxpayer types.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Capital Gains Tax Calculator South Africa (Property)",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description:
    "A free, instant calculator for Capital Gains Tax on property disposals in South Africa. Includes primary residence exclusion, annual exclusion, and inclusion rates for individuals, companies, and trusts.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function CapitalGainsTaxCalculatorPage() {
  const faqs = [
    {
      q: "What is Capital Gains Tax (CGT)?",
      a: "CGT is the tax you pay on the profit (capital gain) you make when you sell an asset, such as a property. In South Africa, only a portion of this gain (the 'taxable gain') is added to your income and taxed at your marginal rate.",
    },
    {
      q: "What is the primary residence exclusion?",
      a: "If you sell the home you live in (your primary residence), the first R2 million of the capital gain is exempt from CGT. This is a significant exclusion that reduces or eliminates tax for most homeowners.",
    },
    {
      q: "What qualifies as a 'capital improvement'?",
      a: "These are costs that add value to the property, not just for maintenance. Examples include adding a new room, installing a swimming pool, or paving a driveway. These costs are added to your 'base cost' and reduce your capital gain.",
    },
    {
      q: "What is the 'inclusion rate'?",
      a: "The inclusion rate is the percentage of your net capital gain that becomes taxable. For the 2025/2026 tax year, it is 40% for individuals and special trusts, and 80% for companies and other trusts.",
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
            Capital Gains Tax Calculator (Property)
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Estimate your CGT liability with our step-by-step guide.
          </p>
        </header>

        <div className="space-y-16">
          <section id="calculator-section">
            <CapitalGainsTaxCalculator />
          </section>

          <section id="faq">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Understanding CGT on Property
            </h2>
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
                  <p className="mt-4 text-slate-600 leading-relaxed">{faq.a}</p>
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
