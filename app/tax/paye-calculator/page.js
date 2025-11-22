// FILE: app/tax/paye-calculator/page.js
import PAYECalculator from "../../components/tax/PAYECalculator";

export const metadata = {
  title: "PAYE Calculator South Africa | Salary After Tax (2025/2026)",
  description:
    "Calculate your take-home pay with our free PAYE calculator for South Africa. Includes the latest tax rates, fringe benefits, deductions, UIF, and SDL.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PAYE & Net Salary Calculator South Africa",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description:
    "Calculate your take-home pay after all statutory deductions (PAYE, UIF, SDL) with our free calculator. Includes fields for fringe benefits and other pre-tax deductions.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function PAYECalculatorPage() {
  const faqs = [
    {
      q: "What is PAYE (Pay As You Earn)?",
      a: "PAYE is the method used by SARS to collect income tax from employees. Your employer is required to deduct this tax directly from your salary each month and pay it to SARS on your behalf.",
    },
    {
      q: "What are taxable 'fringe benefits'?",
      a: "Fringe benefits are non-cash perks provided by your employer that have a monetary value for tax purposes. Common examples include the use of a company car, employer-provided accommodation, or low-interest loans. The value of these benefits is added to your salary to determine your total taxable income.",
    },
    {
      q: "What are 'Other Deductions'?",
      a: "This typically refers to pre-tax deductions such as contributions to a pension, provident, or retirement annuity (RA) fund. These contributions are deductible (up to certain limits) and reduce your taxable income, thereby lowering the amount of PAYE you pay.",
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
            PAYE & Take-Home Pay Calculator
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            See exactly where your money goes, from gross salary to net pay.
          </p>
        </header>
        <section id="calculator-section" className="mb-16">
          <PAYECalculator />
        </section>
        <section id="faq">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Understanding Your Deductions
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
                <p className="mt-4 text-slate-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
