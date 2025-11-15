import React from "react";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Welcome to Giftauvr
        </h2>
        <p className="text-muted-foreground">
          Your trusted gift card marketplace for buying and selling gift cards
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-card text-card-foreground rounded-lg border p-6">
          <h3 className="font-semibold">Buy Gift Cards</h3>
          <p className="text-muted-foreground text-sm">
            Browse and purchase gift cards from various retailers
          </p>
        </div>

        <div className="bg-card text-card-foreground rounded-lg border p-6">
          <h3 className="font-semibold">Sell Gift Cards</h3>
          <p className="text-muted-foreground text-sm">
            List your unused gift cards and earn money
          </p>
        </div>

        <div className="bg-card text-card-foreground rounded-lg border p-6">
          <h3 className="font-semibold">Secure Transactions</h3>
          <p className="text-muted-foreground text-sm">
            All transactions are secured and protected
          </p>
        </div>
      </div>

      <div className="bg-muted/50 rounded-lg border p-6">
        <h3 className="mb-2 font-semibold">Getting Started</h3>
        <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
          <li>Use the sidebar navigation to explore different sections</li>
          <li>
            Toggle between English and Russian languages in the sidebar footer
          </li>
          <li>Press Ctrl+B (or Cmd+B on Mac) to toggle the sidebar</li>
          <li>The sidebar is collapsible and responsive on mobile devices</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
