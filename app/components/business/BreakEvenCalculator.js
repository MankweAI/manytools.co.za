"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { calculateBreakEven } from "../../../utils/calculation";

// Deterministic formatter to avoid hydration mismatches
const fmt = (n, d = 0) => {
  if (n === null || n === undefined || Number.isNaN(n)) return "0";
  const neg = Number(n) < 0 ? "-" : "";
  const abs = Math.abs(Number(n));
  const fixed = abs.toFixed(d);
  const [i, dec] = fixed.split(".");
  const withThousands = i.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return d ? `${neg}${withThousands}.${dec}` : `${neg}${withThousands}`;
};

export default function BreakEvenCalculator() {
  const [price, setPrice] = useState(250);
  const [dispPrice, setDispPrice] = useState("250");

  const [variableCost, setVariableCost] = useState(120);
  const [dispVariableCost, setDispVariableCost] = useState("120");

  const [fixedCosts, setFixedCosts] = useState(50000);
  const [dispFixedCosts, setDispFixedCosts] = useState("50,000");

  const [expectedUnits, setExpectedUnits] = useState(500);

  const [result, setResult] = useState(null);

  const onMoney = (setDisp, setVal) => (e) => {
    const raw = e.target.value.replace(/,/g, "");
    setDisp(raw.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    const num = Number(raw);
    if (!Number.isNaN(num)) setVal(num);
  };

  const compute = useCallback(() => {
    const r = calculateBreakEven({
      pricePerUnit: price,
      variableCostPerUnit: variableCost,
      fixedCosts,
      expectedUnits,
    });
    setResult(r);
  }, [price, variableCost, fixedCosts, expectedUnits]);

  const logEvent = useCallback(async () => {
    try {
      await supabase.from("break_even_calculator_events").insert([
        {
          event_name: "result_generated",
          price_per_unit: price,
          variable_cost_per_unit: variableCost,
          fixed_costs: fixedCosts,
          expected_units: expectedUnits,
        },
      ]);
    } catch (e) {
      console.error("Supabase logging error:", e);
    }
  }, [price, variableCost, fixedCosts, expectedUnits]);

  useEffect(() => {
    compute();
  }, [compute]);

  useEffect(() => {
    const t = setTimeout(() => logEvent(), 1200);
    return () => clearTimeout(t);
  }, [price, variableCost, fixedCosts, expectedUnits, logEvent]);

  const cmu = result?.contributionPerUnit || 0;
  const cmrPct = (result?.contributionMarginRatio || 0) * 100;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 grid lg:grid-cols-2 gap-8 items-start">
      {/* Inputs */}
      <div className="space-y-6">
        <div>
          <label
            htmlFor="price"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Selling Price per Unit
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
              R
            </span>
            <input
              id="price"
              type="text"
              value={dispPrice}
              onChange={onMoney(setDispPrice, setPrice)}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="variableCost"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Variable Cost per Unit
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
              R
            </span>
            <input
              id="variableCost"
              type="text"
              value={dispVariableCost}
              onChange={onMoney(setDispVariableCost, setVariableCost)}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="fixedCosts"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Fixed Costs (per period)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
              R
            </span>
            <input
              id="fixedCosts"
              type="text"
              value={dispFixedCosts}
              onChange={onMoney(setDispFixedCosts, setFixedCosts)}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="expectedUnits"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Expected Units (optional)
          </label>
          <input
            id="expectedUnits"
            type="number"
            min="0"
            step="1"
            value={expectedUnits}
            onChange={(e) =>
              setExpectedUnits(Math.max(0, parseInt(e.target.value || "0", 10)))
            }
            className="w-full px-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
          />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="text-center bg-indigo-50 p-6 rounded-2xl border border-indigo-200">
          {result ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-indigo-700">
                  BREAK-EVEN POINT
                </p>
                <p className="text-3xl md:text-4xl font-extrabold text-indigo-900 my-2 tracking-tight">
                  {fmt(result.breakEvenUnits)} Units
                </p>
                <p className="text-sm text-indigo-700">
                  Revenue: R {fmt(result.breakEvenRevenue)}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-sm text-left">
                <div className="bg-white rounded-xl border p-4">
                  <p className="font-semibold text-slate-800 mb-2">
                    Contribution
                  </p>
                  <div className="flex justify-between">
                    <span>Per Unit</span>
                    <span>R {fmt(cmu, 2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Margin Ratio</span>
                    <span>{fmt(cmrPct, 2)}%</span>
                  </div>
                </div>
                <div className="bg-white rounded-xl border p-4">
                  <p className="font-semibold text-slate-800 mb-2">
                    At Expected
                  </p>
                  <div className="flex justify-between">
                    <span>Profit/Loss</span>
                    <span>R {fmt(result.profitAtExpected, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Margin of Safety</span>
                    <span>
                      {fmt(result.marginOfSafetyUnits)} units (
                      {fmt(result.marginOfSafetyPct, 1)}%)
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600">
                Break-even units = Fixed Costs ÷ (Price − Variable Cost).
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

