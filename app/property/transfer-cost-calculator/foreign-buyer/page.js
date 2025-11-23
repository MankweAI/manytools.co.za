// FILE: app/property/transfer-cost-calculator/foreign-buyer/page.js
import TransferCostCalculator from "../../../components/property/TransferCostCalculator";
import NextSteps from "../../../components/NextSteps";
import ProFeatures from "../../../components/ProFeatures";
import Link from "next/link";

export const metadata = {
  title:
    "Foreign Buyer Transfer Cost Calculator | Non-Resident Property Costs SA",
  description:
    "Calculate property transfer costs for non-residents in South Africa. Includes transfer duty, attorney fees, and the 50% deposit requirement rule.",
  alternates: {
    canonical:
      "https://manytools.co.za/property/transfer-cost-calculator/foreign-buyer",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Non-Resident Property Cost Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
  description:
    "Calculates transfer costs and required cash for foreign buyers investing in South African property, accounting for the 50% non-resident lending cap.",
  author: { "@type": "Organization", name: "ManyTools South Africa" },
};

export default function ForeignBuyerPage() {
  const PRICE = 3000000; // R3m is a typical luxury entry point for foreign buyers

  // Configuration: Enforce the 50% deposit rule in the defaults
  const foreignDefaults = {
    price: PRICE,
    loanAmount: PRICE * 0.5, // 50% Lending restriction
    isForeignBuyer: true,
  };

  const faqs = [
    {
      q: "Do foreigners pay higher Transfer Duty?",
      a: "No. The Transfer Duty rates are the same for residents and non-residents. It is a tax on the property transaction, not the person.",
    },
    {
      q: "How much can a non-resident borrow?",
      a: "Generally, South African banks will lend up to 50% of the purchase price to non-residents. You will need to bring the other 50% plus cash for transfer costs into the country.",
    },
    {
      q: "Can I use funds currently in South Africa?",
      a: "Yes. If you have funds in a blocked Rand account or other transferable funds within SA, these can be used for the deposit. However, the 1:1 Rand lending rule usually applies to money introduced from abroad.",
    },
  ];

  return (
    <main className="bg-orange-50 min-h-screen font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-5xl mx-auto p-4 sm:p-8">
        <header className="mb-10 text-center">
          <div className="inline-block bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
            INTERNATIONAL BUYER GUIDE
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Non-Resident Transfer Cost Calculator
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Estimate the total cash required to buy South African property,
            considering the{" "}
            <strong className="text-orange-600">50% deposit rule</strong> for
            foreign loans.
          </p>
        </header>

        <div className="space-y-16">
          {/* Main Calculator */}
          <section id="calculator-section">
            <TransferCostCalculator defaults={foreignDefaults} />
          </section>

          {/* Important Considerations (formerly Sidebar) */}
          <section className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl border border-orange-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-3">
                Lending Restrictions
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                As a non-resident, your bond is typically limited to 50% of the
                purchase price. The calculator has been pre-set to this limit.
              </p>
              <Link
                href="/property/bond-repayment-calculator"
                className="text-orange-600 font-semibold text-sm hover:underline"
              >
                Check Bond Repayments &rarr;
              </Link>
            </div>

            <div className="bg-orange-100 p-6 rounded-xl border border-orange-200">
              <h3 className="font-bold text-orange-900 mb-3">
                Exchange Rate Note
              </h3>
              <p className="text-sm text-orange-800">
                Remember that your transfer duty and attorney fees must be paid
                in ZAR. Fluctuations in the exchange rate can significantly
                affect your final cost in your home currency.
              </p>
            </div>
          </section>

          {/* Definitions */}
          <section className="bg-white p-8 rounded-2xl border border-orange-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              Key Concepts for International Buyers
            </h2>
            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              <div className="p-4 bg-orange-50 rounded-lg">
                <dt className="font-bold text-orange-900 mb-2">Transfer Duty</dt>
                <dd className="text-slate-600 text-sm leading-relaxed">
                  A government tax on properties over R1.1 million. It applies
                  equally to everyone. There is no &quot;foreigner surcharge&quot; on
                  property tax in South Africa.
                </dd>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <dt className="font-bold text-orange-900 mb-2">Withholding Tax</dt>
                <dd className="text-slate-600 text-sm leading-relaxed">
                  If you sell the property later for more than R2 million, SARS
                  may withhold a percentage of the proceeds (Withholding Tax on
                  Foreign Sellers) until your Capital Gains Tax is calculated.
                </dd>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <dt className="font-bold text-orange-900 mb-2">Deal Receipt</dt>
                <dd className="text-slate-600 text-sm leading-relaxed">
                  Ensure you keep the &quot;Deal Receipt&quot; from the bank when bringing
                  money into SA. You will need this proof to repatriate your funds
                  (and any profit) when you eventually sell.
                </dd>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <dt className="font-bold text-orange-900 mb-2">Bond Registration</dt>
                <dd className="text-slate-600 text-sm leading-relaxed">
                  Even if you are only borrowing 50%, you still pay bond
                  registration fees to an attorney to register the loan at the
                  Deeds Office.
                </dd>
              </div>
            </dl>
          </section>

          {/* FAQs */}
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Non-Resident FAQs
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 group"
                  open={index === 0}
                >
                  <summary className="font-semibold text-lg text-slate-800 cursor-pointer list-none flex justify-between items-center">
                    {faq.q}
                    <div className="text-slate-500 transition-transform duration-200 group-open:rotate-180">
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
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </summary>
                  <p className="mt-4 text-slate-600">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section>
            <ProFeatures />
          </section>
          <section>
            <NextSteps />
          </section>
        </div>
      </div>
    </main>
  );
}
