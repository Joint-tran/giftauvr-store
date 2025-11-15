export const WELCOME_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="x-apple-disable-message-reformatting">
    <title>Welcome to Giftauvr</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style type="text/css">
        @media (prefers-color-scheme: dark) {
            .email-container {
                background-color: #141414 !important;
                border: 1px solid #30333A !important;
            }
            .dark-bg {
                background-color: #050505 !important;
            }
            .dark-text {
                color: #ffffff !important;
            }
            .dark-text-secondary {
                color: #9ca3af !important;
            }
            .dark-text-muted {
                color: #6b7280 !important;
            }
            .dark-border {
                border-color: #30333A !important;
            }
        }
        
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                margin: 0 !important;
            }
            .mobile-padding {
                padding: 24px !important;
            }
            .mobile-header-padding {
                padding: 24px 24px 12px 24px !important;
            }
            .mobile-text {
                font-size: 14px !important;
                line-height: 1.5 !important;
            }
            .mobile-title {
                font-size: 24px !important;
                line-height: 1.3 !important;
            }
            .mobile-button {
                width: 100% !important;
                text-align: center !important;
            }
            .mobile-button a {
                width: calc(100% - 64px) !important;
                display: block !important;
                text-align: center !important;
            }
            .mobile-outer-padding {
                padding: 20px 10px !important;
            }
        }
        @media only screen and (max-width: 480px) {
            .mobile-title {
                font-size: 22px !important;
            }
            .mobile-padding {
                padding: 15px !important;
            }
            .mobile-header-padding {
                padding: 15px 15px 8px 15px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #050505;">
        <tr>
            <td align="center" class="mobile-outer-padding" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="email-container" style="max-width: 600px; background-color: #141414; border-radius: 8px; border: 1px solid #30333A;">
                    
                    <!-- Header with Logo -->
                    <tr>
                        <td align="left" class="mobile-header-padding" style="padding: 40px 40px 20px 40px;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; color: #000;">G</div>
                                <span style="font-size: 24px; font-weight: 600; color: #10b981;">Giftauvr</span>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 40px 40px 40px 40px;">
                            
                            <!-- Welcome Heading -->
                            <h1 class="mobile-title dark-text" style="margin: 0 0 30px 0; font-size: 28px; font-weight: 600; color: #10b981; line-height: 1.2;">
                                Welcome to Giftauvr, {{name}}!
                            </h1>
                            
                            <!-- Intro Text -->
                            {{intro}}  
                            
                            <!-- Feature List Label -->
                            <p class="mobile-text dark-text-secondary" style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.6; color: #CCDADC; font-weight: 600;">
                                Here's what you can do right now:
                            </p>
                            
                            <!-- Feature List -->
                            <ul class="mobile-text dark-text-secondary" style="margin: 0 0 30px 0; padding-left: 20px; font-size: 16px; line-height: 1.6; color: #CCDADC;">
                                <li style="margin-bottom: 12px;">Browse our marketplace for gift cards from top retailers</li>
                                <li style="margin-bottom: 12px;">List your unused gift cards and turn them into cash</li>
                                <li style="margin-bottom: 12px;">Complete secure transactions with USDT cryptocurrency</li>
                                <li style="margin-bottom: 12px;">Track your orders and wallet balance in real-time</li>
                            </ul>
                            
                            <!-- Additional Text -->
                            <p class="mobile-text dark-text-secondary" style="margin: 0 0 40px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
                                We're excited to have you join our community of gift card buyers and sellers. Let's get started!
                            </p>
                            
                            <!-- CTA Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 40px 0; width: 100%;">
                                <tr>
                                    <td align="center">
                                        <a href="http://localhost:3000" style="display: block; width: 100%; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #000000; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-size: 16px; font-weight: 600; line-height: 1; text-align: center; box-sizing: border-box;">
                                            Go to Marketplace
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Footer Text -->
                            <p class="mobile-text dark-text-muted" style="margin: 40px 0 0 0; font-size: 14px; line-height: 1.5; color: #6b7280; text-align: center;">
                                Giftauvr - Your Trusted Gift Card Marketplace<br>
                                <a href="#" style="color: #10b981; text-decoration: underline;">Unsubscribe</a> | 
                                <a href="http://localhost:3000" style="color: #10b981; text-decoration: underline;">Visit Giftauvr</a><br>
                                © 2025 Giftauvr
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

export const ORDER_CONFIRMATION_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmed - Giftauvr</title>
    <style type="text/css">
        @media (prefers-color-scheme: dark) {
            .email-container { background-color: #141414 !important; border: 1px solid #30333A !important; }
            .dark-bg { background-color: #050505 !important; }
            .dark-text { color: #ffffff !important; }
            .dark-text-secondary { color: #9ca3af !important; }
            .dark-border { border-color: #30333A !important; }
        }
        @media only screen and (max-width: 600px) {
            .email-container { width: 100% !important; }
            .mobile-padding { padding: 24px !important; }
            .mobile-text { font-size: 14px !important; }
            .mobile-title { font-size: 24px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #050505;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="email-container" style="max-width: 600px; background-color: #141414; border-radius: 8px; border: 1px solid #30333A;">
                    
                    <tr>
                        <td style="padding: 40px;">
                            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 30px;">
                                <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; color: #000;">G</div>
                                <span style="font-size: 24px; font-weight: 600; color: #10b981;">Giftauvr</span>
                            </div>
                            
                            <div style="background-color: #059669; border-radius: 8px; padding: 20px; margin-bottom: 30px; text-align: center;">
                                <h1 style="margin: 0; font-size: 24px; color: #ffffff;">✓ Order Confirmed</h1>
                                <p style="margin: 10px 0 0 0; color: #ffffff; opacity: 0.9;">Order #{{orderNumber}}</p>
                            </div>
                            
                            <h2 style="color: #10b981; font-size: 20px; margin: 0 0 20px 0;">Hi {{name}},</h2>
                            
                            <p style="color: #CCDADC; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                                Thank you for your order! We've received your payment and your gift card details will be available shortly.
                            </p>
                            
                            <!-- Order Details -->
                            <div style="background-color: #212328; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                                <h3 style="color: #ffffff; font-size: 18px; margin: 0 0 15px 0;">Order Details</h3>
                                <table style="width: 100%; color: #9ca3af;">
                                    <tr>
                                        <td style="padding: 8px 0;"><strong>Gift Card:</strong></td>
                                        <td style="padding: 8px 0; text-align: right;">{{giftCardName}}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0;"><strong>Amount:</strong></td>
                                        <td style="padding: 8px 0; text-align: right;">\${{amount}}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0;"><strong>Payment:</strong></td>
                                        <td style="padding: 8px 0; text-align: right;">{{paymentAmount}} USDT</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0;"><strong>Network:</strong></td>
                                        <td style="padding: 8px 0; text-align: right;">{{network}}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; border-top: 1px solid #30333A; padding-top: 15px;"><strong>Order Date:</strong></td>
                                        <td style="padding: 8px 0; border-top: 1px solid #30333A; padding-top: 15px; text-align: right;">{{orderDate}}</td>
                                    </tr>
                                </table>
                            </div>
                            
                            <p style="color: #CCDADC; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                                You can view and manage your order in your dashboard. The seller will process your order within 24 hours.
                            </p>
                            
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width: 100%; margin-bottom: 30px;">
                                <tr>
                                    <td align="center">
                                        <a href="http://localhost:3000/orders" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #000000; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-size: 16px; font-weight: 600;">
                                            View Order
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 40px 0 0 0; font-size: 14px; line-height: 1.5; color: #6b7280; text-align: center;">
                                © 2025 Giftauvr - Gift Card Marketplace
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

export const SELLER_NOTIFICATION_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Order - Giftauvr</title>
    <style type="text/css">
        @media (prefers-color-scheme: dark) {
            .email-container { background-color: #141414 !important; border: 1px solid #30333A !important; }
            .dark-bg { background-color: #050505 !important; }
            .dark-text { color: #ffffff !important; }
            .dark-text-secondary { color: #9ca3af !important; }
        }
        @media only screen and (max-width: 600px) {
            .email-container { width: 100% !important; }
            .mobile-padding { padding: 24px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #050505;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="email-container" style="max-width: 600px; background-color: #141414; border-radius: 8px; border: 1px solid #30333A;">
                    <tr>
                        <td style="padding: 40px;">
                            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 30px;">
                                <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; color: #000;">G</div>
                                <span style="font-size: 24px; font-weight: 600; color: #10b981;">Giftauvr</span>
                            </div>
                            
                            <div style="background-color: #7c3aed; border-radius: 8px; padding: 20px; margin-bottom: 30px; text-align: center;">
                                <h1 style="margin: 0; font-size: 24px; color: #ffffff;">🔔 New Order Received</h1>
                            </div>
                            
                            <h2 style="color: #10b981; font-size: 20px; margin: 0 0 20px 0;">Hi {{sellerName}},</h2>
                            
                            <p style="color: #CCDADC; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                                Great news! You have a new order for your gift card. Please process it within 24 hours.
                            </p>
                            
                            <div style="background-color: #212328; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                                <h3 style="color: #ffffff; font-size: 18px; margin: 0 0 15px 0;">Order Information</h3>
                                <table style="width: 100%; color: #9ca3af;">
                                    <tr>
                                        <td style="padding: 8px 0;"><strong>Order #:</strong></td>
                                        <td style="padding: 8px 0; text-align: right;">{{orderNumber}}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0;"><strong>Gift Card:</strong></td>
                                        <td style="padding: 8px 0; text-align: right;">{{giftCardName}}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0;"><strong>Amount:</strong></td>
                                        <td style="padding: 8px 0; text-align: right;">\${{amount}}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0;"><strong>Payment Received:</strong></td>
                                        <td style="padding: 8px 0; text-align: right;">{{paymentAmount}} USDT</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0;"><strong>Buyer:</strong></td>
                                        <td style="padding: 8px 0; text-align: right;">{{buyerName}}</td>
                                    </tr>
                                </table>
                            </div>
                            
                            <div style="background-color: #050505; border: 1px solid #374151; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                                <h3 style="margin: 0 0 10px 0; font-size: 18px; color: #10b981;">⚡ Action Required</h3>
                                <p style="margin: 0; font-size: 14px; color: #CCDADC;">
                                    Please deliver the gift card code to the buyer within 24 hours to maintain your seller rating.
                                </p>
                            </div>
                            
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
                                <tr>
                                    <td align="center">
                                        <a href="http://localhost:3000/orders" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #000000; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-size: 16px; font-weight: 600;">
                                            Process Order
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 40px 0 0 0; font-size: 14px; line-height: 1.5; color: #6b7280; text-align: center;">
                                © 2025 Giftauvr - Gift Card Marketplace
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

// Account Approval Email Template
export const APPROVAL_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Approved - Giftauvr</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #050505;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #050505; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); border: 1px solid #30333A; border-radius: 12px; overflow: hidden;">
                    
                    <!-- Header with Logo -->
                    <tr>
                        <td style="padding: 40px 40px 30px; text-align: center; background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
                            <div style="width: 60px; height: 60px; margin: 0 auto 16px; background: white; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                <span style="font-size: 32px; font-weight: bold; background: linear-gradient(135deg, #10b981 0%, #059669 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">G</span>
                            </div>
                            <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: white;">Account Approved! 🎉</h1>
                        </td>
                    </tr>
                    
                    <!-- Success Icon -->
                    <tr>
                        <td style="padding: 30px 40px 20px; text-align: center;">
                            <div style="width: 80px; height: 80px; margin: 0 auto; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <span style="color: white; font-size: 40px;">✓</span>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 20px 40px 30px;">
                            <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #ffffff;">
                                Hi <strong>{{name}}</strong>,
                            </p>
                            <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #9ca3af;">
                                Great news! Your <strong style="color: #10b981;">{{accountType}}</strong> account has been approved by our admin team. You now have full access to all Giftauvr features.
                            </p>
                            <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #9ca3af;">
                                You can now start buying and selling gift cards on our marketplace. Welcome to the Giftauvr community!
                            </p>
                        </td>
                    </tr>
                    
                    <!-- CTA Button -->
                    <tr>
                        <td style="padding: 0 40px 40px; text-align: center;">
                            <a href="https://giftauvr.com/" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; transition: all 0.3s;">
                                Access Your Account →
                            </a>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 24px 40px; border-top: 1px solid #30333A; text-align: center;">
                            <p style="margin: 0 0 8px; font-size: 14px; color: #6b7280;">
                                © 2024 Giftauvr. All rights reserved.
                            </p>
                            <p style="margin: 0; font-size: 12px; color: #6b7280;">
                                Your trusted gift card marketplace
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

// Account Rejection Email Template
export const REJECTION_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Application Update - Giftauvr</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #050505;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #050505; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); border: 1px solid #30333A; border-radius: 12px; overflow: hidden;">
                    
                    <!-- Header with Logo -->
                    <tr>
                        <td style="padding: 40px 40px 30px; text-align: center; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);">
                            <div style="width: 60px; height: 60px; margin: 0 auto 16px; background: white; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                <span style="font-size: 32px; font-weight: bold; background: linear-gradient(135deg, #10b981 0%, #059669 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">G</span>
                            </div>
                            <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: white;">Account Application Update</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 30px 40px;">
                            <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #ffffff;">
                                Hi <strong>{{name}}</strong>,
                            </p>
                            <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #9ca3af;">
                                Thank you for your interest in joining Giftauvr. After careful review, we regret to inform you that we cannot approve your account application at this time.
                            </p>
                            
                            <!-- Reason Box -->
                            <div style="margin: 24px 0; padding: 20px; background-color: #1a1a1a; border-left: 4px solid #ef4444; border-radius: 6px;">
                                <p style="margin: 0 0 8px; font-size: 14px; font-weight: 600; color: #ef4444;">
                                    Reason for rejection:
                                </p>
                                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #d1d5db;">
                                    {{rejectionReason}}
                                </p>
                            </div>
                            
                            <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #9ca3af;">
                                If you believe this decision was made in error or if you have additional information to share, please don't hesitate to contact our support team.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- CTA Button -->
                    <tr>
                        <td style="padding: 0 40px 40px; text-align: center;">
                            <a href="mailto:support@giftauvr.com" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; transition: all 0.3s;">
                                Contact Support
                            </a>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 24px 40px; border-top: 1px solid #30333A; text-align: center;">
                            <p style="margin: 0 0 8px; font-size: 14px; color: #6b7280;">
                                © 2024 Giftauvr. All rights reserved.
                            </p>
                            <p style="margin: 0; font-size: 12px; color: #6b7280;">
                                Your trusted gift card marketplace
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
