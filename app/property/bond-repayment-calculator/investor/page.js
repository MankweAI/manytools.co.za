import BondCalculator from "../../../components/property/BondCalculator";
import NextSteps from "../../../components/NextSteps";
import ProFeatures from "../../../components/ProFeatures";

export const metadata = {
  title: "Buy-to-Let Bond Calculator | Investor ROI & Yield 2025",
  description:
    "Calculate bond repayments for investment properties. Analyze cash flow, rental yield requirements, and investor tax deductions in South Africa.",
  alternates: {
    canonical:
      "https://manytools.co.za/property/bond-repayment-calculator/investor",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Buy-to-Let Bond Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description:
    "Investment property calculator for South African investors. Estimates bond costs against rental income to determine cash flow.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function InvestorPage() {
  // Investor-Specific Configuration
  const investorDefaults = {
    price: 2500000,
    deposit: 500000,
    interestRate: 12.0,
  };

  const faqs = [
    {
      q: "Is bond interest tax deductible for investors?",
      a: "Yes. In South Africa, the interest portion of your bond repayment is a tax-deductible expense incurred in the production of rental income. This deduction is highest in the early years of the loan.",
    },
    {
      q: "What is a good rental yield?",
      a: "In major South African metros, a gross rental yield of 8% to 10% is considered strong. However, many investors accept lower yields (5-7%) in high-growth areas where capital appreciation is the primary goal.",
    },
    {
      q: "Should I pay a deposit on an investment property?",
      a: "Paying a deposit (usually 10-20%) is often necessary to achieve a 'cash flow positive' status from day one, where your rental income covers your bond, levies, and rates.",
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
            PROPERTY INVESTOR TOOLKIT
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Buy-to-Let Bond Calculator
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Analyze your investment property costs. Calculate your monthly
            repayment to determine the
            <strong className="text-orange-600">
              {" "}
              required rental income
            </strong>{" "}
            for positive cash flow.
          </p>
        </header>

        <div className="space-y-16">
          {/* Main Calculator */}
          <section id="calculator-section">
            <BondCalculator defaults={investorDefaults} />
          </section>

          {/* Semantic SEO Definitions */}
          <section
            id="definitions"
            className="bg-white p-8 rounded-2xl border border-orange-100 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Investment Property Glossary
            </h2>
            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-50">
                <dt className="font-bold text-orange-900 mb-2">
                  Negative Gearing
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  When your property expenses (bond, levies, rates) exceed your
                  rental income. You cover the shortfall monthly, but may benefit
                  from tax deductions and long-term capital growth.
                </dd>
              </div>
              <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-50">
                <dt className="font-bold text-orange-900 mb-2">
                  Cash Flow Positive
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  The "Holy Grail" of investing: when your rental income covers
                  all expenses and leaves you with surplus cash every month. Often
                  requires a 20-30% deposit.
                </dd>
              </div>
              <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-50">
                <dt className="font-bold text-orange-900 mb-2">
                  Capital Gains Tax (CGT)
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  Tax paid on the profit when you sell the property. Unlike a
                  primary residence (which has a R2m exclusion), almost all profit
                  on an investment property is subject to CGT.
                </dd>
              </div>
              <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-50">
                <dt className="font-bold text-orange-900 mb-2">
                  Levies & Rates
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  Mandatory monthly costs for Sectional Title units. Banks
                  typically do not factor these into the bond repayment, but they
                  are crucial for your net yield calculation.
                </dd>
              </div>
            </dl>
          </section>

          {/* FAQs */}
          <section id="faq">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Investor FAQs
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
