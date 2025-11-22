// FILE: app/components/property/BondCalculator.js
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "../../../utils/supabaseClient";
import {
  calculateMonthlyRepayment,
  calculateOnceOffCosts,
} from "../../../utils/calculation";

const DonutChart = ({ principal, interest }) => {
  const total = principal + interest;
  if (total === 0) return null;

  const principalPct = (principal / total) * 100;
  const interestPct = (interest / total) * 100;
  const strokeDasharray = `${interestPct} ${100 - interestPct}`;

  return (
    <div className="relative w-32 h-32">
      <svg viewBox="0 0 36 36" className="transform -rotate-90">
        <circle
          cx="18"
          cy="18"
          r="15.915"
          className="stroke-current text-emerald-200"
          strokeWidth="3"
          fill="transparent"
        />
        <circle
          cx="18"
          cy="18"
          r="15.915"
          className="stroke-current text-emerald-500"
          strokeWidth="3"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset="0"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-zinc-700 text-xs">Interest</span>
        <span className="font-bold text-xl text-emerald-700">
          {interestPct.toFixed(1)}%
        </span>
      </div>
    </div>
  );
};

export default function BondCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(1650000);
  const [deposit, setDeposit] = useState(165000);
  const [interestRate, setInterestRate] = useState(11.75);
  const [loanTerm, setLoanTerm] = useState(20);

  const loanAmount = useMemo(
    () => Math.max(0, purchasePrice - deposit),
    [purchasePrice, deposit]
  );

  const [monthlyRepayment, setMonthlyRepayment] = useState(0);
  const [totalRepayment, setTotalRepayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [onceOffCosts, setOnceOffCosts] = useState(null);

  const formatNumber = (num, decimals = 0) => {
    if (isNaN(num) || num === null) return "0";
    return num.toLocaleString("en-ZA", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const handleCalculate = useCallback(() => {
    const costs = calculateOnceOffCosts(purchasePrice, loanAmount);
    setOnceOffCosts(costs);

    const monthlyPmt = calculateMonthlyRepayment(
      loanAmount,
      interestRate,
      loanTerm
    );
    const totalPmt = monthlyPmt * loanTerm * 12;
    const totalInt = totalPmt - loanAmount;

    setMonthlyRepayment(monthlyPmt);
    setTotalRepayment(totalPmt);
    setTotalInterest(totalInt > 0 ? totalInt : 0);
  }, [purchasePrice, loanAmount, interestRate, loanTerm]);

  useEffect(() => {
    handleCalculate();
  }, [handleCalculate]);

  const logCalculationEvent = useCallback(async () => {
    try {
      await supabase.from("bond_repayment_calculator_events").insert([
        {
          event_name: "result_generated",
          purchase_price: purchasePrice,
          loan_amount: loanAmount,
          interest_rate: interestRate,
          loan_term_years: loanTerm,
        },
      ]);
    } catch (error) {
      console.error("Supabase logging error:", error);
    }
  }, [purchasePrice, loanAmount, interestRate, loanTerm]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (purchasePrice > 0 && loanAmount > 0) {
        logCalculationEvent();
      }
    }, 1500);
    return () => clearTimeout(debounceTimer);
  }, [purchasePrice, loanAmount, interestRate, loanTerm, logCalculationEvent]);

  const onMoneyChange = (setter) => (e) => {
    const rawValue = e.target.value.replace(/,/g, "");
    const numValue = Number(rawValue);
    if (!isNaN(numValue)) setter(numValue);
  };

  const depositPercentage =
    purchasePrice > 0 ? (deposit / purchasePrice) * 100 : 0;
  const loanPercentage = 100 - depositPercentage;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-zinc-200">
      {/* Main Results */}
      <div className="text-center mb-8">
        <p className="text-base font-medium text-zinc-600">
          Estimated Monthly Repayment
        </p>
        <p className="font-mono text-5xl md:text-6xl font-extrabold text-emerald-600 my-2 tracking-tight">
          R {formatNumber(monthlyRepayment, 2)}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Inputs */}
        <div className="space-y-6">
          <div>
            <label
              htmlFor="purchasePrice"
              className="block text-base font-medium text-zinc-700 mb-2"
            >
              Property Purchase Price
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                R
              </span>
              <input
                type="text"
                id="purchasePrice"
                value={formatNumber(purchasePrice)}
                onChange={onMoneyChange(setPurchasePrice)}
                className="w-full pl-7 pr-4 py-2 border border-zinc-300 rounded-lg text-lg font-semibold"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="deposit"
              className="block text-base font-medium text-zinc-700 mb-2"
            >
              Deposit
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                R
              </span>
              <input
                type="text"
                id="deposit"
                value={formatNumber(deposit)}
                onChange={onMoneyChange(setDeposit)}
                className="w-full pl-7 pr-4 py-2 border border-zinc-300 rounded-lg text-lg font-semibold"
              />
            </div>
          </div>

          <div className="w-full bg-zinc-200 rounded-full h-4 flex overflow-hidden">
            <div
              className="bg-emerald-500 h-4"
              style={{ width: `${depositPercentage}%` }}
            ></div>
            <div
              className="bg-zinc-400 h-4"
              style={{ width: `${loanPercentage}%` }}
            ></div>
          </div>
          <div className="text-sm text-zinc-600 -mt-2">
            <p>
              Loan Amount:{" "}
              <span className="font-bold font-mono">
                R {formatNumber(loanAmount)}
              </span>{" "}
              ({loanPercentage.toFixed(1)}%)
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="interestRate"
                className="text-base font-medium text-zinc-700"
              >
                Interest Rate
              </label>
              <span className="text-lg font-semibold text-emerald-600">
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
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="loanTerm"
                className="text-base font-medium text-zinc-700"
              >
                Loan Term
              </label>
              <span className="text-lg font-semibold text-emerald-600">
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
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>
        </div>

        {/* Right Column: Breakdowns */}
        <div className="space-y-4">
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200">
            <h3 className="font-semibold text-zinc-800 text-center mb-4">
              Total Repayment Breakdown
            </h3>
            <div className="flex items-center justify-center space-x-6">
              <DonutChart principal={loanAmount} interest={totalInterest} />
              <div className="text-sm space-y-2">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-emerald-200 mr-2"></span>
                  <div>
                    <p className="text-zinc-600">Principal</p>
                    <p className="font-bold text-zinc-800">
                      R {formatNumber(loanAmount)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></span>
                  <div>
                    <p className="text-zinc-600">Total Interest</p>
                    <p className="font-bold text-zinc-800">
                      R {formatNumber(totalInterest)}
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-emerald-200 mt-2">
                  <p className="text-zinc-600">Total Paid</p>
                  <p className="font-bold text-emerald-800">
                    R {formatNumber(totalRepayment)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {onceOffCosts && (
            <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200">
              <h3 className="font-semibold text-zinc-800 text-center mb-3">
                Estimated Once-Off Costs
              </h3>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-600">Transfer Duty</span>
                  <span className="font-medium text-zinc-800">
                    R {formatNumber(onceOffCosts.transferDuty)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">Transfer Costs (Est.)</span>
                  <span className="font-medium text-zinc-800">
                    R {formatNumber(onceOffCosts.conveyancingFees)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">Bond Reg. Costs (Est.)</span>
                  <span className="font-medium text-zinc-800">
                    R {formatNumber(onceOffCosts.bondRegistrationFees)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t font-bold">
                  <span className="text-zinc-800">Total Once-Off</span>
                  <span className="text-zinc-900">
                    R {formatNumber(onceOffCosts.totalOnceOffCosts)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
