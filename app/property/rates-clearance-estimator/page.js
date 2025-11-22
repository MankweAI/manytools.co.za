import RatesClearanceEstimator from "../../components/property/RatesClearanceEstimator";

export const metadata = {
  title: "Rates Clearance Estimator | Municipal Prepaid Before Transfer (SA)",
  description:
    "Estimate the municipal rates clearance amount required before property transfer in South Africa. Includes prepaid months, arrears, admin fee, and credits.",
};

// Structured Data (JSON-LD)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Rates Clearance Estimator South Africa",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description:
    "Estimate municipal rates clearance and prepaid utilities needed before transfer. Add admin fee, arrears, and credits to get a total estimate.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function RatesClearanceEstimatorPage() {
  const faqs = [
    {
      q: "What is a rates clearance amount?",
      a: "An upfront amount paid to the municipality to cover rates and services for a few months in advance, plus any arrears and admin fees, to issue a clearance certificate.",
    },
    {
      q: "How many months must be prepaid?",
      a: "It varies by municipality, commonly 2–6 months. Confirm with your conveyancer for your area.",
    },
    {
      q: "Is this an official quote?",
      a: "No. This is an estimate. The municipality will issue the official figure required for clearance.",
    },
  ];

  return (
    <main className="bg-slate-50 min-h-screen font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Rates Clearance Estimator
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Estimate prepaid months, arrears and fees for municipal clearance.
          </p>
        </header>

        <section id="calculator-section" className="mb-16">
          <RatesClearanceEstimator />
        </section>

        <section id="faq">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 group"
                open={i === 0}
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

