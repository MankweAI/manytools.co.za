// FILE: app/property/bond-repayment-calculator/investor/page.js
import BondCalculator from "../../../components/property/BondCalculator";
import Link from "next/link";

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
  // Investors typically put down a deposit to ensure cash flow and pay a risk premium on rates.
  const investorDefaults = {
    price: 2500000, // Typical investment unit price
    deposit: 500000, // 20% deposit is common for buy-to-let to break even
    interestRate: 12.0, // Investors often pay slightly higher rates (Prime + risk)
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
    <main className="bg-slate-50 min-h-screen font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-5xl mx-auto p-4 sm:p-8">
        {/* Persona Header */}
        <header className="mb-10">
          <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
            PROPERTY INVESTOR TOOLKIT
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            Buy-to-Let Bond Calculator
          </h1>
          <p className="mt-4 text-lg text-zinc-600 max-w-2xl">
            Analyze your investment property costs. Calculate your monthly
            repayment to determine the
            <strong className="text-blue-600">
              {" "}
              required rental income
            </strong>{" "}
            for positive cash flow.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Calculator Area - Using the Unified Hybrid Component */}
          <div className="lg:col-span-2">
            <BondCalculator defaults={investorDefaults} />
          </div>

          {/* Persona-Specific Sidebar Content */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
              <h3 className="font-bold text-zinc-800 mb-3">
                Analyze Rental Yield
              </h3>
              <p className="text-sm text-zinc-600 mb-4">
                Once you have your repayment figure, check if the property makes
                financial sense by calculating the Gross and Net Yield.
              </p>
              <Link
                href="/property/rental-yield-calculator"
                className="text-blue-600 font-semibold text-sm hover:underline"
              >
                Go to Yield Calculator &rarr;
              </Link>
            </div>

            <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
              <h3 className="font-bold text-amber-900 mb-3">Tax Tip</h3>
              <p className="text-sm text-amber-800">
                Interest on your bond is tax-deductible against rental income.
                Use the <strong>"Total Interest"</strong> figure in the
                calculator breakdown to estimate your potential deduction.
              </p>
            </div>
          </div>
        </div>

        {/* Semantic SEO Definitions */}
        <section className="mt-16 prose prose-slate max-w-none bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm">
          <h2 className="text-2xl font-bold text-zinc-800 not-prose mb-6">
            Investment Property Glossary
          </h2>
          <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <dt className="font-bold text-blue-900">Negative Gearing</dt>
              <dd className="text-zinc-600 mt-1">
                When your property expenses (bond, levies, rates) exceed your
                rental income. You cover the shortfall monthly, but may benefit
                from tax deductions and long-term capital growth.
              </dd>
            </div>
            <div>
              <dt className="font-bold text-blue-900">Cash Flow Positive</dt>
              <dd className="text-zinc-600 mt-1">
                The "Holy Grail" of investing: when your rental income covers
                all expenses and leaves you with surplus cash every month. Often
                requires a 20-30% deposit.
              </dd>
            </div>
            <div>
              <dt className="font-bold text-blue-900">
                Capital Gains Tax (CGT)
              </dt>
              <dd className="text-zinc-600 mt-1">
                Tax paid on the profit when you sell the property. Unlike a
                primary residence (which has a R2m exclusion), almost all profit
                on an investment property is subject to CGT.
              </dd>
            </div>
            <div>
              <dt className="font-bold text-blue-900">Levies & Rates</dt>
              <dd className="text-zinc-600 mt-1">
                Mandatory monthly costs for Sectional Title units. Banks
                typically do not factor these into the bond repayment, but they
                are crucial for your net yield calculation.
              </dd>
            </div>
          </dl>
        </section>

        {/* FAQ Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-zinc-800 mb-4">
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
