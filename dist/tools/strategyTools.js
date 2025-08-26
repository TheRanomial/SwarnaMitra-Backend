export const createIndianInvestmentPlanTool = {
    definition: {
        type: "function",
        function: {
            name: "create_indian_investment_plan",
            description: "Generate personalized gold investment strategies for Indian investors",
            parameters: {
                type: "object",
                properties: {
                    riskLevel: {
                        type: "string",
                        enum: ["low", "medium", "high"],
                        description: "Risk tolerance level",
                    },
                    investmentAmount: {
                        type: "number",
                        description: "Total investment amount in INR",
                    },
                    timeHorizon: {
                        type: "number",
                        description: "Investment time horizon in years",
                    },
                    monthlyIncome: {
                        type: "number",
                        description: "Monthly income in INR (optional, for SIP planning)",
                    },
                },
                required: ["riskLevel", "investmentAmount", "timeHorizon"],
            },
        },
    },
    handler: async (params) => {
        return await createInvestmentPlan(params.riskLevel, params.investmentAmount, params.timeHorizon, params.monthlyIncome);
    },
};
async function createInvestmentPlan(riskLevel, amount, timeHorizon, monthlyIncome) {
    try {
        let allocation;
        let strategy;
        let expectedReturns;
        switch (riskLevel) {
            case "low":
                allocation = {
                    physicalGold: 40,
                    goldETF: 25,
                    sovereignBonds: 30,
                    goldMiningStocks: 0,
                    digitalGold: 5,
                };
                strategy = [
                    "Focus on capital preservation over growth",
                    "Prioritize physical gold and government-backed instruments",
                    "Avoid volatile gold mining stocks",
                    "Use SIP approach to average purchase prices",
                    "Keep some liquid ETF holdings for emergency needs",
                ];
                expectedReturns =
                    "8-12% annually (primarily from gold price appreciation + 2.5% SGB interest)";
                break;
            case "medium":
                allocation = {
                    physicalGold: 25,
                    goldETF: 35,
                    sovereignBonds: 25,
                    goldMiningStocks: 10,
                    digitalGold: 5,
                };
                strategy = [
                    "Balance between growth and stability",
                    "Use ETFs as primary investment vehicle",
                    "Small allocation to mining stocks for leverage",
                    "Rebalance portfolio quarterly",
                    "Time purchases around festivals for better rates",
                ];
                expectedReturns =
                    "12-18% annually (gold appreciation + dividend from mining stocks)";
                break;
            case "high":
                allocation = {
                    physicalGold: 15,
                    goldETF: 30,
                    sovereignBonds: 15,
                    goldMiningStocks: 35,
                    digitalGold: 5,
                };
                strategy = [
                    "Maximize growth potential through mining stocks",
                    "Active portfolio management and rebalancing",
                    "Use leverage through mining stock exposure",
                    "Consider international gold mining funds",
                    "Monitor commodity cycles for tactical allocation",
                ];
                expectedReturns =
                    "15-25% annually (higher volatility, potential for significant gains)";
                break;
        }
        const monthlyInvestment = monthlyIncome
            ? Math.min(amount / (timeHorizon * 12), monthlyIncome * 0.15)
            : undefined;
        const recommendations = [
            `Start with ${riskLevel} risk strategy given your profile`,
            `Diversify across ${Object.keys(allocation).filter((k) => allocation[k] > 0).length} different gold investment types`,
            `Consider SIP of ₹${monthlyInvestment?.toLocaleString() || "N/A"} per month`,
            `Review and rebalance ${riskLevel === "high" ? "monthly" : riskLevel === "medium" ? "quarterly" : "half-yearly"}`,
            `Take advantage of festival seasons (Dhanteras, Akshaya Tritiya) for purchases`,
        ];
        const plan = {
            riskLevel,
            totalAmount: amount,
            duration: `${timeHorizon} years`,
            allocation,
            strategy,
            expectedReturns,
            recommendations,
            monthlyInvestment,
        };
        return {
            success: true,
            data: plan,
            message: `Investment plan created for ${riskLevel} risk ${timeHorizon}-year strategy`,
        };
    }
    catch {
        return {
            success: false,
            data: {},
            message: "Failed to create investment plan",
        };
    }
}
export const portfolioAllocationIndiaTool = {
    definition: {
        type: "function",
        function: {
            name: "portfolio_allocation_india",
            description: "Suggest optimal gold allocation considering Indian investment patterns",
            parameters: {
                type: "object",
                properties: {
                    riskLevel: {
                        type: "string",
                        enum: ["low", "medium", "high"],
                        description: "Risk tolerance level",
                    },
                    totalPortfolioValue: {
                        type: "number",
                        description: "Total portfolio value in INR",
                    },
                    currentGoldHolding: {
                        type: "number",
                        description: "Current gold holding value in INR (optional)",
                    },
                },
                required: ["riskLevel", "totalPortfolioValue"],
            },
        },
    },
    handler: async (params) => {
        return await calculatePortfolioAllocation(params.riskLevel, params.totalPortfolioValue, params.currentGoldHolding);
    },
};
async function calculatePortfolioAllocation(riskLevel, portfolioValue, currentGold) {
    try {
        let goldPercentage;
        let breakdown;
        let reasoning;
        let rebalancingFrequency;
        switch (riskLevel) {
            case "low":
                goldPercentage = 15;
                breakdown = {
                    physical: 50,
                    etf: 30,
                    bonds: 20,
                    stocks: 0,
                };
                reasoning = [
                    "15% gold allocation provides inflation hedge without overexposure",
                    "Physical gold (50%) offers security and cultural value",
                    "ETFs (30%) provide liquidity and low-cost exposure",
                    "Sovereign Gold Bonds (20%) offer additional 2.5% interest",
                    "No mining stocks due to volatility concerns",
                ];
                rebalancingFrequency = "Half-yearly";
                break;
            case "medium":
                goldPercentage = 20;
                breakdown = {
                    physical: 30,
                    etf: 40,
                    bonds: 20,
                    stocks: 10,
                };
                reasoning = [
                    "20% gold allocation balances growth with stability",
                    "ETFs (40%) as primary vehicle for cost efficiency",
                    "Physical gold (30%) maintains cultural and emergency value",
                    "SGBs (20%) for tax-efficient returns",
                    "Small mining stock exposure (10%) for leverage",
                ];
                rebalancingFrequency = "Quarterly";
                break;
            case "high":
                goldPercentage = 25;
                breakdown = {
                    physical: 20,
                    etf: 35,
                    bonds: 15,
                    stocks: 30,
                };
                reasoning = [
                    "25% gold allocation maximizes commodity exposure",
                    "Higher mining stock allocation (30%) for leverage to gold prices",
                    "ETFs (35%) for active trading and rebalancing",
                    "Reduced physical holding (20%) to focus on returns",
                    "Minimal SGBs (15%) to maintain some safety",
                ];
                rebalancingFrequency = "Monthly";
                break;
        }
        const goldAllocationAmount = (portfolioValue * goldPercentage) / 100;
        const allocation = {
            riskProfile: riskLevel,
            goldPercentage,
            totalPortfolioValue: portfolioValue,
            goldAllocation: {
                amount: goldAllocationAmount,
                breakdown,
            },
            reasoning,
            rebalancingFrequency,
        };
        const currentGoldPercentage = currentGold
            ? (currentGold / portfolioValue) * 100
            : 0;
        const isOverAllocated = currentGoldPercentage > goldPercentage + 5;
        const isUnderAllocated = currentGoldPercentage < goldPercentage - 5;
        let message = `Optimal gold allocation: ${goldPercentage}% (₹${goldAllocationAmount.toLocaleString()})`;
        if (currentGold) {
            if (isOverAllocated) {
                message += ` | Currently over-allocated at ${currentGoldPercentage.toFixed(1)}% - consider reducing`;
            }
            else if (isUnderAllocated) {
                message += ` | Currently under-allocated at ${currentGoldPercentage.toFixed(1)}% - consider increasing`;
            }
            else {
                message += ` | Current allocation ${currentGoldPercentage.toFixed(1)}% is optimal`;
            }
        }
        return {
            success: true,
            data: allocation,
            message,
        };
    }
    catch {
        return {
            success: false,
            data: {},
            message: "Failed to calculate portfolio allocation",
        };
    }
}
export const riskAssessmentIndianTool = {
    definition: {
        type: "function",
        function: {
            name: "risk_assessment_indian",
            description: "Assess user's risk tolerance specific to Indian market conditions",
            parameters: {
                type: "object",
                properties: {
                    age: {
                        type: "number",
                        description: "Age of the investor",
                    },
                    monthlyIncome: {
                        type: "number",
                        description: "Monthly income in INR",
                    },
                    investmentExperience: {
                        type: "string",
                        enum: ["beginner", "intermediate", "experienced"],
                        description: "Investment experience level",
                    },
                    investmentGoal: {
                        type: "string",
                        enum: ["wealth_preservation", "growth", "speculation"],
                        description: "Primary investment goal",
                    },
                    liquidityNeeds: {
                        type: "string",
                        enum: ["high", "medium", "low"],
                        description: "Liquidity requirements",
                    },
                },
                required: [
                    "age",
                    "monthlyIncome",
                    "investmentExperience",
                    "investmentGoal",
                    "liquidityNeeds",
                ],
            },
        },
    },
    handler: async (params) => {
        return await assessRiskProfile(params.age, params.monthlyIncome, params.investmentExperience, params.investmentGoal, params.liquidityNeeds);
    },
};
async function assessRiskProfile(age, monthlyIncome, experience, goal, liquidity) {
    try {
        let score = 0;
        if (age <= 30)
            score += 3;
        else if (age <= 45)
            score += 2;
        else if (age <= 60)
            score += 1;
        else
            score += 0;
        if (monthlyIncome >= 200000)
            score += 3;
        else if (monthlyIncome >= 100000)
            score += 2;
        else if (monthlyIncome >= 50000)
            score += 1;
        else
            score += 0;
        if (experience === "experienced")
            score += 3;
        else if (experience === "intermediate")
            score += 2;
        else
            score += 1;
        if (goal === "speculation")
            score += 3;
        else if (goal === "growth")
            score += 2;
        else
            score += 1;
        if (liquidity === "low")
            score += 3;
        else if (liquidity === "medium")
            score += 2;
        else
            score += 1;
        let riskLevel;
        let profile;
        let suitableInvestments;
        let warnings;
        let maxGoldAllocation;
        let investmentHorizon;
        if (score <= 7) {
            riskLevel = "low";
            profile =
                "Conservative Investor - You prioritize capital preservation and are comfortable with modest returns.";
            suitableInvestments = [
                "Sovereign Gold Bonds (primary recommendation)",
                "Physical gold (coins and small bars)",
                "Gold ETFs (for liquidity)",
                "Digital gold for small amounts",
            ];
            warnings = [
                "Avoid gold mining stocks due to high volatility",
                "Don't invest more than 15% of portfolio in gold",
                "Consider rupee cost averaging through SIPs",
                "Keep emergency fund separate from gold investments",
            ];
            maxGoldAllocation = 15;
            investmentHorizon = "Long-term (5+ years)";
        }
        else if (score <= 11) {
            riskLevel = "medium";
            profile =
                "Balanced Investor - You seek growth with moderate risk tolerance and can handle some volatility.";
            suitableInvestments = [
                "Gold ETFs (primary vehicle)",
                "Sovereign Gold Bonds (for stability)",
                "Physical gold (moderate allocation)",
                "Gold mining stocks (small allocation)",
                "International gold funds",
            ];
            warnings = [
                "Limit mining stocks to 10% of gold allocation",
                "Rebalance portfolio quarterly",
                "Monitor gold-to-equity ratio in portfolio",
                "Be prepared for 20-30% volatility in mining stocks",
            ];
            maxGoldAllocation = 20;
            investmentHorizon = "Medium to long-term (3-7 years)";
        }
        else {
            riskLevel = "high";
            profile =
                "Aggressive Investor - You seek maximum returns and can tolerate high volatility for potential gains.";
            suitableInvestments = [
                "Gold mining stocks (primary for leverage)",
                "Gold ETFs (for active trading)",
                "International gold mining funds",
                "Gold futures and options (if experienced)",
                "Thematic gold funds",
            ];
            warnings = [
                "Mining stocks can lose 50%+ in bear markets",
                "Requires active monitoring and management",
                "Consider global diversification in mining stocks",
                "Maintain some physical gold for stability",
                "Don't exceed 25% total portfolio in gold",
            ];
            maxGoldAllocation = 25;
            investmentHorizon = "Flexible (1-5 years with active management)";
        }
        const assessment = {
            riskLevel,
            score,
            profile,
            suitableInvestments,
            warningsAndRecommendations: warnings,
            maxGoldAllocation,
            investmentHorizon,
        };
        return {
            success: true,
            data: assessment,
            message: `Risk assessment complete: ${riskLevel.toUpperCase()} risk profile (Score: ${score}/15)`,
        };
    }
    catch {
        return {
            success: false,
            data: {},
            message: "Failed to complete risk assessment",
        };
    }
}
export const indianTaxImplicationsTool = {
    definition: {
        type: "function",
        function: {
            name: "indian_tax_implications",
            description: "Provide detailed information about Indian tax implications of gold investments",
            parameters: {
                type: "object",
                properties: {
                    investmentType: {
                        type: "string",
                        enum: [
                            "physical_gold",
                            "gold_etf",
                            "sovereign_bonds",
                            "gold_mining_stocks",
                            "digital_gold",
                        ],
                        description: "Specific type of gold investment (optional, shows all if not specified)",
                    },
                },
                required: [],
            },
        },
    },
    handler: async (params) => {
        return await getIndianTaxImplications(params.investmentType);
    },
};
async function getIndianTaxImplications(investmentType) {
    try {
        const allTaxInfo = [
            {
                investmentType: "Physical Gold",
                shortTermTax: "Added to income, taxed as per income tax slab (30%+ for high earners)",
                longTermTax: "20% with indexation benefit (after 3 years holding)",
                holdingPeriod: "3 years for long-term capital gains qualification",
                taxBenefits: [
                    "Indexation benefit reduces tax burden significantly",
                    "No tax on holding, only on sale",
                    "Can be gifted to family members without tax (within limits)",
                ],
                gstImplications: "3% GST on purchase (input tax credit not available to individuals)",
                importDutyInfo: "12.5% basic customs duty + 2.5% agriculture infrastructure cess = 15% total",
            },
            {
                investmentType: "Gold ETF",
                shortTermTax: "15% if held less than 3 years",
                longTermTax: "20% with indexation benefit (after 3 years)",
                holdingPeriod: "3 years for long-term qualification",
                taxBenefits: [
                    "More tax-efficient than physical gold",
                    "No GST on purchase/sale",
                    "Indexation benefit available",
                    "Can be used for tax-loss harvesting",
                ],
                gstImplications: "No GST applicable",
                importDutyInfo: "Not applicable (paper gold)",
            },
            {
                investmentType: "Sovereign Gold Bonds",
                shortTermTax: "Interest taxed as per income tax slab annually",
                longTermTax: "Capital gains completely tax-free if held till maturity (8 years)",
                holdingPeriod: "8 years for complete tax exemption",
                taxBenefits: [
                    "Interest income: 2.5% annually (taxable)",
                    "Capital gains tax-free at maturity",
                    "TDS applicable if interest > ₹5,000 per year",
                    "Most tax-efficient gold investment",
                ],
                gstImplications: "No GST applicable",
                importDutyInfo: "Not applicable (government security)",
            },
            {
                investmentType: "Gold Mining Stocks",
                shortTermTax: "15% if held less than 1 year",
                longTermTax: "10% without indexation (after 1 year, if gains > ₹1 lakh)",
                holdingPeriod: "1 year for long-term qualification",
                taxBenefits: [
                    "Dividend income taxed as per slab",
                    "STT (Securities Transaction Tax) applicable",
                    "Can offset against other capital losses",
                    "Lower holding period requirement",
                ],
                gstImplications: "Not applicable",
                importDutyInfo: "Not applicable",
            },
            {
                investmentType: "Digital Gold",
                shortTermTax: "Added to income, taxed as per slab (treated like physical gold)",
                longTermTax: "20% with indexation (after 3 years)",
                holdingPeriod: "3 years for long-term qualification",
                taxBenefits: [
                    "Same as physical gold taxation",
                    "No GST on purchase through approved platforms",
                    "Storage and insurance costs may be deductible",
                ],
                gstImplications: "3% GST may apply depending on platform",
                importDutyInfo: "Underlying gold subject to import duty",
            },
        ];
        let filteredTaxInfo = allTaxInfo;
        if (investmentType) {
            const typeMap = {
                physical_gold: "Physical Gold",
                gold_etf: "Gold ETF",
                sovereign_bonds: "Sovereign Gold Bonds",
                gold_mining_stocks: "Gold Mining Stocks",
                digital_gold: "Digital Gold",
            };
            const targetType = typeMap[investmentType];
            filteredTaxInfo = allTaxInfo.filter((info) => info.investmentType === targetType);
        }
        return {
            success: true,
            data: filteredTaxInfo,
            message: investmentType
                ? `Tax implications for ${investmentType.replace("_", " ")}`
                : "Complete tax guide for all gold investments",
        };
    }
    catch {
        return {
            success: false,
            data: [],
            message: "Failed to fetch tax information",
        };
    }
}
export const sipGoldPlanningTool = {
    definition: {
        type: "function",
        function: {
            name: "sip_gold_planning",
            description: "Set up systematic investment plans for gold in India",
            parameters: {
                type: "object",
                properties: {
                    riskLevel: {
                        type: "string",
                        enum: ["low", "medium", "high"],
                        description: "Risk tolerance level",
                    },
                    monthlyAmount: {
                        type: "number",
                        description: "Monthly SIP amount in INR",
                    },
                    duration: {
                        type: "number",
                        description: "SIP duration in months",
                    },
                    startDate: {
                        type: "string",
                        description: "Preferred start date (YYYY-MM-DD format, optional)",
                    },
                },
                required: ["riskLevel", "monthlyAmount", "duration"],
            },
        },
    },
    handler: async (params) => {
        return await createSIPPlan(params.riskLevel, params.monthlyAmount, params.duration);
    },
};
async function createSIPPlan(riskLevel, monthlyAmount, duration) {
    let investmentMix;
    let platforms;
    let autoInvestmentSchedule;
    let exitStrategy;
    switch (riskLevel) {
        case "low":
            investmentMix = {
                digitalGold: 40,
                goldETF: 30,
                sovereignBonds: 30,
            };
            platforms = [
                "Paytm Gold (Digital Gold)",
                "SBI Gold ETF via SBI Securities",
                "Sovereign Gold Bonds via bank/post office",
                "HDFC Securities (ETF trading)",
                "Zerodha Coin (Mutual fund platform)",
            ];
            autoInvestmentSchedule = "5th of every month (post-salary date)";
            exitStrategy = "Staggered exit over 6 months to average selling prices";
            break;
        case "medium":
            investmentMix = {
                digitalGold: 25,
                goldETF: 50,
                sovereignBonds: 25,
            };
            platforms = [
                "Groww (ETF and Digital Gold)",
                "Upstox (Low brokerage ETF trading)",
                "PhonePe Gold (Digital gold)",
                "ICICI Direct (Comprehensive platform)",
                "Angel Broking (Research and execution)",
            ];
            autoInvestmentSchedule =
                "1st and 15th of month (bi-monthly for better averaging)";
            exitStrategy = "Tactical exits based on gold cycle analysis";
            break;
        case "high":
            investmentMix = {
                digitalGold: 15,
                goldETF: 70,
                sovereignBonds: 15,
            };
            platforms = [
                "Zerodha (Low cost, advanced tools)",
                "Kite by Zerodha (Mobile trading)",
                "Fyers (Professional platform)",
                "5paisa (Comprehensive services)",
                "Interactive Brokers (International exposure)",
            ];
            autoInvestmentSchedule = "Weekly SIPs for maximum rupee cost averaging";
            exitStrategy = "Active management with stop-losses and profit booking";
            break;
    }
    const totalInvested = monthlyAmount * duration;
    const years = duration / 12;
    const expectedAccumulation = totalInvested * 1.1 ** years;
    const sipPlan = {
        riskLevel,
        monthlyAmount,
        duration,
        investmentMix,
        expectedAccumulation: Math.round(expectedAccumulation),
        platforms,
        autoInvestmentSchedule,
        exitStrategy,
    };
    return {
        success: true,
        data: sipPlan,
        message: `SIP plan created: ₹${monthlyAmount.toLocaleString()}/month for ${duration} months (Total: ₹${totalInvested.toLocaleString()})`,
    };
}
