// FILE: app/components/property/CapitalGainsTaxCalculator.js
"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { calculatePropertyCGT } from "../../../utils/calculation";

const MoneyInput = ({ label, value, setter }) => {
  const formatNumber = (num) =>
    isNaN(num) ? "0" : num.toLocaleString("en-ZA");
  const onMoneyChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, "");
    const numValue = Number(rawValue);
    if (!isNaN(numValue)) setter(numValue);
  };
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
          R
        </span>
        <input
          type="text"
          value={formatNumber(value)}
          onChange={onMoneyChange}
          className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg font-semibold"
        />
      </div>
    </div>
  );
};

const FunnelRow = ({
  label,
  value,
  isDeduction = false,
  isFinal = false,
  isEmphasized = false,
}) => {
  const formatNumber = (num) =>
    isNaN(num)
      ? "0"
      : num.toLocaleString("en-ZA", { maximumFractionDigits: 0 });
  return (
    <div
      className={`flex justify-between items-center py-2 ${
        isFinal ? "border-t-2 border-indigo-200 mt-2" : ""
      }`}
    >
      <p
        className={`text-sm ${
          isFinal || isEmphasized
            ? "font-bold text-indigo-900"
            : "text-slate-600"
        }`}
      >
        {label}
      </p>
      <p
        className={`font-mono font-semibold ${
          isDeduction
            ? "text-red-600"
            : isFinal || isEmphasized
            ? "text-indigo-900"
            : "text-slate-800"
        }`}
      >
        {isDeduction ? "- " : ""}R {formatNumber(value)}
      </p>
    </div>
  );
};

export default function CapitalGainsTaxCalculator() {
  const [sellingPrice, setSellingPrice] = useState(2500000);
  const [purchasePrice, setPurchasePrice] = useState(1500000);
  const [improvements, setImprovements] = useState(150000);
  const [commissionRate, setCommissionRate] = useState(5.0);
  const [otherCosts, setOtherCosts] = useState(0);
  const [taxpayerType, setTaxpayerType] = useState("individual");
  const [marginalRate, setMarginalRate] = useState(36.0);
  const [isPrimaryResidence, setIsPrimaryResidence] = useState(true);
  const [result, setResult] = useState(null);

  const handleCalculate = useCallback(() => {
    const commission =
      Math.max(0, sellingPrice) * (Math.max(0, commissionRate) / 100);
    const cgtResult = calculatePropertyCGT({
      sellingPrice,
      purchasePrice,
      capitalImprovements: improvements,
      otherSellingCosts: commission + Math.max(0, otherCosts),
      taxpayerType,
      isPrimaryResidence,
      marginalRatePct: marginalRate,
    });
    setResult(cgtResult);
  }, [
    sellingPrice,
    purchasePrice,
    improvements,
    commissionRate,
    otherCosts,
    taxpayerType,
    isPrimaryResidence,
    marginalRate,
  ]);

  useEffect(() => {
    handleCalculate();
  }, [handleCalculate]);

  const logEvent = useCallback(async () => {
    try {
      await supabase.from("capital_gains_tax_calculator_events").insert([
        {
          event_name: "result_generated",
          selling_price: sellingPrice,
          purchase_price: purchasePrice,
          improvements,
          commission_rate: commissionRate,
          other_costs: otherCosts,
          taxpayer_type: taxpayerType,
          marginal_rate: marginalRate,
          primary_residence: isPrimaryResidence,
        },
      ]);
    } catch (e) {
      console.error("Supabase logging error:", e);
    }
  }, [
    sellingPrice,
    purchasePrice,
    improvements,
    commissionRate,
    otherCosts,
    taxpayerType,
    marginalRate,
    isPrimaryResidence,
  ]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (sellingPrice > 0) logEvent();
    }, 1500);
    return () => clearTimeout(t);
  }, [
    sellingPrice,
    purchasePrice,
    improvements,
    commissionRate,
    otherCosts,
    taxpayerType,
    marginalRate,
    isPrimaryResidence,
    logEvent,
  ]);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 grid lg:grid-cols-5 gap-8">
      {/* Inputs Column */}
      <div className="lg:col-span-2 space-y-6">
        <div id="step1">
          <h3 className="font-bold text-lg text-indigo-800 mb-2">
            Step 1: The Sale
          </h3>
          <div className="space-y-4">
            <MoneyInput
              label="Selling Price (Proceeds)"
              value={sellingPrice}
              setter={setSellingPrice}
            />
            <MoneyInput
              label="Original Purchase Price"
              value={purchasePrice}
              setter={setPurchasePrice}
            />
          </div>
        </div>
        <div id="step2">
          <h3 className="font-bold text-lg text-indigo-800 mb-2">
            Step 2: Costs & Improvements
          </h3>
          <div className="space-y-4">
            <MoneyInput
              label="Capital Improvements"
              value={improvements}
              setter={setImprovements}
            />
            <MoneyInput
              label="Other Selling Costs"
              value={otherCosts}
              setter={setOtherCosts}
            />
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-slate-700">
                  Agent Commission
                </label>
                <span className="font-semibold text-indigo-600">
                  {commissionRate.toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={commissionRate}
                onChange={(e) => setCommissionRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>
        </div>
        <div id="step3">
          <h3 className="font-bold text-lg text-indigo-800 mb-2">
            Step 3: Taxpayer Profile
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Taxpayer Type
              </label>
              <select
                value={taxpayerType}
                onChange={(e) => setTaxpayerType(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg font-semibold"
              >
                <option value="individual">Individual</option>
                <option value="company">Company</option>
                <option value="trust">Trust</option>
              </select>
            </div>
            {taxpayerType === "individual" && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-slate-700">
                    Marginal Tax Rate
                  </label>
                  <span className="font-semibold text-indigo-600">
                    {marginalRate.toFixed(0)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="45"
                  step="1"
                  value={marginalRate}
                  onChange={(e) => setMarginalRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            )}
            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
              <label
                htmlFor="primaryResidence"
                className="text-sm font-medium text-slate-700"
              >
                Primary Residence?
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="primaryResidence"
                  className="sr-only peer"
                  checked={isPrimaryResidence}
                  onChange={(e) => setIsPrimaryResidence(e.target.checked)}
                />
                <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-500"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Results Column */}
      <div className="lg:col-span-3 bg-indigo-50 p-6 rounded-2xl border border-indigo-200">
        <div className="text-center mb-6">
          <p className="text-sm font-medium text-indigo-700">
            ESTIMATED CGT PAYABLE
          </p>
          <p className="font-mono text-5xl font-extrabold text-indigo-900 my-2 tracking-tight">
            R{" "}
            {result
              ? result.cgtPayable.toLocaleString("en-ZA", {
                  maximumFractionDigits: 0,
                })
              : "0"}
          </p>
        </div>
        {result && (
          <div className="space-y-1 bg-white p-4 rounded-lg shadow-inner">
            <h4 className="font-bold text-center text-slate-700 mb-2">
              Calculation Funnel
            </h4>
            <FunnelRow label="Proceeds from Sale" value={result.proceeds} />
            <FunnelRow
              label="Base Cost"
              value={result.baseCost}
              isDeduction={true}
            />
            <FunnelRow
              label="Gross Capital Gain"
              value={result.grossCapitalGain}
              isEmphasized={true}
            />
            <FunnelRow
              label="Primary Residence Exclusion"
              value={result.primaryResidenceExclusion}
              isDeduction={true}
            />
            <FunnelRow
              label="Annual Exclusion"
              value={result.annualExclusion}
              isDeduction={true}
            />
            <FunnelRow
              label="Net Capital Gain"
              value={result.netCapitalGain}
              isEmphasized={true}
            />
            <FunnelRow
              label={`Included Gain (${result.inclusionRate * 100}%)`}
              value={result.includedGain}
            />
            <FunnelRow
              label={`Taxable at Marginal Rate (${(
                result.taxRate * 100
              ).toFixed(1)}%)`}
              value={result.cgtPayable}
              isFinal={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}
