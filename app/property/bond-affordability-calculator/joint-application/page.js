// FILE: app/property/bond-affordability-calculator/joint-application/page.js
import BondAffordabilityCalculator from "../../../components/property/BondAffordabilityCalculator";
import Link from "next/link";

export const metadata = {
  title: "Joint Bond Affordability Calculator | Two Applicants (2025)",
  description:
    "Calculate home loan affordability for joint applicants. Combine incomes for partners, spouses, or friends to see your maximum borrowing capacity.",
  alternates: {
    canonical:
      "https://manytools.co.za/property/bond-affordability-calculator/joint-application",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Joint Bond Affordability Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description:
    "Affordability calculator for joint bond applications in South Africa. Calculates maximum loan amount based on combined household income.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function JointApplicationPage() {
  // Joint Application Configuration
  const jointDefaults = {
    isJoint: true,
    interestRate: 11.75, // Standard Prime rate
  };

  const faqs = [
    {
      q: "Can I buy a house with a friend or partner?",
      a: "Yes. South African banks allow joint bond applications for 2 or more people. This includes spouses, life partners, siblings, or friends. The bank will assess the combined income and credit scores of all applicants.",
    },
    {
      q: "What does 'Joint and Several Liability' mean?",
      a: "It means that all co-owners are responsible for the debt together (jointly) and individually (severally). If your partner stops paying their share, the bank can legally demand the FULL monthly repayment from you.",
    },
    {
      q: "Does being married affect the bond application?",
      a: "Yes. If you are married in Community of Property (COP), you MUST apply jointly, and your spouse must sign all documents. If married Out of Community of Property, you can apply jointly or individually.",
    },
  ];

  return (
    <main className="bg-violet-50 min-h-screen font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-5xl mx-auto p-4 sm:p-8">
        <header className="mb-10 text-center">
          <div className="inline-block bg-violet-100 text-violet-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
            JOINT BOND GUIDE
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Joint Bond Affordability Calculator
          </h1>
          <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">
            Buying with a partner? Combine your incomes to increase your
            borrowing power. Calculate your{" "}
            <strong className="text-violet-600">Household Affordability</strong>
            .
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Calculator */}
          <div className="lg:col-span-2">
            <BondAffordabilityCalculator defaults={jointDefaults} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
              <h3 className="font-bold text-stone-800 mb-3">
                Benefits of Co-Buying
              </h3>
              <ul className="space-y-3 text-sm text-stone-600">
                <li className="flex items-start">
                  <span className="text-violet-500 mr-2">✓</span>
                  Qualify for a larger loan amount.
                </li>
                <li className="flex items-start">
                  <span className="text-violet-500 mr-2">✓</span>
                  Share the burden of deposit and transfer costs.
                </li>
                <li className="flex items-start">
                  <span className="text-violet-500 mr-2">✓</span>
                  Split monthly repayments and maintenance.
                </li>
              </ul>
            </div>

            <div className="bg-violet-100 p-6 rounded-xl border border-violet-200">
              <h3 className="font-bold text-violet-900 mb-3">Warning</h3>
              <p className="text-sm text-violet-800">
                Before signing, sign a <strong>Co-Ownership Agreement</strong>.
                It should detail what happens if the relationship ends, if one
                person wants to sell, or who pays for maintenance.
              </p>
            </div>
          </div>
        </div>

        {/* Definitions */}
        <section className="mt-16 prose prose-stone max-w-none bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
          <h2 className="text-2xl font-bold text-stone-800 not-prose mb-6">
            Joint Bond Glossary
          </h2>
          <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <dt className="font-bold text-violet-900">Main Applicant</dt>
              <dd className="text-stone-600 mt-1">
                Usually the person with the higher income. The bank often uses
                this person's primary bank account for the debit order, though
                you can nominate a joint account.
              </dd>
            </div>
            <div>
              <dt className="font-bold text-violet-900">
                Community of Property
              </dt>
              <dd className="text-stone-600 mt-1">
                A marital regime where both spouses' estates are merged. You
                generally cannot buy property alone; your spouse's written
                consent and signature are required.
              </dd>
            </div>
            <div>
              <dt className="font-bold text-violet-900">Co-Ownership Share</dt>
              <dd className="text-stone-600 mt-1">
                By default, co-owners share the property 50/50. However, you can
                specify different shares (e.g., 70/30) in the Title Deed if one
                partner contributes more to the deposit.
              </dd>
            </div>
            <div>
              <dt className="font-bold text-violet-900">Suretyship</dt>
              <dd className="text-stone-600 mt-1">
                Even if you only own 50% of the house, you sign surety for 100%
                of the bond. If your partner defaults, the bank comes after you
                for the full outstanding amount.
              </dd>
            </div>
          </dl>
        </section>

        {/* FAQs */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">
            Joint Application FAQs
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border border-stone-200 group"
                open={index === 0}
              >
                <summary className="font-semibold text-lg text-stone-800 cursor-pointer list-none flex justify-between items-center">
                  {faq.q}
                  <div className="text-stone-500 transition-transform duration-200 group-open:rotate-180">
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
                <p className="mt-4 text-stone-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

