import FixFlipCalculator from "../../components/property/FixFlipCalculator";

export const metadata = {
  title: "Fix & Flip Profit Calculator | South Africa Property Investment",
  description:
    "Estimate fix & flip profit, ROI and holding costs for a South African property investment. Includes transfer duty, selling costs and annualized ROI.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Fix & Flip Profit Calculator South Africa",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description:
    "Free fix & flip profit calculator. Model purchase, rehab, holding and selling costs to estimate profit, ROI and annualized return.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function FixFlipCalculatorPage() {
  const faqs = [
    {
      q: "What holding costs should I include?",
      a: "Include rates, levies, insurance, utilities (vacant), security, and finance/interest if applicable.",
    },
    {
      q: "Does this include income tax or CGT?",
      a: "No. It shows project-level profit before tax. Consult a tax professional for after-tax returns.",
    },
    {
      q: "Why annualized ROI?",
      a: "It normalizes shorter flips to a yearly rate to compare against other investments.",
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
            Fix & Flip Profit Calculator
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Model rehab, holding and selling costs to estimate ROI.
          </p>
        </header>
        <section className="mb-16">
          <FixFlipCalculator />
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 group"
                open={i === 0}
              >
                <summary className="font-semibold text-lg text-slate-800 cursor-pointer list-none flex justify-between items-center">
                  {f.q}
                  <div className="text-slate-500 transition-transform duration-200 group-open:rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
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
                <p className="mt-4 text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
