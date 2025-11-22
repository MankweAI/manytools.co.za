"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { calculateCashRunway } from "../../../utils/calculation";

// Deterministic formatter (no locale)
const fmt = (n, d = 0) => {
  if (n === null || n === undefined || Number.isNaN(n)) return "0";
  const neg = Number(n) < 0 ? "-" : "";
  const abs = Math.abs(Number(n));
  const fixed = abs.toFixed(d);
  const [i, dec] = fixed.split(".");
  const withThousands = i.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return d ? `${neg}${withThousands}.${dec}` : `${neg}${withThousands}`;
};

export default function CashRunwayCalculator() {
  // Inputs
  const [startingCash, setStartingCash] = useState(250000);
  const [dispStartingCash, setDispStartingCash] = useState("250,000");

  const [monthlyRevenue, setMonthlyRevenue] = useState(120000);
  const [dispMonthlyRevenue, setDispMonthlyRevenue] = useState("120,000");

  const [revenueGrowthPct, setRevenueGrowthPct] = useState(3); // % per month
  const [grossMarginPct, setGrossMarginPct] = useState(40); // %

  const [monthlyOperatingCosts, setMonthlyOperatingCosts] = useState(140000);
  const [dispMonthlyOperatingCosts, setDispMonthlyOperatingCosts] =
    useState("140,000");
  const [costGrowthPct, setCostGrowthPct] = useState(1); // % per month

  const [arDays, setArDays] = useState(30);
  const [apDays, setApDays] = useState(15);

  // Results
  const result = useMemo(() => {
    return calculateCashRunway({
      startingCash,
      monthlyRevenue,
      revenueGrowthPct,
      grossMarginPct,
      monthlyOperatingCosts,
      costGrowthPct,
      arDays,
      apDays,
      maxMonths: 240,
    });
  }, [
    startingCash,
    monthlyRevenue,
    revenueGrowthPct,
    grossMarginPct,
    monthlyOperatingCosts,
    costGrowthPct,
    arDays,
    apDays,
  ]);

  // Derived presentation values (client-side date calc)
  const runwayParts = useMemo(() => {
    if (!result) return { months: 0, days: 0, label: "0m 0d" };
    if (!Number.isFinite(result.runwayMonths))
      return { months: Infinity, days: 0, label: "No run-out (profitable)" };
    const fullMonths = Math.floor(result.runwayMonths);
    const days = Math.round((result.runwayMonths - fullMonths) * 30);
    return { months: fullMonths, days, label: `${fullMonths}m ${days}d` };
  }, [result]);

  const runOutDate = useMemo(() => {
    if (!Number.isFinite(result?.runwayMonths)) return null;
    const today = new Date(); // client-only
    const months = Math.floor(result.runwayMonths);
    const days = Math.round((result.runwayMonths - months) * 30);
    const dt = new Date(
      today.getFullYear(),
      today.getMonth() + months,
      today.getDate() + days
    );
    const y = dt.getFullYear();
    const m = `${dt.getMonth() + 1}`.padStart(2, "0");
    const d = `${dt.getDate()}`.padStart(2, "0");
    return `${y}-${m}-${d}`;
  }, [result]);

  const onMoney = (setDisp, setVal) => (e) => {
    const raw = e.target.value.replace(/,/g, "");
    setDisp(raw.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    const num = Number(raw);
    if (!Number.isNaN(num)) setVal(num);
  };

  // Analytics
  const logEvent = useCallback(async () => {
    try {
      await supabase.from("cash_runway_calculator_events").insert([
        {
          event_name: "result_generated",
          starting_cash: startingCash,
          monthly_revenue: monthlyRevenue,
          revenue_growth_pct: revenueGrowthPct,
          gross_margin_pct: grossMarginPct,
          monthly_opex: monthlyOperatingCosts,
          cost_growth_pct: costGrowthPct,
          ar_days: arDays,
          ap_days: apDays,
          runway_months: Number.isFinite(result?.runwayMonths)
            ? result.runwayMonths
            : null,
          depleted: result?.depleted ?? null,
        },
      ]);
    } catch (e) {
      console.error("Supabase logging error:", e);
    }
  }, [
    startingCash,
    monthlyRevenue,
    revenueGrowthPct,
    grossMarginPct,
    monthlyOperatingCosts,
    costGrowthPct,
    arDays,
    apDays,
    result?.runwayMonths,
    result?.depleted,
  ]);

  useEffect(() => {
    const t = setTimeout(() => logEvent(), 1200);
    return () => clearTimeout(t);
  }, [
    startingCash,
    monthlyRevenue,
    revenueGrowthPct,
    grossMarginPct,
    monthlyOperatingCosts,
    costGrowthPct,
    arDays,
    apDays,
    result,
    logEvent,
  ]);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 grid lg:grid-cols-2 gap-8 items-start">
      {/* Inputs */}
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="startingCash"
              className="block text-base font-medium text-slate-700 mb-2"
            >
              Starting Cash
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                R
              </span>
              <input
                id="startingCash"
                type="text"
                value={dispStartingCash}
                onChange={onMoney(setDispStartingCash, setStartingCash)}
                className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="monthlyRevenue"
              className="block text-base font-medium text-slate-700 mb-2"
            >
              Monthly Revenue
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                R
              </span>
              <input
                id="monthlyRevenue"
                type="text"
                value={dispMonthlyRevenue}
                onChange={onMoney(setDispMonthlyRevenue, setMonthlyRevenue)}
                className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
              />
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="revenueGrowthPct"
                className="text-base font-medium text-slate-700"
              >
                Revenue Growth (mo)
              </label>
              <span className="text-lg font-semibold text-indigo-600">
                {revenueGrowthPct.toFixed(1)}%
              </span>
            </div>
            <input
              id="revenueGrowthPct"
              type="range"
              min="-10"
              max="20"
              step="0.5"
              value={revenueGrowthPct}
              onChange={(e) => setRevenueGrowthPct(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="grossMarginPct"
                className="text-base font-medium text-slate-700"
              >
                Gross Margin
              </label>
              <span className="text-lg font-semibold text-indigo-600">
                {grossMarginPct.toFixed(0)}%
              </span>
            </div>
            <input
              id="grossMarginPct"
              type="range"
              min="0"
              max="90"
              step="1"
              value={grossMarginPct}
              onChange={(e) => setGrossMarginPct(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="monthlyOperatingCosts"
              className="block text-base font-medium text-slate-700 mb-2"
            >
              Monthly Operating Costs
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                R
              </span>
              <input
                id="monthlyOperatingCosts"
                type="text"
                value={dispMonthlyOperatingCosts}
                onChange={onMoney(
                  setDispMonthlyOperatingCosts,
                  setMonthlyOperatingCosts
                )}
                className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="costGrowthPct"
                className="text-base font-medium text-slate-700"
              >
                Opex Growth (mo)
              </label>
              <span className="text-lg font-semibold text-indigo-600">
                {costGrowthPct.toFixed(1)}%
              </span>
            </div>
            <input
              id="costGrowthPct"
              type="range"
              min="-10"
              max="20"
              step="0.5"
              value={costGrowthPct}
              onChange={(e) => setCostGrowthPct(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="arDays"
              className="block text-base font-medium text-slate-700 mb-2"
            >
              Debtor Days (AR)
            </label>
            <input
              id="arDays"
              type="number"
              min="0"
              step="1"
              value={arDays}
              onChange={(e) =>
                setArDays(Math.max(0, parseInt(e.target.value || "0", 10)))
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
          <div>
            <label
              htmlFor="apDays"
              className="block text-base font-medium text-slate-700 mb-2"
            >
              Creditor Days (AP)
            </label>
            <input
              id="apDays"
              type="number"
              min="0"
              step="1"
              value={apDays}
              onChange={(e) =>
                setApDays(Math.max(0, parseInt(e.target.value || "0", 10)))
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="text-center bg-indigo-50 p-6 rounded-2xl border border-indigo-200">
          <div className="space-y-3">
            <p className="text-sm font-medium text-indigo-700">
              ESTIMATED RUNWAY
            </p>
            <p className="text-4xl md:text-5xl font-extrabold text-indigo-900 my-2 tracking-tight">
              {Number.isFinite(result.runwayMonths)
                ? runwayParts.label
                : "No run-out"}
            </p>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Starting Cash</span>
                <span>R {fmt(startingCash)}</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Revenue</span>
                <span>R {fmt(monthlyRevenue)}</span>
              </div>
              <div className="flex justify-between">
                <span>Gross Margin</span>
                <span>{fmt(grossMarginPct, 0)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Opex</span>
                <span>R {fmt(monthlyOperatingCosts)}</span>
              </div>
              <div className="flex justify-between">
                <span>AR / AP</span>
                <span>
                  {arDays}d / {apDays}d
                </span>
              </div>
              {Number.isFinite(result.runwayMonths) ? (
                <>
                  <div className="flex justify-between pt-2 border-t font-bold">
                    <span>Run-out Date (est.)</span>
                    <span>{runOutDate || "—"}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between pt-2 border-t font-bold">
                  <span>Status</span>
                  <span>Profitable (no depletion)</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Break-even Month (ops)</span>
                <span>
                  {result.breakEvenMonth
                    ? `Month ${result.breakEvenMonth}`
                    : "Not reached"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Compact table preview (first 12 months) */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="p-3 text-left">Month</th>
                <th className="p-3 text-right">Cash</th>
                <th className="p-3 text-right">Inflow</th>
                <th className="p-3 text-right">Outflow</th>
                <th className="p-3 text-right">Revenue</th>
                <th className="p-3 text-right">Opex</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {result.series.slice(0, 12).map((r) => (
                <tr key={r.month}>
                  <td className="p-3">#{r.month}</td>
                  <td className="p-3 text-right">R {fmt(r.cash)}</td>
                  <td className="p-3 text-right">R {fmt(r.inflow)}</td>
                  <td className="p-3 text-right">R {fmt(r.outflow)}</td>
                  <td className="p-3 text-right">R {fmt(r.revenue)}</td>
                  <td className="p-3 text-right">R {fmt(r.opex)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-3 text-xs text-slate-500">
            Showing first 12 months. Adjust inputs to model different scenarios.
          </div>
        </div>
      </div>
    </div>
  );
}


