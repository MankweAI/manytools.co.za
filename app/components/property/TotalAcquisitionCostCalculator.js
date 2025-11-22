// FILE: app/components/property/TotalAcquisitionCostCalculator.js
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { calculateOnceOffCosts } from "../../../utils/calculation";

export default function TotalAcquisitionCostCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(1850000);
  const [depositAmount, setDepositAmount] = useState(185000);

  const [costs, setCosts] = useState(null);

  const formatNumber = (num, decimals = 0) => {
    if (isNaN(num) || num === null) return "0";
    return num.toLocaleString("en-ZA", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const loanAmount = useMemo(
    () => Math.max(0, purchasePrice - depositAmount),
    [purchasePrice, depositAmount]
  );

  const handleCalculate = useCallback(() => {
    const c = calculateOnceOffCosts(purchasePrice, loanAmount);
    setCosts(c);
  }, [purchasePrice, loanAmount]);

  useEffect(() => {
    handleCalculate();
  }, [handleCalculate]);

  const logCalculationEvent = useCallback(async () => {
    try {
      await supabase.from("total_acquisition_cost_calculator_events").insert([
        {
          event_name: "result_generated",
          purchase_price: purchasePrice,
          deposit_amount: depositAmount,
          loan_amount: loanAmount,
        },
      ]);
    } catch (error) {
      console.error("Supabase logging error:", error);
    }
  }, [purchasePrice, depositAmount, loanAmount]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (purchasePrice > 0) logCalculationEvent();
    }, 1500);
    return () => clearTimeout(t);
  }, [purchasePrice, depositAmount, loanAmount, logCalculationEvent]);

  const onMoneyChange = (setter) => (e) => {
    const rawValue = e.target.value.replace(/,/g, "");
    const numValue = Number(rawValue);
    if (!isNaN(numValue)) setter(numValue);
  };

  const cashNeededNow = useMemo(
    () => depositAmount + (costs?.totalOnceOffCosts || 0),
    [depositAmount, costs]
  );

  const costBreakdown = useMemo(() => {
    if (!costs || cashNeededNow === 0) return [];
    return [
      { label: "Deposit", value: depositAmount, color: "bg-cyan-500" },
      {
        label: "Transfer Duty",
        value: costs.transferDuty,
        color: "bg-cyan-400",
      },
      {
        label: "Legal Fees (Est.)",
        value: costs.conveyancingFees + costs.bondRegistrationFees,
        color: "bg-cyan-300",
      },
      {
        label: "Other Costs",
        value:
          costs.totalOnceOffCosts -
          (costs.transferDuty +
            costs.conveyancingFees +
            costs.bondRegistrationFees),
        color: "bg-cyan-200",
      },
    ].filter((item) => item.value > 0);
  }, [costs, depositAmount, cashNeededNow]);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 grid lg:grid-cols-2 gap-8 items-start">
      {/* Left: Inputs */}
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
              type="text"
              id="purchasePrice"
              value={formatNumber(purchasePrice)}
              onChange={onMoneyChange(setPurchasePrice)}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="depositAmount"
            className="text-base font-medium text-slate-700"
          >
            Deposit Amount
          </label>
          <p className="text-sm text-slate-500 mb-2">
            Adjust your down payment to see how it affects the cash you need.
          </p>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
              R
            </span>
            <input
              type="text"
              id="depositAmount"
              value={formatNumber(depositAmount)}
              onChange={onMoneyChange(setDepositAmount)}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
          <input
            type="range"
            min="0"
            max={purchasePrice}
            step={purchasePrice / 100}
            value={depositAmount}
            onChange={(e) => setDepositAmount(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600 mt-3"
          />
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-sm text-slate-600">Resulting Loan Amount</p>
          <p className="font-mono text-2xl font-bold text-slate-900">
            R {formatNumber(loanAmount)}
          </p>
        </div>
      </div>

      {/* Right: Results */}
      <div className="space-y-4">
        <div className="text-center bg-cyan-50 p-6 rounded-2xl border border-cyan-200">
          <p className="text-sm font-medium text-cyan-800">
            TOTAL CASH NEEDED NOW
          </p>
          <p className="font-mono text-5xl font-extrabold text-cyan-900 my-2 tracking-tight">
            R {formatNumber(cashNeededNow)}
          </p>
          <p className="text-sm text-slate-600">
            (Deposit + All Once-off Costs)
          </p>

          <div className="mt-6">
            <h3 className="text-base font-semibold text-cyan-900 mb-3">
              Cash Breakdown
            </h3>
            <div className="w-full bg-cyan-200 rounded-full h-4 flex overflow-hidden">
              {costBreakdown.map((item) => (
                <div
                  key={item.label}
                  className={item.color + " h-4"}
                  style={{ width: `${(item.value / cashNeededNow) * 100}%` }}
                ></div>
              ))}
            </div>
            <div className="space-y-2 mt-4 text-sm">
              {costBreakdown.map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center"
                >
                  <span className="flex items-center">
                    <span
                      className={`w-2 h-2 rounded-full ${item.color} mr-2`}
                    ></span>
                    {item.label}
                  </span>
                  <span className="font-mono font-semibold">
                    R {formatNumber(item.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
