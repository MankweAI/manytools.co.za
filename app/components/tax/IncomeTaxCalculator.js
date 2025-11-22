// FILE: app/components/tax/IncomeTaxCalculator.js
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { calculateTakeHomePay } from "../../../utils/calculation";

export default function IncomeTaxCalculator() {
  const [annualSalary, setAnnualSalary] = useState(500000);
  const [medicalAidCredits, setMedicalAidCredits] = useState(0);
  const [otherDeductions, setOtherDeductions] = useState(0);
  const [showMonthly, setShowMonthly] = useState(true);

  const [results, setResults] = useState({
    netPay: 0,
    paye: 0,
    uif: 0,
    sdl: 0,
  });

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
    const res = calculateTakeHomePay(
      annualSalary,
      medicalAidCredits,
      otherDeductions,
      0
    );
    setResults(res);
  }, [annualSalary, medicalAidCredits, otherDeductions]);

  useEffect(() => {
    handleCalculate();
  }, [handleCalculate]);

  const logEvent = useCallback(
    async () => {
      /* Supabase logging logic */
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

  const totalDeductions = results.paye + results.uif + results.sdl;
  const getVal = (annualValue) =>
    showMonthly ? annualValue / 12 : annualValue;

  const breakdown = useMemo(() => {
    const gross = annualSalary;
    if (gross === 0) return [];
    return [
      { label: "Net Pay", value: results.netPay, color: "bg-blue-500" },
      { label: "PAYE", value: results.paye, color: "bg-blue-300" },
      {
        label: "UIF & SDL",
        value: results.uif + results.sdl,
        color: "bg-blue-200",
      },
    ].filter((item) => item.value > 0);
  }, [results, annualSalary]);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 space-y-8">
      {/* Inputs */}
      <div className="grid md:grid-cols-5 gap-6">
        <div className="md:col-span-3">
          <label
            htmlFor="annualSalary"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Annual Gross Salary
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
              R
            </span>
            <input
              type="text"
              id="annualSalary"
              value={formatNumber(annualSalary)}
              onChange={onMoneyChange(setAnnualSalary)}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <label
            htmlFor="medicalCredits"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Medical Aid Members
          </label>
          <input
            type="number"
            id="medicalCredits"
            min="0"
            value={medicalAidCredits}
            onChange={(e) =>
              setMedicalAidCredits(parseInt(e.target.value) || 0)
            }
            className="w-full px-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
          />
        </div>
      </div>

      {/* Results */}
      <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
        <div className="flex justify-end mb-4">
          <label
            htmlFor="showMonthly"
            className="flex items-center cursor-pointer text-sm font-medium text-slate-700"
          >
            <span className={!showMonthly ? "font-semibold text-blue-700" : ""}>
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
            <span className={showMonthly ? "font-semibold text-blue-700" : ""}>
              Monthly
            </span>
          </label>
        </div>

        <div className="text-center">
          <p className="text-sm font-medium text-blue-700">
            YOUR ESTIMATED TAKE-HOME PAY
          </p>
          <p className="font-mono text-5xl font-extrabold text-blue-900 my-2 tracking-tight">
            R {formatNumber(getVal(results.netPay), 2)}
          </p>
          <p className="text-sm text-slate-500">
            from a gross salary of R {formatNumber(getVal(annualSalary), 2)}
          </p>
        </div>

        <div className="mt-8">
          <h3 className="text-base font-semibold text-slate-800 mb-3 text-center">
            Salary Breakdown
          </h3>
          <div className="w-full bg-blue-200 rounded-full h-6 flex overflow-hidden">
            {breakdown.map((item) => (
              <div
                key={item.label}
                className={item.color + " h-6"}
                style={{ width: `${(item.value / annualSalary) * 100}%` }}
                title={`${item.label}: ${(
                  (item.value / annualSalary) *
                  100
                ).toFixed(1)}%`}
              ></div>
            ))}
          </div>
          <div className="space-y-2 mt-4 text-sm">
            <div className="flex justify-between items-center">
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                Net Take-Home Pay
              </span>
              <span className="font-mono font-semibold">
                R {formatNumber(getVal(results.netPay), 2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-blue-300 mr-2"></span>
                Income Tax (PAYE)
              </span>
              <span className="font-mono font-semibold">
                R {formatNumber(getVal(results.paye), 2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-blue-200 mr-2"></span>
                UIF & SDL
              </span>
              <span className="font-mono font-semibold">
                R {formatNumber(getVal(results.uif + results.sdl), 2)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t font-bold">
              <span className="text-slate-800">Total Deductions</span>
              <span className="font-mono text-blue-800">
                R {formatNumber(getVal(totalDeductions), 2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
