// FILE: app/components/DynamicFAQ.js
"use client";

export default function DynamicFAQ({
  purchasePrice,
  loanAmount,
  monthlyRepayment,
  interestRate,
}) {
  const fmt = (n) => "R " + n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const salaryReq = monthlyRepayment * 3.33; // Roughly 30% of gross income

  return (
    <div className="mt-8 border-t border-slate-200 pt-8">
      <h3 className="text-xl font-bold text-slate-900 mb-4">
        Common Questions about this Bond
      </h3>
      <div className="space-y-4">
        <details className="group bg-slate-50 p-4 rounded-lg" open>
          <summary className="flex justify-between items-center font-semibold text-slate-800 cursor-pointer list-none">
            <span> How much is the repayment on {fmt(loanAmount)}?</span>
            <span className="transition group-open:rotate-180">
              <svg
                fill="none"
                height="24"
                shapeRendering="geometricPrecision"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </span>
          </summary>
          <p className="text-slate-600 mt-3 text-sm">
            At the current interest rate of <strong>{interestRate}%</strong>,
            the monthly repayment for a loan of{" "}
            <strong>{fmt(loanAmount)}</strong> is approximately{" "}
            <strong>{fmt(monthlyRepayment)}</strong> over 20 years.
          </p>
        </details>

        <details className="group bg-slate-50 p-4 rounded-lg">
          <summary className="flex justify-between items-center font-semibold text-slate-800 cursor-pointer list-none">
            <span>What salary do I need for a {fmt(purchasePrice)} house?</span>
            <span className="transition group-open:rotate-180">
              <svg
                fill="none"
                height="24"
                shapeRendering="geometricPrecision"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </span>
          </summary>
          <p className="text-slate-600 mt-3 text-sm">
            Banks typically require your bond repayment to be no more than 30%
            of your gross monthly income. For this property, you would generally
            need a gross household income of around{" "}
            <strong>{fmt(salaryReq)}</strong> per month.
          </p>
        </details>
      </div>
    </div>
  );
}

