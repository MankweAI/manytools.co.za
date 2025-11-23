// FILE: app/page.js
import Link from "next/link";
import Image from "next/image";


// Helper component for SVG icons
const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg
    className={className}
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

export default function HomePage() {
  return (
    <main className="bg-slate-50 min-h-screen font-sans">
      {/* 1. HERO SECTION WITH BACKGROUND IMAGE */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/image/hero-bg.png" // Ensure this file exists in your 'public' folder
            alt="South African Property Market"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay: Sits ON TOP of image to darken it for text readability */}
          <div className="absolute inset-0 bg-slate-900/10 z-10"></div>
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-4 py-24 sm:py-32 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold tracking-wider mb-6 border border-emerald-500/30">
            UPDATED FOR 2025/2026 TAX YEAR
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
            Master Your Property Finances
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Instant, accurate calculators for South African buyers, investors,
            and business owners. No login required.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/property/bond-repayment-calculator"
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20"
            >
              Calculate Bond
            </Link>
            <Link
              href="/property/transfer-cost-calculator"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl backdrop-blur-sm transition-all border border-white/10"
            >
              Transfer Costs
            </Link>
          </div>
        </div>
      </section>

      {/* 2. PERSONA GATEWAYS (THE STRATEGIC SHIFT) */}
      <section className="-mt-16 relative z-30 max-w-6xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Persona 1: First Time Buyer */}
          <Link
            href="/property/bond-repayment-calculator/first-time-buyer"
            className="group"
          >
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 hover:border-emerald-500 transition-all h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-100 w-24 h-24 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Icon path="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  First-Time Buyer?
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                  Check affordability, explore FLISP subsidies, and understand
                  100% bonds.
                </p>
                <span className="text-emerald-600 font-semibold text-sm group-hover:underline">
                  Start Here &rarr;
                </span>
              </div>
            </div>
          </Link>

          {/* Persona 2: Property Investor */}
          <Link
            href="/property/bond-repayment-calculator/investor"
            className="group"
          >
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 hover:border-blue-500 transition-all h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-100 w-24 h-24 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Icon path="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Property Investor?
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                  Calculate rental yield, cash flow, and tax-deductible
                  interest.
                </p>
                <span className="text-blue-600 font-semibold text-sm group-hover:underline">
                  Analyze Deal &rarr;
                </span>
              </div>
            </div>
          </Link>

          {/* Persona 3: Business Owner */}
          <Link
            href="/property/bond-repayment-calculator/self-employed"
            className="group"
          >
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 hover:border-amber-500 transition-all h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-amber-100 w-24 h-24 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <Icon path="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Self-Employed?
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                  Navigate complex income verification and deposit requirements.
                </p>
                <span className="text-amber-600 font-semibold text-sm group-hover:underline">
                  Check Requirements &rarr;
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. FULL TOOL DIRECTORY */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">
            All Tools & Calculators
          </h2>
          <p className="text-slate-600 mt-2">
            Everything you need to navigate the South African property market.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Transfer Duty",
              desc: "Calculate SARS tax on property sales.",
              href: "/property/transfer-duty-calculator/2025",
              icon: "M9 14l6-6m-5.5.5h.01",
              color: "text-indigo-600",
              bg: "bg-indigo-50",
            },
            {
              title: "Bond Affordability",
              desc: "How much house can you afford?",
              href: "/property/bond-affordability-calculator",
              icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              title: "Total Acquisition Cost",
              desc: "Cash needed for deposit + fees.",
              href: "/property/total-acquisition-cost-calculator",
              icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
              color: "text-emerald-600",
              bg: "bg-emerald-50",
            },
            {
              title: "Refinance Calculator",
              desc: "Should you switch your bond?",
              href: "/property/bond-repayment-calculator/refinance",
              icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
              color: "text-cyan-600",
              bg: "bg-cyan-50",
            },
            {
              title: "Capital Gains Tax",
              desc: "Estimate tax on property profit.",
              href: "/property/capital-gains-tax-calculator",
              icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
              color: "text-purple-600",
              bg: "bg-purple-50",
            },
            {
              title: "Amortization Table",
              desc: "Download your payment schedule.",
              href: "/property/amortization-schedule-calculator",
              icon: "M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
              color: "text-slate-600",
              bg: "bg-slate-100",
            },
          ].map((tool, idx) => (
            <Link
              key={idx}
              href={tool.href}
              className="flex items-start p-6 bg-white border border-slate-200 rounded-xl hover:shadow-md hover:border-indigo-300 transition-all group"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${tool.bg} ${tool.color} group-hover:scale-110 transition-transform`}
              >
                <Icon path={tool.icon} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{tool.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{tool.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
