// FILE: app/property/rental-yield-calculator/page.js
import RentalYieldCalculator from "../../components/property/RentalYieldCalculator";

export const metadata = {
  title: "Rental Yield Calculator South Africa | Net & Gross Yield (2025)",
  description:
    "Calculate gross and net rental yield for investment properties in South Africa. Our free tool accounts for vacancy rates and annual operating costs like levies and rates.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Rental Yield Calculator South Africa",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description:
    "Free rental yield calculator for South Africa. Estimate gross and net yield, effective gross income, and Net Operating Income (NOI) including vacancy and annual costs.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function RentalYieldCalculatorPage() {
  const faqs = [
    {
      q: "What's the difference between Gross and Net Yield?",
      a: "Gross Yield is the annual rent as a percentage of the property price, ignoring all expenses. Net Yield is more realistic; it subtracts operating costs like levies, rates, insurance, and vacancy loss from the rent before calculating the percentage.",
    },
    {
      q: "What is a good rental yield in South Africa?",
      a: "A 'good' yield is subjective and depends on the area, property type, and your investment goals. Generally, many investors in major metro areas aim for a net yield between 5% and 8%. High-demand areas might have lower yields but better capital growth potential.",
    },
    {
      q: "Which operating costs should I include?",
      a: "You should include all non-financing costs required to run the property. This includes municipal rates and taxes, body corporate levies (for sectional title), building insurance, and an estimate for routine maintenance (e.g., 1% of the property value per year).",
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
            Rental Yield Calculator
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Estimate the gross and net return on your investment property.
          </p>
        </header>
        <section id="calculator-section" className="mb-16">
          <RentalYieldCalculator />
        </section>
        <section id="faq">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Understanding Rental Yield
          </h2>
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
                <p className="mt-4 text-slate-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
