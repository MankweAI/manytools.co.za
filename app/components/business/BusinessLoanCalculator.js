"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "../../../utils/supabaseClient";

// Deterministic formatter to avoid SSR/CSR locale mismatches
const fmt = (n, d = 0) => {
  if (n === null || n === undefined || Number.isNaN(n)) return "0";
  const neg = Number(n) < 0 ? "-" : "";
  const abs = Math.abs(Number(n));
  const fixed = abs.toFixed(d);
  const [i, dec] = fixed.split(".");
  const withThousands = i.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return d ? `${neg}${withThousands}.${dec}` : `${neg}${withThousands}`;
};

// Amortization payment (principal only)
const pmt = (principal, annualRatePct, years) => {
  const P = Math.max(0, Number(principal) || 0);
  const r = Math.max(0, Number(annualRatePct) || 0) / 100 / 12;
  const n = Math.max(0, Math.round((Number(years) || 0) * 12));
  if (P <= 0 || r <= 0 || n <= 0) return 0;
  return (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
};

export default function BusinessLoanCalculator() {
  // Inputs
  const [loanAmount, setLoanAmount] = useState(500000);
  const [dispLoanAmount, setDispLoanAmount] = useState("500,000");

  const [interestRate, setInterestRate] = useState(15.0);
  const [loanTermYears, setLoanTermYears] = useState(5);

  const [initiationFee, setInitiationFee] = useState(1200);
  const [dispInitiationFee, setDispInitiationFee] = useState("1,200");
  const [addInitiationToLoan, setAddInitiationToLoan] = useState(true);

  const [monthlyServiceFee, setMonthlyServiceFee] = useState(69);
  const [dispMonthlyServiceFee, setDispMonthlyServiceFee] = useState("69");

  // Results
  const [result, setResult] = useState(null);

  const onMoney = (setDisplay, setValue) => (e) => {
    const raw = e.target.value.replace(/,/g, "");
    setDisplay(raw.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    const num = Number(raw);
    if (!Number.isNaN(num)) setValue(num);
  };

  const months = useMemo(
    () => Math.max(0, Math.round(loanTermYears * 12)),
    [loanTermYears]
  );

  const compute = useCallback(() => {
    const basePrincipal = Math.max(0, loanAmount);
    const initFee = Math.max(0, initiationFee);
    const monthlyFee = Math.max(0, monthlyServiceFee);

    const principalForAmort =
      basePrincipal + (addInitiationToLoan ? initFee : 0);
    const monthlyCapitalPayment = pmt(
      principalForAmort,
      interestRate,
      loanTermYears
    );
    const monthlyDue = monthlyCapitalPayment + monthlyFee;

    const totalPaid = monthlyDue * months + (addInitiationToLoan ? 0 : initFee);
    const totalInterest = Math.max(
      0,
      monthlyCapitalPayment * months - principalForAmort
    );
    const totalFees =
      (addInitiationToLoan ? 0 : initFee) +
      monthlyFee * months +
      (addInitiationToLoan ? initFee : 0); // counts initiation whether financed or upfront as fee
    const aprApprox = interestRate; // simple display (not true APR with fees)

    setResult({
      monthlyCapitalPayment,
      monthlyServiceFee: monthlyFee,
      monthlyDue,
      totalPaid,
      totalInterest,
      totalFees,
      principalForAmort,
      aprApprox,
    });
  }, [
    loanAmount,
    initiationFee,
    monthlyServiceFee,
    addInitiationToLoan,
    interestRate,
    loanTermYears,
    months,
  ]);

  const logEvent = useCallback(async () => {
    try {
      await supabase.from("business_loan_calculator_events").insert([
        {
          event_name: "result_generated",
          loan_amount: loanAmount,
          interest_rate: interestRate,
          term_years: loanTermYears,
          initiation_fee: initiationFee,
          add_initiation_to_loan: addInitiationToLoan,
          monthly_service_fee: monthlyServiceFee,
        },
      ]);
    } catch (e) {
      console.error("Supabase logging error:", e);
    }
  }, [
    loanAmount,
    interestRate,
    loanTermYears,
    initiationFee,
    addInitiationToLoan,
    monthlyServiceFee,
  ]);

  useEffect(() => {
    compute();
  }, [compute]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (loanAmount >= 0) logEvent();
    }, 1200);
    return () => clearTimeout(t);
  }, [
    loanAmount,
    interestRate,
    loanTermYears,
    initiationFee,
    addInitiationToLoan,
    monthlyServiceFee,
    logEvent,
  ]);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 grid lg:grid-cols-2 gap-8 items-start">
      {/* Inputs */}
      <div className="space-y-6">
        <div>
          <label
            htmlFor="loanAmount"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Loan Amount
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
              R
            </span>
            <input
              id="loanAmount"
              type="text"
              value={dispLoanAmount}
              onChange={onMoney(setDispLoanAmount, setLoanAmount)}
              className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="interestRate"
              className="text-base font-medium text-slate-700"
            >
              Annual Interest Rate
            </label>
            <span className="text-lg font-semibold text-indigo-600">
              {interestRate > 0 ? interestRate.toFixed(2) : "0.00"}%
            </span>
          </div>
          <input
            id="interestRate"
            type="range"
            min="5"
            max="30"
            step="0.25"
            value={interestRate}
            onChange={(e) => setInterestRate(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="loanTermYears"
              className="text-base font-medium text-slate-700"
            >
              Loan Term
            </label>
            <span className="text-lg font-semibold text-indigo-600">
              {loanTermYears} Years
            </span>
          </div>
          <input
            id="loanTermYears"
            type="range"
            min="1"
            max="10"
            step="1"
            value={loanTermYears}
            onChange={(e) => setLoanTermYears(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="initiationFee"
              className="block text-base font-medium text-slate-700 mb-2"
            >
              Initiation Fee (once-off)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                R
              </span>
              <input
                id="initiationFee"
                type="text"
                value={dispInitiationFee}
                onChange={onMoney(setDispInitiationFee, setInitiationFee)}
                className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
              />
            </div>
            <label className="flex items-center space-x-2 mt-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={addInitiationToLoan}
                onChange={(e) => setAddInitiationToLoan(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Add initiation fee to loan</span>
            </label>
          </div>
          <div>
            <label
              htmlFor="monthlyServiceFee"
              className="block text-base font-medium text-slate-700 mb-2"
            >
              Monthly Service Fee
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                R
              </span>
              <input
                id="monthlyServiceFee"
                type="text"
                value={dispMonthlyServiceFee}
                onChange={onMoney(
                  setDispMonthlyServiceFee,
                  setMonthlyServiceFee
                )}
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
                  ESTIMATED MONTHLY DUE
                </p>
                <p className="text-4xl md:text-5xl font-extrabold text-indigo-900 my-2 tracking-tight">
                  R {fmt(result.monthlyDue, 2)}
                </p>
                <p className="text-xs text-indigo-700">
                  Payment: R {fmt(result.monthlyCapitalPayment, 2)} + Service
                  fee: R {fmt(result.monthlyServiceFee, 2)}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-sm text-left">
                <div className="bg-white rounded-xl border p-4">
                  <p className="font-semibold text-slate-800 mb-2">
                    Loan Summary
                  </p>
                  <div className="flex justify-between">
                    <span>Financed Amount</span>
                    <span>R {fmt(result.principalForAmort)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Term</span>
                    <span>
                      {Math.floor(months / 12)}y {months % 12}m
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>APR (nominal)</span>
                    <span>{fmt(result.aprApprox, 2)}%</span>
                  </div>
                </div>
                <div className="bg-white rounded-xl border p-4">
                  <p className="font-semibold text-slate-800 mb-2">Totals</p>
                  <div className="flex justify-between">
                    <span>Total Interest</span>
                    <span>R {fmt(result.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Fees</span>
                    <span>R {fmt(result.totalFees)}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t pt-2">
                    <span>Total Paid</span>
                    <span>R {fmt(result.totalPaid)}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                Initiation fee can be financed or paid upfront. Monthly service
                fee added to installment.
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

