// FILE: app/property/bond-vs-cash-calculator/page.js
import BondVsCashCalculator from "../../components/property/BondVsCashCalculator";

export const metadata = {
  title: "Bond vs Cash Calculator | Which Is Cheaper? (South Africa)",
  description:
    "Compare the true cost of buying property with a bond vs cash in South Africa. Our calculator includes once-off costs and the crucial 'opportunity cost' of your capital.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Bond vs Cash Property Purchase Calculator South Africa",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description:
    "Compare the effective cost of buying property with a home loan versus paying cash, including legal fees and the opportunity cost of invested capital.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function BondVsCashCalculatorPage() {
  const faqs = [
    {
      q: "What is 'opportunity cost' in this calculator?",
      a: "Opportunity cost is the potential profit you miss out on by using your money in one way instead of another. Here, it represents the estimated returns you could have earned if you invested your upfront cash (deposit or full purchase price) in the market (e.g., stocks or bonds) instead of putting it into the property.",
    },
    {
      q: "Why isn't cash always cheaper?",
      a: "While a cash purchase saves you from paying bond interest, it requires a very large upfront capital outlay. If the interest rate on your bond is lower than the potential return you could earn by investing that capital elsewhere (your opportunity cost), then using the bank's money (the bond) can be 'cheaper' in the long run.",
    },
    {
      q: "Are once-off costs like legal fees included?",
      a: "Yes. The calculator automatically estimates transfer duty, legal fees, and bond registration costs. For the 'Bond Path', you have the option to either pay these upfront or add them to the loan amount, which will affect the calculation.",
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
            Bond vs Cash Calculator
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Discover the true long-term cost of your property purchase decision.
          </p>
        </header>

        <section id="calculator-section" className="mb-16">
          <BondVsCashCalculator />
        </section>

        <section id="faq">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Understanding the Comparison
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
      </div>
    </main>
  );
}
