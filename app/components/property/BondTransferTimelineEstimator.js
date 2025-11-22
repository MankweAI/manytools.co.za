"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { supabase } from "../../../utils/supabaseClient";

// Deterministic YYYY-MM-DD formatter
function toYMD(date) {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Add calendar days (no weekend/holiday logic for simplicity)
function addDays(ymd, days) {
  const [y, m, d] = ymd.split("-").map((n) => parseInt(n, 10));
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + (Number(days) || 0));
  return toYMD(
    new Date(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate())
  );
}

export default function BondTransferTimelineEstimator() {
  // Inputs
  const [startDate, setStartDate] = useState(""); // set on mount to avoid SSR mismatch
  const [includeBond, setIncludeBond] = useState(true);
  const [municipalitySpeed, setMunicipalitySpeed] = useState("normal"); // fast | normal | slow
  const [suspensiveDays, setSuspensiveDays] = useState(0);
  const [extraBufferDays, setExtraBufferDays] = useState(5);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Step overrides (optional)
  const [override, setOverride] = useState({}); // key: stepId -> days

  useEffect(() => {
    // Initialize to today (client-side only)
    if (!startDate) setStartDate(toYMD(new Date()));
  }, [startDate]);

  const baseSteps = useMemo(() => {
    // durations (calendar days)
    const muniDays =
      municipalitySpeed === "fast"
        ? 14
        : municipalitySpeed === "slow"
        ? 35
        : 21;

    const steps = [
      {
        id: "offer",
        label: "Offer accepted & sale agreement signed",
        days: 3,
        always: true,
      },
      {
        id: "deposit_fica",
        label: "Deposit paid and FICA to transfer attorney",
        days: 3,
        always: true,
      },
      {
        id: "bond_app",
        label: "Bond application and approval",
        days: 14,
        bondOnly: true,
      },
      {
        id: "bond_instruction",
        label: "Bond instruction to attorneys",
        days: 5,
        bondOnly: true,
      },
      {
        id: "rates_clearance",
        label: "Rates clearance application (municipality)",
        days: muniDays,
        always: true,
      },
      {
        id: "transfer_duty",
        label: "Transfer duty assessment & payment",
        days: 7,
        always: true,
      },
      {
        id: "compliance",
        label: "Compliance certificates (electrical, beetle, etc.)",
        days: 7,
        always: true,
      },
      {
        id: "bond_docs",
        label: "Bond documents signing & prep",
        days: 7,
        bondOnly: true,
      },
      {
        id: "deeds_prep",
        label: "Deeds prep and lodgement booking",
        days: 7,
        always: true,
      },
      {
        id: "lodgement",
        label: "Lodgement to registration at Deeds Office",
        days: 7,
        always: true,
      },
    ];

    return steps
      .filter((s) => (s.always ? true : includeBond && s.bondOnly))
      .map((s) => ({
        ...s,
        days: Number.isFinite(override[s.id])
          ? Math.max(0, override[s.id])
          : s.days,
      }));
  }, [includeBond, municipalitySpeed, override]);

  const computed = useMemo(() => {
    if (!startDate) return null;

    const rows = [];
    let cursor = startDate;

    // Suspensive and extra buffers treated as leading/trailing buffers
    if (suspensiveDays > 0) {
      const end = addDays(cursor, suspensiveDays);
      rows.push({
        id: "suspensive",
        label: "Suspensive/special conditions (e.g. subject to sale)",
        days: suspensiveDays,
        start: cursor,
        end,
      });
      cursor = end;
    }

    for (const step of baseSteps) {
      const end = addDays(cursor, step.days);
      rows.push({
        id: step.id,
        label: step.label,
        days: step.days,
        start: cursor,
        end,
      });
      cursor = end;
    }

    let finalEnd = cursor;
    if (extraBufferDays > 0) {
      finalEnd = addDays(cursor, extraBufferDays);
      rows.push({
        id: "buffer",
        label: "Buffer (holidays, delays, bank queries)",
        days: extraBufferDays,
        start: cursor,
        end: finalEnd,
      });
    }

    const totalDays = rows.reduce((acc, r) => acc + (Number(r.days) || 0), 0);

    return {
      rows,
      totalDays,
      projectedRegistrationDate: finalEnd,
      stepCount: rows.length,
    };
  }, [startDate, baseSteps, suspensiveDays, extraBufferDays]);

  const logEvent = useCallback(async () => {
    try {
      await supabase.from("bond_transfer_timeline_estimator_events").insert([
        {
          event_name: "result_generated",
          start_date: startDate || null,
          include_bond: includeBond,
          municipality_speed: municipalitySpeed,
          suspensive_days: suspensiveDays,
          extra_buffer_days: extraBufferDays,
          step_overrides: Object.keys(override).length ? override : null,
          total_days: computed?.totalDays ?? null,
          projected_registration: computed?.projectedRegistrationDate ?? null,
        },
      ]);
    } catch (e) {
      console.error("Supabase logging error:", e);
    }
  }, [
    startDate,
    includeBond,
    municipalitySpeed,
    suspensiveDays,
    extraBufferDays,
    override,
    computed?.totalDays,
    computed?.projectedRegistrationDate,
  ]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (startDate) logEvent();
    }, 1200);
    return () => clearTimeout(t);
  }, [
    startDate,
    includeBond,
    municipalitySpeed,
    suspensiveDays,
    extraBufferDays,
    override,
    logEvent,
  ]);

  const setOverrideFor = (id) => (e) => {
    const v = Math.max(0, parseInt(e.target.value || "0", 10));
    setOverride((prev) => ({ ...prev, [id]: v }));
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 grid lg:grid-cols-2 gap-8 items-start">
      {/* Inputs */}
      <div className="space-y-6">
        <div>
          <label
            htmlFor="startDate"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Start Date (Offer Accepted)
          </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            id="includeBond"
            type="checkbox"
            checked={includeBond}
            onChange={(e) => setIncludeBond(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="includeBond" className="text-sm text-slate-700">
            Include Bond Process (uncheck for cash sale)
          </label>
        </div>

        <div>
          <label
            htmlFor="municipalitySpeed"
            className="block text-base font-medium text-slate-700 mb-2"
          >
            Municipality Processing Speed (Rates Clearance)
          </label>
          <select
            id="municipalitySpeed"
            value={municipalitySpeed}
            onChange={(e) => setMunicipalitySpeed(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
          >
            <option value="fast">Fast (±14 days)</option>
            <option value="normal">Normal (±21 days)</option>
            <option value="slow">Slow (±35 days)</option>
          </select>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="suspensiveDays"
              className="block text-base font-medium text-slate-700 mb-2"
            >
              Suspensive Conditions (days)
            </label>
            <input
              id="suspensiveDays"
              type="number"
              min="0"
              step="1"
              value={suspensiveDays}
              onChange={(e) =>
                setSuspensiveDays(
                  Math.max(0, parseInt(e.target.value || "0", 10))
                )
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
          <div>
            <label
              htmlFor="extraBufferDays"
              className="block text-base font-medium text-slate-700 mb-2"
            >
              Buffer for Delays (days)
            </label>
            <input
              id="extraBufferDays"
              type="number"
              min="0"
              step="1"
              value={extraBufferDays}
              onChange={(e) =>
                setExtraBufferDays(
                  Math.max(0, parseInt(e.target.value || "0", 10))
                )
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-lg font-semibold"
            />
          </div>
        </div>

        <details className="bg-slate-50 rounded-xl border p-4">
          <summary
            className="font-semibold text-slate-800 cursor-pointer list-none flex justify-between items-center"
            onClick={() => setShowAdvanced((s) => !s)}
          >
            Adjust Step Durations (Advanced)
            <span className="text-slate-500">{showAdvanced ? "▲" : "▼"}</span>
          </summary>
          <div className="mt-4 grid gap-3">
            {baseSteps.map((s) => (
              <div
                key={s.id}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center"
              >
                <label className="text-sm text-slate-700">{s.label}</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={override[s.id] ?? s.days}
                  onChange={setOverrideFor(s.id)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-semibold"
                />
              </div>
            ))}
          </div>
        </details>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="text-center bg-indigo-50 p-6 rounded-2xl border border-indigo-200">
          {computed ? (
            <div className="space-y-3">
              <p className="text-sm font-medium text-indigo-700">
                PROJECTED REGISTRATION DATE
              </p>
              <p className="text-4xl md:text-5xl font-extrabold text-indigo-900 my-2 tracking-tight">
                {computed.projectedRegistrationDate || "—"}
              </p>
              <div className="grid sm:grid-cols-3 gap-3 text-sm mt-4">
                <div className="bg-white rounded-xl border p-3">
                  <p className="text-slate-600">Total Calendar Days</p>
                  <p className="text-slate-900 font-bold">
                    {computed.totalDays}
                  </p>
                </div>
                <div className="bg-white rounded-xl border p-3">
                  <p className="text-slate-600">Steps</p>
                  <p className="text-slate-900 font-bold">
                    {computed.stepCount}
                  </p>
                </div>
                <div className="bg-white rounded-xl border p-3">
                  <p className="text-slate-600">Bond Included</p>
                  <p className="text-slate-900 font-bold">
                    {includeBond ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-slate-500 h-24 flex items-center justify-center">
              Select a start date.
            </p>
          )}
        </div>

        {computed && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="p-3 text-left">Step</th>
                  <th className="p-3 text-right">Days</th>
                  <th className="p-3 text-left">Start</th>
                  <th className="p-3 text-left">End</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {computed.rows.map((r) => (
                  <tr key={r.id}>
                    <td className="p-3">{r.label}</td>
                    <td className="p-3 text-right">{r.days}</td>
                    <td className="p-3">{r.start}</td>
                    <td className="p-3">{r.end}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-3 text-xs text-slate-500">
              Estimates use calendar days and typical durations. Actual
              timelines vary by bank, municipality, attorneys, and season.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

