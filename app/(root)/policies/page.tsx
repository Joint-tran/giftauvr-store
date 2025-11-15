import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertCircle,
  Shield,
  DollarSign,
  FileText,
  Ban,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";

const PoliciesPage = () => {
  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Policies</h1>
        <p className="text-muted-foreground mt-2">
          Important guidelines and policies for using our gift card marketplace
        </p>
      </div>

      <div className="grid gap-6">
        {/* Terms of Service */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Terms of Service
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Account Requirements</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Users must be 18 years or older to use this platform</li>
                <li>All accounts require verification before trading</li>
                <li>One account per user is allowed</li>
                <li>Account sharing is strictly prohibited</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">User Responsibilities</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Policy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Transaction Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">For Sellers</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Gift cards must be valid and have not been used</li>
                <li>Provide accurate card value and expiry information</li>
                <li>Selling stolen or fraudulent cards is prohibited</li>
                <li>Funds are added to balance after admin approval</li>
                <li>
                  <strong>Minimum payout request: $2,000 USD</strong>
                </li>
                <li>
                  <strong>Only 1 payout allowed per calendar month</strong>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">For Buyers</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>All purchases are final and non-refundable</li>
                <li>Verify card details immediately after purchase</li>
                <li>Report any issues within 24 hours of purchase</li>
                <li>Cards are sold &quot;as-is&quot; without warranty</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Payment & Payout Policy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Payment & Payout Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Payouts</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Payouts are processed in USDT (TRC20/ERC20/BEP20)</li>
                <li>Processing time: 24-48 hours after request</li>
                <li>
                  You must set up your wallet address before requesting payout
                </li>
                <li>
                  <strong>Minimum payout amount: $2,000 USD</strong>
                </li>
                <li>
                  <strong>Only 1 payout request allowed per month</strong>
                </li>
                <li>Payout fees may apply depending on network</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Balance</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Balance is updated instantly after admin approval</li>
                <li>Balance can only be withdrawn via payout request</li>
                <li>No cash refunds or transfers between accounts</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Prohibited Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ban className="h-5 w-5 text-destructive" />
              Prohibited Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <p className="font-semibold mb-2 text-destructive">
                The following activities will result in immediate account
                termination:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>
                  Selling stolen, hacked, or fraudulently obtained gift cards
                </li>
                <li>Using multiple accounts to manipulate the system</li>
                <li>Attempting to defraud other users or the platform</li>
                <li>Providing false information or documentation</li>
                <li>Harassing or threatening other users or staff</li>
                <li>Attempting to circumvent security measures</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Data Protection</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>We collect only essential information for transactions</li>
                <li>Your personal data is encrypted and stored securely</li>
                <li>We never share your information with third parties</li>
                <li>You can request data deletion at any time</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Security Measures</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>All transactions are monitored for suspicious activity</li>
                <li>Admin reviews all gift card submissions</li>
                <li>Wallet addresses are masked for security</li>
                <li>
                  <strong>
                    Wallet address and network can only be set once and cannot
                    be changed
                  </strong>
                </li>
                <li>Two-factor authentication available (coming soon)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Contact Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                For support, questions, or issues, please contact us via Signal
                app. Our support team is available 24/7 to assist you.
              </p>

              {/* Signal Contact Section */}
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-500/20 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/20 p-3 rounded-lg">
                    <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Contact us on Signal</h3>
                    <p className="text-sm text-muted-foreground">
                      Secure & Private Messaging
                    </p>
                  </div>
                </div>

                {/* Signal Image */}
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-white/10 shadow-lg">
                  <Image
                    src="/assets/images/signal.jpg"
                    alt="Signal App Contact Information"
                    fill
                    className="object-contain bg-muted"
                    priority
                  />
                </div>

                <div className="bg-white/50 dark:bg-black/30 rounded-lg p-4 space-y-2">
                  <p className="font-semibold text-sm">How to contact us:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Install Signal app on your device</li>
                    <li>
                      Scan the QR code above or use the contact information
                    </li>
                    <li>Start a secure conversation with our support team</li>
                    <li>Describe your issue or question in detail</li>
                  </ol>
                </div>

                <div className="flex items-center gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <p className="text-xs text-muted-foreground">
                    <strong>Important:</strong> Only contact us through Signal
                    for your security. We will never ask for your password or
                    private keys.
                  </p>
                </div>
              </div>

              {/* Dispute Resolution */}
              <div className="bg-muted/50 border rounded-lg p-4 space-y-3">
                <p className="font-semibold text-sm">
                  Dispute Resolution Process:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                  <li>
                    Report the issue via Signal within 24 hours of the
                    transaction
                  </li>
                  <li>Provide all relevant evidence and documentation</li>
                  <li>Admin will review and investigate the claim</li>
                  <li>
                    Resolution will be communicated within 3-5 business days
                  </li>
                  <li>All disputes are handled through Signal for security</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Last Updated */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Last updated: November 15, 2025</p>
          <p className="mt-2">
            We reserve the right to modify these policies at any time. Users
            will be notified of significant changes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PoliciesPage;
