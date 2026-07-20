export const calculateDeal = (req, res) => {
    const { loanAmount, tenureMonths } = req.body;
    
    if (!loanAmount || loanAmount <= 0) {
        return res.status(400).json({ error: "Invalid loan amount" });
    }

    const bankBaseRate = 0.095; // 9.5% average (9-10%)
    const platformPremium = 0.065; // 6.5% average (6-7%)
    const totalCostOfCapital = bankBaseRate + platformPremium; // ~16-17%
    
    const propertyOwnerFixedRentRate = 0.04; // Fixed 4% annual rent
    const defaultGuaranteeReserveRate = 0.0275; // ~2.75% for default buffer & underwriting

    const totalAnnualInterest = loanAmount * totalCostOfCapital;
    const bankIncome = loanAmount * bankBaseRate;
    const propertyOwnerRent = loanAmount * propertyOwnerFixedRentRate;
    const reserveFundAllocation = loanAmount * defaultGuaranteeReserveRate;

    res.json({
        success: true,
        dealSummary: {
            loanAmount,
            tenureMonths,
            totalCostOfCapitalPercent: (totalCostOfCapital * 100).toFixed(2) + '%',
            annualRepaymentBurden: totalAnnualInterest.toFixed(2),
        },
        parties: {
            startupBorrower: {
                role: "Startup Borrower",
                obligation: `Accesses secured-grade capital at ${(totalCostOfCapital * 100).toFixed(1)}% without equity dilution.`,
                annualCost: totalAnnualInterest.toFixed(2),
                monthlyEstimatedPayment: (totalAnnualInterest / 12).toFixed(2)
            },
            propertyOwner: {
                role: "Property Owner (Third-Party Mortgagor)",
                benefit: "Retains property title while earning fixed income.",
                fixedCollateralRentRate: "4.0%",
                annualFixedIncome: propertyOwnerRent.toFixed(2),
                note: "Higher than typical Indian rental yields (2-4%) without tenant management hassles."
            },
            bankOrNBFC: {
                role: "Partnered Bank / NBFC",
                security: "Holds first-priority legal charge on the property asset.",
                baseInterestIncome: bankIncome.toFixed(2),
                riskStatus: "Loan sits on the bank's books backed by dual buffers (DSRA & First-Loss Guarantee)."
            }
        },
        riskBuffers: {
            dsra: "Cash escrow holding 3 to 6 months of repayments pre-funded before disbursal.",
            firstLossDefaultGuarantee: "Platform-backed pool covering the initial 5% of losses (RBI limit).",
            allocatedReserveAmount: reserveFundAllocation.toFixed(2)
        }
    });
};