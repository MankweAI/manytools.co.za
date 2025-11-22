// FILE: app/page.js
// UPDATE: Reflecting the new project name "manytools.co.za"

// Helper component for SVG icons
const Icon = ({ path }) => (
  <svg
    className="w-8 h-8 mb-4 text-indigo-600"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={path} />
  </svg>
);

// Data for our tool cards.
const tools = [
  // Property
  {
    title: "Transfer Duty Calculator",
    description:
      "Calculate the SARS transfer duty for property sales in South Africa.",
    href: "/property/transfer-duty-calculator/2025",
    category: "Property",
    iconPath: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  },
  {
    title: "Bond Repayment Calculator",
    description:
      "Estimate your monthly home loan repayments, total interest, and more.",
    href: "/property/bond-repayment-calculator",
    category: "Property",
    iconPath:
      "M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10z",
  },
  {
    title: "Bond Affordability Calculator",
    description: "Calculate how much home loan you can afford.",
    href: "/property/bond-affordability-calculator",
    category: "Property",
    iconPath: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  },
  {
    title: "Estate Agent Commission Calculator",
    description: "Calculate estate agent commission on property sales.",
    href: "/property/estate-agent-commission-calculator",
    category: "Property",
    iconPath: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  },
  {
    title: "Total Acquisition Cost Calculator",
    description:
      "Estimate transfer duty, legal fees, and total cash needed to buy.",
    href: "/property/total-acquisition-cost-calculator",
    category: "Property",
    iconPath: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  },
  {
    title: "Rental Yield Calculator",
    description: "Calculate gross and net rental yield, EGI and NOI.",
    href: "/property/rental-yield-calculator",
    category: "Property",
    iconPath: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  },
  {
    title: "Capital Gains Tax (Property)",
    description: "Estimate CGT on selling a property in South Africa.",
    href: "/property/capital-gains-tax-calculator",
    category: "Property",
    iconPath: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  },
  {
    title: "Early Settlement Savings",
    description: "See time and interest saved with extra bond repayments.",
    href: "/property/early-settlement-savings-calculator",
    category: "Property",
    iconPath: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  },
  {
    title: "Bond vs Cash Calculator",
    description:
      "Compare buying with a bond versus cash including opportunity cost.",
    href: "/property/bond-vs-cash-calculator",
    category: "Property",
    iconPath: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  },

  // Tax
  {
    title: "Income Tax Calculator",
    description: "Calculate your South African income tax and take-home pay.",
    href: "/tax/income-tax-calculator",
    category: "Tax",
    iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "PAYE Calculator",
    description: "Estimate your net pay after PAYE, UIF, and SDL deductions.",
    href: "/tax/paye-calculator",
    category: "Tax",
    iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "UIF Calculator",
    description: "Calculate UIF contributions and benefits.",
    href: "/tax/uif-calculator",
    category: "Tax",
    iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "VAT Calculator",
    description: "Calculate VAT on sales and purchases.",
    href: "/tax/vat-calculator",
    category: "Tax",
    iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Take Home Pay Calculator",
    description: "Calculate your salary after all deductions.",
    href: "/tax/take-home-pay-calculator",
    category: "Tax",
    iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Rates Clearance Estimator",
    description: "Estimate prepaid months and arrears for municipal clearance.",
    href: "/property/rates-clearance-estimator",
    category: "Property",
    iconPath: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  },
  {
    title: "Amortization Schedule",
    description: "Full bond amortization with extra repayment modelling.",
    href: "/property/amortization-schedule-calculator",
    category: "Property",
    iconPath: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  },
  {
    title: "SDL Calculator",
    description: "Estimate your Skills Development Levy (1% of payroll).",
    href: "/tax/sdl-calculator",
    category: "Tax",
    iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Sectional Title Levy Calculator",
    description: "Calculate your levy by PQ and split special levies.",
    href: "/property/sectional-title-levy-calculator",
    category: "Property",
    iconPath: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  },
  {
    title: "Transfer Cost Calculator",
    description: "Estimate transfer duty, attorney fees and bond costs.",
    href: "/property/transfer-cost-calculator",
    category: "Property",
    iconPath: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  },
  {
    title: "First-Time Buyer Costs",
    description: "Plan deposit, legal fees, moving, setup and contingency.",
    href: "/property/first-time-buyer-costs-calculator",
    category: "Property",
    iconPath: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  },
  {
    title: "Bond Transfer Timeline",
    description: "Estimate your transfer process timeline and key dates.",
    href: "/property/bond-transfer-timeline-estimator",
    category: "Property",
    iconPath: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  },
  {
    title: "Business Loan Calculator",
    description:
      "Estimate repayments, interest and fees for SA business loans.",
    href: "/business/business-loan-calculator",
    category: "Business",
    iconPath:
      "M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10z",
  },
  {
    title: "Break-Even Calculator",
    description: "Find units and revenue needed to break even.",
    href: "/business/break-even-calculator",
    category: "Business",
    iconPath:
      "M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10z",
  },
  {
    title: "ROI Calculator",
    description: "Compute simple & annualized ROI and payback period.",
    href: "/business/roi-calculator",
    category: "Business",
    iconPath:
      "M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10z",
  },
  {
    title: "Cash Runway Calculator",
    description: "Estimate months to cash-out and a run-out date.",
    href: "/business/cash-runway-calculator",
    category: "Business",
    iconPath:
      "M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10z",
  },
  {
    title: "Fix & Flip Calculator",
    description: "Estimate profit, ROI & holding costs for a property flip.",
    href: "/property/fix-and-flip-calculator",
    category: "Property",
    iconPath: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  },
];

export default function HomePage() {
  return (
    <main className="bg-slate-50 min-h-screen text-slate-800">
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        <header className="py-6 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900">
            manytools<span className="text-indigo-600">.co.za</span>
          </h1>
        </header>

        <section className="text-center py-16 sm:py-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Instant, Free & Secure Tools
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            A growing portfolio of simple, privacy-first calculators and
            generators designed for South Africa. No logins, no tracking, just
            answers.
          </p>
        </section>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <a
                key={tool.title}
                href={tool.href}
                className="block p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-lg hover:border-indigo-500 transition-all duration-200 group"
              >
                <Icon path={tool.iconPath} />
                <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {tool.category}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-indigo-600">
                  {tool.title}
                </h3>
                <p className="mt-1 text-slate-600 text-sm">
                  {tool.description}
                </p>
              </a>
            ))}
            <div className="p-6 bg-slate-100 border border-dashed border-slate-300 rounded-xl flex flex-col justify-center items-center text-center">
              <Icon path="M12 6v6l4 2" />
              <h3 className="mt-4 text-lg font-semibold text-slate-600">
                More Tools Coming
              </h3>
              <p className="mt-1 text-slate-500 text-sm">
                Calculators for Tax, Payroll, and Compliance are on the way.
              </p>
            </div>
          </div>
        </section>

        <footer className="text-center py-10 mt-16 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} ManyTools. All rights reserved. Built
            for South Africa.
          </p>
        </footer>
      </div>
    </main>
  );
}
