// Bunny CDN Configuration
export const BUNNY_CONFIG = {
  baseUrl:
    process.env.NEXT_PUBLIC_BUNNY_BASE_URL || "https://storage.bunnycdn.com",
  storageZoneName: process.env.NEXT_PUBLIC_BUNNY_STORAGE_ZONE || "pidecor",
  accessKey: process.env.NEXT_PUBLIC_BUNNY_ACCESS_KEY || "",
  cdnUrl: process.env.NEXT_PUBLIC_BUNNY_CDN_URL || "https://pidecor.b-cdn.net",
};

// Validate configuration in development
if (process.env.NODE_ENV === "development") {
  if (!BUNNY_CONFIG.accessKey) {
    console.warn(
      "⚠️  NEXT_PUBLIC_BUNNY_ACCESS_KEY is not set. Image upload will not work."
    );
  }
}
