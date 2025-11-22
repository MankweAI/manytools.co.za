"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { calculateVAT } from "../../../utils/calculation";

export default function VATCalculator() {
  const [sales, setSales] = useState(1000000);
  const [displaySales, setDisplaySales] = useState("1,000,000");
  const [purchases, setPurchases] = useState(600000);
  const [displayPurchases, setDisplayPurchases] = useState("600,000");
  const [businessType, setBusinessType] = useState("standard");
  const [showMonthly, setShowMonthly] = useState(false);

  const [outputVAT, setOutputVAT] = useState(null);
  const [inputVAT, setInputVAT] = useState(null);
  const [netVAT, setNetVAT] = useState(null);

  const formatNumber = (num, decimals = 0) => {
    if (isNaN(num) || num === null) return "0";
    return num.toLocaleString("en-ZA", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const handleCalculate = useCallback(() => {
    if (sales < 0 || purchases < 0) {
      setOutputVAT(0);
      setInputVAT(0);
      setNetVAT(0);
      return;
    }
    const {
      outputVAT: out,
      inputVAT: inp,
      netVAT: net,
    } = calculateVAT(sales, purchases, businessType);
    setOutputVAT(out);
    setInputVAT(inp);
    setNetVAT(net);
  }, [sales, purchases, businessType]);

  const logCalculationEvent = useCallback(async () => {
    try {
      await supabase.from("vat_calculator_events").insert([
        {
          event_name: "result_generated",
          sales: sales,
          purchases: purchases,
          business_type: businessType,
          show_monthly: showMonthly,
        },
      ]);
    } catch (error) {
      console.error("Supabase logging error:", error);
    }
  }, [sales, purchases, businessType, showMonthly]);

  useEffect(() => {
    handleCalculate();
  }, [handleCalculate]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (sales >= 0 && purchases >= 0) {
        logCalculationEvent();
      }
    }, 1500);
    return () => clearTimeout(debounceTimer);
  }, [sales, purchases, businessType, showMonthly, logCalculationEvent]);

  const handleSalesChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, "");
    setDisplaySales(rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    const numValue = Number(rawValue);
    if (!isNaN(numValue)) setSales(numValue);
  };

  const handlePurchasesChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, "");
    setDisplayPurchases(rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    const numValue = Number(rawValue);
    if (!isNaN(numValue)) setPurchases(numValue);
  };

  const displayOutputVAT = showMonthly ? Math.round(outputVAT / 12) : outputVAT;
  const displayInputVAT = showMonthly ? Math.round(inputVAT / 12) : inputVAT;
  const displayNetVAT = showMonthly ? Math.round(netVAT / 12) : netVAT;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 grid lg:grid-cols-2 gap-8 items-start">
      <div className="space-y-6">
        <div>
          <label
            htmlFor="sales"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Annual Sales/Turnover (Excl. VAT)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
              R
            </span>
            <input
              type="text"
              id="sales"
              value={displaySales}
              onChange={handleSalesChange}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="purchases"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Annual Purchases (Excl. VAT)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
              R
            </span>
            <input
              type="text"
              id="purchases"
              value={displayPurchases}
              onChange={handlePurchasesChange}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="businessType"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Business Type
          </label>
          <select
            id="businessType"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
          >
            <option value="standard">Standard Rate</option>
            <option value="zero-rated">Zero-Rated</option>
            <option value="exempt">Exempt</option>
          </select>
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
          {outputVAT !== null && inputVAT !== null && netVAT !== null ? (
            <div>
              <p className="text-sm font-medium text-indigo-700">
                ESTIMATED {showMonthly ? "MONTHLY" : "ANNUAL"} VAT DETAILS
              </p>
              <div className="text-sm space-y-1 mt-4">
                <div className="flex justify-between">
                  <span>Output VAT</span>
                  <span>R {formatNumber(displayOutputVAT)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Input VAT</span>
                  <span>R {formatNumber(displayInputVAT)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t font-bold">
                  <span>Net VAT</span>
                  <span>R {formatNumber(displayNetVAT)}</span>
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
