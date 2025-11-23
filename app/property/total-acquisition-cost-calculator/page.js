import TotalAcquisitionCostCalculator from "../../components/property/TotalAcquisitionCostCalculator";
import NextSteps from "../../components/NextSteps";
import ProFeatures from "../../components/ProFeatures";

export const metadata = {
  title:
    "Total Acquisition Cost Calculator | Property Purchase Costs South Africa",
  description:
    "Estimate the total acquisition cost to buy a property in South Africa. Includes transfer duty, attorney transfer costs, bond registration, and sundries.",
};

// Structured Data (JSON-LD)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Total Acquisition Cost Calculator South Africa",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description:
    "Estimate the total acquisition cost to buy a property in South Africa, including transfer duty, transfer attorney costs, bond registration, and sundries.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function TotalAcquisitionCostCalculatorPage() {
  const faqs = [
    {
      q: "What is included in acquisition costs?",
      a: "Transfer duty, attorney transfer (conveyancing) fees, bond registration attorney fees, deeds office and other sundries.",
    },
    {
      q: "Do banks finance these costs?",
      a: "Banks generally do not finance transfer duty and transfer costs. Some banks may include bond registration costs. Assume cash for conservative planning.",
    },
    {
      q: "Is this a quote?",
      a: "No. These are simplified estimates for planning. Request a formal quote from your conveyancer and bond attorney.",
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
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Total Acquisition Cost Calculator
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Estimate once-off costs and total cash needed to buy a property.
          </p>
        </header>

        <div className="space-y-16">
          <section id="calculator-section">
            <TotalAcquisitionCostCalculator />
          </section>

          <section id="faq">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">FAQs</h2>
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

