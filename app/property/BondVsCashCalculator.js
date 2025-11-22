"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { calculateBondVsCashComparison } from "../../../utils/propertyComparison";

export default function BondVsCashCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(1800000);
  const [displayPrice, setDisplayPrice] = useState("1,800,000");

  const [depositAmount, setDepositAmount] = useState(180000);
  const [displayDeposit, setDisplayDeposit] = useState("180,000");

  const [interestRate, setInterestRate] = useState(11.75);
  const [loanTerm, setLoanTerm] = useState(20);

  const [opportunityRate, setOpportunityRate] = useState(8.0);
  const [includeOnceOffInLoan, setIncludeOnceOffInLoan] = useState(false);

  const [result, setResult] = useState(null);

  const fmt = (n, d = 0) =>
    isNaN(n) || n === null
      ? "0"
      : n.toLocaleString("en-ZA", {
          minimumFractionDigits: d,
          maximumFractionDigits: d,
        });

  const handleCalculate = useCallback(() => {
    if (purchasePrice <= 0 || interestRate <= 0 || loanTerm <= 0) {
      setResult(null);
      return;
    }
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

  const logEvent = useCallback(async () => {
    try {
      await supabase.from("bond_vs_cash_calculator_events").insert([
        {
          event_name: "result_generated",
          purchase_price: purchasePrice,
          deposit_amount: depositAmount,
          interest_rate: interestRate,
          loan_term_years: loanTerm,
          opportunity_rate: opportunityRate,
          include_onceoff_in_loan: includeOnceOffInLoan,
        },
      ]);
    } catch (e) {
      console.error("Supabase logging error:", e);
    }
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

  useEffect(() => {
    const t = setTimeout(() => {
      if (purchasePrice > 0) logEvent();
    }, 1200);
    return () => clearTimeout(t);
  }, [
    purchasePrice,
    depositAmount,
    interestRate,
    loanTerm,
    opportunityRate,
    includeOnceOffInLoan,
    logEvent,
  ]);

  const onMoney = (setDisp, setVal) => (e) => {
    const raw = e.target.value.replace(/,/g, "");
    setDisp(raw.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    const num = Number(raw);
    if (!isNaN(num)) setVal(num);
  };

  const depositPct =
    purchasePrice > 0
      ? Math.round(
          (Math.min(depositAmount, purchasePrice) / purchasePrice) * 1000
        ) / 10
      : 0;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 grid lg:grid-cols-2 gap-8 items-start">
      {/* Inputs */}
      <div className="space-y-6">
        <div>
          <label
            htmlFor="purchasePrice"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Property Purchase Price
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
              R
            </span>
            <input
              id="purchasePrice"
              type="text"
              value={displayPrice}
              onChange={onMoney(setDisplayPrice, setPurchasePrice)}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="depositAmount"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Deposit Amount
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
              R
            </span>
            <input
              id="depositAmount"
              type="text"
              value={displayDeposit}
              onChange={onMoney(setDisplayDeposit, setDepositAmount)}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Deposit: {fmt(depositPct, 1)}%
          </p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="interestRate"
              className="text-base font-medium text-slate-700"
            >
              Bond Interest Rate
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
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="opportunityRate"
              className="text-base font-medium text-slate-700"
            >
              Opportunity Cost Rate
            </label>
            <span className="text-lg font-semibold text-indigo-600">
              {opportunityRate > 0 ? opportunityRate.toFixed(1) : "0.0"}%
            </span>
          </div>
          <input
            id="opportunityRate"
            type="range"
            min="0"
            max="15"
            step="0.5"
            value={opportunityRate}
            onChange={(e) => setOpportunityRate(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <p className="mt-1 text-xs text-slate-500">
            Estimated annual return you could earn on cash.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            id="includeOnceOff"
            type="checkbox"
            checked={includeOnceOffInLoan}
            onChange={(e) => setIncludeOnceOffInLoan(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="includeOnceOff" className="text-sm text-slate-700">
            Add once-off costs to the bond?
          </label>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="text-center bg-indigo-50 p-6 rounded-2xl border border-indigo-200">
          {result ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-indigo-700">
                  RESULT: WHICH IS CHEAPER?
                </p>
                <p className="text-3xl md:text-4xl font-extrabold text-indigo-900 my-2 tracking-tight">
                  {result.cheaper === "equal"
                    ? "About the same"
                    : result.cheaper === "bond"
                    ? "Bond Financing"
                    : "Cash Purchase"}
                </p>
                <p className="text-sm text-indigo-700">
                  Difference: R {fmt(Math.abs(result.difference), 0)}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-sm text-left">
                <div className="bg-white rounded-xl border p-4">
                  <p className="font-semibold text-slate-800 mb-2">Bond Path</p>
                  <div className="flex justify-between">
                    <span>Loan Amount</span>
                    <span>R {fmt(result.loanAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Once-off Costs</span>
                    <span>R {fmt(result.onceOffCosts)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Repayment</span>
                    <span>R {fmt(result.bondMonthly, 2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Bond Paid</span>
                    <span>R {fmt(result.bondTotalPaid)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Opp. Cost (Deposit/Upfront)</span>
                    <span>R {fmt(result.bondOppCost)}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t pt-2">
                    <span>Effective Cost</span>
                    <span>R {fmt(result.bondEffectiveCost)}</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl border p-4">
                  <p className="font-semibold text-slate-800 mb-2">Cash Path</p>
                  <div className="flex justify-between">
                    <span>Outlay Now</span>
                    <span>R {fmt(result.cashOutlayNow)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Opp. Cost (Foregone Returns)</span>
                    <span>R {fmt(result.cashOppCost)}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t pt-2">
                    <span>Effective Cost</span>
                    <span>R {fmt(result.cashEffectiveCost)}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                Opportunity cost is an estimate of returns you could earn on
                cash at the selected rate over the loan term.
              </p>
            </div>
          ) : (
            <p className="text-slate-500 h-24 flex items-center justify-center">
              Enter valid inputs.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

