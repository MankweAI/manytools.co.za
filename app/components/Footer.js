export default function Footer() {
    return (
        <footer className="bg-white border-t border-slate-200 py-12 mt-12">
            <div className="max-w-5xl mx-auto px-4 text-center text-slate-500">
                <p className="mb-4 font-semibold text-slate-900">manytools.co.za</p>
                <p className="text-sm">
                    <small>
                        &copy; {new Date().getFullYear()} ManyTools. Built for the South
                        African market.
                    </small>
                    <br />
                    <small>Not financial advice. Always consult a professional.</small>
                </p>
            </div>
        </footer>
    );
}
