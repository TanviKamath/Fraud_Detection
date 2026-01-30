// Mock data for the Fraud Detection System

// Transaction data for the last 7 days
export const transactionData = [
    { date: 'Jan 24', successful: 1250, blocked: 45 },
    { date: 'Jan 25', successful: 1420, blocked: 62 },
    { date: 'Jan 26', successful: 1180, blocked: 38 },
    { date: 'Jan 27', successful: 1650, blocked: 89 },
    { date: 'Jan 28', successful: 1890, blocked: 124 },
    { date: 'Jan 29', successful: 2100, blocked: 156 },
    { date: 'Jan 30', successful: 1950, blocked: 98 },
];

// Flagged email and SMS alerts
export const fraudAlerts = [
    {
        id: 1,
        source: 'SMS',
        sender: 'Lottery-Dept',
        subject: 'CONGRATULATIONS! You won ₹25,00,000 in lucky draw',
        snippet: 'Click here to claim your prize immediately...',
        date: '2026-01-30',
        severity: 'Malicious',
    },
    {
        id: 2,
        source: 'Email',
        sender: 'tax-refund@gov-portal.xyz',
        subject: 'Urgent: Tax Refund of ₹45,000 Pending',
        snippet: 'Your tax refund is ready. Verify your bank details...',
        date: '2026-01-29',
        severity: 'Malicious',
    },
    {
        id: 3,
        source: 'SMS',
        sender: 'BANK-ALERT',
        subject: 'Your account will be blocked in 24 hours',
        snippet: 'Update KYC immediately by clicking this link...',
        date: '2026-01-29',
        severity: 'Suspicious',
    },
    {
        id: 4,
        source: 'Email',
        sender: 'customer-care@paytm-support.net',
        subject: 'Verify your Paytm wallet',
        snippet: 'Unusual activity detected. Verify now to avoid suspension...',
        date: '2026-01-28',
        severity: 'Suspicious',
    },
    {
        id: 5,
        source: 'SMS',
        sender: 'COVID-RELIEF',
        subject: 'Government COVID relief fund ₹10,000',
        snippet: 'Claim your relief amount. Limited time offer...',
        date: '2026-01-27',
        severity: 'Malicious',
    },
    {
        id: 6,
        source: 'Email',
        sender: 'amazon-security@amzn-india.com',
        subject: 'Suspicious login attempt detected',
        snippet: 'Someone tried to access your account from Delhi...',
        date: '2026-01-26',
        severity: 'Suspicious',
    },
];

// Velocity anomaly transactions (rapid-fire transactions)
export const velocityTransactions = [
    {
        id: 1,
        senderUpi: 'unknown9876@paytm',
        amount: 4999,
        frequency: '5th transaction in 8 mins',
        riskLevel: 'High',
        timestamp: '13:42:15',
    },
    {
        id: 2,
        senderUpi: 'fastpay123@ybl',
        amount: 2500,
        frequency: '4th transaction in 5 mins',
        riskLevel: 'Critical',
        timestamp: '13:40:32',
    },
    {
        id: 3,
        senderUpi: 'merchant.xyz@oksbi',
        amount: 9999,
        frequency: '3rd transaction in 12 mins',
        riskLevel: 'Medium',
        timestamp: '13:38:45',
    },
    {
        id: 4,
        senderUpi: 'quicktrans@axl',
        amount: 7500,
        frequency: '6th transaction in 15 mins',
        riskLevel: 'High',
        timestamp: '13:35:20',
    },
];

// UPI fraud database (for scanning)
export const fraudUpiDatabase = {
    'scammer@ybl': {
        isFraud: true,
        riskScore: 95,
        reportedBy: 400,
        reason: 'Multiple fraud reports for phishing and unauthorized transactions',
    },
    'fake.merchant@paytm': {
        isFraud: true,
        riskScore: 88,
        reportedBy: 256,
        reason: 'Fake merchant account used for scam transactions',
    },
    'lottery123@oksbi': {
        isFraud: true,
        riskScore: 92,
        reportedBy: 312,
        reason: 'Lottery scam operator',
    },
    'legitimate@hdfc': {
        isFraud: false,
        riskScore: 5,
        reportedBy: 0,
        reason: 'Verified merchant account',
    },
};

// Bank options for onboarding
export const bankOptions = [
    'HDFC Bank',
    'State Bank of India (SBI)',
    'ICICI Bank',
    'Axis Bank',
];
