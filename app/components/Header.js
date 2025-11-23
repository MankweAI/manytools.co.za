import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                        <Image
                            src="/image/logo.png"
                            alt="ManyTools Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <span className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-orange-600 transition-colors">
                        manytools<span className="text-orange-600">.co.za</span>
                    </span>
                </Link>

                <nav className="hidden sm:flex gap-6 text-sm font-medium text-slate-600">
                    <Link href="/property/bond-repayment-calculator" className="hover:text-orange-600 transition-colors">
                        Bond Calculator
                    </Link>
                    <Link href="/property/transfer-cost-calculator" className="hover:text-orange-600 transition-colors">
                        Transfer Costs
                    </Link>
                </nav>
            </div>
        </header>
    );
}
