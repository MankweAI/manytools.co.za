import BondCalculator from "../../../components/property/BondCalculator";
import NextSteps from "../../../components/NextSteps";
import ProFeatures from "../../../components/ProFeatures";

export const metadata = {
  title: "Self-Employed Bond Calculator | Business Owner Home Loans (2025)",
  description:
    "Calculate bond repayments for self-employed applicants. Understand income verification, tax returns (IT34), and deposit requirements for business owners in South Africa.",
  alternates: {
    canonical:
      "https://manytools.co.za/property/bond-repayment-calculator/self-employed",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Self-Employed Bond Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description:
    "Home loan calculator optimized for business owners and freelancers, factoring in risk-adjusted interest rates and deposit requirements.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function SelfEmployedPage() {
  // Self-Employed Configuration
  const businessDefaults = {
    price: 2000000,
    deposit: 200000,
    interestRate: 12.25,
  };

  const faqs = [
    {
      q: "How do banks calculate my income if I'm self-employed?",
      a: "Banks look at your 'Net Profit' before tax, not your turnover. They typically average your last 2 years' annual financial statements or IT34 tax assessments to determine your stable monthly income.",
    },
    {
      q: "Do I need a larger deposit as a business owner?",
      a: "It is highly recommended. While 100% bonds are possible, showing 'skin in the game' (a 10-20% deposit) significantly improves your scoring and can help negotiate a lower interest rate.",
    },
    {
      q: "What documents are required for a self-employed bond application?",
      a: "You typically need: 2 years of signed financials (AFS), IT34 tax assessments for 2 years, 6 months of personal and business bank statements, and a letter from your accountant confirming your income.",
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
            ENTREPRENEUR & FREELANCER GUIDE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Self-Employed Bond Calculator
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Applying as a business owner? Calculate your repayments using
            <strong className="text-orange-600">
              {" "}
              risk-adjusted interest rates{" "}
            </strong>
            typical for non-salaried applicants.
          </p>
        </header>

        <div className="space-y-16">
          {/* Main Calculator */}
          <section id="calculator-section">
            <BondCalculator defaults={businessDefaults} />
          </section>

          {/* Semantic SEO Definitions */}
          <section
            id="definitions"
            className="bg-white p-8 rounded-2xl border border-orange-100 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Self-Employed Lending Glossary
            </h2>
            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-50">
                <dt className="font-bold text-orange-900 mb-2">
                  IT34 Assessment
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  Your official tax assessment from SARS. Banks consider this the
                  most reliable proof of income because it shows exactly what you
                  declared to the taxman.
                </dd>
              </div>
              <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-50">
                <dt className="font-bold text-orange-900 mb-2">
                  Management Accounts
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  Up-to-date financial figures for the current year. Banks ask for
                  these if your Annual Financial Statements (AFS) are more than 6
                  months old.
                </dd>
              </div>
              <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-50">
                <dt className="font-bold text-orange-900 mb-2">
                  Turnover vs. Profit
                </dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  Turnover is your total sales; Profit is what's left after
                  expenses. Banks lend based on <em>Profit</em> (personal
                  drawings), not turnover.
                </dd>
              </div>
              <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-50">
                <dt className="font-bold text-orange-900 mb-2">Surety</dt>
                <dd className="text-slate-700 text-sm leading-relaxed">
                  If buying in a company or trust name, you (the director/trustee)
                  will almost always have to sign personal surety for the bond.
                </dd>
              </div>
            </dl>
          </section>

          {/* FAQ Section */}
          <section id="faq">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
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

