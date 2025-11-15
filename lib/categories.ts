// Category encoding system - each category has a unique hex code
export interface Category {
  id: string; // Encoded hex ID
  name: string;
  brand: string;
  type: "gift-card" | "voucher" | "subscription" | "gaming";
  country: string[];
}

// Encoding function - converts string to hex code
function encodeCategory(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    const char = name.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return "0x" + Math.abs(hash).toString(16).substring(0, 5);
}

export const CATEGORIES: Category[] = [
  // E-Commerce & Retail
  {
    id: encodeCategory("Amazon"),
    name: "Amazon Gift Card",
    brand: "Amazon",
    type: "gift-card",
    country: ["US", "UK", "DE", "FR", "JP", "CA"],
  },
  {
    id: encodeCategory("eBay"),
    name: "eBay Gift Card",
    brand: "eBay",
    type: "gift-card",
    country: ["US", "UK", "DE", "AU"],
  },
  {
    id: encodeCategory("Walmart"),
    name: "Walmart eGift Card",
    brand: "Walmart",
    type: "gift-card",
    country: ["US"],
  },
  {
    id: encodeCategory("Target"),
    name: "Target GiftCard",
    brand: "Target",
    type: "gift-card",
    country: ["US"],
  },
  {
    id: encodeCategory("Best Buy"),
    name: "Best Buy Gift Card",
    brand: "Best Buy",
    type: "gift-card",
    country: ["US", "CA"],
  },
  {
    id: encodeCategory("Alibaba"),
    name: "Alibaba Gift Card",
    brand: "Alibaba",
    type: "gift-card",
    country: ["CN"],
  },
  {
    id: encodeCategory("AliExpress"),
    name: "AliExpress Gift Card",
    brand: "AliExpress",
    type: "gift-card",
    country: ["Global"],
  },
  {
    id: encodeCategory("Etsy"),
    name: "Etsy Gift Card",
    brand: "Etsy",
    type: "gift-card",
    country: ["US", "UK", "CA"],
  },

  // Food & Restaurants
  {
    id: encodeCategory("Starbucks"),
    name: "Starbucks Gift Card",
    brand: "Starbucks",
    type: "gift-card",
    country: ["US", "UK", "CA", "JP"],
  },
  {
    id: encodeCategory("McDonald's"),
    name: "McDonald's Arch Card",
    brand: "McDonald's",
    type: "gift-card",
    country: ["US", "UK", "CA"],
  },
  {
    id: encodeCategory("Subway"),
    name: "Subway Gift Card",
    brand: "Subway",
    type: "gift-card",
    country: ["US", "UK"],
  },
  {
    id: encodeCategory("Domino's Pizza"),
    name: "Domino's Gift Card",
    brand: "Domino's",
    type: "gift-card",
    country: ["US", "UK", "AU"],
  },
  {
    id: encodeCategory("DoorDash"),
    name: "DoorDash Gift Card",
    brand: "DoorDash",
    type: "gift-card",
    country: ["US", "CA"],
  },
  {
    id: encodeCategory("Uber Eats"),
    name: "Uber Eats Gift Card",
    brand: "Uber Eats",
    type: "gift-card",
    country: ["Global"],
  },
  {
    id: encodeCategory("Grubhub"),
    name: "Grubhub Gift Card",
    brand: "Grubhub",
    type: "gift-card",
    country: ["US"],
  },

  // Gaming
  {
    id: encodeCategory("Steam"),
    name: "Steam Wallet Code",
    brand: "Steam",
    type: "gaming",
    country: ["Global"],
  },
  {
    id: encodeCategory("PlayStation"),
    name: "PlayStation Store Gift Card",
    brand: "PlayStation",
    type: "gaming",
    country: ["US", "UK", "EU", "JP"],
  },
  {
    id: encodeCategory("Xbox"),
    name: "Xbox Gift Card",
    brand: "Xbox",
    type: "gaming",
    country: ["US", "UK", "EU"],
  },
  {
    id: encodeCategory("Nintendo"),
    name: "Nintendo eShop Card",
    brand: "Nintendo",
    type: "gaming",
    country: ["US", "UK", "JP"],
  },
  {
    id: encodeCategory("Roblox"),
    name: "Roblox Gift Card",
    brand: "Roblox",
    type: "gaming",
    country: ["Global"],
  },
  {
    id: encodeCategory("League of Legends"),
    name: "League of Legends RP Card",
    brand: "Riot Games",
    type: "gaming",
    country: ["Global"],
  },
  {
    id: encodeCategory("Fortnite"),
    name: "Fortnite V-Bucks Card",
    brand: "Epic Games",
    type: "gaming",
    country: ["Global"],
  },
  {
    id: encodeCategory("PUBG"),
    name: "PUBG UC Card",
    brand: "PUBG",
    type: "gaming",
    country: ["Global"],
  },
  {
    id: encodeCategory("Valorant"),
    name: "Valorant Points Card",
    brand: "Riot Games",
    type: "gaming",
    country: ["Global"],
  },
  {
    id: encodeCategory("Apex Legends"),
    name: "Apex Legends Coins",
    brand: "EA",
    type: "gaming",
    country: ["Global"],
  },

  // Streaming & Entertainment
  {
    id: encodeCategory("Netflix"),
    name: "Netflix Gift Card",
    brand: "Netflix",
    type: "subscription",
    country: ["US", "UK", "Global"],
  },
  {
    id: encodeCategory("Spotify"),
    name: "Spotify Gift Card",
    brand: "Spotify",
    type: "subscription",
    country: ["US", "UK", "EU"],
  },
  {
    id: encodeCategory("Apple Music"),
    name: "Apple Music Gift Card",
    brand: "Apple",
    type: "subscription",
    country: ["US", "UK", "Global"],
  },
  {
    id: encodeCategory("Disney+"),
    name: "Disney+ Gift Card",
    brand: "Disney",
    type: "subscription",
    country: ["US", "UK", "CA"],
  },
  {
    id: encodeCategory("Hulu"),
    name: "Hulu Gift Card",
    brand: "Hulu",
    type: "subscription",
    country: ["US"],
  },
  {
    id: encodeCategory("HBO Max"),
    name: "HBO Max Gift Card",
    brand: "HBO",
    type: "subscription",
    country: ["US"],
  },
  {
    id: encodeCategory("YouTube Premium"),
    name: "YouTube Premium Gift",
    brand: "Google",
    type: "subscription",
    country: ["Global"],
  },
  {
    id: encodeCategory("Twitch"),
    name: "Twitch Gift Card",
    brand: "Twitch",
    type: "subscription",
    country: ["Global"],
  },

  // Tech & Software
  {
    id: encodeCategory("Apple"),
    name: "Apple Gift Card",
    brand: "Apple",
    type: "gift-card",
    country: ["US", "UK", "CA", "AU"],
  },
  {
    id: encodeCategory("Google Play"),
    name: "Google Play Gift Card",
    brand: "Google",
    type: "gift-card",
    country: ["Global"],
  },
  {
    id: encodeCategory("Microsoft"),
    name: "Microsoft Gift Card",
    brand: "Microsoft",
    type: "gift-card",
    country: ["US", "UK", "Global"],
  },
  {
    id: encodeCategory("iTunes"),
    name: "iTunes Gift Card",
    brand: "Apple",
    type: "gift-card",
    country: ["US", "UK", "JP"],
  },
  {
    id: encodeCategory("Adobe"),
    name: "Adobe Creative Cloud",
    brand: "Adobe",
    type: "subscription",
    country: ["Global"],
  },

  // Fashion & Apparel
  {
    id: encodeCategory("Nike"),
    name: "Nike Gift Card",
    brand: "Nike",
    type: "gift-card",
    country: ["US", "UK", "EU"],
  },
  {
    id: encodeCategory("Adidas"),
    name: "Adidas Gift Card",
    brand: "Adidas",
    type: "gift-card",
    country: ["US", "UK", "EU"],
  },
  {
    id: encodeCategory("H&M"),
    name: "H&M Gift Card",
    brand: "H&M",
    type: "gift-card",
    country: ["US", "UK", "EU"],
  },
  {
    id: encodeCategory("Zara"),
    name: "Zara Gift Card",
    brand: "Zara",
    type: "gift-card",
    country: ["US", "UK", "EU"],
  },
  {
    id: encodeCategory("Sephora"),
    name: "Sephora Gift Card",
    brand: "Sephora",
    type: "gift-card",
    country: ["US", "UK", "FR"],
  },
  {
    id: encodeCategory("Ulta"),
    name: "Ulta Beauty Gift Card",
    brand: "Ulta",
    type: "gift-card",
    country: ["US"],
  },

  // Hotels & Travel
  {
    id: encodeCategory("Airbnb"),
    name: "Airbnb Gift Card",
    brand: "Airbnb",
    type: "gift-card",
    country: ["Global"],
  },
  {
    id: encodeCategory("Booking.com"),
    name: "Booking.com Gift Card",
    brand: "Booking.com",
    type: "gift-card",
    country: ["Global"],
  },
  {
    id: encodeCategory("Marriott"),
    name: "Marriott Gift Card",
    brand: "Marriott",
    type: "gift-card",
    country: ["US", "Global"],
  },
  {
    id: encodeCategory("Hilton"),
    name: "Hilton Gift Card",
    brand: "Hilton",
    type: "gift-card",
    country: ["US", "Global"],
  },
  {
    id: encodeCategory("Expedia"),
    name: "Expedia Gift Card",
    brand: "Expedia",
    type: "gift-card",
    country: ["US", "Global"],
  },

  // Cryptocurrency & Finance
  {
    id: encodeCategory("Binance"),
    name: "Binance Gift Card",
    brand: "Binance",
    type: "voucher",
    country: ["Global"],
  },
  {
    id: encodeCategory("Coinbase"),
    name: "Coinbase Gift Card",
    brand: "Coinbase",
    type: "voucher",
    country: ["US", "Global"],
  },
  {
    id: encodeCategory("Crypto.com"),
    name: "Crypto.com Gift Card",
    brand: "Crypto.com",
    type: "voucher",
    country: ["Global"],
  },

  // Fitness & Health
  {
    id: encodeCategory("Planet Fitness"),
    name: "Planet Fitness Gift Card",
    brand: "Planet Fitness",
    type: "gift-card",
    country: ["US"],
  },
  {
    id: encodeCategory("GNC"),
    name: "GNC Gift Card",
    brand: "GNC",
    type: "gift-card",
    country: ["US"],
  },

  // Books & Education
  {
    id: encodeCategory("Barnes & Noble"),
    name: "Barnes & Noble Gift Card",
    brand: "Barnes & Noble",
    type: "gift-card",
    country: ["US"],
  },
  {
    id: encodeCategory("Audible"),
    name: "Audible Gift Card",
    brand: "Amazon",
    type: "subscription",
    country: ["US", "UK"],
  },
  {
    id: encodeCategory("Kindle"),
    name: "Kindle Gift Card",
    brand: "Amazon",
    type: "gift-card",
    country: ["US", "UK"],
  },
  {
    id: encodeCategory("Coursera"),
    name: "Coursera Gift Card",
    brand: "Coursera",
    type: "subscription",
    country: ["Global"],
  },
  {
    id: encodeCategory("Udemy"),
    name: "Udemy Gift Card",
    brand: "Udemy",
    type: "gift-card",
    country: ["Global"],
  },

  // Home & Garden
  {
    id: encodeCategory("Home Depot"),
    name: "Home Depot Gift Card",
    brand: "Home Depot",
    type: "gift-card",
    country: ["US", "CA"],
  },
  {
    id: encodeCategory("Lowe's"),
    name: "Lowe's Gift Card",
    brand: "Lowe's",
    type: "gift-card",
    country: ["US"],
  },
  {
    id: encodeCategory("IKEA"),
    name: "IKEA Gift Card",
    brand: "IKEA",
    type: "gift-card",
    country: ["US", "UK", "EU"],
  },
  {
    id: encodeCategory("Bed Bath & Beyond"),
    name: "Bed Bath & Beyond Gift Card",
    brand: "Bed Bath & Beyond",
    type: "gift-card",
    country: ["US"],
  },

  // Grocery & Supermarkets
  {
    id: encodeCategory("Whole Foods"),
    name: "Whole Foods Gift Card",
    brand: "Whole Foods",
    type: "gift-card",
    country: ["US", "UK"],
  },
  {
    id: encodeCategory("Kroger"),
    name: "Kroger Gift Card",
    brand: "Kroger",
    type: "gift-card",
    country: ["US"],
  },
  {
    id: encodeCategory("Safeway"),
    name: "Safeway Gift Card",
    brand: "Safeway",
    type: "gift-card",
    country: ["US"],
  },
  {
    id: encodeCategory("Tesco"),
    name: "Tesco Gift Card",
    brand: "Tesco",
    type: "gift-card",
    country: ["UK"],
  },

  // Specialty Retailers
  {
    id: encodeCategory("GameStop"),
    name: "GameStop Gift Card",
    brand: "GameStop",
    type: "gift-card",
    country: ["US"],
  },
  {
    id: encodeCategory("Foot Locker"),
    name: "Foot Locker Gift Card",
    brand: "Foot Locker",
    type: "gift-card",
    country: ["US", "UK"],
  },
  {
    id: encodeCategory("Victoria's Secret"),
    name: "Victoria's Secret Gift Card",
    brand: "Victoria's Secret",
    type: "gift-card",
    country: ["US"],
  },
  {
    id: encodeCategory("Bath & Body Works"),
    name: "Bath & Body Works Gift Card",
    brand: "Bath & Body Works",
    type: "gift-card",
    country: ["US"],
  },

  // Asian Markets
  {
    id: encodeCategory("Rakuten"),
    name: "Rakuten Gift Card",
    brand: "Rakuten",
    type: "gift-card",
    country: ["JP"],
  },
  {
    id: encodeCategory("LINE"),
    name: "LINE Points Card",
    brand: "LINE",
    type: "voucher",
    country: ["JP", "TH"],
  },
  {
    id: encodeCategory("KakaoTalk"),
    name: "KakaoTalk Gift Card",
    brand: "Kakao",
    type: "voucher",
    country: ["KR"],
  },
  {
    id: encodeCategory("Garena"),
    name: "Garena Shells",
    brand: "Garena",
    type: "gaming",
    country: ["SEA"],
  },
  {
    id: encodeCategory("Lazada"),
    name: "Lazada Gift Card",
    brand: "Lazada",
    type: "gift-card",
    country: ["SEA"],
  },
  {
    id: encodeCategory("Shopee"),
    name: "Shopee Gift Card",
    brand: "Shopee",
    type: "gift-card",
    country: ["SEA"],
  },
  {
    id: encodeCategory("Grab"),
    name: "Grab Gift Card",
    brand: "Grab",
    type: "voucher",
    country: ["SEA"],
  },

  // European Markets
  {
    id: encodeCategory("Zalando"),
    name: "Zalando Gift Card",
    brand: "Zalando",
    type: "gift-card",
    country: ["EU"],
  },
  {
    id: encodeCategory("MediaMarkt"),
    name: "MediaMarkt Gift Card",
    brand: "MediaMarkt",
    type: "gift-card",
    country: ["DE", "EU"],
  },
  {
    id: encodeCategory("Carrefour"),
    name: "Carrefour Gift Card",
    brand: "Carrefour",
    type: "gift-card",
    country: ["FR", "EU"],
  },

  // Mobile & Telecom
  {
    id: encodeCategory("Verizon"),
    name: "Verizon Gift Card",
    brand: "Verizon",
    type: "voucher",
    country: ["US"],
  },
  {
    id: encodeCategory("AT&T"),
    name: "AT&T Gift Card",
    brand: "AT&T",
    type: "voucher",
    country: ["US"],
  },
  {
    id: encodeCategory("T-Mobile"),
    name: "T-Mobile Gift Card",
    brand: "T-Mobile",
    type: "voucher",
    country: ["US"],
  },

  // Miscellaneous
  {
    id: encodeCategory("Visa"),
    name: "Visa Prepaid Gift Card",
    brand: "Visa",
    type: "gift-card",
    country: ["US", "Global"],
  },
  {
    id: encodeCategory("Mastercard"),
    name: "Mastercard Prepaid Gift Card",
    brand: "Mastercard",
    type: "gift-card",
    country: ["US", "Global"],
  },
  {
    id: encodeCategory("American Express"),
    name: "American Express Gift Card",
    brand: "American Express",
    type: "gift-card",
    country: ["US"],
  },
  {
    id: encodeCategory("PayPal"),
    name: "PayPal Gift Card",
    brand: "PayPal",
    type: "voucher",
    country: ["US", "Global"],
  },
  {
    id: encodeCategory("Vanilla"),
    name: "Vanilla Prepaid Card",
    brand: "Vanilla",
    type: "gift-card",
    country: ["US"],
  },
];

// Helper function to get category by ID
export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((cat) => cat.id === id);
}

// Helper function to get category by name
export function getCategoryByName(name: string): Category | undefined {
  return CATEGORIES.find(
    (cat) => cat.name.toLowerCase() === name.toLowerCase()
  );
}

// Helper function to search categories
export function searchCategories(query: string): Category[] {
  const lowerQuery = query.toLowerCase();
  return CATEGORIES.filter(
    (cat) =>
      cat.name.toLowerCase().includes(lowerQuery) ||
      cat.brand.toLowerCase().includes(lowerQuery)
  );
}

// Helper function to filter by type
export function getCategoriesByType(type: Category["type"]): Category[] {
  return CATEGORIES.filter((cat) => cat.type === type);
}

// Export count
export const TOTAL_CATEGORIES = CATEGORIES.length;
