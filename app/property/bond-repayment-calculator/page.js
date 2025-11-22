// FILE: app/property/bond-repayment-calculator/page.js
import BondCalculator from "../../components/property/BondCalculator";
import NextSteps from "../../components/NextSteps";

export const metadata = {
  title: "Bond Repayment Calculator | Free Home Loan Calculator South Africa",
  description:
    "Calculate your monthly bond repayments with our free home loan calculator for South Africa. See the total interest paid and view a full amortization schedule.",
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
  const faqs = [
    {
      q: "What is a bond repayment?",
      a: "A bond repayment is the monthly amount you pay back to the bank for your home loan. It consists of two parts: the principal (the amount you borrowed) and the interest (the bank's charge for lending you the money).",
    },
    {
      q: "How is the interest rate determined?",
      a: "Your interest rate is usually linked to the Prime lending rate in South Africa. Banks will offer you a rate of 'Prime plus/minus X%', based on your credit profile and the size of your deposit.",
    },
    {
      q: "What is an amortization schedule?",
      a: "An amortization schedule is a table that shows each monthly payment over the life of your loan, breaking down how much of each payment goes towards principal versus interest. It shows you exactly how your loan balance decreases over time.",
    },
    {
      q: "Can I pay extra into my bond?",
      a: "Yes, and it's a great idea! Paying even a small extra amount each month can significantly reduce your loan term and the total amount of interest you pay. This is a powerful way to save money over the long run.",
    },
  ];

  return (
    <main className="bg-slate-50 min-h-screen font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-5xl mx-auto p-4 sm:p-8">
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            Bond & Home Loan Repayment Calculator
          </h1>
          <p className="mt-3 text-lg text-zinc-600">
            Estimate your monthly home loan repayments and see a complete cost
            breakdown.
          </p>
        </header>

        <div className="space-y-16">
          <section id="calculator-section">
            <BondCalculator />
          </section>

          <section
            id="definitions"
            className="prose prose-slate max-w-none bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-zinc-800 not-prose mb-6">
              Key Mortgage Definitions
            </h2>
            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <dt className="font-bold text-emerald-700">Principal Debt</dt>
                <dd className="text-zinc-600">
                  The original amount of money borrowed from the bank to
                  purchase your property, excluding interest.
                </dd>
              </div>
              <div>
                <dt className="font-bold text-emerald-700">Amortization</dt>
                <dd className="text-zinc-600">
                  The process of paying off a debt over time through regular
                  payments. A portion of each payment is for interest and the
                  remaining amount is applied to the principal balance.
                </dd>
              </div>
              <div>
                <dt className="font-bold text-emerald-700">
                  Variable Interest Rate
                </dt>
                <dd className="text-zinc-600">
                  An interest rate that fluctuates with the South African Prime
                  Lending Rate (Repo Rate). If the Prime rate goes up, your
                  repayment increases.
                </dd>
              </div>
              <div>
                <dt className="font-bold text-emerald-700">
                  Bond Registration Costs
                </dt>
                <dd className="text-zinc-600">
                  Fees paid to the registering attorney to register the bond at
                  the Deeds Office. This is separate from Transfer Duty.
                </dd>
              </div>
            </dl>
          </section>

          <section id="faq">
            <h2 className="text-2xl font-bold text-zinc-800 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm border border-zinc-200 group"
                  open={index === 0}
                >
                  <summary className="font-semibold text-lg text-zinc-800 cursor-pointer list-none flex justify-between items-center">
                    {faq.q}
                    <div className="text-zinc-500 transition-transform duration-200 group-open:rotate-180">
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
                  <p className="mt-4 text-zinc-600">{faq.a}</p>
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
