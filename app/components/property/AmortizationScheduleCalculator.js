"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { supabase } from "../../../utils/supabaseClient";
import {
  calculateMonthlyRepayment,
  generateAmortizationSchedule,
} from "../../../utils/calculation";

// Deterministic formatter to avoid hydration mismatches
const fmt = (n, d = 0) => {
  if (n === null || n === undefined || Number.isNaN(n)) return "0";
  const neg = n < 0 ? "-" : "";
  const abs = Math.abs(Number(n));
  const fixed = abs.toFixed(d);
  const [i, dec] = fixed.split(".");
  const withThousands = i.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return d ? `${neg}${withThousands}.${dec}` : `${neg}${withThousands}`;
};

export default function AmortizationScheduleCalculator() {
  const [loanAmount, setLoanAmount] = useState(1500000);
  const [dispLoan, setDispLoan] = useState("1,500,000");
  const [interestRate, setInterestRate] = useState(11.75);
  const [loanTerm, setLoanTerm] = useState(20);
  const [extraMonthly, setExtraMonthly] = useState(0);
  const [dispExtra, setDispExtra] = useState("0");

  const [showYearly, setShowYearly] = useState(false);
  const [showTable, setShowTable] = useState(true);

  const baselineMonthly = useMemo(
    () => calculateMonthlyRepayment(loanAmount, interestRate, loanTerm),
    [loanAmount, interestRate, loanTerm]
  );

  const result = useMemo(
    () =>
      generateAmortizationSchedule(
        loanAmount,
        interestRate,
        loanTerm,
        extraMonthly
      ),
    [loanAmount, interestRate, loanTerm, extraMonthly]
  );

  const yearlyRows = useMemo(() => {
    if (!result?.schedule?.length) return [];
    const rows = [];
    let accInterest = 0;
    let accPrincipal = 0;
    let lastBalance = result.schedule[0]?.balance ?? loanAmount;
    for (const row of result.schedule) {
      accInterest += row.interest;
      accPrincipal += row.principal;
      lastBalance = row.balance;
      if (row.month % 12 === 0 || row.balance <= 0) {
        rows.push({
          year: Math.ceil(row.month / 12),
          interest: accInterest,
          principal: accPrincipal,
          balance: lastBalance,
        });
        accInterest = 0;
        accPrincipal = 0;
      }
    }
    return rows;
  }, [result, loanAmount]);

  const onMoney = (setDisplay, setValue) => (e) => {
    const raw = e.target.value.replace(/,/g, "");
    setDisplay(raw.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    const num = Number(raw);
    if (!Number.isNaN(num)) setValue(num);
  };

  const logEvent = useCallback(async () => {
    try {
      await supabase.from("amortization_schedule_calculator_events").insert([
        {
          event_name: "result_generated",
          loan_amount: loanAmount,
          interest_rate: interestRate,
          loan_term_years: loanTerm,
          extra_monthly: extraMonthly,
          rows: result?.schedule?.length || 0,
        },
      ]);
    } catch (e) {
      console.error("Supabase logging error:", e);
    }
  }, [loanAmount, interestRate, loanTerm, extraMonthly, result]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (loanAmount > 0) logEvent();
    }, 1000);
    return () => clearTimeout(t);
  }, [loanAmount, interestRate, loanTerm, extraMonthly, logEvent]);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 grid lg:grid-cols-2 gap-8 items-start">
      {/* Inputs */}
      <div className="space-y-6">
        <div>
          <label
            htmlFor="loanAmount"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Loan Amount
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
              R
            </span>
            <input
              id="loanAmount"
              type="text"
              value={dispLoan}
              onChange={onMoney(setDispLoan, setLoanAmount)}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="interestRate"
              className="text-base font-medium text-slate-700"
            >
              Interest Rate
            </label>
            <span className="text-lg font-semibold text-indigo-600">
              {interestRate > 0 ? interestRate.toFixed(2) : "0.00"}%
            </span>
          </div>
          <input
            id="interestRate"
            type="range"
            min="8"
            max="16"
            step="0.25"
            value={interestRate}
            onChange={(e) => setInterestRate(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="loanTerm"
              className="text-base font-medium text-slate-700"
            >
              Loan Term
            </label>
            <span className="text-lg font-semibold text-indigo-600">
              {loanTerm} Years
            </span>
          </div>
          <input
            id="loanTerm"
            type="range"
            min="5"
            max="30"
            step="1"
            value={loanTerm}
            onChange={(e) => setLoanTerm(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        <div>
          <label
            htmlFor="extraMonthly"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Extra Monthly Repayment (Optional)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
              R
            </span>
            <input
              id="extraMonthly"
              type="text"
              value={dispExtra}
              onChange={onMoney(setDispExtra, setExtraMonthly)}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-200">
          <div className="text-center">
            <p className="text-sm font-medium text-indigo-700">
              BASELINE MONTHLY (NO EXTRA)
            </p>
            <p className="text-3xl md:text-4xl font-extrabold text-indigo-900 my-2">
              R {fmt(baselineMonthly, 2)}
            </p>
            <p className="text-xs text-indigo-700">
              With extra: R {fmt(baselineMonthly + extraMonthly, 2)}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-6 text-sm">
            <div className="bg-white rounded-xl border p-4">
              <p className="font-semibold text-slate-800 mb-2">
                Total Interest
              </p>
              <p className="text-slate-900 font-bold">
                R {fmt(result.totals.interest)}
              </p>
            </div>
            <div className="bg-white rounded-xl border p-4">
              <p className="font-semibold text-slate-800 mb-2">Term</p>
              <p className="text-slate-900 font-bold">
                {Math.floor(result.totals.months / 12)}y{" "}
                {result.totals.months % 12}m
              </p>
            </div>
            <div className="bg-white rounded-xl border p-4">
              <p className="font-semibold text-slate-800 mb-2">Total Paid</p>
              <p className="text-slate-900 font-bold">
                R {fmt(result.totals.paid)}
              </p>
            </div>
            <div className="bg-white rounded-xl border p-4">
              <p className="font-semibold text-slate-800 mb-2">Rows</p>
              <p className="text-slate-900 font-bold">
                {result.schedule.length}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <label className="flex items-center text-sm text-slate-700">
              <input
                type="checkbox"
                checked={showYearly}
                onChange={(e) => setShowYearly(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2">Show Yearly Summary</span>
            </label>
            <label className="flex items-center text-sm text-slate-700">
              <input
                type="checkbox"
                checked={showTable}
                onChange={(e) => setShowTable(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2">Show Table</span>
            </label>
          </div>
        </div>

        {showTable && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto">
            {!showYearly ? (
              <table className="w-full text-sm">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="p-3 text-left">Month</th>
                    <th className="p-3 text-right">Payment</th>
                    <th className="p-3 text-right">Interest</th>
                    <th className="p-3 text-right">Principal</th>
                    <th className="p-3 text-right">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {result.schedule.slice(0, 360).map((row) => (
                    <tr key={row.month}>
                      <td className="p-3">#{row.month}</td>
                      <td className="p-3 text-right">
                        R {fmt(row.payment, 2)}
                      </td>
                      <td className="p-3 text-right">
                        R {fmt(row.interest, 2)}
                      </td>
                      <td className="p-3 text-right">
                        R {fmt(row.principal, 2)}
                      </td>
                      <td className="p-3 text-right">
                        R {fmt(row.balance, 2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="p-3 text-left">Year</th>
                    <th className="p-3 text-right">Interest</th>
                    <th className="p-3 text-right">Principal</th>
                    <th className="p-3 text-right">End Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {yearlyRows.map((y) => (
                    <tr key={y.year}>
                      <td className="p-3">Year {y.year}</td>
                      <td className="p-3 text-right">R {fmt(y.interest, 2)}</td>
                      <td className="p-3 text-right">
                        R {fmt(y.principal, 2)}
                      </td>
                      <td className="p-3 text-right">R {fmt(y.balance, 2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="p-3 text-xs text-slate-500">
              Showing first{" "}
              {showYearly
                ? yearlyRows.length
                : Math.min(360, result.schedule.length)}{" "}
              rows.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

