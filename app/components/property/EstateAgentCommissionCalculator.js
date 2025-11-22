// FILE: app/components/property/EstateAgentCommissionCalculator.js
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { calculateEstateAgentCommission } from "../../../utils/calculation";

export default function EstateAgentCommissionCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(2000000);
  const [commissionRate, setCommissionRate] = useState(5.0);

  const { commission, vatOnCommission, totalFee } = useMemo(() => {
    if (propertyPrice < 0 || commissionRate < 0) {
      return { commission: 0, vatOnCommission: 0, totalFee: 0 };
    }
    return calculateEstateAgentCommission(propertyPrice, commissionRate / 100);
  }, [propertyPrice, commissionRate]);

  const formatNumber = (num, decimals = 0) => {
    if (isNaN(num) || num === null) return "0";
    return num.toLocaleString("en-ZA", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const onMoneyChange = (setter) => (e) => {
    const rawValue = e.target.value.replace(/,/g, "");
    const numValue = Number(rawValue);
    if (!isNaN(numValue)) setter(numValue);
  };

  const logCalculationEvent = useCallback(async () => {
    try {
      await supabase.from("estate_agent_commission_calculator_events").insert([
        {
          event_name: "result_generated",
          property_price: propertyPrice,
          commission_rate: commissionRate,
        },
      ]);
    } catch (error) {
      console.error("Supabase logging error:", error);
    }
  }, [propertyPrice, commissionRate]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (propertyPrice >= 0) logCalculationEvent();
    }, 1500);
    return () => clearTimeout(debounceTimer);
  }, [propertyPrice, commissionRate, logCalculationEvent]);

  const commissionPct = totalFee > 0 ? (commission / totalFee) * 100 : 0;
  const vatPct = totalFee > 0 ? (vatOnCommission / totalFee) * 100 : 0;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-stone-200 space-y-8">
      {/* Section 1: Inputs */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <label
            htmlFor="propertyPrice"
            className="block text-base font-medium text-stone-700 mb-2"
          >
            Property Selling Price
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-500">
              R
            </span>
            <input
              type="text"
              id="propertyPrice"
              value={formatNumber(propertyPrice)}
              onChange={onMoneyChange(setPropertyPrice)}
              className="w-full pl-7 pr-4 py-2 border border-stone-300 rounded-lg text-lg font-semibold"
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="commissionRate"
              className="text-base font-medium text-stone-700"
            >
              Commission Rate
            </label>
            <span className="text-lg font-semibold text-rose-600">
              {commissionRate.toFixed(1)}%
            </span>
          </div>
          <input
            type="range"
            id="commissionRate"
            min="1"
            max="10"
            step="0.1"
            value={commissionRate}
            onChange={(e) => setCommissionRate(parseFloat(e.target.value))}
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
          />
        </div>
      </div>

      {/* Section 2: Results */}
      <div className="bg-rose-50 p-6 rounded-2xl border border-rose-200 text-center">
        <p className="text-sm font-medium text-rose-700">
          TOTAL COMMISSION PAYABLE (INCL. VAT)
        </p>
        <p className="font-mono text-5xl font-extrabold text-rose-900 my-2 tracking-tight">
          R {formatNumber(totalFee)}
        </p>

        <div className="max-w-md mx-auto mt-6">
          <div className="w-full bg-rose-200 rounded-full h-4 flex overflow-hidden">
            <div
              className="bg-rose-500 h-4"
              style={{ width: `${commissionPct}%` }}
            ></div>
            <div
              className="bg-rose-300 h-4"
              style={{ width: `${vatPct}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs mt-2 px-1">
            <div className="text-left">
              <p className="flex items-center text-rose-800">
                <span className="w-2 h-2 rounded-full bg-rose-500 mr-1.5"></span>
                Commission
              </p>
              <p className="font-mono font-semibold">
                R {formatNumber(commission)}
              </p>
            </div>
            <div className="text-right">
              <p className="flex items-center text-rose-800">
                <span className="w-2 h-2 rounded-full bg-rose-300 mr-1.5"></span>
                VAT (15%)
              </p>
              <p className="font-mono font-semibold">
                R {formatNumber(vatOnCommission)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
