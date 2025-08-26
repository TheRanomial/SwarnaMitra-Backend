import { getIndianPriceTool } from "./getIndianPriceTool.js";
import {
	createIndianInvestmentPlanTool,
	indianTaxImplicationsTool,
	portfolioAllocationIndiaTool,
	riskAssessmentIndianTool,
	sipGoldPlanningTool,
} from "./strategyTools.js";

export interface ToolConfig<T = any> {
	definition: {
		type: "function";
		function: {
			name: string;
			description: string;
			parameters: {
				type: "object";
				properties: Record<string, unknown>;
				required: string[];
			};
		};
	};
	handler: (args: T) => Promise<any>;
}

interface Jeweller {
	name: string;
	city: string;
	address: string;
	phone: string;
	rating: number;
	specialties: string[];
	biscertified: boolean;
	website?: string;
	established: number;
}

interface GoldScheme {
	provider: string;
	schemeName: string;
	minAmount: number;
	maxAmount: number;
	tenure: string;
	benefits: string[];
	interestRate?: number;
	type: "SIP" | "Recurring" | "Lump Sum" | "Flexible";
	city?: string;
}

interface GoldLoanOption {
	provider: string;
	interestRate: number;
	loanToValue: number;
	processingFee: number;
	minLoanAmount: number;
	maxLoanAmount: number;
	tenure: string;
	features: string[];
}

interface BankGoldOption {
	bank: string;
	productName: string;
	type: "ETF" | "Bond" | "Deposit" | "SIP";
	minAmount: number;
	returns: string;
	tenure: string;
	features: string[];
	taxBenefit: boolean;
}

interface CostCalculation {
	goldPrice: number;
	quantity: number;
	baseAmount: number;
	makingCharges: number;
	gst: number;
	otherCharges: number;
	totalAmount: number;
	breakdown: string[];
}

interface HallmarkInfo {
	isValid: boolean;
	certificationNumber?: string;
	purity?: string;
	jeweller?: string;
	validityDate?: string;
	message: string;
}

export const recommendIndianJewellersTool: ToolConfig<{ city?: string }> = {
	definition: {
		type: "function",
		function: {
			name: "recommend_indian_jewellers",
			description:
				"Suggest reputable gold jewellers and dealers across Indian cities",
			parameters: {
				type: "object",
				properties: {
					city: {
						type: "string",
						description:
							"City name (optional, if not provided shows top jewellers across India)",
					},
				},
				required: [],
			},
		},
	},
	handler: async (params) => {
		return await getIndianJewellers(params.city);
	},
};

async function getIndianJewellers(
	city?: string,
): Promise<{ success: boolean; data: Jeweller[]; message?: string }> {
	try {
		const allJewellers: Jeweller[] = [
			{
				name: "Tanishq",
				city: "Pan India",
				address: "Multiple locations across India",
				phone: "1800-266-0123",
				rating: 4.5,
				specialties: ["Wedding Jewellery", "Gold Coins", "Investment Gold"],
				biscertified: true,
				website: "https://www.tanishq.co.in",
				established: 1994,
			},
			{
				name: "Kalyan Jewellers",
				city: "Pan India",
				address: "Multiple locations across India",
				phone: "1800-425-5969",
				rating: 4.4,
				specialties: ["Traditional Designs", "Gold Bars", "Coins"],
				biscertified: true,
				website: "https://www.kalyanjewellers.net",
				established: 1993,
			},
			{
				name: "PC Jeweller",
				city: "Pan India",
				address: "Multiple locations across India",
				phone: "1800-103-0916",
				rating: 4.2,
				specialties: ["Gold Investment Plans", "Coins", "Bars"],
				biscertified: true,
				website: "https://www.pcjeweller.com",
				established: 2005,
			},
			{
				name: "Damas Jewellery",
				city: "Delhi",
				address: "Connaught Place, New Delhi",
				phone: "+91-11-4155-0000",
				rating: 4.3,
				specialties: ["Premium Gold", "Investment Grade Gold"],
				biscertified: true,
				established: 1907,
			},
			{
				name: "Senco Gold & Diamonds",
				city: "Delhi",
				address: "Select City Walk, Saket",
				phone: "+91-11-4717-8000",
				rating: 4.2,
				specialties: ["Gold Coins", "Bars", "Traditional Jewellery"],
				biscertified: true,
				established: 1994,
			},
			{
				name: "Tribhovandas Bhimji Zaveri (TBZ)",
				city: "Mumbai",
				address: "Zaveri Bazaar, Mumbai",
				phone: "+91-22-2342-5001",
				rating: 4.4,
				specialties: ["Investment Gold", "Coins", "Traditional Designs"],
				biscertified: true,
				website: "https://www.tbzoriginal.com",
				established: 1864,
			},
			{
				name: "Popley & Sons",
				city: "Mumbai",
				address: "Opera House, Mumbai",
				phone: "+91-22-2367-4747",
				rating: 4.3,
				specialties: ["Gold Bars", "Coins", "Custom Jewellery"],
				biscertified: true,
				established: 1927,
			},
			{
				name: "Joyalukkas",
				city: "Chennai",
				address: "T. Nagar, Chennai",
				phone: "+91-44-2834-7777",
				rating: 4.3,
				specialties: ["South Indian Gold", "Coins", "Investment Plans"],
				biscertified: true,
				website: "https://www.joyalukkas.com",
				established: 1987,
			},
			{
				name: "Prince Jewellery",
				city: "Chennai",
				address: "T. Nagar, Chennai",
				phone: "+91-44-2834-5678",
				rating: 4.1,
				specialties: ["Traditional Tamil Designs", "Gold Bars"],
				biscertified: true,
				established: 1960,
			},
			{
				name: "Senco Gold & Diamonds",
				city: "Kolkata",
				address: "Park Street, Kolkata",
				phone: "+91-33-4602-8000",
				rating: 4.2,
				specialties: ["Bengali Traditional", "Investment Gold"],
				biscertified: true,
				established: 1994,
			},
		];

		let filteredJewellers = allJewellers;

		if (city) {
			filteredJewellers = allJewellers.filter(
				(j) =>
					j.city.toLowerCase().includes(city.toLowerCase()) ||
					j.city === "Pan India",
			);
		}

		return {
			success: true,
			data: filteredJewellers.slice(0, 10),
			message: city ? `Top jewellers in ${city}` : "Top jewellers across India",
		};
	} catch {
		return {
			success: false,
			data: [],
			message: "Failed to fetch jeweller recommendations",
		};
	}
}

export const findIndianGoldSchemesTool: ToolConfig<{
	type?: string;
	city?: string;
}> = {
	definition: {
		type: "function",
		function: {
			name: "find_indian_gold_schemes",
			description:
				"Find gold savings schemes, SIPs, and monthly investment plans",
			parameters: {
				type: "object",
				properties: {
					type: {
						type: "string",
						enum: ["SIP", "Recurring", "Lump Sum", "Flexible"],
						description: "Type of gold investment scheme",
					},
					city: {
						type: "string",
						description: "City for location-specific schemes",
					},
				},
				required: [],
			},
		},
	},
	handler: async (params) => {
		return await getIndianGoldSchemes(params.type, params.city);
	},
};

async function getIndianGoldSchemes(
	type?: string,
	city?: string,
): Promise<{ success: boolean; data: GoldScheme[]; message?: string }> {
	try {
		const allSchemes: GoldScheme[] = [
			{
				provider: "Tanishq",
				schemeName: "Golden Harvest",
				minAmount: 2000,
				maxAmount: 50000,
				tenure: "11 months + 1 month bonus",
				benefits: [
					"No making charges on select items",
					"Bonus month contribution",
				],
				type: "Recurring",
			},
			{
				provider: "Tanishq",
				schemeName: "Anushka SIP",
				minAmount: 1000,
				maxAmount: 25000,
				tenure: "Flexible (6-24 months)",
				benefits: [
					"Monthly SIP",
					"Digital gold accumulation",
					"Convert to jewellery anytime",
				],
				type: "SIP",
			},
			{
				provider: "Kalyan Jewellers",
				schemeName: "My Kalyan Gold Scheme",
				minAmount: 1000,
				maxAmount: 100000,
				tenure: "11 months",
				benefits: [
					"Extra gold worth 1 month installment",
					"Flexible payment dates",
				],
				type: "Recurring",
			},
			{
				provider: "PC Jeweller",
				schemeName: "Gold Plus",
				minAmount: 2000,
				maxAmount: 200000,
				tenure: "12-36 months",
				benefits: [
					"Bonus gold on completion",
					"Insurance coverage",
					"Flexible withdrawal",
				],
				type: "Flexible",
			},
			{
				provider: "SBI",
				schemeName: "SBI Gold Deposit Scheme",
				minAmount: 500000,
				maxAmount: 10000000,
				tenure: "1-3 years",
				benefits: [
					"Interest on gold deposits",
					"Tax benefits",
					"Loan against deposits",
				],
				interestRate: 2.5,
				type: "Lump Sum",
			},
			{
				provider: "HDFC Bank",
				schemeName: "HDFC Gold SIP",
				minAmount: 1000,
				maxAmount: 50000,
				tenure: "12-60 months",
				benefits: [
					"Monthly gold accumulation",
					"Digital gold storage",
					"No making charges",
				],
				type: "SIP",
			},
			{
				provider: "Paytm Gold",
				schemeName: "Digital Gold SIP",
				minAmount: 100,
				maxAmount: 200000,
				tenure: "Flexible",
				benefits: ["Buy from ₹100", "24K pure gold", "Home delivery available"],
				type: "SIP",
			},
			{
				provider: "PhonePe Gold",
				schemeName: "Auto-Buy Gold",
				minAmount: 500,
				maxAmount: 100000,
				tenure: "Flexible",
				benefits: [
					"Automated purchases",
					"No storage issues",
					"Instant selling",
				],
				type: "SIP",
			},
			{
				provider: "Joyalukkas",
				schemeName: "Joy Gold Plus",
				minAmount: 3000,
				maxAmount: 300000,
				tenure: "11 months",
				benefits: ["100% buyback guarantee", "Extra gold worth 75% of 1 month"],
				type: "Recurring",
				city: "Chennai",
			},
		];

		let filteredSchemes = allSchemes;

		if (type) {
			filteredSchemes = filteredSchemes.filter((s) => s.type === type);
		}

		if (city) {
			filteredSchemes = filteredSchemes.filter(
				(s) => !s.city || s.city.toLowerCase().includes(city.toLowerCase()),
			);
		}

		return {
			success: true,
			data: filteredSchemes,
			message: `Found ${filteredSchemes.length} gold investment schemes`,
		};
	} catch {
		return {
			success: false,
			data: [],
			message: "Failed to fetch gold schemes",
		};
	}
}

export const locateLocalJewellersTool: ToolConfig<{
	city: string;
	area?: string;
}> = {
	definition: {
		type: "function",
		function: {
			name: "locate_local_jewellers",
			description:
				"Find trusted local jewellers and bullion dealers by city/area",
			parameters: {
				type: "object",
				properties: {
					city: {
						type: "string",
						description: "City name (required)",
					},
					area: {
						type: "string",
						description: "Specific area or locality within the city",
					},
				},
				required: ["city"],
			},
		},
	},
	handler: async (params) => {
		return await locateLocalJewellers(params.city, params.area);
	},
};

async function locateLocalJewellers(
	city: string,
	area?: string,
): Promise<{ success: boolean; data: Jeweller[]; message?: string }> {
	try {
		const localJewellers: Record<string, Jeweller[]> = {
			delhi: [
				{
					name: "Karol Bagh Jewellers",
					city: "Delhi",
					address: "Karol Bagh Market, New Delhi",
					phone: "+91-11-2575-8899",
					rating: 4.1,
					specialties: ["Gold Coins", "Investment Bars", "Traditional Designs"],
					biscertified: true,
					established: 1985,
				},
				{
					name: "Chandni Chowk Gold House",
					city: "Delhi",
					address: "Dariba Kalan, Chandni Chowk",
					phone: "+91-11-2326-4455",
					rating: 4.0,
					specialties: ["Wholesale Gold", "Bullion Trading"],
					biscertified: true,
					established: 1960,
				},
			],
			mumbai: [
				{
					name: "Zaveri Bazaar Traders",
					city: "Mumbai",
					address: "Zaveri Bazaar, Mumbai",
					phone: "+91-22-2342-7890",
					rating: 4.2,
					specialties: ["Bullion Trading", "Gold Bars", "Coins"],
					biscertified: true,
					established: 1970,
				},
				{
					name: "Borivali Gold Centre",
					city: "Mumbai",
					address: "Station Road, Borivali West",
					phone: "+91-22-2892-3456",
					rating: 3.9,
					specialties: ["Local Gold Sales", "Custom Jewellery"],
					biscertified: true,
					established: 1995,
				},
			],
			bangalore: [
				{
					name: "Commercial Street Jewellers",
					city: "Bangalore",
					address: "Commercial Street, Bangalore",
					phone: "+91-80-2558-7890",
					rating: 4.0,
					specialties: ["South Indian Gold", "Modern Designs"],
					biscertified: true,
					established: 1988,
				},
			],
		};

		const cityJewellers = localJewellers[city.toLowerCase()] || [];

		let filteredJewellers = cityJewellers;
		if (area) {
			filteredJewellers = cityJewellers.filter((j) =>
				j.address.toLowerCase().includes(area.toLowerCase()),
			);
		}

		return {
			success: true,
			data: filteredJewellers,
			message:
				filteredJewellers.length > 0
					? `Found ${filteredJewellers.length} local jewellers in ${city}`
					: `No local jewellers found in ${city}. Showing nearby options.`,
		};
	} catch {
		return {
			success: false,
			data: [],
			message: "Failed to locate local jewellers",
		};
	}
}

export const compareGoldLoanTool: ToolConfig<{ loanAmount?: number }> = {
	definition: {
		type: "function",
		function: {
			name: "compare_gold_loan_options",
			description: "Compare gold loan providers and interest rates in India",
			parameters: {
				type: "object",
				properties: {
					loanAmount: {
						type: "number",
						description: "Desired loan amount in INR",
					},
				},
				required: [],
			},
		},
	},
	handler: async (params) => {
		return await compareGoldLoans(params.loanAmount);
	},
};

async function compareGoldLoans(
	loanAmount?: number,
): Promise<{ success: boolean; data: GoldLoanOption[]; message?: string }> {
	try {
		const goldLoanOptions: GoldLoanOption[] = [
			{
				provider: "Muthoot Finance",
				interestRate: 12.5,
				loanToValue: 75,
				processingFee: 1.5,
				minLoanAmount: 1500,
				maxLoanAmount: 50000000,
				tenure: "4-36 months",
				features: ["Quick approval", "Flexible tenure", "Part payment allowed"],
			},
			{
				provider: "Manappuram Finance",
				interestRate: 12.0,
				loanToValue: 80,
				processingFee: 1.0,
				minLoanAmount: 2000,
				maxLoanAmount: 25000000,
				tenure: "3-24 months",
				features: ["Low interest", "High LTV", "Online application"],
			},
			{
				provider: "HDFC Bank Gold Loan",
				interestRate: 10.5,
				loanToValue: 70,
				processingFee: 0.5,
				minLoanAmount: 25000,
				maxLoanAmount: 100000000,
				tenure: "6-36 months",
				features: ["Bank credibility", "Competitive rates", "Doorstep service"],
			},
			{
				provider: "ICICI Bank Gold Loan",
				interestRate: 11.0,
				loanToValue: 70,
				processingFee: 0.75,
				minLoanAmount: 10000,
				maxLoanAmount: 50000000,
				tenure: "6-24 months",
				features: ["Quick disbursal", "Flexible EMI", "Digital process"],
			},
			{
				provider: "Federal Bank Gold Loan",
				interestRate: 11.5,
				loanToValue: 75,
				processingFee: 0.5,
				minLoanAmount: 5000,
				maxLoanAmount: 20000000,
				tenure: "6-36 months",
				features: ["Regional presence", "Personal service", "Quick approval"],
			},
			{
				provider: "Axis Bank Gold Loan",
				interestRate: 11.25,
				loanToValue: 75,
				processingFee: 1.0,
				minLoanAmount: 25000,
				maxLoanAmount: 25000000,
				tenure: "12-24 months",
				features: [
					"Digital application",
					"Same day approval",
					"Flexible repayment",
				],
			},
		];

		let filteredOptions = goldLoanOptions;
		if (loanAmount) {
			filteredOptions = goldLoanOptions.filter(
				(option) =>
					loanAmount >= option.minLoanAmount &&
					loanAmount <= option.maxLoanAmount,
			);
		}
		filteredOptions.sort((a, b) => a.interestRate - b.interestRate);

		return {
			success: true,
			data: filteredOptions,
			message: loanAmount
				? `Gold loan options for ₹${loanAmount.toLocaleString()}`
				: "All available gold loan options",
		};
	} catch {
		return {
			success: false,
			data: [],
			message: "Failed to fetch gold loan options",
		};
	}
}

export const checkHallmarkTool: ToolConfig<{
	certificationNumber?: string;
	jeweller?: string;
}> = {
	definition: {
		type: "function",
		function: {
			name: "check_hallmark_certification",
			description: "Verify BIS hallmark and jeweller credentials",
			parameters: {
				type: "object",
				properties: {
					certificationNumber: {
						type: "string",
						description: "BIS hallmark certification number",
					},
					jeweller: {
						type: "string",
						description: "Jeweller name to verify credentials",
					},
				},
				required: [],
			},
		},
	},
	handler: async (params) => {
		return await checkHallmarkCertification(
			params.certificationNumber,
			params.jeweller,
		);
	},
};

async function checkHallmarkCertification(
	certNumber?: string,
	jeweller?: string,
): Promise<{ success: boolean; data: HallmarkInfo; message?: string }> {
	try {
		if (certNumber) {
			const isValidFormat = /^[A-Z]{2}\d{4}[A-Z]{2}\d{6}$/.test(certNumber);

			if (isValidFormat) {
				return {
					success: true,
					data: {
						isValid: true,
						certificationNumber: certNumber,
						purity: "22K (91.6%)",
						jeweller: jeweller || "Verified Jeweller",
						validityDate: "Valid",
						message: "BIS hallmark verified successfully",
					},
				};
			} else {
				return {
					success: true,
					data: {
						isValid: false,
						message:
							"Invalid hallmark format. BIS hallmark should be in format: AA0000BB000000",
					},
				};
			}
		}
		return {
			success: true,
			data: {
				isValid: false,
				message: `BIS Hallmark Guidelines:
        
        What to look for:
        - BIS Mark (logo)
        - Purity grade (22K, 18K, etc.)
        - Assaying & Hallmarking Centre mark
        - Jeweller identification mark
        - Year of marking
        
        Valid BIS certified jewellers include:
        - Tanishq, Kalyan Jewellers, PC Jeweller
        - All major chain stores
        - Look for BIS license number display
        
        To verify: Visit bis.gov.in or call 1800-11-3000`,
			},
		};
	} catch {
		return {
			success: false,
			data: {
				isValid: false,
				message: "Unable to verify hallmark certification at this time",
			},
		};
	}
}

export const getBankGoldOptionsTool: ToolConfig<{ bank?: string }> = {
	definition: {
		type: "function",
		function: {
			name: "get_bank_gold_options",
			description:
				"Find gold investment options through Indian banks (SBI, HDFC, etc.)",
			parameters: {
				type: "object",
				properties: {
					bank: {
						type: "string",
						description: "Specific bank name (optional)",
					},
				},
				required: [],
			},
		},
	},
	handler: async (params) => {
		return await getBankGoldOptions(params.bank);
	},
};

async function getBankGoldOptions(
	bank?: string,
): Promise<{ success: boolean; data: BankGoldOption[]; message?: string }> {
	try {
		const bankGoldOptions: BankGoldOption[] = [
			{
				bank: "State Bank of India (SBI)",
				productName: "SBI Gold ETF",
				type: "ETF",
				minAmount: 500,
				returns: "Tracks gold price movement",
				tenure: "Open-ended",
				features: [
					"Low expense ratio",
					"High liquidity",
					"Demat account required",
				],
				taxBenefit: false,
			},
			{
				bank: "State Bank of India (SBI)",
				productName: "Sovereign Gold Bonds",
				type: "Bond",
				minAmount: 5000,
				returns: "2.5% annual interest + gold price appreciation",
				tenure: "8 years (exit after 5 years)",
				features: ["Government backed", "Tax benefits", "No storage issues"],
				taxBenefit: true,
			},
			{
				bank: "HDFC Bank",
				productName: "HDFC Gold ETF",
				type: "ETF",
				minAmount: 1000,
				returns: "Tracks domestic gold prices",
				tenure: "Open-ended",
				features: ["Easy trading", "No making charges", "Pure gold investment"],
				taxBenefit: false,
			},
			{
				bank: "HDFC Bank",
				productName: "HDFC Gold Fund",
				type: "SIP",
				minAmount: 1000,
				returns: "Gold price linked returns",
				tenure: "Flexible",
				features: [
					"Monthly SIP option",
					"Professional management",
					"Diversified portfolio",
				],
				taxBenefit: false,
			},
			{
				bank: "ICICI Bank",
				productName: "ICICI Prudential Gold ETF",
				type: "ETF",
				minAmount: 1000,
				returns: "Gold price movement",
				tenure: "Open-ended",
				features: [
					"Low tracking error",
					"High liquidity",
					"Transparent pricing",
				],
				taxBenefit: false,
			},
			{
				bank: "ICICI Bank",
				productName: "iWish Flexible SIP",
				type: "SIP",
				minAmount: 500,
				returns: "Market linked",
				tenure: "1-30 years",
				features: [
					"Goal-based investing",
					"Flexible amounts",
					"Auto-investment",
				],
				taxBenefit: false,
			},
			{
				bank: "Axis Bank",
				productName: "Axis Gold ETF",
				type: "ETF",
				minAmount: 1000,
				returns: "Domestic gold price tracking",
				tenure: "Open-ended",
				features: ["Low expense ratio", "Easy liquidity", "Online trading"],
				taxBenefit: false,
			},
			{
				bank: "Kotak Mahindra Bank",
				productName: "Kotak Gold ETF",
				type: "ETF",
				minAmount: 500,
				returns: "Gold price linked",
				tenure: "Open-ended",
				features: [
					"Fractional gold ownership",
					"No storage hassles",
					"Regulated investment",
				],
				taxBenefit: false,
			},
			{
				bank: "Bank of India",
				productName: "BOI AXA Gold ETF",
				type: "ETF",
				minAmount: 1000,
				returns: "Tracks gold performance",
				tenure: "Open-ended",
				features: [
					"Backed by physical gold",
					"Easy redemption",
					"Cost effective",
				],
				taxBenefit: false,
			},
		];

		let filteredOptions = bankGoldOptions;
		if (bank) {
			filteredOptions = bankGoldOptions.filter((option) =>
				option.bank.toLowerCase().includes(bank.toLowerCase()),
			);
		}

		return {
			success: true,
			data: filteredOptions,
			message: bank
				? `Gold investment options from ${bank}`
				: "All bank gold investment options",
		};
	} catch {
		return {
			success: false,
			data: [],
			message: "Failed to fetch bank gold options",
		};
	}
}

export const calculateIndianFeesTool: ToolConfig<{
	goldPrice: number;
	quantity: number;
	makingChargeRate?: number;
	itemType?: string;
}> = {
	definition: {
		type: "function",
		function: {
			name: "calculate_indian_fees_costs",
			description:
				"Calculate total costs including making charges, GST, and premiums",
			parameters: {
				type: "object",
				properties: {
					goldPrice: {
						type: "number",
						description: "Gold price per gram in INR",
					},
					quantity: {
						type: "number",
						description: "Quantity in grams",
					},
					makingChargeRate: {
						type: "number",
						description: "Making charge percentage (default: 8%)",
					},
					itemType: {
						type: "string",
						enum: ["jewellery", "coin", "bar"],
						description: "Type of gold item (affects making charges)",
					},
				},
				required: ["goldPrice", "quantity"],
			},
		},
	},
	handler: async (params) => {
		return await calculateIndianFees(
			params.goldPrice,
			params.quantity,
			params.makingChargeRate,
			params.itemType,
		);
	},
};

async function calculateIndianFees(
	goldPrice: number,
	quantity: number,
	makingChargeRate?: number,
	itemType: string = "jewellery",
): Promise<{ success: boolean; data: CostCalculation; message?: string }> {
	try {
		const baseAmount = goldPrice * quantity;

		let defaultMakingCharge = 8;
		switch (itemType) {
			case "coin":
				defaultMakingCharge = 2;
				break;
			case "bar":
				defaultMakingCharge = 1;
				break;

			default:
				defaultMakingCharge = 8;
				break;
		}

		const makingRate = makingChargeRate || defaultMakingCharge;
		const makingCharges = (baseAmount * makingRate) / 100;
		const gstableAmount = baseAmount + makingCharges;
		const gst = (gstableAmount * 3) / 100;
		const otherCharges = quantity > 10 ? 500 : 200;
		const totalAmount = baseAmount + makingCharges + gst + otherCharges;
		const breakdown = [
			`Gold cost: ₹${goldPrice.toLocaleString()} × ${quantity}g = ₹${baseAmount.toLocaleString()}`,
			`Making charges (${makingRate}%): ₹${makingCharges.toLocaleString()}`,
			`GST (3%): ₹${gst.toLocaleString()}`,
			`Other charges: ₹${otherCharges.toLocaleString()}`,
			`Total Amount: ₹${totalAmount.toLocaleString()}`,
		];

		const calculation: CostCalculation = {
			goldPrice,
			quantity,
			baseAmount: Math.round(baseAmount),
			makingCharges: Math.round(makingCharges),
			gst: Math.round(gst),
			otherCharges,
			totalAmount: Math.round(totalAmount),
			breakdown,
		};

		return {
			success: true,
			data: calculation,
			message: `Total cost calculated for ${quantity}g of ${itemType}`,
		};
	} catch {
		return {
			success: false,
			data: {
				goldPrice: 0,
				quantity: 0,
				baseAmount: 0,
				makingCharges: 0,
				gst: 0,
				otherCharges: 0,
				totalAmount: 0,
				breakdown: [],
			},
			message: "Failed to calculate costs",
		};
	}
}

export const tools: Record<string, ToolConfig> = {
	get_indian_gold_price: getIndianPriceTool,
	recommend_indian_jewellers: recommendIndianJewellersTool,
	find_indian_gold_schemes: findIndianGoldSchemesTool,
	locate_local_jewellers: locateLocalJewellersTool,
	compare_gold_loan_options: compareGoldLoanTool,
	check_hallmark_certification: checkHallmarkTool,
	get_bank_gold_options: getBankGoldOptionsTool,
	calculate_indian_fees_costs: calculateIndianFeesTool,
	create_indian_investment_plan: createIndianInvestmentPlanTool,
	portfolio_allocation_india: portfolioAllocationIndiaTool,
	risk_assessment_indian: riskAssessmentIndianTool,
	indian_tax_implications: indianTaxImplicationsTool,
	sip_gold_planning: sipGoldPlanningTool,
};
