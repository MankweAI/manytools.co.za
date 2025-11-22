// FILE: app/property/transfer-duty-calculator/2025/page.js
import Calculator from "../../../components/Calculator";
import ProFeatures from "../../../components/ProFeatures";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Transfer Duty Calculator South Africa",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "ZAR",
  },
  description:
    "Instantly calculate your property transfer duty with our free 2025/2026 calculator tool. Uses the latest official SARS rates for South Africa. Accurate, secure, and easy to use.",
  author: {
    "@type": "Organization",
    name: "ManyTools South Africa",
  },
};

export const metadata = {
  title:
    "Free Transfer Duty Calculator Tool (2025/2026 SARS Rates) | South Africa",
  description:
    "Instantly calculate your property transfer duty with our free 2025/2026 calculator tool. Uses the latest official SARS rates for South Africa. Accurate, secure, and easy to use.",
};

export default function TransferDutyCalculatorPage() {
  const sarsRates = [
    { bracket: "0 – 1,210,000", rate: "0%" },
    {
      bracket: "1,210,001 – 1,663,800",
      rate: "3% of the value above R1,210,000",
    },
    {
      bracket: "1,663,801 – 2,329,300",
      rate: "R13,614 + 6% of the value above R1,663,800",
    },
    {
      bracket: "2,329,301 – 2,994,800",
      rate: "R53,544 + 8% of the value above R2,329,300",
    },
    {
      bracket: "2,994,801 – 13,310,000",
      rate: "R106,784 + 11% of the value above R2,994,800",
    },
    {
      bracket: "13,310,001 and above",
      rate: "R1,241,456 + 13% of the value exceeding R13,310,000",
    },
  ];

  const faqs = [
    {
      q: "Who pays the transfer duty, the buyer or the seller?",
      a: "The purchaser (the buyer) is always responsible for paying the transfer duty. It is a key part of the total cost of acquiring a property.",
    },
    {
      q: "When must transfer duty be paid to SARS?",
      a: "Transfer duty must be paid to SARS within six months of the date the sale agreement is signed. Failure to do so results in interest penalties of 10% per annum.",
    },
    {
      q: "Is transfer duty the same as transfer costs?",
      a: "No. 'Transfer Duty' is the tax paid to SARS. 'Transfer Costs' (or conveyancing fees) are the professional fees you pay to the attorney for handling the legal work.",
    },
    {
      q: "Can transfer duty be included in my home loan?",
      a: "No. Banks will not include transfer duty or other transfer-related costs in the home loan amount. These costs must be paid from your own available funds.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-slate-50 min-h-screen font-sans">
        <div className="max-w-4xl mx-auto p-4 sm:p-8">
          <header className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              South African Transfer Duty Calculator
            </h1>
            <p className="mt-3 text-lg text-slate-600">
              Using the official SARS rates for the 2025/2026 tax year.
            </p>
          </header>

          <div className="space-y-16">
            <section id="calculator-section">
              <Calculator />
            </section>

            <section id="pro-features">
              <ProFeatures />
            </section>

            <section id="sars-rates">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                <h2 className="text-2xl font-bold text-slate-800">
                  Official SARS Rates (2025/2026)
                </h2>
                <span className="text-sm text-slate-500 font-medium mt-2 sm:mt-0">
                  Source: sars.gov.za | Verified: Oct 2025
                </span>
              </div>
              <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="p-4 font-semibold text-slate-700">
                        Property Value (R)
                      </th>
                      <th className="p-4 font-semibold text-slate-700">
                        Rate of Duty
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {sarsRates.map((item, index) => (
                      <tr key={index}>
                        <td className="p-4 font-mono text-slate-800">
                          {item.bracket}
                        </td>
                        <td className="p-4 text-slate-600">{item.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
    </>
  );
}
