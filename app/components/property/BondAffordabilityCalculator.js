// FILE: app/components/property/BondAffordabilityCalculator.js
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "../../../utils/supabaseClient";
import {
  calculateMaxAffordableLoan,
  calculateMonthlyRepayment,
} from "../../../utils/calculation";

export default function BondAffordabilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(20000);
  const [interestRate, setInterestRate] = useState(11.75);
  const [loanTerm, setLoanTerm] = useState(20);

  const [maxLoan, setMaxLoan] = useState(0);
  const [monthlyRepayment, setMonthlyRepayment] = useState(0);

  const formatNumber = (num, decimals = 0) => {
    if (isNaN(num) || num === null) return "0";
    return num.toLocaleString("en-ZA", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const handleCalculate = useCallback(() => {
    const loan = calculateMaxAffordableLoan(
      monthlyIncome,
      monthlyExpenses,
      interestRate,
      loanTerm
    );
    const repayment = calculateMonthlyRepayment(loan, interestRate, loanTerm);
    setMaxLoan(loan);
    setMonthlyRepayment(repayment);
  }, [monthlyIncome, monthlyExpenses, interestRate, loanTerm]);

  useEffect(() => {
    handleCalculate();
  }, [handleCalculate]);

  const onMoneyChange = (setter) => (e) => {
    const rawValue = e.target.value.replace(/,/g, "");
    const numValue = Number(rawValue);
    if (!isNaN(numValue)) setter(numValue);
  };

  const surplus = useMemo(
    () => Math.max(0, monthlyIncome - monthlyExpenses),
    [monthlyIncome, monthlyExpenses]
  );
  const expensePercentage =
    monthlyIncome > 0 ? (monthlyExpenses / monthlyIncome) * 100 : 0;

  const logCalculationEvent = useCallback(async () => {
    try {
      await supabase.from("bond_affordability_calculator_events").insert([
        {
          event_name: "result_generated",
          monthly_income: monthlyIncome,
          monthly_expenses: monthlyExpenses,
          interest_rate: interestRate,
          loan_term_years: loanTerm,
        },
      ]);
    } catch (error) {
      console.error("Supabase logging error:", error);
    }
  }, [monthlyIncome, monthlyExpenses, interestRate, loanTerm]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (monthlyIncome > 0) logCalculationEvent();
    }, 1500);
    return () => clearTimeout(t);
  }, [
    monthlyIncome,
    monthlyExpenses,
    interestRate,
    loanTerm,
    logCalculationEvent,
  ]);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-stone-200 space-y-8">
      {/* Section 1: Income & Expenses */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="monthlyIncome"
              className="block text-base font-medium text-stone-700 mb-2"
            >
              Your Total Monthly Income
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-500">
                R
              </span>
              <input
                type="text"
                id="monthlyIncome"
                value={formatNumber(monthlyIncome)}
                onChange={onMoneyChange(setMonthlyIncome)}
                className="w-full pl-7 pr-4 py-2 border border-stone-300 rounded-lg text-lg font-semibold"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="monthlyExpenses"
              className="block text-base font-medium text-stone-700 mb-2"
            >
              Your Total Monthly Expenses
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-500">
                R
              </span>
              <input
                type="text"
                id="monthlyExpenses"
                value={formatNumber(monthlyExpenses)}
                onChange={onMoneyChange(setMonthlyExpenses)}
                className="w-full pl-7 pr-4 py-2 border border-stone-300 rounded-lg text-lg font-semibold"
              />
            </div>
          </div>
        </div>
        <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
          <h3 className="text-sm font-semibold text-stone-700 mb-2">
            Monthly Surplus Breakdown
          </h3>
          <div className="relative w-full bg-stone-200 rounded-full h-8 overflow-hidden">
            <div
              className="absolute top-0 left-0 h-8 bg-violet-300"
              style={{ width: `100%` }}
            ></div>
            <div
              className="absolute top-0 left-0 h-8 bg-stone-400"
              style={{ width: `${expensePercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs mt-2">
            <span className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-stone-400 mr-1.5"></span>
              Expenses
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-violet-300 mr-1.5"></span>
              Available for Bond
            </span>
          </div>
          <p className="text-center text-lg font-bold text-violet-800 mt-3">
            R {formatNumber(surplus)}
          </p>
        </div>
      </div>

      {/* Section 2: Loan Parameters */}
      <div className="grid md:grid-cols-2 gap-8 border-t border-stone-200 pt-8">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="interestRate"
              className="text-base font-medium text-stone-700"
            >
              Interest Rate
            </label>
            <span className="text-lg font-semibold text-violet-600">
              {interestRate.toFixed(2)}%
            </span>
          </div>
          <input
            type="range"
            id="interestRate"
            min="8"
            max="16"
            step="0.25"
            value={interestRate}
            onChange={(e) => setInterestRate(parseFloat(e.target.value))}
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="loanTerm"
              className="text-base font-medium text-stone-700"
            >
              Loan Term
            </label>
            <span className="text-lg font-semibold text-violet-600">
              {loanTerm} Years
            </span>
          </div>
          <input
            type="range"
            id="loanTerm"
            min="5"
            max="30"
            step="1"
            value={loanTerm}
            onChange={(e) => setLoanTerm(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
          />
        </div>
      </div>

      {/* Section 3: Final Results */}
      <div className="text-center bg-violet-50 p-6 rounded-2xl border border-violet-200">
        <div>
          <p className="text-sm font-medium text-violet-700">
            MAXIMUM AFFORDABLE LOAN
          </p>
          <p className="font-mono text-5xl md:text-6xl font-extrabold text-violet-900 my-2 tracking-tight">
            R {formatNumber(maxLoan)}
          </p>
          <p className="text-sm font-medium text-violet-700 mt-4">
            ESTIMATED MONTHLY REPAYMENT
          </p>
          <p className="font-mono text-2xl font-bold text-violet-800">
            R {formatNumber(monthlyRepayment, 2)}
          </p>
        </div>
      </div>
    </div>
  );
}
