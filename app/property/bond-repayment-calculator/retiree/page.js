// FILE: app/property/bond-repayment-calculator/retiree/page.js
import BondCalculator from "../../../components/property/BondCalculator";
import NextSteps from "../../../components/NextSteps";
import ProFeatures from "../../../components/ProFeatures";

export const metadata = {
  title: "Retirement Property Calculator | Downsizing & Bond Rules (2025)",
  description:
    "Calculate costs for downsizing your home. Understand bonds for pensioners, age limits, and the difference between Life Rights and Sectional Title.",
  alternates: {
    canonical:
      "https://manytools.co.za/property/bond-repayment-calculator/retiree",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Retirement Property Bond Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description:
    "Calculator for pensioners and downscalers. Compares buying cash vs bonding for retirement property.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function RetireePage() {
  // Retiree Configuration
  // Retirees often have high equity from selling a family home.
  // We simulate a scenario where they pay a 50% deposit to keep monthly costs minimal.
  const retireeDefaults = {
    price: 1800000, // Typical 2-bed retirement unit
    deposit: 900000, // 50% deposit from sale of previous house
    interestRate: 11.75,
  };

  const faqs = [
    {
      q: "Can I get a bond if I am a pensioner?",
      a: "Yes, but it is harder. Banks look at your 'affordability' based on pension/annuity income, not your age. However, they may require a shorter loan term (e.g., 10 years instead of 20) to ensure the debt is settled within your life expectancy.",
    },
    {
      q: "Can I get a bond for a 'Life Rights' unit?",
      a: "No. Life Rights give you the right to live there, but you don't own the property title deed. Therefore, banks cannot register a bond over it. You must pay cash for Life Rights.",
    },
    {
      q: "Should I pay cash or keep a small bond?",
      a: "This depends on your investment returns. If your investment portfolio earns 10% and the bond costs 11.75%, it usually makes sense to pay cash and eliminate the debt.",
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
            RETIREMENT PLANNING TOOLKIT
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Downsizing & Retirement Calculator
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Moving to a smaller home? Calculate your costs with a{" "}
            <strong className="text-orange-600">large deposit</strong> and see if
            a small bond makes sense.
          </p>
        </header>

        <div className="space-y-16">
          {/* Main Calculator */}
          <section id="calculator-section">
            <BondCalculator defaults={retireeDefaults} />
          </section>

          {/* Semantic SEO: Retirement Definitions */}
          <section
            id="retirement-guide"
            className="bg-white p-8 rounded-2xl border border-orange-100 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Retirement Property Types
            </h2>
            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-50">
                <dt className="font-bold text-orange-900 mb-2">Life Rights</dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  You pay a capital sum for the right to occupy the unit for the
                  rest of your life. You do not own the property, you pay no
                  transfer duty, and you cannot bond it. Upon death, a portion
                  of the capital is usually returned to the estate.
                </dd>
              </div>
              <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-50">
                <dt className="font-bold text-orange-900 mb-2">
                  Sectional Title
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  You own the unit outright (Title Deed). You pay Transfer Duty
                  and levies. You CAN get a bond on this property, provided you
                  meet the bank's affordability criteria.
                </dd>
              </div>
              <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-50">
                <dt className="font-bold text-orange-900 mb-2">
                  Full Title (Freehold)
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  You own the house and the land. Common in "Mature Lifestyle
                  Estates". You are responsible for all maintenance, rates, and
                  insurance. Can be bonded.
                </dd>
              </div>
              <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-50">
                <dt className="font-bold text-orange-900 mb-2">
                  Levy Stabilisation Fund
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  A once-off fee paid by the buyer (or deducted from the
                  seller's profit) in retirement villages to keep monthly levies
                  artificially low.
                </dd>
              </div>
            </dl>
          </section>

          {/* FAQs */}
          <section id="faq">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Pensioner Property FAQs
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

