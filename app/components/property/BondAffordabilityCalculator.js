// FILE: app/components/property/BondAffordabilityCalculator.js
"use client";

import { useState, useEffect, useCallback, useMemo, Suspense } from "react";
import { supabase } from "../../../utils/supabaseClient";
import {
  calculateMaxAffordableLoan,
  calculateMonthlyRepayment,
} from "../../../utils/calculation";
import { useCalculatorParams } from "../../../hooks/useCalculatorParams";

function CalculatorContent({ defaults }) {
  // 1. Configuration State
  const [isJoint, setIsJoint] = useState(defaults?.isJoint || false);

  // 2. Hybrid State Management
  // Primary Applicant
  const [income1, setIncome1] = useCalculatorParams("inc1", 35000);
  const [expenses1, setExpenses1] = useCalculatorParams("exp1", 12000);

  // Secondary Applicant (only active if isJoint)
  const [income2, setIncome2] = useCalculatorParams("inc2", 0);
  const [expenses2, setExpenses2] = useCalculatorParams("exp2", 0);

  const [interestRate, setInterestRate] = useCalculatorParams(
    "rate",
    defaults?.interestRate || 11.75
  );
  const [loanTerm, setLoanTerm] = useCalculatorParams("term", 20);

  const [maxLoan, setMaxLoan] = useState(0);
  const [monthlyRepayment, setMonthlyRepayment] = useState(0);

  const formatNumber = (num) => {
    if (isNaN(num) || num === null) return "0";
    return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // Totals Calculation
  const totalIncome = useMemo(
    () => Math.max(0, income1) + (isJoint ? Math.max(0, income2) : 0),
    [income1, income2, isJoint]
  );

  const totalExpenses = useMemo(
    () => Math.max(0, expenses1) + (isJoint ? Math.max(0, expenses2) : 0),
    [expenses1, expenses2, isJoint]
  );

  const handleCalculate = useCallback(() => {
    const loan = calculateMaxAffordableLoan(
      totalIncome,
      totalExpenses,
      interestRate,
      loanTerm
    );
    const repayment = calculateMonthlyRepayment(loan, interestRate, loanTerm);
    setMaxLoan(loan);
    setMonthlyRepayment(repayment);
  }, [totalIncome, totalExpenses, interestRate, loanTerm]);

  useEffect(() => {
    handleCalculate();
  }, [handleCalculate]);

  const onMoneyChange = (setter) => (e) => {
    const rawValue = e.target.value.replace(/,/g, "");
    const numValue = Number(rawValue);
    if (!isNaN(numValue)) setter(numValue);
  };

  const surplus = Math.max(0, totalIncome - totalExpenses);
  const expensePercentage =
    totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0;

  const logCalculationEvent = useCallback(async () => {
    try {
      await supabase.from("bond_affordability_calculator_events").insert([
        {
          event_name: "result_generated",
          total_income: totalIncome,
          total_expenses: totalExpenses,
          is_joint: isJoint,
          max_loan: maxLoan,
        },
      ]);
    } catch (error) {
      console.error("Supabase logging error:", error);
    }
  }, [totalIncome, totalExpenses, isJoint, maxLoan]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (totalIncome > 0) logCalculationEvent();
    }, 1500);
    return () => clearTimeout(t);
  }, [totalIncome, totalExpenses, logCalculationEvent]);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-stone-200 space-y-8">
      {/* Mode Toggle */}
      <div className="flex justify-center pb-4 border-b border-stone-100">
        <div className="inline-flex bg-stone-100 p-1 rounded-lg">
          <button
            onClick={() => setIsJoint(false)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${!isJoint
              ? "bg-white text-stone-800 shadow-sm"
              : "text-stone-500 hover:text-stone-700"
              }`}
          >
            Single Applicant
          </button>
          <button
            onClick={() => setIsJoint(true)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${isJoint
              ? "bg-white text-stone-800 shadow-sm"
              : "text-stone-500 hover:text-stone-700"
              }`}
          >
            Joint Application
          </button>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          {/* Applicant 1 */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
            <h3 className="text-sm font-bold text-stone-800 mb-3">
              {isJoint ? "Applicant 1" : "Your Finances"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Gross Monthly Income
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                    R
                  </span>
                  <input
                    type="text"
                    value={formatNumber(income1)}
                    onChange={onMoneyChange(setIncome1)}
                    className="w-full pl-7 pr-4 py-2 border border-stone-300 rounded-lg text-sm font-semibold focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Monthly Expenses
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                    R
                  </span>
                  <input
                    type="text"
                    value={formatNumber(expenses1)}
                    onChange={onMoneyChange(setExpenses1)}
                    className="w-full pl-7 pr-4 py-2 border border-stone-300 rounded-lg text-sm font-semibold focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Applicant 2 (Conditional) */}
          {isJoint && (
            <div className="bg-violet-50 p-4 rounded-xl border border-violet-100">
              <h3 className="text-sm font-bold text-violet-900 mb-3">
                Applicant 2
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-violet-700 mb-1">
                    Gross Monthly Income
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-violet-400">
                      R
                    </span>
                    <input
                      type="text"
                      value={formatNumber(income2)}
                      onChange={onMoneyChange(setIncome2)}
                      className="w-full pl-7 pr-4 py-2 border border-violet-200 rounded-lg text-sm font-semibold focus:ring-violet-500 focus:border-violet-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-violet-700 mb-1">
                    Monthly Expenses
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-violet-400">
                      R
                    </span>
                    <input
                      type="text"
                      value={formatNumber(expenses2)}
                      onChange={onMoneyChange(setExpenses2)}
                      className="w-full pl-7 pr-4 py-2 border border-violet-200 rounded-lg text-sm font-semibold focus:ring-violet-500 focus:border-violet-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Results & Params */}
        <div className="space-y-6">
          <div className="text-center bg-stone-900 text-white p-6 rounded-2xl shadow-md">
            <p className="text-xs font-medium text-stone-400 uppercase tracking-wider">
              Max Affordable Loan
            </p>
            <p className="font-mono text-4xl md:text-5xl font-extrabold text-white my-3 tracking-tight">
              R {formatNumber(maxLoan)}
            </p>
            <p className="text-sm text-stone-400">
              Est. Repayment:{" "}
              <span className="text-white font-bold">
                R {formatNumber(monthlyRepayment)}
              </span>{" "}
              /pm
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200">
            <h3 className="text-sm font-semibold text-stone-700 mb-3">
              Household Summary
            </h3>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-stone-600">Total Income</span>
              <span className="font-semibold">
                R {formatNumber(totalIncome)}
              </span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-stone-600">Total Expenses</span>
              <span className="font-semibold">
                R {formatNumber(totalExpenses)}
              </span>
            </div>
            <div className="relative w-full bg-stone-200 rounded-full h-2 mt-3 overflow-hidden">
              <div
                className="absolute top-0 left-0 h-2 bg-violet-500 transition-all duration-500"
                style={{ width: `${Math.min(100, expensePercentage)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-1 text-stone-500">
              <span>Expenses: {expensePercentage.toFixed(0)}%</span>
              <span>Surplus: R {formatNumber(surplus)}</span>
            </div>
          </div>

          <div className="border-t border-stone-200 pt-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-stone-700">
                Interest Rate
              </label>
              <span className="text-sm font-bold text-violet-600">
                {interestRate}%
              </span>
            </div>
            <input
              type="range"
              min="8"
              max="16"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BondAffordabilityCalculator(props) {
  return (
    <Suspense
      fallback={<div className="p-8 text-center">Loading Calculator...</div>}
    >
      <CalculatorContent {...props} />
    </Suspense>
  );
}
