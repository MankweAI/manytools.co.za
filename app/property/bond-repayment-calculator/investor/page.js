// FILE: app/property/bond-repayment-calculator/investor/page.js
import BondCalculator from "../../../components/property/BondCalculator";
import NextSteps from "../../../components/NextSteps";
import ProFeatures from "../../../components/ProFeatures";

export const metadata = {
  title: "Buy-to-Let Bond Calculator | Investor ROI & Yield (2025)",
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
  // Investor Configuration
  const investorDefaults = {
    price: 2500000, // Typical investment unit price
    deposit: 500000, // 20% deposit is common for buy-to-let to break even
    interestRate: 12.0, // Investors often pay slightly higher rates
  };

  return (
    <main className="bg-slate-50 min-h-screen font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-5xl mx-auto p-4 sm:p-8">
        <header className="text-center mb-10">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-wide mb-4">
            PROPERTY INVESTOR TOOLKIT
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Buy-to-Let Bond Calculator
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Analyze your leverage. Calculate repayments to determine your{" "}
            <strong className="text-blue-600">Break-Even Rental Income</strong>.
          </p>
        </header>

        <div className="space-y-16">
          <section id="calculator-section">
            <BondCalculator defaults={investorDefaults} />
          </section>

          {/* Investor Definitions */}
          <section
            id="investor-guide"
            className="bg-white p-8 rounded-2xl border border-blue-100 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Investment Metrics Defined
            </h2>
            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-50">
                <dt className="font-bold text-blue-900 mb-2">
                  Rental Yield (Gross)
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  The annual rent collected divided by the property value. In
                  South Africa, a gross yield of <strong>8-10%</strong> is
                  considered a strong performer in metro areas.
                </dd>
              </div>
              <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-50">
                <dt className="font-bold text-blue-900 mb-2">
                  Tax Deductible Interest
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  The interest portion of your bond repayment is a
                  tax-deductible expense against your rental income. As your
                  loan amortizes, this deduction decreases.
                </dd>
              </div>
              <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-50">
                <dt className="font-bold text-blue-900 mb-2">
                  Negative Gearing
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  When your property expenses (bond + levy + rates) exceed your
                  rental income. Investors often accept this short-term loss for
                  long-term capital growth.
                </dd>
              </div>
              <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-50">
                <dt className="font-bold text-blue-900 mb-2">
                  Cash Flow Positive
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  When rent exceeds all expenses. This is the "Holy Grail" for
                  income-focused investors, usually achieved by paying a deposit
                  of 30-40%.
                </dd>
              </div>
            </dl>
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
