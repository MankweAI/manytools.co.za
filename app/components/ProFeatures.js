// FILE: app/components/ProFeatures.js
"use client";

import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";

export default function ProFeatures() {
  const [showNotification, setShowNotification] = useState(false);

  const logEvent = async (eventName) => {
    try {
      const { error } = await supabase
        .from("transfer_duty_calculator_events")
        .insert([{ event_name: eventName }]);
      if (error) console.error("Supabase logging error:", error.message);
    } catch (error) {
      console.error("Error in logEvent function:", error.message);
    }
  };

  const handleProClick = () => {
    logEvent("pro_features_learn_more_click");
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000); // Hide notification after 3 seconds
  };

  return (
    <>
      {showNotification && (
        <div className="fixed top-5 right-5 bg-slate-800 text-white py-3 px-5 rounded-lg shadow-lg z-50 animate-fade-in-out">
          Thanks for your interest! Pro features are coming soon.
        </div>
      )}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">
          Unlock Pro Features
        </h2>
        <p className="mb-8 text-slate-600 text-center max-w-lg mx-auto">
          For real estate agents, attorneys, and serious investors, our upcoming
          Pro Tier will offer powerful workflow tools.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="flex items-start space-x-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="flex-shrink-0 h-10 w-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <line x1="10" y1="9" x2="8" y2="9" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Export to PDF</h3>
              <p className="text-sm text-slate-500">
                Generate professional, branded cost breakdowns for clients.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="flex-shrink-0 h-10 w-10 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Save Scenarios</h3>
              <p className="text-sm text-slate-500">
                Compare costs for multiple properties side-by-side.
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <button
            onClick={handleProClick}
            className="bg-slate-800 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-slate-900 transition-colors"
          >
            Coming Soon: Learn More
          </button>
        </div>
      </div>
    </>
  );
}
