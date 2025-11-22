"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { calculateROI } from "../../../utils/calculation";

// Deterministic formatter (avoid locale hydration issues)
const fmt = (n, d = 0) => {
  if (n === null || n === undefined || Number.isNaN(n)) return "0";
  const neg = Number(n) < 0 ? "-" : "";
  const abs = Math.abs(Number(n));
  const fixed = abs.toFixed(d);
  const [i, dec] = fixed.split(".");
  const withThousands = i.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return d ? `${neg}${withThousands}.${dec}` : `${neg}${withThousands}`;
};

export default function ROICalculator() {
  const [initialInvestment, setInitialInvestment] = useState(250000);
  const [dispInvestment, setDispInvestment] = useState("250,000");

  const [years, setYears] = useState(3);

  const [mode, setMode] = useState("revCosts"); // 'revCosts' | 'netProfit'
  const [annualRevenue, setAnnualRevenue] = useState(180000);
  const [dispRevenue, setDispRevenue] = useState("180,000");
  const [annualCosts, setAnnualCosts] = useState(100000);
  const [dispCosts, setDispCosts] = useState("100,000");

  const [annualNetProfit, setAnnualNetProfit] = useState(80000);
  const [dispNetProfit, setDispNetProfit] = useState("80,000");

  const [salvageValue, setSalvageValue] = useState(0);
  const [dispSalvage, setDispSalvage] = useState("0");

  const [result, setResult] = useState(null);

  const onMoney = (setDisp, setVal) => (e) => {
    const raw = e.target.value.replace(/,/g, "");
    setDisp(raw.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    const num = Number(raw);
    if (!Number.isNaN(num)) setVal(num);
  };

  const compute = useCallback(() => {
    const r = calculateROI({
      initialInvestment,
      years,
      salvageValue,
      annualRevenue: mode === "revCosts" ? annualRevenue : 0,
      annualCosts: mode === "revCosts" ? annualCosts : 0,
      annualNetProfit: mode === "netProfit" ? annualNetProfit : null,
    });
    setResult(r);
  }, [
    initialInvestment,
    years,
    salvageValue,
    annualRevenue,
    annualCosts,
    annualNetProfit,
    mode,
  ]);

  const logEvent = useCallback(async () => {
    try {
      await supabase.from("roi_calculator_events").insert([
        {
          event_name: "result_generated",
          initial_investment: initialInvestment,
          years,
          mode,
          annual_revenue: mode === "revCosts" ? annualRevenue : null,
          annual_costs: mode === "revCosts" ? annualCosts : null,
          annual_net_profit: mode === "netProfit" ? annualNetProfit : null,
          salvage_value: salvageValue,
        },
      ]);
    } catch (e) {
      console.error("Supabase logging error:", e);
    }
  }, [
    initialInvestment,
    years,
    mode,
    annualRevenue,
    annualCosts,
    annualNetProfit,
    salvageValue,
  ]);

  useEffect(() => {
    compute();
  }, [compute]);

  useEffect(() => {
    const t = setTimeout(() => logEvent(), 1200);
    return () => clearTimeout(t);
  }, [
    initialInvestment,
    years,
    mode,
    annualRevenue,
    annualCosts,
    annualNetProfit,
    salvageValue,
    logEvent,
  ]);

  const netProfitResolved =
    mode === "revCosts"
      ? Math.max(0, annualRevenue - annualCosts)
      : annualNetProfit;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 grid lg:grid-cols-2 gap-8 items-start">
      {/* Inputs */}
      <div className="space-y-6">
        <div>
          <label
            htmlFor="initialInvestment"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Initial Investment (Upfront)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
              R
            </span>
            <input
              id="initialInvestment"
              type="text"
              value={dispInvestment}
              onChange={onMoney(setDispInvestment, setInitialInvestment)}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="years"
              className="text-base font-medium text-slate-700"
            >
              Holding Period (Years)
            </label>
            <span className="text-lg font-semibold text-indigo-600">
              {years}
            </span>
          </div>
          <input
            id="years"
            type="range"
            min="1"
            max="10"
            step="1"
            value={years}
            onChange={(e) => setYears(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        <div>
          <label className="block text-base font-medium text-slate-700 mb-2">
            Profit Input Mode
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setMode("revCosts")}
              className={`px-3 py-2 rounded-lg border text-sm font-semibold ${
                mode === "revCosts"
                  ? "border-indigo-500 text-indigo-700 bg-indigo-50"
                  : "border-slate-300 text-slate-700 bg-white"
              }`}
            >
              Revenue & Costs
            </button>
            <button
              type="button"
              onClick={() => setMode("netProfit")}
              className={`px-3 py-2 rounded-lg border text-sm font-semibold ${
                mode === "netProfit"
                  ? "border-indigo-500 text-indigo-700 bg-indigo-50"
                  : "border-slate-300 text-slate-700 bg-white"
              }`}
            >
              Net Profit Only
            </button>
          </div>
        </div>

        {mode === "revCosts" ? (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="annualRevenue"
                className="block text-base font-medium text-slate-700 mb-2"
              >
                Annual Revenue
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                  R
                </span>
                <input
                  id="annualRevenue"
                  type="text"
                  value={dispRevenue}
                  onChange={onMoney(setDispRevenue, setAnnualRevenue)}
                  className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="annualCosts"
                className="block text-base font-medium text-slate-700 mb-2"
              >
                Annual Costs
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                  R
                </span>
                <input
                  id="annualCosts"
                  type="text"
                  value={dispCosts}
                  onChange={onMoney(setDispCosts, setAnnualCosts)}
                  className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
                />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <label
              htmlFor="annualNetProfit"
              className="block text-base font-medium text-slate-700 mb-2"
            >
              Annual Net Profit
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                R
              </span>
              <input
                id="annualNetProfit"
                type="text"
                value={dispNetProfit}
                onChange={onMoney(setDispNetProfit, setAnnualNetProfit)}
                className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
              />
            </div>
          </div>
        )}

        <div>
          <label
            htmlFor="salvageValue"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Salvage Value at End (Optional)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
              R
            </span>
            <input
              id="salvageValue"
              type="text"
              value={dispSalvage}
              onChange={onMoney(setDispSalvage, setSalvageValue)}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="text-center bg-indigo-50 p-6 rounded-2xl border border-indigo-200">
          {result ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-indigo-700">
                  ESTIMATED ROI
                </p>
                <p className="text-4xl md:text-5xl font-extrabold text-indigo-900 my-2 tracking-tight">
                  {fmt(result.simpleROIPct, 2)}%
                </p>
                <p className="text-xs text-indigo-700">
                  Annualized (approx): {fmt(result.annualizedROIPct, 2)}%
                </p>
              </div>

              <div className="text-sm space-y-1 text-left">
                <div className="flex justify-between">
                  <span>Total Net Gain</span>
                  <span>R {fmt(result.totalNetGain)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Net Profit (resolved)</span>
                  <span>R {fmt(netProfitResolved)}</span>
                </div>
                {mode === "revCosts" && result.profitMarginPct !== null && (
                  <div className="flex justify-between">
                    <span>Profit Margin</span>
                    <span>{fmt(result.profitMarginPct, 2)}%</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t font-bold">
                  <span>Payback Period</span>
                  <span>
                    {result.paybackYears}y {result.paybackMonths}m
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                Notes: Annualized ROI is an approximation from simple ROI over
                the holding period.
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

