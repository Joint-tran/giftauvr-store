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
        <h3 className="mb-2 font-semibold">How It Works</h3>
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-semibold mb-1">For Sellers:</h4>
            <ul className="text-muted-foreground list-inside list-disc space-y-1">
              <li>Submit your gift card details including code and PIN</li>
              <li>Admin reviews and purchases your card</li>
              <li>Funds are added to your balance instantly</li>
              <li>Request payout to your USDT wallet anytime</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-1">For Buyers:</h4>
            <ul className="text-muted-foreground list-inside list-disc space-y-1">
              <li>Browse available gift cards from verified sellers</li>
              <li>Purchase cards at discounted prices</li>
              <li>Receive card details immediately after purchase</li>
              <li>All transactions are secured and protected</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
