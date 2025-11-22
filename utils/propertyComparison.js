// FILE: utils/propertyComparison.js
// Helper comparison functions for property purchase scenarios.

import {
  calculateOnceOffCosts,
  calculateMonthlyRepayment,
} from "./calculation";

/**
 * Compare buying with a bond vs buying cash, including once-off costs and opportunity cost.
 *
 * @param {object} p
 * @param {number} p.purchasePrice
 * @param {number} p.depositAmount
 * @param {number} p.annualInterestRate   // bond interest rate (%)
 * @param {number} p.loanTermYears
 * @param {number} p.opportunityRate      // annual opportunity return rate (%)
 * @param {boolean} p.includeOnceOffInLoan
 * @returns {{
 *   loanAmount:number,
 *   onceOffCosts:number,
 *   bondMonthly:number,
 *   bondTotalPaid:number,
 *   bondTotalOutOfPocket:number,
 *   bondOppCost:number,
 *   bondEffectiveCost:number,
 *   cashOutlayNow:number,
 *   cashOppCost:number,
 *   cashEffectiveCost:number,
 *   difference:number,
 *   cheaper:"bond"|"cash"|"equal"
 * }}
 */
export function calculateBondVsCashComparison({
  purchasePrice,
  depositAmount,
  annualInterestRate,
  loanTermYears,
  opportunityRate,
  includeOnceOffInLoan,
}) {
  const price = Math.max(0, Number(purchasePrice) || 0);
  const deposit = Math.max(0, Number(depositAmount) || 0);
  const rate = Math.max(0, Number(annualInterestRate) || 0);
  const years = Math.max(0, Number(loanTermYears) || 0);
  const opp = Math.max(0, Number(opportunityRate) || 0);

  const loanAmount = Math.max(0, price - deposit);
  const { totalOnceOffCosts: onceOffCosts } = calculateOnceOffCosts(
    price,
    loanAmount
  );

  // Bond path
  const principal = loanAmount + (includeOnceOffInLoan ? onceOffCosts : 0);
  const bondMonthly = calculateMonthlyRepayment(principal, rate, years);
  const bondTotalPaid = bondMonthly * years * 12;
  const upfrontForBond = deposit + (includeOnceOffInLoan ? 0 : onceOffCosts);
  const bondOppCost = calcOppCost(upfrontForBond, opp, years);
  const bondTotalOutOfPocket = upfrontForBond + bondTotalPaid;
  const bondEffectiveCost = bondTotalOutOfPocket + bondOppCost;

  // Cash path
  const cashOutlayNow = price + onceOffCosts;
  const cashOppCost = calcOppCost(cashOutlayNow, opp, years);
  const cashEffectiveCost = cashOutlayNow + cashOppCost;

  const difference = bondEffectiveCost - cashEffectiveCost;
  const cheaper =
    Math.abs(difference) < 1 ? "equal" : difference < 0 ? "bond" : "cash";

  return {
    loanAmount,
    onceOffCosts,
    bondMonthly,
    bondTotalPaid,
    bondTotalOutOfPocket,
    bondOppCost,
    bondEffectiveCost,
    cashOutlayNow,
    cashOppCost,
    cashEffectiveCost,
    difference,
    cheaper,
  };
}

// Estimate opportunity cost as future value gain foregone on an upfront outlay.
function calcOppCost(amount, annualRatePct, years) {
  const A = Math.max(0, amount || 0);
  const r = Math.max(0, annualRatePct || 0) / 100 / 12;
  const n = Math.max(0, Math.round((years || 0) * 12));
  if (A <= 0 || r <= 0 || n <= 0) return 0;
  const futureValue = A * Math.pow(1 + r, n);
  return Math.max(0, futureValue - A);
}

