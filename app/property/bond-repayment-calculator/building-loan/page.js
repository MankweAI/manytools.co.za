// FILE: app/property/bond-repayment-calculator/building-loan/page.js
import BondCalculator from "../../../components/property/BondCalculator";
import NextSteps from "../../../components/NextSteps";
import ProFeatures from "../../../components/ProFeatures";

export const metadata = {
  title: "Building Loan Calculator | Construction Bond Repayments (2025)",
  description:
    "Calculate repayments for a building loan in South Africa. Understand progress payments (draws), NHBRC fees, and deposit requirements for building your own home.",
  alternates: {
    canonical:
      "https://manytools.co.za/property/bond-repayment-calculator/building-loan",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Building Loan Calculator South Africa",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description:
    "Home loan calculator specifically for construction bonds. Estimates monthly repayments on the final loan amount for building a new property.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function BuildingLoanPage() {
  // Building Loan Configuration
  // Banks view construction as higher risk.
  const buildingDefaults = {
    price: 3000000, // Total package (Land + Building Cost)
    deposit: 600000, // 20% deposit is standard for building loans (often 40% on land)
    interestRate: 12.0, // Rate is often higher during the riskier construction phase
  };

  const faqs = [
    {
      q: "How do building loan repayments work?",
      a: "During the construction phase (usually 6-9 months), you only pay 'interim interest' on the money the bank has actually paid out to the builder. You start paying the full bond repayment (capital + interest) only once the house is finished.",
    },
    {
      q: "What deposit do I need to build a house?",
      a: "Banks are stricter with building loans. Expect to put down 10% to 20% of the total project cost. If you are buying land separately, banks often require a 40% deposit on the land purchase price.",
    },
    {
      q: "What is a Progress Payment (Draw)?",
      a: "The bank doesn't give you the full loan at once. They pay the builder in stages (e.g., foundation done, roof on). A bank valuer inspects the site before authorizing each payment to ensure the work exists.",
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
            HOME BUILDER TOOLKIT
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Building Loan Calculator
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Planning to build? Calculate the repayment on your final loan amount
            and understand the{" "}
            <strong className="text-orange-600">Progress Payment</strong>{" "}
            process.
          </p>
        </header>

        <div className="space-y-16">
          {/* Main Calculator */}
          <section id="calculator-section">
            <BondCalculator defaults={buildingDefaults} />
          </section>

          {/* Semantic SEO: Construction Definitions */}
          <section
            id="building-guide"
            className="bg-white p-8 rounded-2xl border border-orange-100 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Construction Finance Glossary
            </h2>
            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-50">
                <dt className="font-bold text-orange-900 mb-2">
                  NHBRC Enrollment Fee
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  By law, your builder must enroll the new home with the
                  National Home Builders Registration Council (NHBRC). This
                  insurance fee is usually calculated on the value of the build
                  and must be paid before the bond is registered.
                </dd>
              </div>
              <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-50">
                <dt className="font-bold text-orange-900 mb-2">
                  Interim Interest
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  The interest charged by the bank on the money drawn during
                  construction. It increases as more draws are made. You must
                  budget cash for this monthly expense while you are likely also
                  paying rent elsewhere.
                </dd>
              </div>
              <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-50">
                <dt className="font-bold text-orange-900 mb-2">
                  Retention Amount
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  The bank often holds back the final payment (e.g., 5-10%)
                  until the house is fully complete and you have signed a &quot;Happy
                  Letter&quot; confirming you are satisfied with the quality.
                </dd>
              </div>
              <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-50">
                <dt className="font-bold text-orange-900 mb-2">
                  Turnkey vs. Owner Builder
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  Banks prefer &quot;Turnkey&quot; projects (a developer builds it for a
                  fixed price). &quot;Owner Builder&quot; loans (where you manage
                  subcontractors) are very difficult to get approved without
                  high cash reserves.
                </dd>
              </div>
            </dl>
          </section>

          {/* FAQs */}
          <section id="faq">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Building Loan Questions
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

