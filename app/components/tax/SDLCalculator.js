"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { calculateSDLContribution } from "../../../utils/calculation";

// Deterministic formatter (avoids SSR/CSR locale mismatches)
const formatNumber = (n, d = 0) => {
  if (n === null || n === undefined || Number.isNaN(n)) return "0";
  const neg = n < 0 ? "-" : "";
  const abs = Math.abs(Number(n));
  const fixed = abs.toFixed(d);
  const [i, dec] = fixed.split(".");
  const withThousands = i.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return d ? `${neg}${withThousands}.${dec}` : `${neg}${withThousands}`;
};

export default function SDLCalculator() {
  const [annualPayroll, setAnnualPayroll] = useState(1200000);
  const [displayPayroll, setDisplayPayroll] = useState("1,200,000");
  const [showMonthly, setShowMonthly] = useState(false);

  const [sdlAnnual, setSdlAnnual] = useState(null);

  const handleCalculate = useCallback(() => {
    if (annualPayroll < 0) {
      setSdlAnnual(0);
      return;
    }
    const sdl = calculateSDLContribution(annualPayroll); // 1% of payroll
    setSdlAnnual(sdl);
  }, [annualPayroll]);

  const logEvent = useCallback(async () => {
    try {
      await supabase.from("sdl_calculator_events").insert([
        {
          event_name: "result_generated",
          annual_payroll: annualPayroll,
          show_monthly: showMonthly,
        },
      ]);
    } catch (e) {
      console.error("Supabase logging error:", e);
    }
  }, [annualPayroll, showMonthly]);

  useEffect(() => {
    handleCalculate();
  }, [handleCalculate]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (annualPayroll >= 0) logEvent();
    }, 1200);
    return () => clearTimeout(t);
  }, [annualPayroll, showMonthly, logEvent]);

  const handlePayrollChange = (e) => {
    const raw = e.target.value.replace(/,/g, "");
    setDisplayPayroll(raw.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    const num = Number(raw);
    if (!Number.isNaN(num)) setAnnualPayroll(num);
  };

  const displaySDL = showMonthly
    ? Math.round((sdlAnnual || 0) / 12)
    : sdlAnnual;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 grid lg:grid-cols-2 gap-8 items-start">
      {/* Inputs */}
      <div className="space-y-6">
        <div>
          <label
            htmlFor="annualPayroll"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Annual Payroll (Gross)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
              R
            </span>
            <input
              type="text"
              id="annualPayroll"
              value={displayPayroll}
              onChange={handlePayrollChange}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
          <p className="mt-1 text-xs text-slate-500">
            SDL is generally 1% of total remuneration subject to SDL.
          </p>
        </div>
      </div>

      {/* Results */}
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
          {sdlAnnual !== null ? (
            <div>
              <p className="text-sm font-medium text-indigo-700">
                ESTIMATED {showMonthly ? "MONTHLY" : "ANNUAL"} SDL
              </p>
              <p className="text-4xl md:text-5xl font-extrabold text-indigo-900 my-2 tracking-tight">
                R {formatNumber(displaySDL)}
              </p>
              <div className="text-sm space-y-1 mt-4">
                <div className="flex justify-between">
                  <span>
                    Payroll ({showMonthly ? "pm (approx.)" : "annual"})
                  </span>
                  <span>
                    R{" "}
                    {formatNumber(
                      showMonthly
                        ? Math.round(annualPayroll / 12)
                        : annualPayroll
                    )}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t font-bold">
                  <span>Rate</span>
                  <span>1.00%</span>
                </div>
              </div>
              <p className="text-xs text-indigo-700 mt-3">
                Note: Certain employers or remuneration types may be exempt.
                Confirm with SARS/SDL rules.
              </p>
            </div>
          ) : (
            <p className="text-slate-500 h-24 flex items-center justify-center">
              Enter valid payroll.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

