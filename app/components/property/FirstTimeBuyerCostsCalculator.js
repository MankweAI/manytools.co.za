"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { calculateOnceOffCosts } from "../../../utils/calculation";

// Deterministic formatter to avoid SSR/CSR locale mismatches
const fmt = (n, d = 0) => {
  if (n === null || n === undefined || Number.isNaN(n)) return "0";
  const neg = n < 0 ? "-" : "";
  const abs = Math.abs(Number(n));
  const fixed = abs.toFixed(d);
  const [i, dec] = fixed.split(".");
  const withThousands = i.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return d ? `${neg}${withThousands}.${dec}` : `${neg}${withThousands}`;
};

export default function FirstTimeBuyerCostsCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(1850000);
  const [dispPurchasePrice, setDispPurchasePrice] = useState("1,850,000");

  const [depositAmount, setDepositAmount] = useState(185000); // ~10%
  const [dispDepositAmount, setDispDepositAmount] = useState("185,000");

  const [movingCosts, setMovingCosts] = useState(15000);
  const [dispMovingCosts, setDispMovingCosts] = useState("15,000");

  const [repairsSetup, setRepairsSetup] = useState(10000);
  const [dispRepairsSetup, setDispRepairsSetup] = useState("10,000");

  const [furnitureAppliances, setFurnitureAppliances] = useState(25000);
  const [dispFurnitureAppliances, setDispFurnitureAppliances] =
    useState("25,000");

  const [contingencyPct, setContingencyPct] = useState(5); // %
  const [includeFurniture, setIncludeFurniture] = useState(true);

  const [result, setResult] = useState(null);

  const loanAmount = useMemo(() => {
    const v = Math.max(0, purchasePrice - depositAmount);
    return Number.isFinite(v) ? v : 0;
  }, [purchasePrice, depositAmount]);

  const onMoney = (setDisp, setVal) => (e) => {
    const raw = e.target.value.replace(/,/g, "");
    setDisp(raw.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    const num = Number(raw);
    if (!Number.isNaN(num)) setVal(num);
  };

  const recalc = useCallback(() => {
    const onceOff = calculateOnceOffCosts(
      Math.max(0, purchasePrice),
      Math.max(0, loanAmount)
    );
    const extrasBase =
      Math.max(0, movingCosts) +
      Math.max(0, repairsSetup) +
      (includeFurniture ? Math.max(0, furnitureAppliances) : 0);

    const deposit = Math.max(0, depositAmount);
    const cashBeforeTransfer = deposit + onceOff.totalOnceOffCosts;
    const contingencyRand =
      ((deposit + onceOff.totalOnceOffCosts + extrasBase) *
        Math.max(0, contingencyPct)) /
      100;

    const cashAfterTransfer = extrasBase + contingencyRand;
    const totalCashNeeded = cashBeforeTransfer + cashAfterTransfer;

    const deedsAndSundries = Math.max(
      0,
      onceOff.totalOnceOffCosts -
        (onceOff.transferDuty +
          onceOff.conveyancingFees +
          onceOff.bondRegistrationFees)
    );

    setResult({
      onceOff,
      deedsAndSundries,
      cashBeforeTransfer,
      cashAfterTransfer,
      contingencyRand,
      totalCashNeeded,
      deposit,
    });
  }, [
    purchasePrice,
    loanAmount,
    depositAmount,
    movingCosts,
    repairsSetup,
    furnitureAppliances,
    includeFurniture,
    contingencyPct,
  ]);

  const logEvent = useCallback(async () => {
    try {
      await supabase.from("first_time_buyer_costs_calculator_events").insert([
        {
          event_name: "result_generated",
          purchase_price: purchasePrice,
          deposit_amount: depositAmount,
          loan_amount: loanAmount,
          moving_costs: movingCosts,
          repairs_setup: repairsSetup,
          furniture_appliances: furnitureAppliances,
          include_furniture: includeFurniture,
          contingency_pct: contingencyPct,
        },
      ]);
    } catch (e) {
      console.error("Supabase logging error:", e);
    }
  }, [
    purchasePrice,
    depositAmount,
    loanAmount,
    movingCosts,
    repairsSetup,
    furnitureAppliances,
    includeFurniture,
    contingencyPct,
  ]);

  useEffect(() => {
    recalc();
  }, [recalc]);

  useEffect(() => {
    const t = setTimeout(() => logEvent(), 1200);
    return () => clearTimeout(t);
  }, [
    purchasePrice,
    depositAmount,
    loanAmount,
    movingCosts,
    repairsSetup,
    furnitureAppliances,
    includeFurniture,
    contingencyPct,
    logEvent,
  ]);

  const depositPct =
    purchasePrice > 0
      ? Math.round(
          (Math.min(depositAmount, purchasePrice) / purchasePrice) * 1000
        ) / 10
      : 0;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 grid lg:grid-cols-2 gap-8 items-start">
      {/* Inputs */}
      <div className="space-y-6">
        <div>
          <label
            htmlFor="purchasePrice"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Property Purchase Price
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
              R
            </span>
            <input
              id="purchasePrice"
              type="text"
              value={dispPurchasePrice}
              onChange={onMoney(setDispPurchasePrice, setPurchasePrice)}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="depositAmount"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Deposit Amount
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
              R
            </span>
            <input
              id="depositAmount"
              type="text"
              value={dispDepositAmount}
              onChange={onMoney(setDispDepositAmount, setDepositAmount)}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Deposit: {fmt(depositPct, 1)}%
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="movingCosts"
              className="block text-base font-medium text-slate-700 mb-2"
            >
              Moving Costs
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                R
              </span>
              <input
                id="movingCosts"
                type="text"
                value={dispMovingCosts}
                onChange={onMoney(setDispMovingCosts, setMovingCosts)}
                className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="repairsSetup"
              className="block text-base font-medium text-slate-700 mb-2"
            >
              Immediate Repairs/Setup
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                R
              </span>
              <input
                id="repairsSetup"
                type="text"
                value={dispRepairsSetup}
                onChange={onMoney(setDispRepairsSetup, setRepairsSetup)}
                className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
              />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="furnitureAppliances"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Furniture & Appliances (Optional)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
              R
            </span>
            <input
              id="furnitureAppliances"
              type="text"
              value={dispFurnitureAppliances}
              onChange={onMoney(
                setDispFurnitureAppliances,
                setFurnitureAppliances
              )}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
              disabled={!includeFurniture}
            />
          </div>
          <div className="mt-2 flex items-center space-x-2">
            <input
              id="includeFurniture"
              type="checkbox"
              checked={includeFurniture}
              onChange={(e) => setIncludeFurniture(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor="includeFurniture"
              className="text-sm text-slate-700"
            >
              Include furniture/appliances in budget
            </label>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="contingencyPct"
              className="text-base font-medium text-slate-700"
            >
              Contingency Buffer
            </label>
            <span className="text-lg font-semibold text-indigo-600">
              {contingencyPct > 0 ? contingencyPct.toFixed(0) : "0"}%
            </span>
          </div>
          <input
            id="contingencyPct"
            type="range"
            min="0"
            max="15"
            step="1"
            value={contingencyPct}
            onChange={(e) => setContingencyPct(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-200">
          {result ? (
            <div className="space-y-5">
              <div className="text-center">
                <p className="text-sm font-medium text-indigo-700">
                  TOTAL CASH NEEDED (EST.)
                </p>
                <p className="text-4xl md:text-5xl font-extrabold text-indigo-900 my-2 tracking-tight">
                  R {fmt(result.totalCashNeeded)}
                </p>
              </div>

              <div className="text-sm space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Cash Before Transfer</span>
                  <span className="font-bold text-slate-900">
                    R {fmt(result.cashBeforeTransfer)}
                  </span>
                </div>
                <div className="pl-3 space-y-1">
                  <div className="flex justify-between">
                    <span>• Deposit</span>
                    <span>R {fmt(result.deposit)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Transfer Duty</span>
                    <span>R {fmt(result.onceOff.transferDuty)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Transfer Attorney (Est.)</span>
                    <span>R {fmt(result.onceOff.conveyancingFees)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Bond Registration (Est.)</span>
                    <span>R {fmt(result.onceOff.bondRegistrationFees)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Deeds & Sundries (Est.)</span>
                    <span>R {fmt(result.deedsAndSundries)}</span>
                  </div>
                </div>

                <div className="flex justify-between pt-2 border-t">
                  <span className="text-slate-600">After-Transfer Add-ons</span>
                  <span className="font-bold text-slate-900">
                    R {fmt(result.cashAfterTransfer)}
                  </span>
                </div>
                <div className="pl-3 space-y-1">
                  <div className="flex justify-between">
                    <span>• Moving</span>
                    <span>R {fmt(movingCosts)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Repairs/Setup</span>
                    <span>R {fmt(repairsSetup)}</span>
                  </div>
                  {includeFurniture && (
                    <div className="flex justify-between">
                      <span>• Furniture/Appliances</span>
                      <span>R {fmt(furnitureAppliances)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>• Contingency ({contingencyPct}%)</span>
                    <span>R {fmt(result.contingencyRand)}</span>
                  </div>
                </div>

                <div className="flex justify-between pt-3 border-t font-bold">
                  <span>Total Cash Needed</span>
                  <span>R {fmt(result.totalCashNeeded)}</span>
                </div>
              </div>

              <p className="text-xs text-indigo-700">
                Note: Estimates only. Get formal quotes for transfer and bond
                attorney fees, and confirm moving costs.
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


