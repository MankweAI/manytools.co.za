// FILE: app/components/property/TransferCostCalculator.js
"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../utils/supabaseClient";
import {
  calculateTransferDuty,
  calculateOnceOffCosts,
} from "../../../utils/calculation";
import { useCalculatorParams } from "../../../hooks/useCalculatorParams";

// Deterministic formatter
const formatNumber = (n, d = 0) => {
  if (n === null || n === undefined || Number.isNaN(n)) return "0";
  const neg = n < 0 ? "-" : "";
  const abs = Math.abs(Number(n));
  const fixed = abs.toFixed(d);
  const [i, dec] = fixed.split(".");
  const withThousands = i.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return d ? `${neg}${withThousands}.${dec}` : `${neg}${withThousands}`;
};

export default function TransferCostCalculator({ defaults }) {
  // 1. Hybrid State Management (URL + Server Defaults)
  const [purchasePrice, setPurchasePrice] = useCalculatorParams(
    "price",
    defaults?.price || 1850000
  );
  const [loanAmount, setLoanAmount] = useCalculatorParams(
    "loan",
    defaults?.loanAmount ?? 1665000 // Default 90% if not specified
  );

  // Local display state for formatted inputs
  const [displayPrice, setDisplayPrice] = useState(formatNumber(purchasePrice));
  const [displayLoan, setDisplayLoan] = useState(formatNumber(loanAmount));

  // Sync display with hook updates (e.g. URL changes)
  useEffect(() => {
    setDisplayPrice(formatNumber(purchasePrice));
  }, [purchasePrice]);

  useEffect(() => {
    setDisplayLoan(formatNumber(loanAmount));
  }, [loanAmount]);

  const [showBondCosts, setShowBondCosts] = useState(true);
  const [result, setResult] = useState(null);

  const onMoney = (setDisp, setVal) => (e) => {
    const raw = e.target.value.replace(/,/g, "");
    setDisp(raw.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    const num = Number(raw);
    if (!Number.isNaN(num)) setVal(num);
  };

  const recalc = useCallback(() => {
    if ((purchasePrice || 0) <= 0) {
      setResult(null);
      return;
    }
    const full = calculateOnceOffCosts(
      Math.max(0, purchasePrice),
      Math.max(0, loanAmount)
    );

    const deedsAndSundries = Math.max(
      0,
      full.totalOnceOffCosts -
        (full.transferDuty + full.conveyancingFees + full.bondRegistrationFees)
    );

    const transferCostsOnly =
      full.transferDuty + full.conveyancingFees + deedsAndSundries;
    const totalWithBondCosts = transferCostsOnly + full.bondRegistrationFees;

    setResult({
      transferDuty: full.transferDuty,
      transferAttorneyFees: full.conveyancingFees,
      bondRegFees: full.bondRegistrationFees,
      deedsAndSundries,
      transferCostsOnly,
      totalWithBondCosts,
    });
  }, [purchasePrice, loanAmount]);

  const logEvent = useCallback(async () => {
    try {
      await supabase.from("transfer_cost_calculator_events").insert([
        {
          event_name: "result_generated",
          purchase_price: purchasePrice,
          loan_amount: loanAmount,
          include_bond_costs: showBondCosts,
        },
      ]);
    } catch (e) {
      console.error("Supabase logging error:", e);
    }
  }, [purchasePrice, loanAmount, showBondCosts]);

  useEffect(() => {
    recalc();
  }, [recalc]);

  useEffect(() => {
    const t = setTimeout(() => logEvent(), 1200);
    return () => clearTimeout(t);
  }, [purchasePrice, loanAmount, showBondCosts, logEvent]);

  const deposit = Math.max(0, purchasePrice - loanAmount);
  const depositPct = purchasePrice > 0 ? (deposit / purchasePrice) * 100 : 0;
  const quickDuty = calculateTransferDuty(Math.max(0, purchasePrice));

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
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
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
              value={displayLoan}
              onChange={onMoney(setDisplayLoan, setLoanAmount)}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
          {/* Dynamic Feedback for Foreign Buyers */}
          <p
            className={`mt-1 text-xs ${
              depositPct < 50 && defaults?.isForeignBuyer
                ? "text-red-600 font-bold"
                : "text-slate-500"
            }`}
          >
            Deposit: R {formatNumber(deposit)} ({formatNumber(depositPct, 1)}%)
            {depositPct < 50 &&
              defaults?.isForeignBuyer &&
              " (Warning: Non-residents typically require 50%)"}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            id="showBondCosts"
            type="checkbox"
            checked={showBondCosts}
            onChange={(e) => setShowBondCosts(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="showBondCosts" className="text-sm text-slate-700">
            Include Bond Registration Costs
          </label>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border">
          <div className="flex justify-between">
            <span className="text-sm text-slate-600">
              Quick Check: Transfer Duty
            </span>
            <span className="text-lg font-bold text-slate-900">
              R {formatNumber(quickDuty)}
            </span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="text-center bg-indigo-50 p-6 rounded-2xl border border-indigo-200">
          {result ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-indigo-700">
                  ESTIMATED TRANSFER COSTS
                </p>
                <p className="text-3xl md:text-4xl font-extrabold text-indigo-900 my-2 tracking-tight">
                  R{" "}
                  {formatNumber(
                    showBondCosts
                      ? result.totalWithBondCosts
                      : result.transferCostsOnly
                  )}
                </p>
                <p className="text-xs text-indigo-700">
                  {showBondCosts
                    ? "Includes bond registration"
                    : "Excludes bond registration"}
                </p>
              </div>

              <div className="text-sm space-y-1 text-left">
                <div className="flex justify-between">
                  <span>Transfer Duty (SARS)</span>
                  <span>R {formatNumber(result.transferDuty)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Transfer Attorney Fees (Est.)</span>
                  <span>R {formatNumber(result.transferAttorneyFees)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Deeds Office & Sundries (Est.)</span>
                  <span>R {formatNumber(result.deedsAndSundries)}</span>
                </div>
                {showBondCosts && (
                  <div className="flex justify-between">
                    <span>Bond Registration Fees (Est.)</span>
                    <span>R {formatNumber(result.bondRegFees)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t font-bold">
                  <span>
                    Total{" "}
                    {showBondCosts ? "With Bond Costs" : "Transfer Costs Only"}
                  </span>
                  <span>
                    R{" "}
                    {formatNumber(
                      showBondCosts
                        ? result.totalWithBondCosts
                        : result.transferCostsOnly
                    )}
                  </span>
                </div>
              </div>

              <p className="text-xs text-indigo-700 mt-3">
                Guideline estimates. Request a formal quote from your
                conveyancer and bond attorney.
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
