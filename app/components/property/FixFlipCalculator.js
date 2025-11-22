"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { calculateFixFlipProfit } from "../../../utils/calculation";

// Deterministic formatter
const fmt = (n, d = 0) => {
  if (n === null || n === undefined || isNaN(n)) return "0";
  const neg = n < 0 ? "-" : "";
  const abs = Math.abs(Number(n));
  const fixed = abs.toFixed(d);
  const [i, dec] = fixed.split(".");
  const withThousands = i.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return d ? `${neg}${withThousands}.${dec}` : `${neg}${withThousands}`;
};

export default function FixFlipCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(1500000);
  const [dispPurchase, setDispPurchase] = useState("1,500,000");

  const [rehabCosts, setRehabCosts] = useState(200000);
  const [dispRehab, setDispRehab] = useState("200,000");

  const [holdingMonths, setHoldingMonths] = useState(6);
  const [monthlyHoldingCosts, setMonthlyHoldingCosts] = useState(15000);
  const [dispMonthlyHold, setDispMonthlyHold] = useState("15,000");

  const [sellingPrice, setSellingPrice] = useState(1900000);
  const [dispSelling, setDispSelling] = useState("1,900,000");

  const [sellingCostsPct, setSellingCostsPct] = useState(5.0);
  const [extraSellingCosts, setExtraSellingCosts] = useState(15000);
  const [dispExtraSelling, setDispExtraSelling] = useState("15,000");

  const [result, setResult] = useState(null);

  const onMoney = (setDisp, setVal) => (e) => {
    const raw = e.target.value.replace(/,/g, "");
    setDisp(
      raw.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
    const num = Number(raw);
    if (!isNaN(num)) setVal(num);
  };

  const recalc = useCallback(() => {
    const r = calculateFixFlipProfit({
      purchasePrice,
      rehabCosts,
      holdingMonths,
      monthlyHoldingCosts,
      sellingPrice,
      sellingCostsPct: sellingCostsPct / 100,
      extraSellingCosts,
    });
    setResult(r);
  }, [
    purchasePrice,
    rehabCosts,
    holdingMonths,
    monthlyHoldingCosts,
    sellingPrice,
    sellingCostsPct,
    extraSellingCosts,
  ]);

  const logEvent = useCallback(async () => {
    try {
      await supabase.from("fix_flip_calculator_events").insert([
        {
          event_name: "result_generated",
          purchase_price: purchasePrice,
          rehab_costs: rehabCosts,
          holding_months: holdingMonths,
          monthly_holding_costs: monthlyHoldingCosts,
          selling_price: sellingPrice,
          selling_costs_pct: sellingCostsPct,
          extra_selling_costs: extraSellingCosts,
        },
      ]);
    } catch (e) {
      console.error("Supabase logging error:", e);
    }
  }, [
    purchasePrice,
    rehabCosts,
    holdingMonths,
    monthlyHoldingCosts,
    sellingPrice,
    sellingCostsPct,
    extraSellingCosts,
  ]);

  useEffect(() => {
    recalc();
  }, [recalc]);

  useEffect(() => {
    const t = setTimeout(() => logEvent(), 1200);
    return () => clearTimeout(t);
  }, [
    purchasePrice,
    rehabCosts,
    holdingMonths,
    monthlyHoldingCosts,
    sellingPrice,
    sellingCostsPct,
    extraSellingCosts,
    logEvent,
  ]);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 grid lg:grid-cols-2 gap-8 items-start">
      {/* Inputs */}
      <div className="space-y-6">
        <div>
          <label htmlFor="purchasePrice" className="block text-base font-medium text-slate-700 mb-2">
            Purchase Price
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">R</span>
            <input
              id="purchasePrice"
              type="text"
              value={dispPurchase}
              onChange={onMoney(setDispPurchase, setPurchasePrice)}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
        </div>

        <div>
          <label htmlFor="rehabCosts" className="block text-base font-medium text-slate-700 mb-2">
            Rehab / Improvement Costs
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">R</span>
            <input
              id="rehabCosts"
              type="text"
              value={dispRehab}
              onChange={onMoney(setDispRehab, setRehabCosts)}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="holdingMonths" className="block text-base font-medium text-slate-700 mb-2">
              Holding Period (Months)
            </label>
            <input
              id="holdingMonths"
              type="number"
              min="0"
              step="1"
              value={holdingMonths}
              onChange={(e) => setHoldingMonths(Math.max(0, parseInt(e.target.value || "0", 10)))}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
          <div>
            <label htmlFor="monthlyHoldingCosts" className="block text-base font-medium text-slate-700 mb-2">
              Monthly Holding Costs
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">R</span>
              <input
                id="monthlyHoldingCosts"
                type="text"
                value={dispMonthlyHold}
                onChange={onMoney(setDispMonthlyHold, setMonthlyHoldingCosts)}
                className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="sellingPrice" className="block text-base font-medium text-slate-700 mb-2">
            Target Selling Price
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">R</span>
            <input
              id="sellingPrice"
              type="text"
              value={dispSelling}
              onChange={onMoney(setDispSelling, setSellingPrice)}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="sellingCostsPct" className="block text-base font-medium text-slate-700 mb-2">
              Selling Costs % (Agent etc.)
            </label>
            <input
              id="sellingCostsPct"
              type="number"
              min="0"
              step="0.1"
              value={sellingCostsPct}
              onChange={(e) => setSellingCostsPct(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
          <div>
            <label htmlFor="extraSellingCosts" className="block text-base font-medium text-slate-700 mb-2">
              Extra Selling Costs (R)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">R</span>
              <input
                id="extraSellingCosts"
                type="text"
                value={dispExtraSelling}
                onChange={onMoney(setDispExtraSelling, setExtraSellingCosts)}
                className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="text-center bg-indigo-50 p-6 rounded-2xl border border-indigo-200">
          {result ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-indigo-700">NET PROFIT</p>
                <p className={`text-4xl md:text-5xl font-extrabold my-2 tracking-tight ${result.netProfit >= 0 ? "text-indigo-900" : "text-red-600"}`}>
                  R {fmt(result.netProfit)}
                </p>
                <p className="text-xs text-indigo-700">
                  ROI: {fmt(result.roiPct, 2)}% | Annualized: {fmt(result.annualizedRoiPct, 2)}%
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-sm text-left">
                <div className="bg-white rounded-xl border p-4 space-y-1">
                  <p className="font-semibold text-slate-800 mb-1">Acquisition</p>
                  <div className="flex justify-between"><span>Purchase</span><span>R {fmt(purchasePrice)}</span></div>
                  <div className="flex justify-between"><span>Transfer Duty</span><span>R {fmt(result.transferDuty)}</span></div>
                  <div className="flex justify-between"><span>Rehab</span><span>R {fmt(rehabCosts)}</span></div>
                  <div className="flex justify-between"><span>Acquisition Costs</span><span>R {fmt(result.acquisitionCosts)}</span></div>
                </div>
                <div className="bg-white rounded-xl border p-4 space-y-1">
                  <p className="font-semibold text-slate-800 mb-1">Exit</p>
                  <div className="flex justify-between"><span>Holding (<span className="font-mono">{holdingMonths}m</span>)</span><span>R {fmt(result.holdingCostTotal)}</span></div>
                  <div className="flex justify-between"><span>Selling Costs</span><span>R {fmt(result.sellingCosts)}</span></div>
                  <div className="flex justify-between"><span>Total Cost</span><span>R {fmt(result.totalCost)}</span></div>
                  <div className="flex justify-between font-bold border-t pt-1"><span>Gross Profit</span><span>R {fmt(result.grossProfit)}</span></div>
                </div>
              </div>

              <div className="bg-white rounded-xl border p-4 text-xs space-y-1">
                <div className="flex justify-between"><span>Margin on Sale</span><span>{fmt(result.marginPct, 2)}%</span></div>
                <div className="flex justify-between"><span>Annualized ROI</span><span>{fmt(result.annualizedRoiPct, 2)}%</span></div>
              </div>

              <p className="text-xs text-indigo-700">
                Estimates only. Interest, tax on profit & unforeseen costs not included.
              </p>
            </div>
          ) : (
            <p className="text-slate-500 h-24 flex items-center justify-center">Enter values.</p>
          )}
        </div>
      </div>
    </div>
  );
}

