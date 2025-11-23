// FILE: app/components/Calculator.js
"use client";

import { useState, useEffect } from "react";
import { calculateTransferDuty } from "../../utils/calculation";
import { supabase } from "../../utils/supabaseClient";

export default function Calculator() {
  const [price, setPrice] = useState(2500000);
  const [displayPrice, setDisplayPrice] = useState("2,500,000");
  const [transferDuty, setTransferDuty] = useState(null);
  const [breakdown, setBreakdown] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const logEvent = async (eventName, value) => {
    // Safety check: Don't log if Supabase keys aren't set
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;

    try {
      const { error } = await supabase
        .from("transfer_duty_calculator_events")
        .insert([
          {
            event_name: eventName,
            property_value: value,
          },
        ]);
      if (error) {
        // Optional: Only log detailed errors in development
        if (process.env.NODE_ENV === 'development') {
          console.warn("Supabase logging failed:", error.message);
        }
      }
    } catch (error) {
      // Silent fail or warn
      if (process.env.NODE_ENV === 'development') {
        console.warn("Analytics error:", error.message);
      }
    }
  };

  const formatNumber = (num) => num.toLocaleString("en-ZA");

  const handlePriceChange = (value) => {
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      setPrice(numValue);
      setDisplayPrice(formatNumber(numValue));
    }
  };

  const handleTextInputChange = (event) => {
    const rawValue = event.target.value.replace(/,/g, "");
    setDisplayPrice(rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    const numValue = Number(rawValue);
    if (!isNaN(numValue)) {
      setPrice(numValue);
    }
  };

  const handleCalculate = async () => {
    setIsLoading(true);
    await logEvent("result_generated", price);

    const duty = calculateTransferDuty(price);
    setTransferDuty(Math.round(duty));
    generateBreakdown(price);
    setIsLoading(false);
  };

  const generateBreakdown = (value) => {
    if (value <= 1210000) {
      setBreakdown(
        `For a property value of R ${formatNumber(
          value
        )}, the value is within the 0% tax bracket, so no transfer duty is payable.`
      );
    } else if (value <= 1663800) {
      const taxableAmount = value - 1210000;
      const duty = taxableAmount * 0.03;
      setBreakdown(
        `Calculation: 3% of the value above R1,210,000.\n(R ${formatNumber(
          value
        )} - R 1,210,000) × 3% = R ${formatNumber(Math.round(duty))}`
      );
    } else if (value <= 2329300) {
      const taxableAmount = value - 1663800;
      const duty = 13614 + taxableAmount * 0.06;
      setBreakdown(
        `Calculation: R13,614 + 6% of the value above R1,663,800.\nR 13,614 + ((R ${formatNumber(
          value
        )} - R 1,663,800) × 6%) = R ${formatNumber(Math.round(duty))}`
      );
    } else if (value <= 2994800) {
      const taxableAmount = value - 2329300;
      const duty = 53544 + taxableAmount * 0.08;
      setBreakdown(
        `Calculation: R53,544 + 8% of the value above R2,329,300.\nR 53,544 + ((R ${formatNumber(
          value
        )} - R 2,329,300) × 8%) = R ${formatNumber(Math.round(duty))}`
      );
    } else if (value <= 13310000) {
      const taxableAmount = value - 2994800;
      const duty = 106784 + taxableAmount * 0.11;
      setBreakdown(
        `Calculation: R106,784 + 11% of the value above R2,994,800.\nR 106,784 + ((R ${formatNumber(
          value
        )} - R 2,994,800) × 11%) = R ${formatNumber(Math.round(duty))}`
      );
    } else {
      const taxableAmount = value - 13310000;
      const duty = 1241456 + taxableAmount * 0.13;
      setBreakdown(
        `Calculation: R1,241,456 + 13% of the value above R13,310,000.\nR 1,241,456 + ((R ${formatNumber(
          value
        )} - R 13,310,000) × 13%) = R ${formatNumber(Math.round(duty))}`
      );
    }
  };

  useEffect(() => {
    logEvent("tool_start", 2500000);
    handleCalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 grid md:grid-cols-2 gap-8 items-center">
      <div className="space-y-6">
        <div>
          <label
            htmlFor="purchasePrice"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Property Purchase Price
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 text-lg">
              R
            </span>
            <input
              type="text"
              id="purchasePrice"
              value={displayPrice}
              onChange={handleTextInputChange}
              className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-2xl font-semibold text-slate-800"
            />
          </div>
        </div>
        <input
          type="range"
          min="0"
          max="15000000"
          step="10000"
          value={price}
          onChange={(e) => handlePriceChange(e.target.value)}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        <button
          onClick={handleCalculate}
          disabled={isLoading}
          className="w-full py-4 px-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 text-lg disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Calculating..." : "Calculate Duty"}
        </button>
      </div>
      <div className="text-center bg-indigo-50 p-6 rounded-2xl border border-indigo-200 min-h-[240px] flex flex-col justify-center">
        {transferDuty !== null ? (
          <div>
            <p className="text-sm font-medium text-indigo-700">
              TOTAL TRANSFER DUTY PAYABLE
            </p>
            <p className="text-5xl font-extrabold text-indigo-900 my-2 tracking-tight">
              R {formatNumber(transferDuty)}
            </p>
            <details className="text-sm mt-4 group">
              <summary className="text-indigo-600 cursor-pointer font-medium list-none">
                Show Calculation Breakdown
              </summary>
              <p className="mt-2 text-slate-600 bg-white p-3 rounded-md border whitespace-pre-wrap">
                {breakdown}
              </p>
            </details>
          </div>
        ) : (
          <p className="text-slate-500">Enter a price and click calculate.</p>
        )}
      </div>
    </div>
  );
}
