// FILE: app/property/bond-repayment-calculator/government-employee/page.js
import BondCalculator from "../../../components/property/BondCalculator";
import NextSteps from "../../../components/NextSteps";
import ProFeatures from "../../../components/ProFeatures";

export const metadata = {
  title: "Government Employee Bond Calculator | GEHS Housing Allowance (2025)",
  description:
    "Home loan calculator for SA government employees. Calculate repayments with GEHS Housing Allowance and learn about Persal stop-order benefits.",
  alternates: {
    canonical:
      "https://manytools.co.za/property/bond-repayment-calculator/government-employee",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Government Employee Bond Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description:
    "A specialized bond calculator for South African government employees (GEHS members) featuring housing allowance context and Persal deduction estimates.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function GovernmentEmployeePage() {
  // GEHS Configuration
  // Government employees often target the affordable housing bracket (R600k - R1.8m).
  // We set the default to R1.2m, a common price point for this sector.
  const gehsDefaults = {
    price: 1200000,
    deposit: 0, // 100% bonds are very common for government employees
    interestRate: 11.75, // Competitive rates due to Persal security
  };

  const faqs = [
    {
      q: "How does the GEHS Housing Allowance work?",
      a: "If you own the property and live in it, the Housing Allowance (approx. R1,600+ monthly, adjusted annually) is paid directly to you or into your bond. This effectively reduces your 'out of pocket' monthly repayment.",
    },
    {
      q: "Do government employees get better interest rates?",
      a: "Often, yes. Because your bond repayment is deducted directly from your salary via Persal (Stop Order) before it hits your bank account, the risk to the bank is lower. This can help you negotiate a lower interest rate.",
    },
    {
      q: "Can I use my GEHS allowance to qualify for a bigger bond?",
      a: "Yes. Banks include the Housing Allowance as part of your gross income when calculating affordability, which boosts the maximum loan amount you qualify for.",
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
            GEHS MEMBER TOOLKIT
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Government Employee Bond Calculator
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Calculate your bond repayment factoring in the{" "}
            <strong className="text-orange-600">GEHS Housing Allowance</strong>{" "}
            and Persal deductions.
          </p>
        </header>

        <div className="space-y-16">
          {/* Main Calculator */}
          <section id="calculator-section">
            <BondCalculator defaults={gehsDefaults} />
          </section>

          {/* Semantic SEO: GEHS Definitions */}
          <section
            id="gehs-guide"
            className="bg-white p-8 rounded-2xl border border-orange-100 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Government Housing Glossary
            </h2>
            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-50">
                <dt className="font-bold text-orange-900 mb-2">
                  GEHS (Housing Scheme)
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  The Government Employees Housing Scheme is a benefit program
                  designed to help public service employees (G EPF members)
                  access affordable home finance and housing subsidies.
                </dd>
              </div>
              <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-50">
                <dt className="font-bold text-orange-900 mb-2">
                  Housing Allowance
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  A monthly non-pensionable allowance. For homeowners, this is
                  mandatory to be used towards your bond. For tenants, it is
                  paid into a savings facility (ILSF) until you buy a home.
                </dd>
              </div>
              <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-50">
                <dt className="font-bold text-orange-900 mb-2">
                  Persal Stop Order
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  A deduction code that takes the bond repayment directly from
                  your government salary before it is paid to you. Banks prefer
                  this security and may offer rate discounts for it.
                </dd>
              </div>
              <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-50">
                <dt className="font-bold text-orange-900 mb-2">Enrolment</dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  You must be officially enrolled in GEHS to receive the
                  allowance. If you resign, the allowance stops immediately,
                  increasing your &quot;out of pocket&quot; bond repayment.
                </dd>
              </div>
            </dl>
          </section>

          {/* FAQs */}
          <section id="faq">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              GEHS & Bond Questions
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

