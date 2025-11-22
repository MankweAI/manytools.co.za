// FILE: app/components/tax/PAYECalculator.js
"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../utils/supabaseClient";
import {
  calculatePAYE,
  calculateUIFContribution,
  calculateSDLContribution,
  calculateNetPay,
  calculateMarginalTaxRate,
  calculateEffectiveTaxRate,
} from "../../../utils/calculation";

const MoneyInput = ({ label, value, setter, helpText }) => {
  const format = (n) => (isNaN(n) ? "0" : n.toLocaleString("en-ZA"));
  const onChange = (e) => {
    const raw = e.target.value.replace(/,/g, "");
    const num = Number(raw);
    if (!isNaN(num)) setter(num);
  };
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative mt-1">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
          R
        </span>
        <input
          type="text"
          value={format(value)}
          onChange={onChange}
          className="w-full pl-7 pr-4 py-2 border border-gray-300 rounded-lg font-semibold"
        />
      </div>
      {helpText && <p className="mt-1 text-xs text-gray-500">{helpText}</p>}
    </div>
  );
};

const WaterfallRow = ({
  label,
  value,
  isDeduction = false,
  isFinal = false,
}) => (
  <div
    className={`flex justify-between items-center py-2.5 ${
      isFinal
        ? "border-t-2 border-fuchsia-200 mt-2"
        : "border-t border-gray-200"
    }`}
  >
    <p
      className={`text-sm ${
        isFinal ? "font-bold text-fuchsia-900" : "text-gray-600"
      }`}
    >
      {label}
    </p>
    <p
      className={`font-mono font-semibold text-sm ${
        isDeduction
          ? "text-red-600"
          : isFinal
          ? "text-fuchsia-900"
          : "text-gray-800"
      }`}
    >
      {isDeduction ? "- " : ""}R {value}
    </p>
  </div>
);

export default function PAYECalculator() {
  const [annualSalary, setAnnualSalary] = useState(500000);
  const [medicalCredits, setMedicalCredits] = useState(0);
  const [otherDeductions, setOtherDeductions] = useState(0);
  const [fringeBenefits, setFringeBenefits] = useState(0);
  const [showMonthly, setShowMonthly] = useState(true);

  const [results, setResults] = useState(null);

  const format = (num, d = 0) =>
    !isNaN(num) && num !== null
      ? num.toLocaleString("en-ZA", {
          minimumFractionDigits: d,
          maximumFractionDigits: d,
        })
      : "0";
  const getVal = (annual) => (showMonthly ? (annual || 0) / 12 : annual || 0);

  const handleCalculate = useCallback(() => {
    const grossRemuneration = annualSalary + fringeBenefits;
    const taxableIncome = grossRemuneration - otherDeductions;

    const paye = calculatePAYE(taxableIncome, medicalCredits, 0, 0); // Pass taxable income directly
    const uif = calculateUIFContribution(annualSalary); // UIF is on gross salary, capped
    const sdl = calculateSDLContribution(annualSalary); // SDL is on gross salary

    const totalDeductions = paye + uif + sdl + otherDeductions;
    const netPay = annualSalary + fringeBenefits - totalDeductions;

    const marginalRate = calculateMarginalTaxRate(
      taxableIncome,
      medicalCredits,
      0,
      0
    );
    const effectiveRate =
      grossRemuneration > 0 ? (paye / grossRemuneration) * 100 : 0;

    setResults({
      grossRemuneration,
      otherDeductions,
      paye,
      uif,
      sdl,
      netPay,
      marginalRate,
      effectiveRate,
    });
  }, [annualSalary, medicalCredits, otherDeductions, fringeBenefits]);

  useEffect(() => {
    handleCalculate();
  }, [handleCalculate]);
  // Supabase logging logic would go here in other useEffect hooks...

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg border space-y-4">
          <h3 className="font-bold text-lg text-gray-800">Your Remuneration</h3>
          <MoneyInput
            label="Annual Gross Salary"
            value={annualSalary}
            setter={setAnnualSalary}
          />
          <MoneyInput
            label="Fringe Benefits (Taxable Value)"
            value={fringeBenefits}
            setter={setFringeBenefits}
            helpText="e.g., Company car usage"
          />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border space-y-4">
          <h3 className="font-bold text-lg text-gray-800">
            Deductions & Credits
          </h3>
          <MoneyInput
            label="Pre-Tax Deductions"
            value={otherDeductions}
            setter={setOtherDeductions}
            helpText="e.g., Pension/RA contributions"
          />
          <div>
            <label
              htmlFor="medicalCredits"
              className="block text-sm font-medium text-gray-700"
            >
              Medical Aid Members
            </label>
            <input
              type="number"
              id="medicalCredits"
              min="0"
              value={medicalCredits}
              onChange={(e) => setMedicalCredits(parseInt(e.target.value) || 0)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg font-semibold"
            />
            <p className="mt-1 text-xs text-gray-500">
              For calculating tax credits.
            </p>
          </div>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="bg-fuchsia-50 p-6 rounded-2xl border border-fuchsia-200">
          <div className="flex justify-end mb-4">
            <label
              htmlFor="showMonthly"
              className="flex items-center cursor-pointer text-sm font-medium text-gray-700"
            >
              <span
                className={!showMonthly ? "font-semibold text-fuchsia-700" : ""}
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
              <div className="mx-2 w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300">
                <div
                  className={`w-4 h-4 rounded-full bg-white shadow-md transform duration-300 ${
                    showMonthly ? "translate-x-4" : ""
                  }`}
                ></div>
              </div>
              <span
                className={showMonthly ? "font-semibold text-fuchsia-700" : ""}
              >
                Monthly
              </span>
            </label>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-center">
              <p className="text-sm font-medium text-fuchsia-800 uppercase">
                Your Net Take-Home Pay
              </p>
              <p className="font-mono text-5xl font-extrabold text-fuchsia-950 my-2 tracking-tight">
                R {format(getVal(results.netPay), 2)}
              </p>
              <div className="flex justify-center space-x-6 mt-4">
                <div>
                  <p className="text-xs text-gray-500">Marginal Rate</p>
                  <p className="font-semibold text-lg text-fuchsia-900">
                    {results.marginalRate}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Effective Tax Rate</p>
                  <p className="font-semibold text-lg text-fuchsia-900">
                    {results.effectiveRate.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-inner">
              <h4 className="font-bold text-center text-gray-700 mb-2">
                From Gross to Net
              </h4>
              <WaterfallRow
                label="Gross Remuneration"
                value={format(getVal(results.grossRemuneration), 2)}
              />
              <WaterfallRow
                label="Pre-Tax Deductions"
                value={format(getVal(results.otherDeductions), 2)}
                isDeduction={true}
              />
              <WaterfallRow
                label="Tax (PAYE)"
                value={format(getVal(results.paye), 2)}
                isDeduction={true}
              />
              <WaterfallRow
                label="UIF & SDL"
                value={format(getVal(results.uif + results.sdl), 2)}
                isDeduction={true}
              />
              <WaterfallRow
                label="Net Take-Home Pay"
                value={format(getVal(results.netPay), 2)}
                isFinal={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
