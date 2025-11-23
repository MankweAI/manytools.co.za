// FILE: app/components/Footer.js
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 sm:py-16 mt-auto">
            <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-4 gap-8 sm:gap-12">

                {/* Brand Column */}
                <div className="col-span-1 lg:col-span-1">
                    <Link href="/" className="flex items-center gap-2 mb-6 group">
                        <span className="text-2xl font-extrabold text-white tracking-tight">
                            manytools<span className="text-emerald-500">.co.za</span>
                        </span>
                    </Link>
                    <p className="text-sm leading-relaxed text-slate-400 mb-6">
                        South Africa&apos;s most accurate, free, and privacy-first property and tax calculators. Built to help you make smarter financial decisions.
                    </p>
                    <p className="text-xs text-slate-600">
                        &copy; {new Date().getFullYear()} ManyTools SA. All rights reserved.
                    </p>
                </div>

                {/* Links Column 1: Property */}
                <div>
                    <h3 className="text-slate-200 font-semibold mb-4">Property Tools</h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link href="/property/bond-repayment-calculator" className="hover:text-emerald-400 transition-colors">Bond Calculator</Link></li>
                        <li><Link href="/property/transfer-cost-calculator" className="hover:text-emerald-400 transition-colors">Transfer Costs</Link></li>
                        <li><Link href="/property/bond-affordability-calculator" className="hover:text-emerald-400 transition-colors">Affordability Check</Link></li>
                        <li><Link href="/property/rental-yield-calculator" className="hover:text-emerald-400 transition-colors">Rental Yield</Link></li>
                        <li><Link href="/property/bond-repayment-calculator/first-time-buyer" className="hover:text-emerald-400 transition-colors">First-Time Buyers</Link></li>
                    </ul>
                </div>

                {/* Links Column 2: Business & Tax */}
                <div>
                    <h3 className="text-slate-200 font-semibold mb-4">Business & Tax</h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link href="/business/business-loan-calculator" className="hover:text-emerald-400 transition-colors">Business Loan Calc</Link></li>
                        <li><Link href="/tax/vat-calculator" className="hover:text-emerald-400 transition-colors">VAT Calculator</Link></li>
                        <li><Link href="/tax/paye-calculator" className="hover:text-emerald-400 transition-colors">PAYE Calculator</Link></li>
                        <li><Link href="/tax/income-tax-calculator" className="hover:text-emerald-400 transition-colors">Income Tax</Link></li>
                    </ul>
                </div>

                {/* Legal Column */}
                <div>
                    <h3 className="text-slate-200 font-semibold mb-4">Legal & Privacy</h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
                        <li><Link href="#" className="hover:text-emerald-400 transition-colors">Terms of Use</Link></li>
                    </ul>

                    {/* E-E-A-T Disclaimer Box */}
                    <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-800">
                        <p className="text-[11px] leading-relaxed text-slate-500">
                            <strong>Disclaimer:</strong> We are a technology platform, not a registered financial services provider (FSP). Calculations are estimates for information purposes only and do not constitute financial advice. Always consult a qualified professional.
                        </p>
                    </div>
                </div>

            </div>
        </footer>
    );
}