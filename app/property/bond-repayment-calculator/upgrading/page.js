// FILE: app/property/bond-repayment-calculator/upgrading/page.js
import BondCalculator from "../../../components/property/BondCalculator";
import NextSteps from "../../../components/NextSteps";
import ProFeatures from "../../../components/ProFeatures";

export const metadata = {
  title: "Upgrading Homeowner Bond Calculator | Sell-to-Buy Guide (2025)",
  description:
    "Calculate bond costs for upgrading your home. Estimate proceeds from your sale, bridging finance costs, and the new bond repayment.",
  alternates: {
    canonical:
      "https://manytools.co.za/property/bond-repayment-calculator/upgrading",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Upgrading Homeowner Bond Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description:
    "Calculator for homeowners selling to buy a larger property. Estimates new bond repayments factoring in equity from the previous sale.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function UpgradingPage() {
  // Upgrade Configuration
  // Upgraders usually buy in the R2.5m - R5m bracket.
  // They often have a significant deposit from the sale of their first home (e.g., R500k equity).
  const upgradeDefaults = {
    price: 3500000,
    deposit: 500000, // Equity from previous sale
    interestRate: 11.5, // Established buyers often get Prime minus 0.25%
  };

  const faqs = [
    {
      q: "How do I use the profit from my sale as a deposit?",
      a: "Your conveyancer will guarantee the funds to the new bank. However, the money only becomes available on the day of transfer. If you need to pay the deposit sooner, you may need 'Bridging Finance'.",
    },
    {
      q: "What is a 'Subject to Sale' offer?",
      a: "This is a clause in your Offer to Purchase stating that you will only buy the new house IF you successfully sell your old house within a set time (e.g., 60 days). It protects you from owning two bonds at once.",
    },
    {
      q: "What is Occupational Rent?",
      a: "If you move into the new house before the transfer registers (or the buyer moves into yours early), the occupant pays 'Occupational Rent' to the owner. This is usually set at approx. 1% of the purchase price per month.",
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
          <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-800 text-xs font-bold tracking-wide mb-4">
            SELL-TO-BUY TOOLKIT
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Upgrading Homeowner Calculator
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Selling to buy? Use your <strong>sale equity</strong> as a deposit
            to lower your new bond repayment.
          </p>
        </header>

        <div className="space-y-16">
          {/* Main Calculator */}
          <section id="calculator-section">
            <BondCalculator defaults={upgradeDefaults} />
          </section>

          {/* Semantic SEO: Upgrade Definitions */}
          <section
            id="upgrade-guide"
            className="bg-white p-8 rounded-2xl border border-orange-100 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              The Upgrade Process Explained
            </h2>
            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-50">
                <dt className="font-bold text-orange-900 mb-2">
                  Bridging Finance
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  A short-term loan that gives you access to the profit from
                  your sale <em>before</em> the transfer registers. Useful if
                  you need cash immediately for the new deposit, transfer duty,
                  or moving costs.
                </dd>
              </div>
              <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-50">
                <dt className="font-bold text-orange-900 mb-2">
                  Simultaneous Transfer
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  When the attorneys coordinate the sale of your old home and
                  the purchase of your new one to happen on the same day. This
                  prevents you from being homeless or paying two bonds at once.
                </dd>
              </div>
              <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-50">
                <dt className="font-bold text-orange-900 mb-2">
                  72-Hour Clause
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  If you make a &quot;Subject to Sale&quot; offer, the seller can usually
                  continue marketing the property. If they get a cash offer,
                  they must give you 72 hours to waive your condition (sell your
                  house fast) or lose the deal.
                </dd>
              </div>
              <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-50">
                <dt className="font-bold text-orange-900 mb-2">
                  Bond Cancellation Fee
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  You must pay an attorney to cancel the bond on your{" "}
                  <em>old</em> property. This is deducted from your sale
                  proceeds before the balance is paid to you.
                </dd>
              </div>
            </dl>
          </section>

          {/* FAQs */}
          <section id="faq">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Sell-to-Buy Questions
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

