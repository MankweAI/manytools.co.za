// FILE: app/sitemap.js
export default function sitemap() {
    const baseUrl = 'https://manytools.co.za';

    // List of all static routes based on your file structure
    const routes = [
        '',
        '/business/business-loan-calculator',
        '/property/amortization-schedule-calculator',
        '/property/bond-affordability-calculator',
        '/property/bond-affordability-calculator/joint-application',
        '/property/bond-repayment-calculator',
        '/property/bond-repayment-calculator/building-loan',
        '/property/bond-repayment-calculator/first-time-buyer',
        '/property/bond-repayment-calculator/government-employee',
        '/property/bond-repayment-calculator/investor',
        '/property/bond-repayment-calculator/refinance',
        '/property/bond-repayment-calculator/retiree',
        '/property/bond-repayment-calculator/self-employed',
        '/property/bond-repayment-calculator/upgrading',
        '/property/capital-gains-tax-calculator',
        '/property/rental-yield-calculator',
        '/property/total-acquisition-cost-calculator',
        '/property/transfer-cost-calculator',
        '/property/transfer-cost-calculator/foreign-buyer',
        '/property/transfer-duty-calculator/2025',
        // Note: Add your Tax calculator routes here once those pages are created
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
    }));
}
