// FILE: app/tax/uif-calculator/page.js
import UIFCalculator from "../../components/tax/UIFCalculator";

export const metadata = {
  title: "UIF Contribution Calculator South Africa | Unemployment Fund (2025)",
  description:
    "Calculate your monthly UIF contribution based on your salary. See both employee and employer amounts and understand the current SARS contribution ceiling.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "UIF Contribution Calculator South Africa",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description:
    "Calculate the monthly Unemployment Insurance Fund (UIF) contributions for both employee and employer in South Africa based on the latest SARS thresholds.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function UIFCalculatorPage() {
  const faqs = [
    {
      q: "What is UIF and who must contribute?",
      a: "The Unemployment Insurance Fund (UIF) provides short-term relief to workers who become unemployed or are unable to work. By law, both the employer and the employee must each contribute 1% of the employee's gross remuneration per month.",
    },
    {
      q: "What is the UIF contribution ceiling?",
      a: "UIF contributions are calculated on remuneration up to a certain limit, known as the 'UIF ceiling'. For the 2025/2026 tax year, this ceiling is R17,712 per month. This means the maximum contribution for both employee and employer is capped at R177.12 each (1% of R17,712).",
    },
    {
      q: "Who is exempt from paying UIF?",
      a: "You are exempt from contributing to UIF if you work less than 24 hours a month, if you are a public servant, if you receive a government pension, or if you are a foreign worker on a contract who will be repatriated at the end of the contract.",
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
            UIF Contribution Calculator
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Instantly calculate monthly employee and employer UIF payments.
          </p>
        </header>
        <section id="calculator-section" className="mb-16">
          <UIFCalculator />
        </section>
        <section id="faq">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Understanding UIF Contributions
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
