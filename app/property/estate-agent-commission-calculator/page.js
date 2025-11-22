// FILE: app/property/estate-agent-commission-calculator/page.js
import EstateAgentCommissionCalculator from "../../components/property/EstateAgentCommissionCalculator";

export const metadata = {
  title:
    "Estate Agent Commission Calculator South Africa (2025) | Agent Fee + VAT",
  description:
    "Calculate the total estate agent commission on property sales in South Africa. Our free tool includes the 15% VAT calculation and lets you adjust the commission rate.",
};

// SEO: Enhanced JSON-LD for rich results
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Calculate Estate Agent Commission in South Africa",
  description:
    "A step-by-step guide and calculator to determine the total commission payable on a property sale in South Africa, including VAT.",
  step: [
    {
      "@type": "HowToStep",
      name: "Enter Property Sale Price",
      text: "Input the final selling price of the property into the calculator.",
    },
    {
      "@type": "HowToStep",
      name: "Set the Commission Rate",
      text: "Adjust the slider to the commission percentage (%) agreed upon with the estate agent. This typically ranges from 5% to 7.5%.",
    },
    {
      "@type": "HowToStep",
      name: "Calculate Base Commission",
      text: "The tool calculates the commission before VAT by applying the percentage to the sale price.",
    },
    {
      "@type": "HowToStep",
      name: "Add VAT",
      text: "The calculator automatically adds 15% VAT on top of the base commission, as required by SARS if the agency is VAT-registered.",
    },
    {
      "@type": "HowToStep",
      name: "View Total Fee",
      text: "The final result shows the total fee payable, which is the sum of the base commission and the VAT.",
    },
  ],
};

export default function EstateAgentCommissionCalculatorPage() {
  const faqs = [
    {
      q: "What is a typical estate agent commission rate in South Africa?",
      a: "There is no prescribed official rate. It is negotiable and typically ranges between 5% and 7.5% of the property's selling price, exclusive of VAT. The final rate depends on the agent's mandate, location, and property value.",
    },
    {
      q: "Is estate agent commission always negotiable?",
      a: "Yes, the commission rate is fully negotiable between the seller and the estate agency before signing a mandate. It's recommended to discuss and agree upon a rate as part of your agent selection process.",
    },
    {
      q: "Who is responsible for paying the agent's commission?",
      a: "The property seller is responsible for paying the commission. This amount is typically deducted from the proceeds of the sale by the conveyancing attorney and paid directly to the agency upon successful transfer of the property.",
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
            Estate Agent Commission Calculator
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Estimate the total agent fees on your property sale, including VAT.
          </p>
        </header>

        <div className="space-y-16">
          <section id="calculator-section">
            <EstateAgentCommissionCalculator />
          </section>

          {/* SEO & LLM Optimization Content Section */}
          <section id="content-section">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Understanding Commission in South Africa
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Estate agent commission is the fee a seller pays to a real
                  estate agency for their services in marketing and successfully
                  selling a property. This fee is the primary way agents earn
                  income. It&apos;s crucial for sellers to understand how it&apos;s
                  calculated.
                </p>
                <h3 className="text-lg font-semibold text-slate-700 pt-2">
                  What Does the Commission Cover?
                </h3>
                <p>
                  The commission isn&apos;t just for the individual agent; it covers
                  a wide range of agency costs, including:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li>
                    <strong>Marketing & Advertising:</strong> Costs for online
                    property portal listings (e.g., Property24, Private
                    Property), professional photography, social media campaigns,
                    and print advertising.
                  </li>
                  <li>
                    <strong>Operational Overheads:</strong> Office rental,
                    administrative staff salaries, insurance, and technology
                    systems.
                  </li>
                  <li>
                    <strong>Agent&apos;s Time and Expertise:</strong> Conducting
                    property valuations, hosting show days, managing viewings,
                    vetting potential buyers, and negotiating offers.
                  </li>
                  <li>
                    <strong>Brokerage Split:</strong> A portion of the
                    commission is paid to the overarching brand or brokerage
                    (e.g., RE/MAX, Pam Golding).
                  </li>
                </ul>
                <h3 className="text-lg font-semibold text-slate-700 pt-2">
                  The Role of VAT
                </h3>
                <p>
                  If an estate agency is registered for VAT (meaning its annual
                  turnover exceeds R1 million), it is required by law to charge
                  15% VAT on its commission. The calculator above automatically
                  includes this calculation. The total amount, including VAT, is
                  what is ultimately deducted from the sale proceeds.
                </p>
              </div>
            </div>
          </section>

          <section id="faq">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
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
      </div>
    </main>
  );
}
