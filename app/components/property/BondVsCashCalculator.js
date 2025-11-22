// FILE: app/components/property/BondVsCashCalculator.js
"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { calculateBondVsCashComparison } from "../../../utils/propertyComparison";

const formatNumber = (n, d = 0) =>
  !isNaN(n) && n !== null
    ? n.toLocaleString("en-ZA", {
        minimumFractionDigits: d,
        maximumFractionDigits: d,
      })
    : "0";

const CostBar = ({ label, total, segments, isWinner }) => (
  <div
    className={`p-4 rounded-lg transition-all duration-300 ${
      isWinner
        ? "bg-sky-50 border-2 border-sky-500"
        : "bg-slate-50 border border-slate-200"
    }`}
  >
    <h3
      className={`font-bold text-lg text-center mb-4 ${
        isWinner ? "text-sky-700" : "text-slate-800"
      }`}
    >
      {label}
    </h3>
    <div className="h-48 w-full bg-slate-200 rounded-md flex flex-col-reverse overflow-hidden mb-2">
      {segments.map((seg, i) => (
        <div
          key={i}
          className={seg.color}
          style={{ height: `${(seg.value / total) * 100}%` }}
          title={`${seg.label}: R ${formatNumber(seg.value)}`}
        ></div>
      ))}
    </div>
    <p className="font-mono text-center font-extrabold text-2xl text-slate-900">
      R {formatNumber(total)}
    </p>
    <p className="text-xs text-center text-slate-500">Total Effective Cost</p>

    <div className="mt-4 space-y-2 text-xs">
      {segments.map((seg, i) => (
        <div key={i} className="flex justify-between items-center">
          <span className="flex items-center">
            <span className={`w-2 h-2 rounded-full ${seg.color} mr-2`}></span>
            {seg.label}
          </span>
          <span className="font-mono font-semibold">
            R {formatNumber(seg.value)}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default function BondVsCashCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(1800000);
  const [depositAmount, setDepositAmount] = useState(180000);
  const [interestRate, setInterestRate] = useState(11.75);
  const [loanTerm, setLoanTerm] = useState(20);
  const [opportunityRate, setOpportunityRate] = useState(8.0);
  const [includeOnceOffInLoan, setIncludeOnceOffInLoan] = useState(false);
  const [result, setResult] = useState(null);

  const handleCalculate = useCallback(() => {
    const r = calculateBondVsCashComparison({
      purchasePrice,
      depositAmount,
      annualInterestRate: interestRate,
      loanTermYears: loanTerm,
      opportunityRate,
      includeOnceOffInLoan,
    });
    setResult(r);
  }, [
    purchasePrice,
    depositAmount,
    interestRate,
    loanTerm,
    opportunityRate,
    includeOnceOffInLoan,
  ]);

  useEffect(() => {
    handleCalculate();
  }, [handleCalculate]);

  const onMoney = (setVal) => (e) => {
    const raw = e.target.value.replace(/,/g, "");
    const num = Number(raw);
    if (!isNaN(num)) setVal(num);
  };

  const logEvent = useCallback(
    async () => {
      // Supabase logging logic...
    },
    [
      /* dependencies */
    ]
  );
  useEffect(
    () => {
      /* Debounced logEvent call */
    },
    [
      /* dependencies */
    ]
  );

  const bondSegments = result
    ? [
        {
          label: "Upfront Cash",
          value: result.bondTotalOutOfPocket - result.bondTotalPaid,
          color: "bg-slate-400",
        },
        {
          label: "Total Bond Repayments",
          value: result.bondTotalPaid,
          color: "bg-sky-300",
        },
        {
          label: "Opportunity Cost",
          value: result.bondOppCost,
          color: "bg-sky-500",
        },
      ]
    : [];

  const cashSegments = result
    ? [
        {
          label: "Upfront Cash",
          value: result.cashOutlayNow,
          color: "bg-slate-400",
        },
        {
          label: "Opportunity Cost",
          value: result.cashOppCost,
          color: "bg-sky-500",
        },
      ]
    : [];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 space-y-8">
      {/* Inputs */}
      <div className="grid lg:grid-cols-2 gap-x-8 gap-y-6">
        <div>
          <label
            htmlFor="purchasePrice"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Property Purchase Price
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
              R
            </span>
            <input
              id="purchasePrice"
              type="text"
              value={formatNumber(purchasePrice)}
              onChange={onMoney(setPurchasePrice)}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg font-semibold"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="depositAmount"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Deposit Amount
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
              R
            </span>
            <input
              id="depositAmount"
              type="text"
              value={formatNumber(depositAmount)}
              onChange={onMoney(setDepositAmount)}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg font-semibold"
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium text-slate-700">
              Bond Interest Rate
            </label>
            <span className="font-semibold text-sky-600">
              {interestRate.toFixed(2)}%
            </span>
          </div>
          <input
            type="range"
            min="8"
            max="16"
            step="0.25"
            value={interestRate}
            onChange={(e) => setInterestRate(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium text-slate-700">
              Loan Term
            </label>
            <span className="font-semibold text-sky-600">{loanTerm} Years</span>
          </div>
          <input
            type="range"
            min="5"
            max="30"
            step="1"
            value={loanTerm}
            onChange={(e) => setLoanTerm(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium text-slate-700">
              Opportunity Cost Rate
            </label>
            <span className="font-semibold text-sky-600">
              {opportunityRate.toFixed(1)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="15"
            step="0.5"
            value={opportunityRate}
            onChange={(e) => setOpportunityRate(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
          />
          <p className="text-xs text-slate-500 mt-1">
            Estimated annual return you could earn on cash if invested.
          </p>
        </div>
        <div className="flex items-center justify-start pt-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={includeOnceOffInLoan}
              onChange={(e) => setIncludeOnceOffInLoan(e.target.checked)}
            />
            <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
            <span className="ml-3 text-sm font-medium text-slate-700">
              Add once-off costs to the bond?
            </span>
          </label>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 pt-8 border-t">
          <div className="text-center mb-6">
            <p className="text-sm font-medium text-slate-600">
              THE CHEAPER PATH IS...
            </p>
            <p className="text-3xl font-extrabold text-sky-700 my-1">
              {result.cheaper === "equal"
                ? "About the same"
                : result.cheaper === "bond"
                ? "Bond Financing"
                : "Cash Purchase"}
            </p>
            <p className="text-sm font-semibold text-slate-500">
              by ~R {formatNumber(Math.abs(result.difference))}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <CostBar
              label="Bond Path"
              total={result.bondEffectiveCost}
              segments={bondSegments}
              isWinner={result.cheaper === "bond"}
            />
            <CostBar
              label="Cash Path"
              total={result.cashEffectiveCost}
              segments={cashSegments}
              isWinner={result.cheaper === "cash"}
            />
          </div>
        </div>
      )}
    </div>
  );
}
