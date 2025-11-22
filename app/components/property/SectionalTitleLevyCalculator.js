"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { calculateSectionalTitleLevyShare } from "../../../utils/calculation";

// Deterministic formatter
const fmt = (n, d = 0) => {
  if (n === null || n === undefined || Number.isNaN(n)) return "0";
  const neg = n < 0 ? "-" : "";
  const abs = Math.abs(Number(n));
  const fixed = abs.toFixed(d);
  const [i, dec] = fixed.split(".");
  const withThousands = i.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return d ? `${neg}${withThousands}.${dec}` : `${neg}${withThousands}`;
};

export default function SectionalTitleLevyCalculator() {
  const [totalLevy, setTotalLevy] = useState(35000);
  const [dispTotalLevy, setDispTotalLevy] = useState("35,000");

  const [totalPQ, setTotalPQ] = useState(10000);
  const [unitPQ, setUnitPQ] = useState(125);

  const [specialLevy, setSpecialLevy] = useState(0);
  const [dispSpecialLevy, setDispSpecialLevy] = useState("0");

  const [specialMode, setSpecialMode] = useState("pq"); // 'pq' | 'equal'
  const [unitsCount, setUnitsCount] = useState(24);

  const [result, setResult] = useState(null);

  const onMoney = (setDisp, setVal) => (e) => {
    const raw = e.target.value.replace(/,/g, "");
    setDisp(raw.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    const num = Number(raw);
    if (!Number.isNaN(num)) setVal(num);
  };

  const recalc = useCallback(() => {
    const r = calculateSectionalTitleLevyShare({
      totalLevy,
      totalPQ,
      unitPQ,
      specialLevy,
      specialMode,
      unitsCount,
    });
    setResult(r);
  }, [totalLevy, totalPQ, unitPQ, specialLevy, specialMode, unitsCount]);

  const logEvent = useCallback(async () => {
    try {
      await supabase.from("sectional_title_levy_calculator_events").insert([
        {
          event_name: "result_generated",
          total_levy: totalLevy,
          total_pq: totalPQ,
          unit_pq: unitPQ,
          special_levy: specialLevy,
          special_mode: specialMode,
          units_count: unitsCount,
        },
      ]);
    } catch (e) {
      console.error("Supabase logging error:", e);
    }
  }, [totalLevy, totalPQ, unitPQ, specialLevy, specialMode, unitsCount]);

  useEffect(() => {
    recalc();
  }, [recalc]);

  useEffect(() => {
    const t = setTimeout(() => logEvent(), 1200);
    return () => clearTimeout(t);
  }, [
    totalLevy,
    totalPQ,
    unitPQ,
    specialLevy,
    specialMode,
    unitsCount,
    logEvent,
  ]);

  const sharePct = totalPQ > 0 ? (unitPQ / totalPQ) * 100 : 0;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 grid lg:grid-cols-2 gap-8 items-start">
      {/* Inputs */}
      <div className="space-y-6">
        <div>
          <label
            htmlFor="totalLevy"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Scheme Monthly Levy (Total)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
              R
            </span>
            <input
              id="totalLevy"
              type="text"
              value={dispTotalLevy}
              onChange={onMoney(setDispTotalLevy, setTotalLevy)}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="totalPQ"
              className="block text-base font-medium text-slate-700 mb-2"
            >
              Total PQ (Scheme)
            </label>
            <input
              id="totalPQ"
              type="number"
              min="1"
              step="1"
              value={totalPQ}
              onChange={(e) =>
                setTotalPQ(Math.max(1, parseInt(e.target.value || "1", 10)))
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
          <div>
            <label
              htmlFor="unitPQ"
              className="block text-base font-medium text-slate-700 mb-2"
            >
              Your Unit PQ
            </label>
            <input
              id="unitPQ"
              type="number"
              min="0"
              step="1"
              value={unitPQ}
              onChange={(e) =>
                setUnitPQ(Math.max(0, parseInt(e.target.value || "0", 10)))
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
            <p className="mt-1 text-xs text-slate-500">
              Share: {fmt(sharePct, 2)}%
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor="specialLevy"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Special Levy (Total, if any)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
              R
            </span>
            <input
              id="specialLevy"
              type="text"
              value={dispSpecialLevy}
              onChange={onMoney(setDispSpecialLevy, setSpecialLevy)}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
          <div className="mt-3 grid sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="specialMode"
                className="block text-base font-medium text-slate-700 mb-2"
              >
                Special Levy Split
              </label>
              <select
                id="specialMode"
                value={specialMode}
                onChange={(e) => setSpecialMode(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
              >
                <option value="pq">By Participation Quota</option>
                <option value="equal">Equally Per Unit</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="unitsCount"
                className="block text-base font-medium text-slate-700 mb-2"
              >
                Units in Scheme
              </label>
              <input
                id="unitsCount"
                type="number"
                min="1"
                step="1"
                value={unitsCount}
                onChange={(e) =>
                  setUnitsCount(
                    Math.max(1, parseInt(e.target.value || "1", 10))
                  )
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
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
                <p className="text-sm font-medium text-indigo-700">
                  ESTIMATED YOUR MONTHLY DUE
                </p>
                <p className="text-4xl md:text-5xl font-extrabold text-indigo-900 my-2 tracking-tight">
                  R {fmt(result.totalDue, 2)}
                </p>
              </div>

              <div className="text-sm space-y-1 text-left">
                <div className="flex justify-between">
                  <span>Base Levy (by PQ share)</span>
                  <span>R {fmt(result.baseMonthly, 2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>
                    Special Levy (
                    {specialMode === "equal" ? "equal split" : "by PQ"})
                  </span>
                  <span>R {fmt(result.specialPerUnit, 2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t font-bold">
                  <span>Total Due</span>
                  <span>R {fmt(result.totalDue, 2)}</span>
                </div>
              </div>

              <p className="text-xs text-indigo-700 mt-3">
                Tip: Confirm your scheme&apos;s Total PQ and your Unit PQ on your
                sectional plan or levy statement.
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

