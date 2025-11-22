// FILE: app/property/bond-repayment-calculator/refinance/page.js
import BondCalculator from "../../../components/property/BondCalculator";
import NextSteps from "../../../components/NextSteps";
import ProFeatures from "../../../components/ProFeatures";

export const metadata = {
  title: "Refinance Bond Calculator | Switch Home Loan & Save (2025)",
  description:
    "Calculate savings from switching your bond to a new bank. Estimate new repayments, assess cash-out options, and understand switching costs.",
  alternates: {
    canonical:
      "https://manytools.co.za/property/bond-repayment-calculator/refinance",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Bond Refinancing Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description:
    "Calculator for homeowners looking to switch bonds. Compares interest rate savings against switching costs to determine viability.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function RefinancePage() {
  // Refinance Configuration
  // Default to a typical existing bond size.
  // We assume 0 deposit because in a switch, the "Purchase Price" acts as the "Total New Loan Amount".
  const refinanceDefaults = {
    price: 1500000, // Represents the new Total Loan Amount (Outstanding Balance + Cash Out)
    deposit: 0,
    interestRate: 11.25, // Users usually switch to get a rate BELOW Prime (currently 11.75%)
  };

  const faqs = [
    {
      q: "What does it cost to switch my bond?",
      a: "Switching isn't free. You pay Bond Cancellation Fees (approx. R5,000) to close the old bond and Bond Registration Fees (sliding scale) to open the new one. However, the new bank rarely charges Transfer Duty.",
    },
    {
      q: "Will the new bank cover my switching costs?",
      a: "Often, yes. Many banks run campaigns offering to pay your cancellation and registration attorney fees if you switch to them, provided you stay for a minimum period (e.g., 3 years).",
    },
    {
      q: "Can I take cash out when I refinance?",
      a: "Yes. If your property has increased in value, you can apply for a loan based on the current value, settle your old smaller bond, and have the difference paid into your account as 'equity release'.",
    },
  ];

  return (
    <main className="bg-cyan-50 min-h-screen font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-5xl mx-auto p-4 sm:p-8">
        <header className="text-center mb-10">
          <span className="inline-block py-1 px-3 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold tracking-wide mb-4">
            REFINANCE & SWITCH GUIDE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Bond Refinancing Calculator
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Thinking of switching banks? Enter your{" "}
            <strong>Total New Loan Amount</strong> (including any cash out) to
            see if a lower interest rate saves you money.
          </p>
        </header>

        <div className="space-y-16">
          {/* Main Calculator */}
          <section id="calculator-section">
            <BondCalculator defaults={refinanceDefaults} />
          </section>

          {/* Semantic SEO: Switching Definitions */}
          <section
            id="refinance-guide"
            className="bg-white p-8 rounded-2xl border border-cyan-100 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              The Cost of Switching
            </h2>
            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              <div className="p-4 bg-cyan-50/50 rounded-lg border border-cyan-50">
                <dt className="font-bold text-cyan-900 mb-2">
                  Penalty Interest
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  If you don't give your current bank 90 days' notice of your
                  intention to cancel the bond, they are entitled to charge you
                  90 days of penalty interest on your outstanding balance.
                </dd>
              </div>
              <div className="p-4 bg-cyan-50/50 rounded-lg border border-cyan-50">
                <dt className="font-bold text-cyan-900 mb-2">
                  Equity Release (Cash Out)
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  Accessing the difference between your property's current value
                  and your outstanding bond. This cash is often the cheapest
                  financing available for renovations or debt consolidation.
                </dd>
              </div>
              <div className="p-4 bg-cyan-50/50 rounded-lg border border-cyan-50">
                <dt className="font-bold text-cyan-900 mb-2">
                  Assessment Rate
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  When refinancing, the new bank will re-assess your
                  creditworthiness. They will require latest payslips and bank
                  statements just like a new application.
                </dd>
              </div>
              <div className="p-4 bg-cyan-50/50 rounded-lg border border-cyan-50">
                <dt className="font-bold text-cyan-900 mb-2">
                  Bond Registration
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  Even though you aren't moving house, a new bond must be
                  registered at the Deeds Office. This incurs attorney fees,
                  though transfer duty is not applicable.
                </dd>
              </div>
            </dl>
          </section>

          {/* FAQs */}
          <section id="faq">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Switching Questions Answered
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

