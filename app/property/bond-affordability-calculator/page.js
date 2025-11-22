// FILE: app/property/bond-affordability-calculator/page.js
import BondAffordabilityCalculator from "../../components/property/BondAffordabilityCalculator";

export const metadata = {
  title:
    "Bond Affordability Calculator South Africa | Home Loan Affordability Calculator",
  description:
    "Calculate how much home loan you can afford with our free affordability calculator. Includes income, expenses, and interest rates for South Africa.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Bond Affordability Calculator South Africa",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description:
    "Find the maximum home loan you can afford based on your monthly income, expenses, interest rate, and loan term.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function BondAffordabilityCalculatorPage() {
  const faqs = [
    {
      q: "How is affordability calculated?",
      a: "Banks primarily look at your monthly surplus (Gross Income minus Expenses). A portion of this surplus determines the maximum monthly bond repayment you can afford, which in turn calculates your maximum loan amount.",
    },
    {
      q: "Does this guarantee a bond approval?",
      a: "No. This is an estimate based on a standard formula. Banks will also conduct a detailed credit assessment, verify your income and expenses, and evaluate the property itself before granting a home loan.",
    },
    {
      q: "What expenses should I include?",
      a: "Include all your regular monthly costs: car payments, credit card debt, personal loans, insurance, groceries, transport, school fees, and other living expenses. The more accurate your expenses, the better the estimate.",
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
            Bond Affordability Calculator
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Find out how much home loan you can realistically afford.
          </p>
        </header>
        <section id="calculator-section">
          <BondAffordabilityCalculator />
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
