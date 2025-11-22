// FILE: app/components/tax/UIFCalculator.js
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { calculateUIFContribution } from "../../../utils/calculation";

export default function UIFCalculator() {
  const [monthlySalary, setMonthlySalary] = useState(25000);

  const formatNumber = (num, decimals = 2) => {
    if (isNaN(num) || num === null) return "0.00";
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

  const contribution = useMemo(
    () => calculateUIFContribution(monthlySalary),
    [monthlySalary]
  );

  const logCalculationEvent = useCallback(async () => {
    try {
      await supabase.from("uif_calculator_events").insert([
        { event_name: "result_generated", annual_salary: monthlySalary * 12 }, // Logged as annual for consistency
      ]);
    } catch (error) {
      console.error("Supabase logging error:", error);
    }
  }, [monthlySalary]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (monthlySalary >= 0) logCalculationEvent();
    }, 1500);
    return () => clearTimeout(debounceTimer);
  }, [monthlySalary, logCalculationEvent]);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-stone-200 space-y-8">
      {/* Input Section */}
      <div>
        <label
          htmlFor="monthlySalary"
          className="block text-base font-medium text-stone-700 mb-2"
        >
          Your Gross Monthly Salary
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-500">
            R
          </span>
          <input
            type="text"
            id="monthlySalary"
            value={formatNumber(monthlySalary, 0)}
            onChange={onMoneyChange(setMonthlySalary)}
            className="w-full pl-7 pr-4 py-2 border border-stone-300 rounded-lg text-lg font-semibold"
          />
        </div>
        <p className="mt-2 text-xs text-stone-500">
          Contributions are capped at 1% of the UIF ceiling (R17,712 p/m for
          2025/26).
        </p>
      </div>

      {/* Results Section */}
      <div className="bg-rose-50 p-6 rounded-2xl border border-rose-200">
        <div className="grid md:grid-cols-3 gap-4 text-center">
          {/* Employee Contribution */}
          <div className="p-4 bg-white rounded-lg border border-stone-200">
            <p className="text-sm font-medium text-stone-600">You Pay (1%)</p>
            <p className="font-mono text-3xl font-bold text-stone-800 my-1">
              R {formatNumber(contribution)}
            </p>
          </div>
          {/* Employer Contribution */}
          <div className="p-4 bg-white rounded-lg border border-stone-200">
            <p className="text-sm font-medium text-stone-600">
              Employer Pays (1%)
            </p>
            <p className="font-mono text-3xl font-bold text-stone-800 my-1">
              R {formatNumber(contribution)}
            </p>
          </div>
          {/* Total Contribution */}
          <div className="p-4 bg-rose-100 rounded-lg border border-rose-300">
            <p className="text-sm font-medium text-rose-800">
              Total Monthly Contribution
            </p>
            <p className="font-mono text-3xl font-extrabold text-rose-900 my-1">
              R {formatNumber(contribution * 2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
