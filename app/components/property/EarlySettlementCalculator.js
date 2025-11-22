// FILE: app/components/property/EarlySettlementCalculator.js
"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../utils/supabaseClient";
import {
  calculateMonthlyRepayment,
  calculateEarlySettlementSavings,
} from "../../../utils/calculation";

export default function EarlySettlementCalculator() {
  const [loanAmount, setLoanAmount] = useState(1500000);
  const [interestRate, setInterestRate] = useState(11.75);
  const [loanTerm, setLoanTerm] = useState(20);
  const [extraMonthly, setExtraMonthly] = useState(1000);
  const [lumpSum, setLumpSum] = useState(0);
  const [lumpSumMonth, setLumpSumMonth] = useState(0);

  const [results, setResults] = useState(null);

  const fmt = (n, d = 0) =>
    isNaN(n) || n === null
      ? "0"
      : n.toLocaleString("en-ZA", {
          minimumFractionDigits: d,
          maximumFractionDigits: d,
        });

  const onMoney = (setter) => (e) => {
    const raw = e.target.value.replace(/,/g, "");
    const num = Number(raw);
    if (!isNaN(num)) setter(num);
  };

  const handleCalculate = useCallback(() => {
    const baselineMonthly = calculateMonthlyRepayment(
      loanAmount,
      interestRate,
      loanTerm
    );
    const savings = calculateEarlySettlementSavings(
      loanAmount,
      interestRate,
      loanTerm,
      extraMonthly,
      lumpSum,
      lumpSumMonth
    );
    setResults({ baselineMonthly, ...savings });
  }, [loanAmount, interestRate, loanTerm, extraMonthly, lumpSum, lumpSumMonth]);

  useEffect(() => {
    handleCalculate();
  }, [handleCalculate]);

  const logEvent = useCallback(async () => {
    try {
      await supabase
        .from("early_settlement_calculator_events")
        .insert([
          {
            event_name: "result_generated",
            loan_amount: loanAmount,
            interest_rate: interestRate,
            loan_term_years: loanTerm,
            extra_monthly: extraMonthly,
            lump_sum: lumpSum,
            lump_sum_month: lumpSumMonth,
          },
        ]);
    } catch (e) {
      console.error("Supabase logging error:", e);
    }
  }, [loanAmount, interestRate, loanTerm, extraMonthly, lumpSum, lumpSumMonth]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (loanAmount > 0) logEvent();
    }, 1500);
    return () => clearTimeout(t);
  }, [
    loanAmount,
    interestRate,
    loanTerm,
    extraMonthly,
    lumpSum,
    lumpSumMonth,
    logEvent,
  ]);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 space-y-8">
      {/* Section 1: Inputs */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Group 1: Your Current Bond */}
        <div className="space-y-6 bg-slate-50 p-6 rounded-lg border">
          <h3 className="font-bold text-lg text-slate-800">
            Your Current Bond
          </h3>
          <div>
            <label
              htmlFor="loanAmount"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Current Loan Balance
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                R
              </span>
              <input
                id="loanAmount"
                type="text"
                value={fmt(loanAmount)}
                onChange={onMoney(setLoanAmount)}
                className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg font-semibold"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label
                htmlFor="interestRate"
                className="text-sm font-medium text-slate-700"
              >
                Interest Rate
              </label>
              <span className="font-semibold text-teal-600">
                {interestRate.toFixed(2)}%
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
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label
                htmlFor="loanTerm"
                className="text-sm font-medium text-slate-700"
              >
                Remaining Term
              </label>
              <span className="font-semibold text-teal-600">
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
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
          </div>
        </div>
        {/* Group 2: Your Extra Payments */}
        <div className="space-y-6 bg-slate-50 p-6 rounded-lg border">
          <h3 className="font-bold text-lg text-slate-800">
            Your Extra Payments
          </h3>
          <div>
            <label
              htmlFor="extraMonthly"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Extra Monthly Repayment
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                R
              </span>
              <input
                id="extraMonthly"
                type="text"
                value={fmt(extraMonthly)}
                onChange={onMoney(setExtraMonthly)}
                className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg font-semibold"
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="lumpSum"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Lump Sum Payment
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                  R
                </span>
                <input
                  id="lumpSum"
                  type="text"
                  value={fmt(lumpSum)}
                  onChange={onMoney(setLumpSum)}
                  className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg font-semibold"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="lumpSumMonth"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Pay in Month #
              </label>
              <input
                id="lumpSumMonth"
                type="number"
                min="0"
                step="1"
                value={lumpSumMonth}
                onChange={(e) =>
                  setLumpSumMonth(
                    Math.max(0, parseInt(e.target.value || "0", 10))
                  )
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg font-semibold"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Results */}
      {results && (
        <div className="bg-teal-50 p-6 rounded-2xl border border-teal-200 pt-8 border-t">
          <div className="grid md:grid-cols-2 gap-8 text-center">
            <div>
              <p className="text-sm font-medium text-teal-800">TIME SAVED</p>
              <p className="font-mono text-5xl font-extrabold text-teal-900 my-1 tracking-tight">
                {results.yearsMonthsSaved.years}
                <span className="text-3xl">y</span>{" "}
                {results.yearsMonthsSaved.months}
                <span className="text-3xl">m</span>
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-teal-800">
                INTEREST SAVED
              </p>
              <p className="font-mono text-5xl font-extrabold text-teal-900 my-1 tracking-tight">
                R {fmt(results.interestSaved)}
              </p>
            </div>
          </div>

          {/* Visual Comparison */}
          <div className="mt-8 space-y-4">
            {/* Baseline Scenario */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold text-slate-700">
                  Original Loan Term
                </span>
                <span className="font-mono">
                  {Math.floor(results.baseline.months / 12)}y{" "}
                  {results.baseline.months % 12}m
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-5 flex overflow-hidden text-xs text-white items-center">
                <div
                  className="bg-slate-400 h-5 flex items-center justify-center"
                  style={{
                    width: `${
                      (loanAmount / results.baseline.totalPaid) * 100
                    }%`,
                  }}
                >
                  Principal
                </div>
                <div
                  className="bg-slate-500 h-5 flex items-center justify-center"
                  style={{
                    width: `${
                      (results.baseline.totalInterest /
                        results.baseline.totalPaid) *
                      100
                    }%`,
                  }}
                >
                  Interest
                </div>
              </div>
            </div>
            {/* Accelerated Scenario */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold text-teal-800">
                  New Loan Term
                </span>
                <span className="font-mono text-teal-800">
                  {Math.floor(results.accelerated.months / 12)}y{" "}
                  {results.accelerated.months % 12}m
                </span>
              </div>
              <div className="w-full bg-teal-200 rounded-full h-5 flex overflow-hidden text-xs text-white items-center">
                <div
                  className="bg-teal-500 h-5 flex items-center justify-center"
                  style={{
                    width: `${
                      (loanAmount / results.accelerated.totalPaid) * 100
                    }%`,
                  }}
                >
                  Principal
                </div>
                <div
                  className="bg-teal-700 h-5 flex items-center justify-center"
                  style={{
                    width: `${
                      (results.accelerated.totalInterest /
                        results.accelerated.totalPaid) *
                      100
                    }%`,
                  }}
                >
                  Interest
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
