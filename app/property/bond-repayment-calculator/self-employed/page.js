// FILE: app/property/bond-repayment-calculator/self-employed/page.js
import BondCalculator from "../../../components/property/BondCalculator";
import Link from "next/link";

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
  // Banks often price self-employed loans at a premium due to income variance.
  const businessDefaults = {
    price: 2000000,
    deposit: 200000, // 10% deposit is standard recommendation for business owners
    interestRate: 12.25, // Often Prime + 0.5% to 1.5% depending on stability
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
    <main className="bg-slate-50 min-h-screen font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-5xl mx-auto p-4 sm:p-8">
        <header className="mb-10">
          <div className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
            ENTREPRENEUR & FREELANCER GUIDE
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            Self-Employed Bond Calculator
          </h1>
          <p className="mt-4 text-lg text-zinc-600 max-w-2xl">
            Applying as a business owner? Calculate your repayments using
            <strong className="text-amber-600">
              {" "}
              risk-adjusted interest rates{" "}
            </strong>
            typical for non-salaried applicants.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Calculator Area */}
          <div className="lg:col-span-2">
            <BondCalculator defaults={businessDefaults} />
          </div>

          {/* Persona-Specific Sidebar Content */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
              <h3 className="font-bold text-zinc-800 mb-3">
                Affordability Check
              </h3>
              <p className="text-sm text-zinc-600 mb-4">
                Banks analyze your <strong>Net Profit</strong>, not your
                Turnover. Ensure your financials reflect enough profit to cover
                the bond x 3.
              </p>
              <Link
                href="/property/bond-affordability-calculator"
                className="text-amber-600 font-semibold text-sm hover:underline"
              >
                Check Affordability &rarr;
              </Link>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-3">Pro Tip</h3>
              <p className="text-sm text-blue-800">
                Keep your personal and business expenses separate.
                <strong> Co-mingling funds</strong> makes it harder for banks to
                verify your true disposable income.
              </p>
            </div>
          </div>
        </div>

        {/* Semantic SEO Definitions */}
        <section className="mt-16 prose prose-slate max-w-none bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm">
          <h2 className="text-2xl font-bold text-zinc-800 not-prose mb-6">
            Self-Employed Lending Glossary
          </h2>
          <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <dt className="font-bold text-amber-700">IT34 Assessment</dt>
              <dd className="text-zinc-600 mt-1">
                Your official tax assessment from SARS. Banks consider this the
                most reliable proof of income because it shows exactly what you
                declared to the taxman.
              </dd>
            </div>
            <div>
              <dt className="font-bold text-amber-700">Management Accounts</dt>
              <dd className="text-zinc-600 mt-1">
                Up-to-date financial figures for the current year. Banks ask for
                these if your Annual Financial Statements (AFS) are more than 6
                months old.
              </dd>
            </div>
            <div>
              <dt className="font-bold text-amber-700">Turnover vs. Profit</dt>
              <dd className="text-zinc-600 mt-1">
                Turnover is your total sales; Profit is what's left after
                expenses. Banks lend based on <em>Profit</em> (personal
                drawings), not turnover.
              </dd>
            </div>
            <div>
              <dt className="font-bold text-amber-700">Surety</dt>
              <dd className="text-zinc-600 mt-1">
                If buying in a company or trust name, you (the director/trustee)
                will almost always have to sign personal surety for the bond.
              </dd>
            </div>
          </dl>
        </section>

        {/* FAQ Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-zinc-800 mb-4">
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

