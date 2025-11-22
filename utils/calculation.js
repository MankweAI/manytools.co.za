// FILE: utils/calculation.js

// ==========================================
// CONFIGURATION CONSTANTS (THE SOURCE OF TRUTH)
// ==========================================

/**
 * Official SARS Transfer Duty Rates (2025/2026 Tax Year).
 * Used for both calculation logic and generating HTML tables on the server.
 */
export const TRANSFER_DUTY_BRACKETS_2025 = [
  { limit: 1210000, rate: 0, baseAmount: 0 },
  { limit: 1663800, rate: 0.03, baseAmount: 0 }, // 3% on value above 1,210,000
  { limit: 2329300, rate: 0.06, baseAmount: 13614 }, // + 6% on value above 1,663,800
  { limit: 2994800, rate: 0.08, baseAmount: 53544 }, // + 8% on value above 2,329,300
  { limit: 13310000, rate: 0.11, baseAmount: 106784 }, // + 11% on value above 2,994,800
  { limit: Infinity, rate: 0.13, baseAmount: 1241456 }, // + 13% on value above 13,310,000
];

/**
 * Guideline for Attorney Transfer (Conveyancing) Fees.
 * These are estimates based on typical industry rates, not regulated fixed rates.
 */
export const CONVEYANCING_FEES_GUIDELINE = [
  { limit: 100000, fee: 7000 },
  { limit: 500000, fee: 15000 },
  { limit: 1000000, fee: 25000 },
  { limit: 2000000, fee: 35000 },
  { limit: 5000000, fee: 50000 },
  {
    limit: Infinity,
    fee: 65000,
    variableRate: 0.005, // + 0.5%
    threshold: 5000000, // on value above 5M
  },
];

/**
 * Guideline for Bond Registration Attorney Fees.
 */
export const BOND_REGISTRATION_FEES_GUIDELINE = [
  { limit: 100000, fee: 7000 },
  { limit: 500000, fee: 15000 },
  { limit: 1000000, fee: 25000 },
  { limit: 2000000, fee: 35000 },
  { limit: 5000000, fee: 50000 },
  {
    limit: Infinity,
    fee: 65000,
    variableRate: 0.005,
    threshold: 5000000,
  },
];

// ==========================================
// CALCULATION LOGIC
// ==========================================

/**
 * Calculates the South African transfer duty for a given property value.
 * Uses TRANSFER_DUTY_BRACKETS_2025 constant.
 */
export function calculateTransferDuty(value) {
  const price = Math.max(0, Number(value) || 0);

  // Find the applicable bracket
  // We look for the first bracket where the price is LESS than or EQUAL to the limit
  // OR the last bracket if it exceeds all limits (Infinity)
  let bracketIndex = TRANSFER_DUTY_BRACKETS_2025.findIndex(
    (b) => price <= b.limit
  );

  if (bracketIndex === -1) {
    // Should not happen given Infinity, but safe fallback to last bracket
    bracketIndex = TRANSFER_DUTY_BRACKETS_2025.length - 1;
  }

  const bracket = TRANSFER_DUTY_BRACKETS_2025[bracketIndex];
  const prevBracketLimit =
    bracketIndex > 0 ? TRANSFER_DUTY_BRACKETS_2025[bracketIndex - 1].limit : 0;

  // Calculation: Base Amount + (Rate * (Value - Previous Limit))
  const dutiableAmount = Math.max(0, price - prevBracketLimit);
  const duty = bracket.baseAmount + dutiableAmount * bracket.rate;

  return Math.round(duty);
}

/**
 * Provides a simplified estimate of conveyancing fees based on property value.
 * Uses CONVEYANCING_FEES_GUIDELINE constant.
 */
function estimateConveyancingFees(purchasePrice) {
  const price = Math.max(0, Number(purchasePrice) || 0);

  const bracket =
    CONVEYANCING_FEES_GUIDELINE.find((b) => price <= b.limit) ||
    CONVEYANCING_FEES_GUIDELINE[CONVEYANCING_FEES_GUIDELINE.length - 1];

  if (bracket.variableRate) {
    return bracket.fee + (price - bracket.threshold) * bracket.variableRate;
  }
  return bracket.fee;
}

/**
 * Provides a simplified estimate of bond registration fees based on loan amount.
 * Uses BOND_REGISTRATION_FEES_GUIDELINE constant.
 */
function estimateBondRegistrationFees(loanAmount) {
  const amount = Math.max(0, Number(loanAmount) || 0);

  const bracket =
    BOND_REGISTRATION_FEES_GUIDELINE.find((b) => amount <= b.limit) ||
    BOND_REGISTRATION_FEES_GUIDELINE[
      BOND_REGISTRATION_FEES_GUIDELINE.length - 1
    ];

  if (bracket.variableRate) {
    return bracket.fee + (amount - bracket.threshold) * bracket.variableRate;
  }
  return bracket.fee;
}

/**
 * Calculates the total estimated once-off costs for a property purchase.
 */
export function calculateOnceOffCosts(purchasePrice, loanAmount) {
  const transferDuty = calculateTransferDuty(purchasePrice);
  const conveyancingFees = estimateConveyancingFees(purchasePrice);
  const bondRegistrationFees = estimateBondRegistrationFees(loanAmount);
  const totalOnceOffCosts =
    transferDuty + conveyancingFees + bondRegistrationFees + 5000; // Adding ~R5000 for deeds office and other sundries

  return {
    transferDuty,
    conveyancingFees,
    bondRegistrationFees,
    totalOnceOffCosts,
  };
}

/**
 * Calculates the monthly bond repayment amount using the standard amortization formula.
 */
export function calculateMonthlyRepayment(
  principal,
  annualInterestRate,
  loanTermInYears
) {
  if (principal <= 0 || annualInterestRate <= 0 || loanTermInYears <= 0) {
    return 0;
  }
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const numberOfPayments = loanTermInYears * 12;

  const monthlyPayment =
    (principal *
      (monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  return isNaN(monthlyPayment) ? 0 : monthlyPayment;
}

// ... (Keep the rest of the existing functions for PAYE, Tax, Rental Yield etc. unchanged below)

export function calculatePAYE(
  annualSalary,
  medicalCredits = 0,
  otherDeductions = 0,
  fringeBenefits = 0
) {
  const taxableIncome = Math.max(
    0,
    annualSalary + fringeBenefits - otherDeductions - medicalCredits * 341
  );
  let tax = 0;
  if (taxableIncome <= 237100) {
    tax = 0;
  } else if (taxableIncome <= 370500) {
    tax = (taxableIncome - 237100) * 0.18;
  } else if (taxableIncome <= 512800) {
    tax = 24088.62 + (taxableIncome - 370500) * 0.26;
  } else if (taxableIncome <= 673000) {
    tax = 61296.25 + (taxableIncome - 512800) * 0.31;
  } else if (taxableIncome <= 857900) {
    tax = 96264.13 + (taxableIncome - 673000) * 0.36;
  } else if (taxableIncome <= 1819000) {
    tax = 147996.69 + (taxableIncome - 857900) * 0.39;
  } else {
    tax = 534146.2 + (taxableIncome - 1819000) * 0.45;
  }
  return Math.round(Math.max(0, tax));
}

export function calculateUIFContribution(annualSalary) {
  return Math.min(annualSalary * 0.01, 177.12);
}

export function calculateSDLContribution(annualSalary) {
  return annualSalary * 0.01;
}

export function calculateNetPay(
  annualSalary,
  medicalCredits = 0,
  otherDeductions = 0,
  fringeBenefits = 0
) {
  const paye = calculatePAYE(
    annualSalary,
    medicalCredits,
    otherDeductions,
    fringeBenefits
  );
  const uif = calculateUIFContribution(annualSalary);
  const sdl = calculateSDLContribution(annualSalary);
  const totalDeductions = paye + uif + sdl;
  return Math.round(Math.max(0, annualSalary - totalDeductions));
}

export function calculateMarginalTaxRate(
  annualSalary,
  medicalCredits = 0,
  otherDeductions = 0,
  fringeBenefits = 0
) {
  const taxable = Math.max(
    0,
    annualSalary + fringeBenefits - otherDeductions - medicalCredits * 341
  );
  if (taxable <= 237100) return 0;
  if (taxable <= 370500) return 18;
  if (taxable <= 512800) return 26;
  if (taxable <= 673000) return 31;
  if (taxable <= 857900) return 36;
  if (taxable <= 1819000) return 39;
  return 45;
}

export function calculateEffectiveTaxRate(
  annualSalary,
  medicalCredits = 0,
  otherDeductions = 0,
  fringeBenefits = 0
) {
  const tax = calculatePAYE(
    annualSalary,
    medicalCredits,
    otherDeductions,
    fringeBenefits
  );
  const gross = annualSalary + fringeBenefits;
  return gross > 0 ? Math.round((tax / gross) * 100) : 0;
}

export function calculateIncomeTax(
  annualSalary,
  medicalAidCredits = 0,
  otherDeductions = 0
) {
  const taxableIncome = Math.max(
    0,
    annualSalary - otherDeductions - medicalAidCredits * 341
  );
  let tax = 0;
  if (taxableIncome <= 237100) {
    tax = 0;
  } else if (taxableIncome <= 370500) {
    tax = (taxableIncome - 237100) * 0.18;
  } else if (taxableIncome <= 512800) {
    tax = 24088.62 + (taxableIncome - 370500) * 0.26;
  } else if (taxableIncome <= 673000) {
    tax = 61296.25 + (taxableIncome - 512800) * 0.31;
  } else if (taxableIncome <= 857900) {
    tax = 96264.13 + (taxableIncome - 673000) * 0.36;
  } else if (taxableIncome <= 1819000) {
    tax = 147996.69 + (taxableIncome - 857900) * 0.39;
  } else {
    tax = 534146.2 + (taxableIncome - 1819000) * 0.45;
  }
  return Math.round(Math.max(0, tax));
}

export function calculateTakeHomePay(
  annualSalary,
  medicalCredits = 0,
  otherDeductions = 0,
  fringeBenefits = 0
) {
  const netPay = calculateNetPay(
    annualSalary,
    medicalCredits,
    otherDeductions,
    fringeBenefits
  );
  const paye = calculatePAYE(
    annualSalary,
    medicalCredits,
    otherDeductions,
    fringeBenefits
  );
  const uif = calculateUIFContribution(annualSalary);
  const sdl = calculateSDLContribution(annualSalary);
  return { netPay, paye, uif, sdl };
}

export function calculateUIFBenefits(salary, benefitType = "unemployment") {
  const dailyRate = salary / 30;
  const weeklyRate = salary / 4.333;
  const monthlyRate = salary;
  const benefitRate = 0.45; // 45% of salary

  if (benefitType === "maternity") {
    return Math.round(benefitRate * monthlyRate * 4); // 4 months
  } else if (benefitType === "illness") {
    return Math.round(benefitRate * weeklyRate * 26); // 26 weeks
  } else {
    // unemployment
    return Math.round(benefitRate * dailyRate * 238); // 238 days
  }
}

export function calculateVAT(sales, purchases, businessType = "standard") {
  const vatRate = 0.15;
  let outputVAT = sales * vatRate;
  let inputVAT = purchases * vatRate;
  if (businessType === "zero-rated") {
    outputVAT = 0;
  } else if (businessType === "exempt") {
    outputVAT = 0;
    inputVAT = 0;
  }
  const netVAT = outputVAT - inputVAT;
  return { outputVAT, inputVAT, netVAT };
}

export function calculateEstateAgentCommission(
  propertyPrice,
  commissionRate = 0.05
) {
  const commission = propertyPrice * commissionRate;
  const vatOnCommission = commission * 0.15;
  const totalFee = commission + vatOnCommission;
  return { commission, vatOnCommission, totalFee };
}

/**
 * Calculates maximum affordable loan using available monthly surplus.
 */
export function calculateMaxAffordableLoan(
  monthlyIncome,
  monthlyExpenses,
  annualInterestRate,
  loanTermInYears
) {
  const surplus = monthlyIncome - monthlyExpenses;
  if (surplus <= 0 || annualInterestRate <= 0 || loanTermInYears <= 0) return 0;
  const r = annualInterestRate / 100 / 12;
  const n = loanTermInYears * 12;
  const maxLoan = surplus * ((1 - Math.pow(1 + r, -n)) / r);
  return Math.round(maxLoan);
}

// Calculates rental yield metrics.
export function calculateRentalYield(
  monthlyRent,
  propertyPrice,
  annualCosts = 0,
  vacancyRatePct = 0
) {
  const annualRentGross = Math.max(0, monthlyRent) * 12;
  const vacancyLoss = annualRentGross * (Math.max(0, vacancyRatePct) / 100);
  const effectiveGrossIncome = Math.max(0, annualRentGross - vacancyLoss);
  const netOperatingIncome = Math.max(
    0,
    effectiveGrossIncome - Math.max(0, annualCosts)
  );

  const grossYieldPct =
    propertyPrice > 0 ? (annualRentGross / propertyPrice) * 100 : 0;
  const netYieldPct =
    propertyPrice > 0 ? (netOperatingIncome / propertyPrice) * 100 : 0;

  return {
    annualRentGross,
    vacancyLoss,
    effectiveGrossIncome,
    netOperatingIncome,
    grossYieldPct,
    netYieldPct,
  };
}

export function calculatePropertyCGT({
  sellingPrice,
  purchasePrice,
  capitalImprovements = 0,
  otherSellingCosts = 0,
  taxpayerType = "individual",
  isPrimaryResidence = false,
  marginalRatePct = 36,
}) {
  const proceeds = Math.max(0, Number(sellingPrice) || 0);
  const baseCost =
    Math.max(0, Number(purchasePrice) || 0) +
    Math.max(0, Number(capitalImprovements) || 0);
  const sellingCosts = Math.max(0, Number(otherSellingCosts) || 0);

  const grossCapitalGain = Math.max(0, proceeds - baseCost - sellingCosts);

  // Primary residence exclusion (cap gain, not proceeds)
  const PRIMARY_RES_EXCL = 2000000; // R2,000,000
  const primaryResidenceExclusion = isPrimaryResidence
    ? Math.min(PRIMARY_RES_EXCL, grossCapitalGain)
    : 0;

  // Annual exclusion (apply to individuals only for simplicity)
  const ANNUAL_EXCL_INDIV = 40000; // R40,000
  const annualExclusion =
    taxpayerType === "individual"
      ? Math.min(
          ANNUAL_EXCL_INDIV,
          Math.max(0, grossCapitalGain - primaryResidenceExclusion)
        )
      : 0;

  const netCapitalGain = Math.max(
    0,
    grossCapitalGain - primaryResidenceExclusion - annualExclusion
  );

  // SARS inclusion rates (2025/26): Individual 40%, Company 80%, Trust 80% (simplified)
  const inclusionRate = taxpayerType === "individual" ? 0.4 : 0.8;

  const includedGain = netCapitalGain * inclusionRate;

  // Tax rates on included gain (simplified)
  const taxRate =
    taxpayerType === "individual"
      ? Math.max(0, Math.min(0.45, (Number(marginalRatePct) || 0) / 100))
      : taxpayerType === "company"
      ? 0.27
      : 0.45; // trusts

  const cgtPayable = Math.max(0, includedGain * taxRate);

  return {
    proceeds,
    baseCost: baseCost + sellingCosts,
    grossCapitalGain,
    primaryResidenceExclusion,
    annualExclusion,
    netCapitalGain,
    inclusionRate,
    includedGain,
    taxRate,
    cgtPayable,
  };
}

export function calculateEarlySettlementSavings(
  principal,
  annualInterestRate,
  loanTermYears,
  extraMonthly = 0,
  lumpSum = 0,
  lumpSumAtMonth = 0
) {
  const P = Math.max(0, Number(principal) || 0);
  const rate = Math.max(0, Number(annualInterestRate) || 0);
  const years = Math.max(0, Number(loanTermYears) || 0);
  const extra = Math.max(0, Number(extraMonthly) || 0);
  const onceOff = Math.max(0, Number(lumpSum) || 0);
  const onceOffMonth = Math.max(0, Number(lumpSumAtMonth) || 0);

  if (P <= 0 || rate <= 0 || years <= 0) {
    return {
      baseline: {
        monthlyPayment: 0,
        months: 0,
        totalInterest: 0,
        totalPaid: 0,
      },
      accelerated: { months: 0, totalInterest: 0, totalPaid: 0 },
      monthsSaved: 0,
      interestSaved: 0,
      yearsMonthsSaved: { years: 0, months: 0 },
    };
  }

  const r = rate / 100 / 12;
  const n = Math.round(years * 12);

  // Baseline amortization (no extras)
  const baselineMonthly =
    (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);

  let bal = P;
  let monthsBaseline = 0;
  let interestBaseline = 0;

  while (bal > 0 && monthsBaseline < 1200 * 12) {
    const interest = bal * r;
    let principalPay = baselineMonthly - interest;
    if (principalPay <= 0) break;
    if (principalPay > bal) {
      principalPay = bal;
    }
    interestBaseline += interest;
    bal -= principalPay;
    monthsBaseline += 1;
  }

  const totalPaidBaseline = baselineMonthly * monthsBaseline;

  // Accelerated amortization (extra monthly + optional lump sum at specified month)
  let bal2 = P;
  let monthsAccel = 0;
  let interestAccel = 0;
  const payWithExtra = baselineMonthly + extra;

  while (bal2 > 0 && monthsAccel < 1200 * 12) {
    // Apply lump sum at configured month (including month 0 for immediate)
    if (monthsAccel === onceOffMonth && onceOff > 0) {
      bal2 = Math.max(0, bal2 - onceOff);
    }

    if (bal2 <= 0) break;

    const interest = bal2 * r;
    let principalPay = payWithExtra - interest;

    // If extra payment is too small and negative amortization happens, fallback to baseline payment to avoid infinite loop
    if (principalPay <= 0) {
      principalPay = Math.max(0, baselineMonthly - interest);
    }

    if (principalPay > bal2) {
      principalPay = bal2;
    }

    interestAccel += interest;
    bal2 -= principalPay;
    monthsAccel += 1;
  }

  const totalPaidAccel = interestAccel + (P - 0); // principal + interest; principal is P

  const monthsSaved = Math.max(0, monthsBaseline - monthsAccel);
  const interestSaved = Math.max(0, interestBaseline - interestAccel);
  const yearsSaved = Math.floor(monthsSaved / 12);
  const remMonthsSaved = monthsSaved % 12;

  return {
    baseline: {
      monthlyPayment: baselineMonthly,
      months: monthsBaseline,
      totalInterest: interestBaseline,
      totalPaid: totalPaidBaseline,
    },
    accelerated: {
      months: monthsAccel,
      totalInterest: interestAccel,
      totalPaid: totalPaidAccel,
    },
    monthsSaved,
    interestSaved,
    yearsMonthsSaved: { years: yearsSaved, months: remMonthsSaved },
  };
}

export function calculateRatesClearance(
  rates = 0,
  water = 0,
  electricity = 0,
  refuse = 0,
  sanitation = 0,
  months = 3,
  adminFee = 0,
  arrears = 0,
  credits = 0
) {
  const mRates = Math.max(0, Number(rates) || 0);
  const mWater = Math.max(0, Number(water) || 0);
  const mElec = Math.max(0, Number(electricity) || 0);
  const mRefuse = Math.max(0, Number(refuse) || 0);
  const mSan = Math.max(0, Number(sanitation) || 0);

  const m = Math.max(0, Math.round(Number(months) || 0));
  const fee = Math.max(0, Number(adminFee) || 0);
  const arr = Math.max(0, Number(arrears) || 0);
  const cred = Math.max(0, Number(credits) || 0);

  const monthlyTotal = mRates + mWater + mElec + mRefuse + mSan;
  const prepaidForMonths = monthlyTotal * m;
  const totalDue = Math.max(0, prepaidForMonths + fee + arr - cred);

  return {
    monthlyTotal,
    prepaidForMonths,
    adminFee: fee,
    arrears: arr,
    credits: cred,
    totalDue,
  };
}

export function generateAmortizationSchedule(
  principal,
  annualInterestRate,
  loanTermYears,
  extraMonthly = 0
) {
  const P = Math.max(0, Number(principal) || 0);
  const r = Math.max(0, Number(annualInterestRate) || 0) / 100 / 12;
  const n = Math.max(0, Math.round(Number(loanTermYears) || 0) * 12);
  const extra = Math.max(0, Number(extraMonthly) || 0);

  if (P <= 0 || r <= 0 || n <= 0) {
    return {
      payment: 0,
      schedule: [],
      totals: { months: 0, interest: 0, paid: 0 },
    };
  }

  // Standard monthly repayment (without extra)
  const payment = (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
  const schedule = [];
  let bal = P;
  let month = 0;
  let totalInterest = 0;
  let totalPaid = 0;

  while (bal > 0 && month < n + 600) {
    month += 1;
    const interest = bal * r;
    let principalPay = payment + extra - interest;

    // Prevent negative amortization
    if (principalPay <= 0) {
      principalPay = payment - interest;
    }
    if (principalPay > bal) {
      principalPay = bal;
    }

    const installment = interest + principalPay;
    bal = Math.max(0, bal - principalPay);

    totalInterest += interest;
    totalPaid += installment;

    schedule.push({
      month,
      payment: installment,
      interest,
      principal: principalPay,
      balance: bal,
    });

    if (bal <= 0) break;
  }

  return {
    payment,
    schedule,
    totals: {
      months: schedule.length,
      interest: totalInterest,
      paid: totalPaid,
    },
  };
}

export function calculateSectionalTitleLevyShare({
  totalLevy = 0,
  totalPQ = 10000,
  unitPQ = 0,
  specialLevy = 0,
  specialMode = "pq",
  unitsCount = 1,
}) {
  const TL = Math.max(0, Number(totalLevy) || 0);
  const TPQ = Math.max(1, Number(totalPQ) || 1);
  const UPQ = Math.max(0, Number(unitPQ) || 0);
  const SL = Math.max(0, Number(specialLevy) || 0);
  const UC = Math.max(1, Number(unitsCount) || 1);

  const baseMonthly = TL * (UPQ / TPQ) || 0;
  const specialPerUnit = specialMode === "equal" ? SL / UC : SL * (UPQ / TPQ);
  const totalDue = baseMonthly + specialPerUnit;

  return {
    baseMonthly,
    specialPerUnit,
    totalDue,
    sharePct: (UPQ / TPQ) * 100,
  };
}

export function calculateBreakEven({
  pricePerUnit,
  variableCostPerUnit,
  fixedCosts,
  expectedUnits = 0,
}) {
  const P = Math.max(0, Number(pricePerUnit) || 0);
  const V = Math.max(0, Number(variableCostPerUnit) || 0);
  const F = Math.max(0, Number(fixedCosts) || 0);
  const Uexp = Math.max(0, Number(expectedUnits) || 0);

  const contributionPerUnit = Math.max(0, P - V);
  const contributionMarginRatio = P > 0 ? contributionPerUnit / P : 0;

  let breakEvenUnits = 0;
  if (contributionPerUnit > 0) {
    breakEvenUnits = Math.ceil(F / contributionPerUnit);
  }

  const breakEvenRevenue = breakEvenUnits * P;

  const profitAtExpected = Uexp > 0 ? Uexp * contributionPerUnit - F : 0;

  const marginOfSafetyUnits = Uexp > 0 ? Math.max(0, Uexp - breakEvenUnits) : 0;
  const marginOfSafetyPct =
    Uexp > 0 ? (marginOfSafetyUnits / (Uexp || 1)) * 100 : 0;

  return {
    contributionPerUnit,
    contributionMarginRatio,
    breakEvenUnits,
    breakEvenRevenue,
    profitAtExpected,
    marginOfSafetyUnits,
    marginOfSafetyPct,
  };
}

export function calculateROI({
  initialInvestment,
  annualRevenue = 0,
  annualCosts = 0,
  annualNetProfit = null,
  years,
  salvageValue = 0,
}) {
  const I = Math.max(0, Number(initialInvestment) || 0);
  const Y = Math.max(0, Number(years) || 0);
  const salv = Math.max(0, Number(salvageValue) || 0);

  const rev = Math.max(0, Number(annualRevenue) || 0);
  const cost = Math.max(0, Number(annualCosts) || 0);
  const net =
    annualNetProfit !== null && annualNetProfit !== undefined
      ? Number(annualNetProfit) || 0
      : rev - cost;

  const totalProfit = Math.max(0, net) * Y;
  const totalNetGain = Math.max(0, totalProfit + salv - I);

  const simpleROIPct = I > 0 ? (totalNetGain / I) * 100 : 0;

  const annualizedROIPct =
    I > 0 && Y > 0 ? (Math.pow(1 + simpleROIPct / 100, 1 / Y) - 1) * 100 : 0;

  const paybackYearsFloat = net > 0 ? I / net : 0;
  const paybackYears = Math.floor(paybackYearsFloat);
  const paybackMonths = Math.max(
    0,
    Math.round((paybackYearsFloat - paybackYears) * 12)
  );

  const profitMarginPct = rev > 0 ? (net / rev) * 100 : null;

  return {
    totalNetGain,
    simpleROIPct,
    annualizedROIPct,
    paybackYears,
    paybackMonths,
    profitMarginPct,
    resolvedAnnualNetProfit: net,
  };
}

export function calculateCashRunway({
  startingCash,
  monthlyRevenue,
  revenueGrowthPct,
  grossMarginPct,
  monthlyOperatingCosts,
  costGrowthPct,
  arDays,
  apDays,
  maxMonths = 240,
}) {
  const cash0 = Math.max(0, Number(startingCash) || 0);
  let rev = Math.max(0, Number(monthlyRevenue) || 0);
  const gRev = Math.max(-100, Number(revenueGrowthPct) || 0) / 100;
  let opex = Math.max(0, Number(monthlyOperatingCosts) || 0);
  const gOpex = Math.max(-100, Number(costGrowthPct) || 0) / 100;
  const gm = Math.min(100, Math.max(0, Number(grossMarginPct) || 0)) / 100;

  const arDelay = Math.max(0, Math.round((Number(arDays) || 0) / 30));
  const apDelay = Math.max(0, Math.round((Number(apDays) || 0) / 30));

  const inflowQ = [];
  const outflowQ = [];

  let cash = cash0;
  const series = [];
  let breakEvenMonth = null;
  let depleted = false;
  let tDeplete = Infinity;

  for (let m = 1; m <= maxMonths; m++) {
    const cogs = rev * (1 - gm);
    const opexNow = opex;

    const inflow = inflowQ[m] || 0;
    const outflow = outflowQ[m] || 0;

    const inflowMonth = m + arDelay;
    const outflowMonth = m + apDelay;

    inflowQ[inflowMonth] = (inflowQ[inflowMonth] || 0) + rev;
    outflowQ[outflowMonth] = (outflowQ[outflowMonth] || 0) + (cogs + opexNow);

    const netCash = inflow - outflow;
    const prevCash = cash;
    cash = prevCash + netCash;

    series.push({
      month: m,
      cash,
      inflow,
      outflow,
      revenue: rev,
      opex: opexNow,
      cogs,
    });

    if (breakEvenMonth === null) {
      const opCF = rev - cogs - opexNow;
      if (opCF >= 0) breakEvenMonth = m;
    }

    if (cash <= 0) {
      depleted = true;
      const alpha =
        netCash !== 0 ? Math.min(1, Math.max(0, -prevCash / netCash)) : 0;
      tDeplete = m - 1 + alpha;
      break;
    }

    rev = Math.max(0, rev * (1 + gRev));
    opex = Math.max(0, opex * (1 + gOpex));
  }

  const runwayMonths = depleted ? tDeplete : Infinity;

  return {
    runwayMonths,
    depleted,
    breakEvenMonth: breakEvenMonth ?? null,
    series,
  };
}

export function calculateFixFlipProfit({
  purchasePrice = 0,
  rehabCosts = 0,
  holdingMonths = 0,
  monthlyHoldingCosts = 0,
  sellingPrice = 0,
  sellingCostsPct = 0.05,
  extraSellingCosts = 0,
  vatOnCommissionPct = 0.15,
}) {
  const P = Math.max(0, Number(purchasePrice) || 0);
  const R = Math.max(0, Number(rehabCosts) || 0);
  const HM = Math.max(0, Number(holdingMonths) || 0);
  const MHC = Math.max(0, Number(monthlyHoldingCosts) || 0);
  const SP = Math.max(0, Number(sellingPrice) || 0);
  const SCP = Math.max(0, Number(sellingCostsPct) || 0);
  const ESC = Math.max(0, Number(extraSellingCosts) || 0);
  const VATC = Math.max(0, Number(vatOnCommissionPct) || 0);

  if (!P || !SP) {
    return {
      transferDuty: 0,
      acquisitionCosts: 0,
      holdingCostTotal: 0,
      sellingCosts: 0,
      totalCost: 0,
      grossProfit: 0,
      netProfit: 0,
      roiPct: 0,
      annualizedRoiPct: 0,
      marginPct: 0,
      costBreakdown: {},
    };
  }

  const transferDuty = calculateTransferDuty(P);
  const onceOff = calculateOnceOffCosts(P, 0);
  const conveyancingEst = onceOff.conveyancingFees;
  const sundriesEst = Math.max(
    0,
    onceOff.totalOnceOffCosts -
      (onceOff.transferDuty +
        onceOff.conveyancingFees +
        onceOff.bondRegistrationFees)
  );

  const acquisitionCosts = transferDuty + conveyancingEst + sundriesEst + R;

  const holdingCostTotal = HM * MHC;

  const baseCommission = SP * SCP;
  const vatOnCommission = baseCommission * VATC;
  const sellingCosts = baseCommission + vatOnCommission + ESC;

  const totalCost = P + acquisitionCosts + holdingCostTotal + sellingCosts;

  const grossProfit = SP - P;
  const netProfit = SP - totalCost;

  const investedCapital = P + acquisitionCosts + holdingCostTotal;
  const roiPct = investedCapital > 0 ? (netProfit / investedCapital) * 100 : 0;
  const annualizedRoiPct =
    investedCapital > 0 && HM > 0
      ? (Math.pow(1 + netProfit / investedCapital, 12 / HM) - 1) * 100
      : 0;

  const marginPct = SP > 0 ? (netProfit / SP) * 100 : 0;

  return {
    transferDuty,
    acquisitionCosts,
    holdingCostTotal,
    sellingCosts,
    totalCost,
    grossProfit,
    netProfit,
    roiPct,
    annualizedRoiPct,
    marginPct,
    costBreakdown: {
      purchasePrice: P,
      rehabCosts: R,
      conveyancingEst,
      sundriesEst,
      holdingMonths: HM,
      monthlyHoldingCosts: MHC,
      baseCommission,
      vatOnCommission,
      extraSellingCosts: ESC,
    },
  };
}
