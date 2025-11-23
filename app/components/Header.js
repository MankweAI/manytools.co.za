// FILE: app/components/Header.js
import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 transition-all">
            <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo Area */}
                <Link href="/" className="flex items-center gap-2 group">
                    {/* Logo Image - Ensure /public/image/logo.png exists, or remove this block */}
                    <div className="relative w-8 h-8 sm:w-9 sm:h-9">
                        <Image
                            src="/image/logo.png"
                            alt="ManyTools Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <span className="text-xl font-extrabold text-slate-900 tracking-tight group-hover:opacity-80 transition-opacity">
                        manytools<span className="text-emerald-600">.co.za</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden sm:flex gap-8 text-sm font-semibold text-slate-600">
                    <Link
                        href="/property/bond-repayment-calculator"
                        className="hover:text-emerald-600 transition-colors"
                    >
                        Bond Calculator
                    </Link>
                    <Link
                        href="/property/transfer-cost-calculator"
                        className="hover:text-emerald-600 transition-colors"
                    >
                        Transfer Costs
                    </Link>
                    <Link
                        href="/property/rental-yield-calculator"
                        className="hover:text-emerald-600 transition-colors"
                    >
                        Yield Calc
                    </Link>
                </nav>
            </div>
        </header>
    );
}