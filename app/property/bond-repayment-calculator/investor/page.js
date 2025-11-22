// FILE: app/property/bond-repayment-calculator/investor/page.js
import BondCalculator from "../../../components/property/BondCalculator";
import Link from "next/link";

export const metadata = {
  title: "Buy-to-Let Bond Calculator | Investor ROI & Yield 2025",
  description:
    "Calculate bond repayments for investment properties. Analyze cash flow, rental yield requirements, and investor tax deductions in South Africa.",
};

export default function InvestorPage() {
  return (
    <main className="bg-slate-50 min-h-screen font-sans">
      <div className="max-w-5xl mx-auto p-4 sm:p-8">
        {/* Persona-Specific Header */}
        <header className="mb-10">
          <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
            PROPERTY INVESTOR TOOLKIT
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            Buy-to-Let Bond Calculator
          </h1>
          <p className="mt-4 text-lg text-zinc-600 max-w-2xl">
            Analyze your investment property costs. Calculate your monthly
            repayment to determine the
            <strong className="text-blue-600">
              {" "}
              required rental income
            </strong>{" "}
            for positive cash flow.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Calculator Area */}
          <div className="lg:col-span-2">
            <BondCalculator />
          </div>

          {/* Persona-Specific Sidebar Content */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
              <h3 className="font-bold text-zinc-800 mb-3">
                Analyze Rental Yield
              </h3>
              <p className="text-sm text-zinc-600 mb-4">
                Once you have your repayment figure, check if the property makes
                financial sense by calculating the Gross and Net Yield.
              </p>
              <Link
                href="/property/rental-yield-calculator"
                className="text-blue-600 font-semibold text-sm hover:underline"
              >
                Go to Yield Calculator &rarr;
              </Link>
            </div>

            <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
              <h3 className="font-bold text-amber-900 mb-3">Tax Tip</h3>
              <p className="text-sm text-amber-800">
                Interest on your bond is tax-deductible against rental income.
                Use the <strong>"Total Interest"</strong> figure in the
                calculator breakdown to estimate your potential deduction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

