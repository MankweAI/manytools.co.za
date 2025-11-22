// FILE: app/components/ProFeatures.js
"use client";

import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";

export default function ProFeatures() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const { error } = await supabase.from("leads").insert([
        {
          email: email,
          source: "bond_calculator_pdf",
          created_at: new Date(),
        },
      ]);

      if (error) throw error;

      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-500 rounded-full opacity-10 blur-3xl"></div>

      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Get a Formal Quote PDF</h2>
          <p className="text-slate-300 mb-6">
            Need a formal document for your bank application or client? Enter
            your email to receive a branded PDF breakdown of this calculation
            including transfer costs and amortization.
          </p>

          <ul className="space-y-2 mb-6 text-sm text-slate-400">
            <li className="flex items-center">
              <svg
                className="w-4 h-4 text-emerald-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              Official Amortization Schedule
            </li>
            <li className="flex items-center">
              <svg
                className="w-4 h-4 text-emerald-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              Tax Certificate Format
            </li>
          </ul>
        </div>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          {status === "success" ? (
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3 className="font-bold text-white">Request Sent!</h3>
              <p className="text-slate-400 text-sm mt-2">
                Check your inbox shortly for your PDF report.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-300 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Generating..." : "Email Me My Quote"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
