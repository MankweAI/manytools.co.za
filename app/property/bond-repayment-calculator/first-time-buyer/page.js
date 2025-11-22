// FILE: app/property/bond-repayment-calculator/first-time-buyer/page.js
import BondCalculator from "../../../components/property/BondCalculator";
import Link from "next/link";

export const metadata = {
  title: "First-Time Buyer Bond Calculator | FLISP & Subsidies 2025",
  description:
    "Specialized calculator for first-time home buyers in South Africa. Calculate repayments with FLISP subsidies and check affordability.",
};

export default function FirstTimeBuyerPage() {
  return (
    <main className="bg-slate-50 min-h-screen font-sans">
      <div className="max-w-5xl mx-auto p-4 sm:p-8">
        {/* Persona-Specific Header */}
        <header className="mb-10">
          <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
            FIRST TIME BUYER GUIDE
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            First-Time Home Buyer Calculator
          </h1>
          <p className="mt-4 text-lg text-zinc-600 max-w-2xl">
            Buying your first home in South Africa? Use this tool to calculate
            your repayments and see if you qualify for the
            <strong className="text-emerald-600">
              {" "}
              FLISP Government Subsidy
            </strong>
            .
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
                FLISP Subsidy Quick Check
              </h3>
              <p className="text-sm text-zinc-600 mb-4">
                If you earn between <strong>R3,501 and R22,000</strong> per
                month, you may qualify for a government subsidy to reduce your
                bond.
              </p>
              <Link
                href="/property/bond-affordability-calculator"
                className="text-emerald-600 font-semibold text-sm hover:underline"
              >
                Check Affordability &rarr;
              </Link>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-3">Did you know?</h3>
              <p className="text-sm text-blue-800">
                As a first-time buyer, banks often grant{" "}
                <strong>105% bonds</strong> to cover transfer costs. You can
                simulate this by setting your deposit to negative values in some
                scenarios or simply ensuring you have the cash for transfer
                fees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
