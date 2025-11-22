"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { calculateRatesClearance } from "../../../utils/calculation";

// Deterministic number formatter to avoid SSR/CSR locale mismatches
const formatNumber = (n, decimals = 0) => {
  if (n === null || n === undefined || Number.isNaN(n)) return "0";
  const neg = n < 0 ? "-" : "";
  const abs = Math.abs(Number(n));
  const fixed = abs.toFixed(decimals);
  const [intPart, decPart] = fixed.split(".");
  const withThousands = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimals
    ? `${neg}${withThousands}.${decPart}`
    : `${neg}${withThousands}`;
};

export default function RatesClearanceEstimator() {
  const [rates, setRates] = useState(1100);
  const [dispRates, setDispRates] = useState("1,100");

  const [water, setWater] = useState(400);
  const [dispWater, setDispWater] = useState("400");

  const [electricity, setElectricity] = useState(900);
  const [dispElectricity, setDispElectricity] = useState("900");

  const [refuse, setRefuse] = useState(250);
  const [dispRefuse, setDispRefuse] = useState("250");

  const [sanitation, setSanitation] = useState(300);
  const [dispSanitation, setDispSanitation] = useState("300");

  const [months, setMonths] = useState(3);
  const [adminFee, setAdminFee] = useState(800);
  const [dispAdminFee, setDispAdminFee] = useState("800");

  const [arrears, setArrears] = useState(0);
  const [dispArrears, setDispArrears] = useState("0");

  const [credits, setCredits] = useState(0);
  const [dispCredits, setDispCredits] = useState("0");

  const [result, setResult] = useState(null);

  const onMoney = (setDisplay, setValue) => (e) => {
    const raw = e.target.value.replace(/,/g, "");
    setDisplay(raw.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    const num = Number(raw);
    if (!Number.isNaN(num)) setValue(num);
  };

  const handleCalculate = useCallback(() => {
    const r = calculateRatesClearance(
      rates,
      water,
      electricity,
      refuse,
      sanitation,
      months,
      adminFee,
      arrears,
      credits
    );
    setResult(r);
  }, [
    rates,
    water,
    electricity,
    refuse,
    sanitation,
    months,
    adminFee,
    arrears,
    credits,
  ]);

  const logEvent = useCallback(async () => {
    try {
      await supabase.from("rates_clearance_estimator_events").insert([
        {
          event_name: "result_generated",
          monthly_rates: rates,
          monthly_water: water,
          monthly_electricity: electricity,
          monthly_refuse: refuse,
          monthly_sanitation: sanitation,
          clearance_months: months,
          admin_fee: adminFee,
          arrears: arrears,
          credits: credits,
        },
      ]);
    } catch (e) {
      console.error("Supabase logging error:", e);
    }
  }, [
    rates,
    water,
    electricity,
    refuse,
    sanitation,
    months,
    adminFee,
    arrears,
    credits,
  ]);

  useEffect(() => {
    handleCalculate();
  }, [handleCalculate]);

  useEffect(() => {
    const t = setTimeout(() => {
      logEvent();
    }, 1200);
    return () => clearTimeout(t);
  }, [
    rates,
    water,
    electricity,
    refuse,
    sanitation,
    months,
    adminFee,
    arrears,
    credits,
    logEvent,
  ]);

  const monthlyTotal =
    (Number(rates) || 0) +
    (Number(water) || 0) +
    (Number(electricity) || 0) +
    (Number(refuse) || 0) +
    (Number(sanitation) || 0);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 grid lg:grid-cols-2 gap-8 items-start">
      {/* Inputs */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="rates"
              className="block text-base font-medium text-slate-700 mb-2"
            >
              Property Rates (pm)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                R
              </span>
              <input
                id="rates"
                type="text"
                value={dispRates}
                onChange={onMoney(setDispRates, setRates)}
                className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="water"
              className="block text-base font-medium text-slate-700 mb-2"
            >
              Water (pm)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                R
              </span>
              <input
                id="water"
                type="text"
                value={dispWater}
                onChange={onMoney(setDispWater, setWater)}
                className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="electricity"
              className="block text-base font-medium text-slate-700 mb-2"
            >
              Electricity (pm)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                R
              </span>
              <input
                id="electricity"
                type="text"
                value={dispElectricity}
                onChange={onMoney(setDispElectricity, setElectricity)}
                className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="refuse"
              className="block text-base font-medium text-slate-700 mb-2"
            >
              Refuse (pm)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                R
              </span>
              <input
                id="refuse"
                type="text"
                value={dispRefuse}
                onChange={onMoney(setDispRefuse, setRefuse)}
                className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="sanitation"
              className="block text-base font-medium text-slate-700 mb-2"
            >
              Sanitation (pm)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                R
              </span>
              <input
                id="sanitation"
                type="text"
                value={dispSanitation}
                onChange={onMoney(setDispSanitation, setSanitation)}
                className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
              />
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border">
          <div className="flex justify-between">
            <span className="text-sm text-slate-600">Monthly Total</span>
            <span className="text-lg font-bold text-slate-900">
              R {formatNumber(monthlyTotal)}
            </span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="months"
              className="text-base font-medium text-slate-700"
            >
              Clearance Period
            </label>
            <span className="text-lg font-semibold text-indigo-600">
              {months} months
            </span>
          </div>
          <input
            id="months"
            type="range"
            min="2"
            max="6"
            step="1"
            value={months}
            onChange={(e) => setMonths(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <p className="text-xs text-slate-500 mt-1">
            Most municipalities require 2–6 months prepaid.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="adminFee"
              className="block text-base font-medium text-slate-700 mb-2"
            >
              Admin/Cert Fee
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                R
              </span>
              <input
                id="adminFee"
                type="text"
                value={dispAdminFee}
                onChange={onMoney(setDispAdminFee, setAdminFee)}
                className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="arrears"
              className="block text-base font-medium text-slate-700 mb-2"
            >
              Arrears to Settle
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                R
              </span>
              <input
                id="arrears"
                type="text"
                value={dispArrears}
                onChange={onMoney(setDispArrears, setArrears)}
                className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="credits"
              className="block text-base font-medium text-slate-700 mb-2"
            >
              Existing Credits
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                R
              </span>
              <input
                id="credits"
                type="text"
                value={dispCredits}
                onChange={onMoney(setDispCredits, setCredits)}
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
                <p className="text-sm font-medium text-indigo-700">
                  ESTIMATED RATES CLEARANCE AMOUNT
                </p>
                <p className="text-4xl md:text-5xl font-extrabold text-indigo-900 my-2 tracking-tight">
                  R {formatNumber(result.totalDue)}
                </p>
              </div>
              <div className="text-sm space-y-1 text-left">
                <div className="flex justify-between">
                  <span>Monthly Total</span>
                  <span>R {formatNumber(result.monthlyTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Prepaid for {months} months</span>
                  <span>R {formatNumber(result.prepaidForMonths)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Admin/Certificate Fee</span>
                  <span>R {formatNumber(result.adminFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Arrears</span>
                  <span>R {formatNumber(result.arrears)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t font-bold">
                  <span>Less Credits</span>
                  <span>− R {formatNumber(result.credits)}</span>
                </div>
              </div>
              <p className="text-xs text-indigo-700">
                Note: This is an estimate. Your municipality issues the official
                clearance figure.
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

