// FILE: app/property/early-settlement-savings-calculator/page.js
import EarlySettlementCalculator from "../../components/property/EarlySettlementCalculator";

export const metadata = {
  title: "Early Settlement & Extra Payment Calculator | Bond Savings SA",
  description:
    "See how extra monthly payments or a lump sum can reduce your home loan term and save thousands in interest. Free early settlement calculator for South African bonds.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Bond Early Settlement Savings Calculator South Africa",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description:
    "Calculate the time and interest saved by paying extra into your South African home loan. Supports modelling extra monthly repayments and one-off lump sum payments.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function EarlySettlementSavingsCalculatorPage() {
  const faqs = [
    {
      q: "How exactly do extra repayments save interest?",
      a: "Every extra payment you make goes directly towards reducing the outstanding principal (the loan balance). Because interest is calculated on this balance, a lower principal means less interest is charged each month. This has a compounding effect, saving you a significant amount over the loan's lifetime.",
    },
    {
      q: "Is it better to pay extra monthly or save for a lump sum?",
      a: "From a pure interest-saving perspective, paying extra monthly is generally more effective. Each small, early payment starts reducing your principal immediately. However, a large lump sum (like from a bonus) can also make a huge impact. The best strategy depends on your cash flow.",
    },
    {
      q: "Should I notify the bank before making extra payments?",
      a: "In most cases, for a standard home loan, you don't need to notify your bank for extra monthly payments via debit order or EFT. However, it's crucial to ensure the bank allocates the extra funds to your principal loan amount and doesn't just hold it in an access facility. Check with your bank to confirm their policy.",
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
            Early Settlement Savings Calculator
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            See how extra payments can shorten your bond and save you money.
          </p>
        </header>

        <section id="calculator-section" className="mb-16">
          <EarlySettlementCalculator />
        </section>

        <section id="faq">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            FAQs About Extra Repayments
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
