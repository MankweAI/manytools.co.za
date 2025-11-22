// FILE: app/components/property/RentalYieldCalculator.js
"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { calculateRentalYield } from "../../../utils/calculation";

const YieldGauge = ({ value, label }) => {
  const percentage = Math.min(Math.max(value, 0), 15); // Cap gauge at 15% for visual clarity
  const circumference = 30 * 2 * Math.PI;
  const offset = circumference - (percentage / 15) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28">
        <svg
          className="transform -rotate-90"
          width="100%"
          height="100%"
          viewBox="0 0 70 70"
        >
          <circle
            cx="35"
            cy="35"
            r="30"
            className="stroke-current text-slate-200"
            strokeWidth="6"
            fill="transparent"
          />
          <circle
            cx="35"
            cy="35"
            r="30"
            className="stroke-current text-amber-500"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.5s ease-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-slate-800">
            {value.toFixed(2)}
          </span>
          <span className="text-lg font-semibold text-slate-600">%</span>
        </div>
      </div>
      <p className="text-sm font-semibold text-slate-700 mt-2">{label}</p>
    </div>
  );
};

export default function RentalYieldCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(1600000);
  const [monthlyRent, setMonthlyRent] = useState(12000);
  const [annualCosts, setAnnualCosts] = useState(36000);
  const [vacancyRate, setVacancyRate] = useState(5);
  const [showMonthly, setShowMonthly] = useState(false);
  const [results, setResults] = useState(null);

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

  const handleCalculate = useCallback(() => {
    const r = calculateRentalYield(
      monthlyRent,
      propertyPrice,
      annualCosts,
      vacancyRate
    );
    setResults(r);
  }, [propertyPrice, monthlyRent, annualCosts, vacancyRate]);

  useEffect(() => {
    handleCalculate();
  }, [handleCalculate]);

  const logCalculationEvent = useCallback(async () => {
    try {
      await supabase.from("rental_yield_calculator_events").insert([
        {
          event_name: "result_generated",
          property_price: propertyPrice,
          monthly_rent: monthlyRent,
          annual_costs: annualCosts,
          vacancy_rate_pct: vacancyRate,
          show_monthly: showMonthly,
        },
      ]);
    } catch (error) {
      console.error("Supabase logging error:", error);
    }
  }, [propertyPrice, monthlyRent, annualCosts, vacancyRate, showMonthly]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (propertyPrice > 0) logCalculationEvent();
    }, 1200);
    return () => clearTimeout(t);
  }, [
    propertyPrice,
    monthlyRent,
    annualCosts,
    vacancyRate,
    showMonthly,
    logCalculationEvent,
  ]);

  const getVal = (annualValue) =>
    showMonthly ? annualValue / 12 : annualValue;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 space-y-8">
      {/* Section 1: Main Inputs */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="propertyPrice"
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
              id="propertyPrice"
              value={formatNumber(propertyPrice)}
              onChange={onMoneyChange(setPropertyPrice)}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="monthlyRent"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Expected Monthly Rent
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
              R
            </span>
            <input
              type="text"
              id="monthlyRent"
              value={formatNumber(monthlyRent)}
              onChange={onMoneyChange(setMonthlyRent)}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Deductions */}
      <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-slate-200">
        <div>
          <label
            htmlFor="annualCosts"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Annual Operating Costs
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
              R
            </span>
            <input
              type="text"
              id="annualCosts"
              value={formatNumber(annualCosts)}
              onChange={onMoneyChange(setAnnualCosts)}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Rates, levies, insurance, maintenance, etc.
          </p>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="vacancyRate"
              className="text-base font-medium text-slate-700"
            >
              Vacancy Rate
            </label>
            <span className="text-lg font-semibold text-amber-600">
              {vacancyRate.toFixed(1)}%
            </span>
          </div>
          <input
            type="range"
            id="vacancyRate"
            min="0"
            max="20"
            step="0.5"
            value={vacancyRate}
            onChange={(e) => setVacancyRate(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <p className="text-xs text-slate-500 mt-1">
            Estimated percentage of time the property is empty.
          </p>
        </div>
      </div>

      {/* Section 3: Results */}
      <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 pt-6 border-t border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">
            Investment Performance
          </h2>
          <label
            htmlFor="showMonthly"
            className="flex items-center cursor-pointer text-sm font-medium text-slate-700"
          >
            <span
              className={!showMonthly ? "font-semibold text-amber-700" : ""}
            >
              Annual
            </span>
            <input
              type="checkbox"
              id="showMonthly"
              checked={showMonthly}
              onChange={(e) => setShowMonthly(e.target.checked)}
              className="hidden"
            />
            <div className="mx-2 w-10 h-6 flex items-center bg-slate-300 rounded-full p-1 duration-300 ease-in-out">
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-md transform duration-300 ease-in-out ${
                  showMonthly ? "translate-x-4" : ""
                }`}
              ></div>
            </div>
            <span className={showMonthly ? "font-semibold text-amber-700" : ""}>
              Monthly
            </span>
          </label>
        </div>

        {results && (
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-around">
              <YieldGauge value={results.grossYieldPct} label="Gross Yield" />
              <YieldGauge value={results.netYieldPct} label="Net Yield" />
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Gross Rent</span>
                <span className="font-mono font-semibold">
                  R {formatNumber(getVal(results.annualRentGross))}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">(-) Vacancy Loss</span>
                <span className="font-mono font-semibold text-red-600">
                  - R {formatNumber(getVal(results.vacancyLoss))}
                </span>
              </div>
              <div className="flex justify-between border-t border-amber-200 pt-2">
                <span className="font-semibold text-slate-700">
                  Effective Gross Income
                </span>
                <span className="font-mono font-semibold">
                  R {formatNumber(getVal(results.effectiveGrossIncome))}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">(-) Operating Costs</span>
                <span className="font-mono font-semibold text-red-600">
                  - R {formatNumber(getVal(annualCosts))}
                </span>
              </div>
              <div className="flex justify-between border-t border-amber-200 pt-2">
                <span className="font-bold text-slate-800 text-base">
                  Net Operating Income
                </span>
                <span className="font-mono font-bold text-amber-700 text-base">
                  R {formatNumber(getVal(results.netOperatingIncome))}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
