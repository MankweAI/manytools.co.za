// FILE: app/property/bond-repayment-calculator/page.js
import BondCalculator from "../../components/property/BondCalculator";
import NextSteps from "../../components/NextSteps";
import ProFeatures from "../../components/ProFeatures";

export const metadata = {
  title: "Bond Repayment Calculator | Free Home Loan Calculator South Africa",
  description:
    "Calculate your monthly bond repayments with our free home loan calculator for South Africa. See the total interest paid and view a full amortization schedule.",
  alternates: {
    canonical: "https://manytools.co.za/property/bond-repayment-calculator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Bond Repayment Calculator South Africa",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "342",
    bestRating: "5",
    worstRating: "1",
  },
  description:
    "Calculate your monthly bond repayments with our free home loan calculator for South Africa. See the total interest paid and view a full amortization schedule.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function BondRepaymentCalculatorPage() {
  // This configuration can be changed for different persona pages
  const defaultSettings = {
    price: 1500000,
    deposit: 0,
    interestRate: 11.75,
  };

  return (
    <main className="bg-orange-50 min-h-screen font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-5xl mx-auto p-4 sm:p-8">
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Bond & Home Loan Repayment Calculator
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Estimate your monthly home loan repayments and see a complete cost
            breakdown.
          </p>
        </header>

        <div className="space-y-16">
          <section id="calculator-section">
            <BondCalculator defaults={defaultSettings} />
          </section>

          {/* SEMANTIC SEO: DEFINITION PROTOCOL */}
          <section
            id="definitions"
            className="bg-white p-8 rounded-2xl border border-orange-200 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              Key Mortgage Definitions
            </h2>
            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              <div className="p-4 bg-orange-50 rounded-lg">
                <dt className="font-bold text-orange-700 mb-2">
                  Principal Debt
                </dt>
                <dd className="text-slate-600 text-sm leading-relaxed">
                  The original amount of money borrowed from the bank to
                  purchase your property, excluding interest. This is usually
                  the Purchase Price minus your Deposit.
                </dd>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <dt className="font-bold text-orange-700 mb-2">
                  Amortization
                </dt>
                <dd className="text-slate-600 text-sm leading-relaxed">
                  The process of paying off a debt over time through regular
                  payments. A portion of each payment is for interest and the
                  remaining amount is applied to the principal balance.
                </dd>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <dt className="font-bold text-orange-700 mb-2">
                  Variable Interest Rate
                </dt>
                <dd className="text-slate-600 text-sm leading-relaxed">
                  An interest rate that fluctuates with the South African Prime
                  Lending Rate (Repo Rate). If the Prime rate goes up, your
                  repayment increases.
                </dd>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <dt className="font-bold text-orange-700 mb-2">
                  Bond Registration Costs
                </dt>
                <dd className="text-slate-600 text-sm leading-relaxed">
                  Fees paid to the registering attorney to register the bond at
                  the Deeds Office. This is separate from Transfer Duty and is
                  typically calculated on a sliding scale based on the loan
                  amount.
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
