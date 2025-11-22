// FILE: app/tax/income-tax-calculator/page.js
import IncomeTaxCalculator from "../../components/tax/IncomeTaxCalculator";

export const metadata = {
  title:
    "Income Tax Calculator South Africa (2025/2026) | Free PAYE Calculator",
  description:
    "Calculate your South African income tax and net take-home pay with our free, updated calculator. Uses the latest 2025/2026 SARS tax brackets and includes medical aid credits.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Income Tax & Take-Home Pay Calculator South Africa (2025/2026)",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description:
    "Calculate your South African income tax (PAYE) and final take-home pay. This tool is updated for the 2025/2026 tax year and includes medical aid tax credits.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function IncomeTaxCalculatorPage() {
  const sarsRates = [
    { bracket: "R0 – R237,100", rate: "18% of taxable income" },
    {
      bracket: "R237,101 – R370,500",
      rate: "R42,678 + 26% of amount above R237,100",
    },
    {
      bracket: "R370,501 – R512,800",
      rate: "R77,362 + 31% of amount above R370,500",
    },
    {
      bracket: "R512,801 – R673,000",
      rate: "R121,475 + 36% of amount above R512,800",
    },
    {
      bracket: "R673,001 – R857,900",
      rate: "R179,147 + 39% of amount above R673,000",
    },
    {
      bracket: "R857,901 – R1,817,000",
      rate: "R251,258 + 41% of amount above R857,900",
    },
    {
      bracket: "R1,817,001 and above",
      rate: "R644,489 + 45% of amount above R1,817,000",
    },
  ];

  const faqs = [
    {
      q: "What is PAYE?",
      a: "PAYE stands for Pay As You Earn. It's the system employers use to deduct income tax from employees' salaries each month and pay it over to the South African Revenue Service (SARS).",
    },
    {
      q: "How do medical aid tax credits work?",
      a: "For the 2025/2026 tax year, SARS provides a fixed monthly tax credit for individuals who are members of a medical aid. This is R364 per month for the first two members and R246 per month for each additional member. This calculator automatically applies these credits to reduce your tax liability.",
    },
    {
      q: "What's the difference between marginal and effective tax rate?",
      a: "Your Marginal Tax Rate is the rate you pay on your *last* rand of income, determined by the highest tax bracket you fall into. Your Effective Tax Rate is the *average* rate you pay on your entire income (Total Tax / Gross Income), which is usually much lower than your marginal rate.",
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
            Income Tax Calculator (2025/2026)
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Estimate your PAYE and see a full breakdown of your take-home pay.
          </p>
        </header>
        <div className="space-y-16">
          <section id="calculator-section">
            <IncomeTaxCalculator />
          </section>

          <section id="sars-rates">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Official SARS Tax Brackets (2025/2026)
            </h2>
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="p-4 font-semibold text-slate-700">
                      Taxable Income (R)
                    </th>
                    <th className="p-4 font-semibold text-slate-700">
                      Rate of Tax
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
              Understanding Your Payslip
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
      </div>
    </main>
  );
}
