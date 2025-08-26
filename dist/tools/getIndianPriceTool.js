export const getIndianPriceTool = {
    definition: {
        type: "function",
        function: {
            name: "get_indian_gold_price",
            description: "Get the current gold prices in major Indian cities in INR",
            parameters: {
                type: "object",
                properties: {},
                required: [],
            },
        },
    },
    handler: async () => {
        return await getIndianPrices();
    },
};
async function getIndianPrices() {
    try {
        // Primary: Using Metals-API (free tier - 50 requests/month)
        const metalsApiResponse = await fetchFromMetalsAPI();
        if (metalsApiResponse.success) {
            return metalsApiResponse;
        }
    }
    catch (error) {
        console.error("Error fetching Indian gold prices:", error);
        return {
            success: false,
            data: [],
            timestamp: new Date().toISOString(),
            message: "Failed to fetch current gold prices. Please try again later.",
        };
    }
    return {
        success: false,
        data: [],
        timestamp: new Date().toISOString(),
        message: "Failed to fetch current gold prices. Please try again later.",
    };
}
async function fetchFromMetalsAPI() {
    try {
        const API_KEY = process.env.METALS_API_KEY;
        const response = await fetch(`https://api.metalpriceapi.com/v1/latest?api_key=${API_KEY}&base=XAU&currencies=INR`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Metals API request failed: ${response.status}`);
        }
        const data = await response.json();
        if (!data.success) {
            throw new Error(`Metals API error: ${data.error?.info || "Unknown error"}`);
        }
        const goldPricePerGram = data.rates.INR / 31.1035;
        const cities = [
            "Delhi",
            "Mumbai",
            "Chennai",
            "Kolkata",
            "Bangalore",
            "Hyderabad",
        ];
        const indianPrices = cities.map((city) => {
            const cityPremium = getCityPremium(city);
            const basePrice = goldPricePerGram * (1 + cityPremium);
            return {
                city,
                gold_24k: Math.round(basePrice),
                gold_22k: Math.round(basePrice * 0.916),
                gold_18k: Math.round(basePrice * 0.75),
                silver: Math.round(goldPricePerGram / 80),
                last_updated: new Date().toISOString(),
            };
        });
        return {
            success: true,
            data: indianPrices,
            timestamp: data.timestamp || new Date().toISOString(),
        };
    }
    catch (error) {
        console.error("Metals API fetch failed:", error);
        return {
            success: false,
            data: [],
            timestamp: new Date().toISOString(),
            message: `Metals API error`,
        };
    }
}
function getCityPremium(city) {
    const premiums = {
        Delhi: 0.02,
        Mumbai: 0.025,
        Chennai: 0.015,
        Kolkata: 0.02,
        Bangalore: 0.03,
        Hyderabad: 0.025,
    };
    return premiums[city] || 0.02;
}
