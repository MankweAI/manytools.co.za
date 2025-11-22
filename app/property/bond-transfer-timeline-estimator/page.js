import BondTransferTimelineEstimator from "../../components/property/BondTransferTimelineEstimator";

export const metadata = {
  title: "Bond Transfer Timeline Estimator | South Africa Property Transfer",
  description:
    "Estimate your end-to-end property transfer timeline in South Africa. Include bond steps, municipality speed, suspensive conditions and buffers.",
};

// Structured Data (JSON-LD)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Bond Transfer Timeline Estimator South Africa",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description:
    "Project transfer registration date from offer acceptance. Adjust bond process, municipality speed, suspensive conditions and buffer days.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function BondTransferTimelineEstimatorPage() {
  const faqs = [
    {
      q: "Are weekends and public holidays excluded?",
      a: "This estimator uses calendar days for simplicity. Actual timelines may exclude weekends/holidays based on attorney and deeds office operations.",
    },
    {
      q: "Why does municipality speed matter?",
      a: "Rates clearance turnaround differs widely between municipalities. Choose fast/normal/slow to reflect expected processing times.",
    },
    {
      q: "Cash sale vs bond?",
      a: "Cash sales remove bond-related steps, generally shortening the timeline.",
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
            Bond Transfer Timeline Estimator
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Project your key dates from offer to registration.
          </p>
        </header>

        <section id="calculator-section" className="mb-16">
          <BondTransferTimelineEstimator />
        </section>

        <section id="faq">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 group"
                open={idx === 0}
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

