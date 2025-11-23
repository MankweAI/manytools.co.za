// FILE: app/property/bond-repayment-calculator/first-time-buyer/page.js
import BondCalculator from "../../../components/property/BondCalculator";
import NextSteps from "../../../components/NextSteps";
import ProFeatures from "../../../components/ProFeatures";

// 1. Specific Metadata for this Persona
export const metadata = {
  title: "First-Time Buyer Bond Calculator | FLISP & Subsidy Ready (2025)",
  description:
    "Calculate your first home loan repayment. Checks affordability for government subsidies (FLISP) and 105% bond costs for first-time buyers in South Africa.",
  alternates: {
    canonical:
      "https://manytools.co.za/property/bond-repayment-calculator/first-time-buyer",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "First-Time Buyer Bond Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description:
    "A specialized bond calculator for first-time home buyers in South Africa, featuring FLISP subsidy estimation and zero-deposit scenarios.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function FirstTimeBuyerPage() {
  // 2. Persona-Specific Configuration
  // First-time buyers often look at cheaper homes and have no deposit.
  const firstTimeDefaults = {
    price: 900000, // Entry-level market price
    deposit: 0, // 100% Bond scenario
    interestRate: 11.75, // Prime rate (often Prime + 0% for new buyers)
  };

  const faqs = [
    {
      q: "Can I buy a house without a deposit?",
      a: "Yes. As a first-time buyer, major South African banks (FNB, Standard Bank, Absa, Nedbank) often offer 100% bonds, meaning you don't need a cash deposit. Some even offer 105% bonds to cover transfer costs.",
    },
    {
      q: "What is the FLISP subsidy?",
      a: "FLISP (Finance Linked Individual Subsidy Programme) is a government subsidy for first-time buyers earning between R3,501 and R22,000 per month. It reduces your bond amount, making your monthly repayment lower.",
    },
    {
      q: "What are the hidden costs for first-time buyers?",
      a: "The biggest hidden costs are Transfer Duty (free for properties under R1.1m) and Transfer Attorneys fees. Even with a 100% bond, you usually need cash for the attorneys unless you get a 105% bond.",
    },
  ];

  return (
    <main className="bg-orange-50 min-h-screen font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-5xl mx-auto p-4 sm:p-8">
        {/* Persona Header */}
        <header className="text-center mb-10">
          <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-800 text-xs font-bold tracking-wide mb-4">
            FIRST-TIME BUYER TOOLKIT
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            First-Time Home Buyer Calculator
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate your repayment with{" "}
            <strong className="text-orange-600">0% deposit</strong> options and
            see if you qualify for government subsidies.
          </p>
        </header>

        <div className="space-y-16">
          {/* 3. The Calculator (Pre-configured) */}
          <section id="calculator-section">
            <BondCalculator defaults={firstTimeDefaults} />
          </section>

          {/* 4. Persona-Specific Definitions */}
          <section
            id="guide"
            className="bg-white p-8 rounded-2xl border border-orange-100 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              First-Time Buyer Cheat Sheet
            </h2>
            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-50">
                <dt className="font-bold text-orange-900 mb-2">
                  100% Bond (Zero Deposit)
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  A home loan where the bank lends you the full purchase price
                  of the property. You don't pay any deposit upfront, but your
                  monthly repayment will be higher because the loan amount is
                  larger.
                </dd>
              </div>
              <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-50">
                <dt className="font-bold text-orange-900 mb-2">
                  FLISP Subsidy
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  A "GAP" housing subsidy for citizens earning between R3,501
                  and R22,000/month. The government pays a lump sum (e.g.,
                  R50,000) directly into your bond, reducing your loan
                  instantly.
                </dd>
              </div>
              <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-50">
                <dt className="font-bold text-orange-900 mb-2">105% Bond</dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  A special loan product for first-time buyers that covers the
                  property price (100%) plus an extra 5% to help pay for
                  transfer and bond registration costs.
                </dd>
              </div>
              <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-50">
                <dt className="font-bold text-orange-900 mb-2">
                  Transfer Duty Exemption
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  As of the 2025 tax year, any property purchased for{" "}
                  <strong>R1,100,000 or less</strong> is exempt from Transfer
                  Duty tax, regardless of whether you are a first-time buyer or
                  not.
                </dd>
              </div>
            </dl>
          </section>

          <section id="faq">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Questions New Buyers Ask
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
                    <div className="text-slate-400 transition-transform duration-200 group-open:rotate-180">
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
