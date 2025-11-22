// FILE: app/components/NextSteps.js
import Link from "next/link";

export default function NextSteps({ currentTool }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm mt-10">
      <h3 className="text-xl font-bold text-zinc-900 mb-6">
        What would you like to do next?
      </h3>
      <div className="grid sm:grid-cols-3 gap-4">
        <Link
          href="/property/transfer-cost-calculator"
          className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all group"
        >
          <div className="text-emerald-600 mb-2">
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
          </div>
          <div className="font-semibold text-slate-900 group-hover:text-emerald-700">
            Calculate Transfer Costs
          </div>
          <div className="text-xs text-slate-500 mt-1">
            See attorney fees & duty
          </div>
        </Link>

        <Link
          href="/property/bond-affordability-calculator"
          className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
        >
          <div className="text-blue-600 mb-2">
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
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div className="font-semibold text-slate-900 group-hover:text-blue-700">
            Check Affordability
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Based on your salary
          </div>
        </Link>

        <Link
          href="/property/early-settlement-savings-calculator"
          className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-500 hover:bg-amber-50 transition-all group"
        >
          <div className="text-amber-600 mb-2">
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
              <polyline points="13 17 18 12 13 7" />
              <polyline points="6 17 11 12 6 7" />
            </svg>
          </div>
          <div className="font-semibold text-slate-900 group-hover:text-amber-700">
            Pay Off Faster
          </div>
          <div className="text-xs text-slate-500 mt-1">
            See interest savings
          </div>
        </Link>
      </div>
    </div>
  );
}
