const fs = require("fs");

// Configuration
const TOTAL_RECORDS = 1000;
const OUTPUT_FILE = "egift.txt";

// Default value for all egifts
const DEFAULT_VALUE = 150;

// Date range: 05/11/2025 to 09/11/2025
const START_DATE = new Date("2025-11-05");
const END_DATE = new Date("2025-11-09");

// Helper function to generate random alphanumeric string
function generateRandomString(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Helper function to generate random date between start and end
function randomDate(start, end) {
  const timestamp =
    start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(timestamp);
}

// Generate egift records
function generateEgifts() {
  const records = [];

  console.log(`Generating ${TOTAL_RECORDS} egift records...`);

  for (let i = 1; i <= TOTAL_RECORDS; i++) {
    // Generate completely random code: XXXX-XXXXXXXX-XXXX
    const code = `${generateRandomString(4)}-${generateRandomString(
      8
    )}-${generateRandomString(4)}`;

    // Generate 4-digit PIN
    const pin = Math.floor(1000 + Math.random() * 9000).toString();

    // Use default value
    const value = DEFAULT_VALUE;

    // Selling price: 75% to 90% of value
    const discountPercent = 0.75 + Math.random() * 0.15;
    const sellingPrice = Math.floor(value * discountPercent);

    // Random purchase date
    const purchaseDate = randomDate(START_DATE, END_DATE);
    const dateStr = purchaseDate.toISOString().split("T")[0];

    // Add record
    records.push({
      id: i,
      code: code,
      pin: pin,
      value: value,
      sellingPrice: sellingPrice,
      purchaseDate: dateStr,
    });

    // Progress indicator
    if (i % 100 === 0) {
      console.log(`  ${i}/${TOTAL_RECORDS} records generated...`);
    }
  }

  return records;
}

// Write to file
function writeToFile(records) {
  console.log(`\nWriting to ${OUTPUT_FILE}...`);

  // Create CSV header
  const header = "ID,Code,PIN,Value,SellingPrice,PurchaseDate";

  // Convert records to CSV lines
  const lines = records.map((record) => {
    return `${record.id},${record.code},${record.pin},${record.value},${record.sellingPrice},${record.purchaseDate}`;
  });

  // Combine header and lines
  const content = [header, ...lines].join("\n");

  // Write to file
  fs.writeFileSync(OUTPUT_FILE, content, "utf8");

  console.log(
    `✅ Successfully created ${OUTPUT_FILE} with ${records.length} records!`
  );
  console.log(
    `\nFile size: ${(Buffer.byteLength(content) / 1024).toFixed(2)} KB`
  );
}

// Statistics
function showStatistics(records) {
  console.log("\n📊 Statistics:");
  console.log(`  Total records: ${records.length}`);
  console.log(`  All records have value: $${DEFAULT_VALUE}`);

  // Date distribution
  const dateCount = {};
  records.forEach((r) => {
    dateCount[r.purchaseDate] = (dateCount[r.purchaseDate] || 0) + 1;
  });

  console.log("\n  Records by purchase date:");
  Object.entries(dateCount)
    .sort()
    .forEach(([date, count]) => {
      console.log(`    ${date}: ${count}`);
    });

  // Selling price range
  const prices = records.map((r) => r.sellingPrice);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgPrice = Math.floor(
    prices.reduce((a, b) => a + b, 0) / prices.length
  );

  console.log("\n  Selling price range:");
  console.log(`    Min: $${minPrice}`);
  console.log(`    Max: $${maxPrice}`);
  console.log(`    Average: $${avgPrice}`);
}

// Main execution
console.log("🎁 E-Gift Card Generator\n");
console.log("Configuration:");
console.log(`  Records: ${TOTAL_RECORDS}`);
console.log(
  `  Date range: ${START_DATE.toISOString().split("T")[0]} to ${
    END_DATE.toISOString().split("T")[0]
  }`
);
console.log(`  Default Value: $${DEFAULT_VALUE}`);
console.log(`  Code Format: XXXX-XXXXXXXX-XXXX (completely random)\n`);

// Generate records
const records = generateEgifts();

// Write to file
writeToFile(records);

// Show statistics
showStatistics(records);

console.log("\n✨ Done!\n");
