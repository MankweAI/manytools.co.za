"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { calculateTakeHomePay } from "../../../utils/calculation";

export default function TakeHomePayCalculator() {
  const [annualSalary, setAnnualSalary] = useState(500000);
  const [displaySalary, setDisplaySalary] = useState("500,000");
  const [medicalCredits, setMedicalCredits] = useState(0);
  const [otherDeductions, setOtherDeductions] = useState(0);
  const [displayDeductions, setDisplayDeductions] = useState("0");
  const [fringeBenefits, setFringeBenefits] = useState(0);
  const [displayFringe, setDisplayFringe] = useState("0");
  const [showMonthly, setShowMonthly] = useState(false);

  const [netPay, setNetPay] = useState(null);
  const [paye, setPaye] = useState(null);
  const [uif, setUif] = useState(null);
  const [sdl, setSdl] = useState(null);

  const formatNumber = (num, decimals = 0) => {
    if (isNaN(num) || num === null) return "0";
    return num.toLocaleString("en-ZA", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const handleCalculate = useCallback(() => {
    if (annualSalary < 0) {
      setNetPay(0);
      setPaye(0);
      setUif(0);
      setSdl(0);
      return;
    }
    const {
      netPay: np,
      paye: p,
      uif: ui,
      sdl: sd,
    } = calculateTakeHomePay(
      annualSalary,
      medicalCredits,
      otherDeductions,
      fringeBenefits
    );
    setNetPay(np);
    setPaye(p);
    setUif(ui);
    setSdl(sd);
  }, [annualSalary, medicalCredits, otherDeductions, fringeBenefits]);

  const logCalculationEvent = useCallback(async () => {
    try {
      await supabase.from("take_home_pay_calculator_events").insert([
        {
          event_name: "result_generated",
          annual_salary: annualSalary,
          medical_credits: medicalCredits,
          other_deductions: otherDeductions,
          fringe_benefits: fringeBenefits,
          show_monthly: showMonthly,
        },
      ]);
    } catch (error) {
      console.error("Supabase logging error:", error);
    }
  }, [
    annualSalary,
    medicalCredits,
    otherDeductions,
    fringeBenefits,
    showMonthly,
  ]);

  useEffect(() => {
    handleCalculate();
  }, [handleCalculate]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (annualSalary >= 0) {
        logCalculationEvent();
      }
    }, 1500);
    return () => clearTimeout(debounceTimer);
  }, [
    annualSalary,
    medicalCredits,
    otherDeductions,
    fringeBenefits,
    showMonthly,
    logCalculationEvent,
  ]);

  const handleSalaryChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, "");
    setDisplaySalary(rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    const numValue = Number(rawValue);
    if (!isNaN(numValue)) setAnnualSalary(numValue);
  };

  const handleDeductionsChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, "");
    setDisplayDeductions(rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    const numValue = Number(rawValue);
    if (!isNaN(numValue)) setOtherDeductions(numValue);
  };

  const handleFringeChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, "");
    setDisplayFringe(rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    const numValue = Number(rawValue);
    if (!isNaN(numValue)) setFringeBenefits(numValue);
  };

  const displayNetPay = showMonthly ? Math.round(netPay / 12) : netPay;
  const displayPaye = showMonthly ? Math.round(paye / 12) : paye;
  const displayUif = showMonthly ? Math.round(uif / 12) : uif;
  const displaySdl = showMonthly ? Math.round(sdl / 12) : sdl;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 grid lg:grid-cols-2 gap-8 items-start">
      <div className="space-y-6">
        <div>
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
              value={displaySalary}
              onChange={handleSalaryChange}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="medicalCredits"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Medical Aid Credits (Members)
          </label>
          <input
            type="number"
            id="medicalCredits"
            min="0"
            value={medicalCredits}
            onChange={(e) => setMedicalCredits(parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
          />
        </div>
        <div>
          <label
            htmlFor="otherDeductions"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Other Deductions
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
              R
            </span>
            <input
              type="text"
              id="otherDeductions"
              value={displayDeductions}
              onChange={handleDeductionsChange}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="fringeBenefits"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Fringe Benefits (Taxable Value)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
              R
            </span>
            <input
              type="text"
              id="fringeBenefits"
              value={displayFringe}
              onChange={handleFringeChange}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-end">
          <label
            htmlFor="showMonthly"
            className="flex items-center cursor-pointer"
          >
            <input
              type="checkbox"
              id="showMonthly"
              checked={showMonthly}
              onChange={(e) => setShowMonthly(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-slate-700">Show Monthly</span>
          </label>
        </div>
        <div className="text-center bg-indigo-50 p-6 rounded-2xl border border-indigo-200">
          {netPay !== null ? (
            <div>
              <p className="text-sm font-medium text-indigo-700">
                ESTIMATED {showMonthly ? "MONTHLY" : "ANNUAL"} TAKE-HOME PAY
              </p>
              <p className="text-4xl md:text-5xl font-extrabold text-indigo-900 my-2 tracking-tight">
                R {formatNumber(displayNetPay)}
              </p>
              <div className="text-sm space-y-1 mt-4">
                <div className="flex justify-between">
                  <span>Gross Salary</span>
                  <span>
                    R{" "}
                    {formatNumber(
                      showMonthly ? annualSalary / 12 : annualSalary
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>PAYE</span>
                  <span>R {formatNumber(displayPaye)}</span>
                </div>
                <div className="flex justify-between">
                  <span>UIF</span>
                  <span>R {formatNumber(displayUif, 2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>SDL</span>
                  <span>R {formatNumber(displaySdl, 2)}</span>
                </div>
              </div>
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
