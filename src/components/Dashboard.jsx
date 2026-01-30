import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import {
    Shield,
    AlertTriangle,
    Check,
    X,
    RefreshCw,
    Upload,
    Mail,
    MessageSquare,
    Activity,
    LogOut,
    Search,
    TrendingUp,
    Clock,
    Zap,
} from 'lucide-react';
import {
    transactionData,
    fraudAlerts,
    velocityTransactions,
    fraudUpiDatabase,
} from '../mockData';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [upiInput, setUpiInput] = useState('');
    const [scanResult, setScanResult] = useState(null);
    const [isSyncing, setIsSyncing] = useState(false);
    const [isSynced, setIsSynced] = useState(false);
    const [velocityList, setVelocityList] = useState(velocityTransactions);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('fraudDetectionUser');
        if (!userData) {
            navigate('/');
        } else {
            setUser(JSON.parse(userData));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('fraudDetectionUser');
        navigate('/');
    };

    const handleScanUpi = () => {
        if (!upiInput.trim()) {
            showToast('Enter UPI ID to scan', 'warning');
            return;
        }

        const result = fraudUpiDatabase[upiInput.toLowerCase()];

        if (result) {
            setScanResult(result);
        } else {
            setScanResult({
                isFraud: false,
                riskScore: 8,
                reportedBy: 0,
                reason: 'No fraud reports. Verified safe.',
            });
        }
    };

    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => {
            setIsSyncing(false);
            setIsSynced(true);
            showToast('Sync complete', 'success');
        }, 2000);
    };

    const handleVelocityAction = (id, action) => {
        setVelocityList(prev => prev.filter(item => item.id !== id));
        showToast(
            action === 'block' ? 'Transaction blocked' : 'Transaction approved',
            action === 'block' ? 'danger' : 'success'
        );
    };

    const showToast = (message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    if (!user) return null;

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-dark-800 border border-dark-600 rounded-lg p-3 shadow-xl">
                    <p className="text-xs text-gray-400 mb-1">{payload[0].payload.date}</p>
                    <div className="space-y-1">
                        <p className="text-sm text-accent-blue font-medium">
                            Successful: {payload[0].value.toLocaleString()}
                        </p>
                        <p className="text-sm text-accent-red font-medium">
                            Blocked: {payload[1].value.toLocaleString()}
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-dark-900 relative">
            {/* Background Pattern */}
            <div
                className="fixed inset-0 z-0 opacity-30"
                style={{
                    backgroundImage: 'url(/images/dashboard-bg.png)',
                    backgroundSize: '600px 600px',
                    backgroundRepeat: 'repeat',
                }}
            ></div>

            {/* Content */}
            <div className="relative z-10">
                {/* Toast */}
                {toast && (
                    <div className={`fixed top-6 right-6 z-50 px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3 ${toast.type === 'success' ? 'bg-accent-green/20 border border-accent-green/50 text-accent-green' :
                        toast.type === 'danger' ? 'bg-accent-red/20 border border-accent-red/50 text-accent-red' :
                            'bg-accent-amber/20 border border-accent-amber/50 text-accent-amber'
                        }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${toast.type === 'success' ? 'bg-accent-green' :
                            toast.type === 'danger' ? 'bg-accent-red' : 'bg-accent-amber'
                            }`}></div>
                        <span className="text-sm font-medium">{toast.message}</span>
                    </div>
                )}

                {/* Header */}
                <header className="bg-dark-800 border-b border-dark-700 sticky top-0 z-40 backdrop-blur-sm bg-dark-800/95">
                    <div className="max-w-[1600px] mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-9 h-9 bg-accent-blue rounded flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h1 className="text-lg font-semibold text-white">FraudGuard</h1>
                                    <p className="text-xs text-gray-500">{user.bank}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-dark-700 rounded-full">
                                    <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse"></div>
                                    <span className="text-xs text-gray-400">Live Monitoring</span>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                                >
                                    <span className="hidden sm:inline">{user.fullName}</span>
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-[1600px] mx-auto px-6 py-8">
                    {/* Stats Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-dark-800 border border-dark-700 rounded-lg p-5">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-400">Total Transactions</span>
                                <TrendingUp className="w-4 h-4 text-accent-blue" />
                            </div>
                            <p className="text-2xl font-bold text-white">12,440</p>
                            <p className="text-xs text-accent-green mt-1">+12.5% from yesterday</p>
                        </div>

                        <div className="bg-dark-800 border border-dark-700 rounded-lg p-5">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-400">Blocked</span>
                                <Shield className="w-4 h-4 text-accent-red" />
                            </div>
                            <p className="text-2xl font-bold text-white">612</p>
                            <p className="text-xs text-accent-red mt-1">+8.2% from yesterday</p>
                        </div>

                        <div className="bg-dark-800 border border-dark-700 rounded-lg p-5">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-400">Pending Review</span>
                                <Clock className="w-4 h-4 text-accent-amber" />
                            </div>
                            <p className="text-2xl font-bold text-white">{velocityList.length}</p>
                            <p className="text-xs text-gray-500 mt-1">Requires action</p>
                        </div>

                        <div className="bg-dark-800 border border-dark-700 rounded-lg p-5">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-400">Threat Level</span>
                                <Zap className="w-4 h-4 text-accent-amber" />
                            </div>
                            <p className="text-2xl font-bold text-accent-amber">Medium</p>
                            <p className="text-xs text-gray-500 mt-1">Last updated: 2m ago</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        {/* Left Column */}
                        <div className="xl:col-span-2 space-y-6">
                            {/* Transaction Monitor */}
                            <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <Activity className="w-5 h-5 text-accent-blue" />
                                        <h2 className="text-base font-semibold text-white">Transaction Monitor</h2>
                                    </div>
                                    <span className="text-xs text-gray-500">Last 7 days</span>
                                </div>
                                <ResponsiveContainer width="100%" height={280}>
                                    <BarChart data={transactionData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                                        <XAxis
                                            dataKey="date"
                                            stroke="#6b7280"
                                            style={{ fontSize: '11px' }}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            stroke="#6b7280"
                                            style={{ fontSize: '11px' }}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1f2937' }} />
                                        <Bar dataKey="successful" fill="#2563eb" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="blocked" fill="#dc2626" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Velocity Control */}
                            <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <AlertTriangle className="w-5 h-5 text-accent-amber" />
                                        <h2 className="text-base font-semibold text-white">Velocity Anomalies</h2>
                                    </div>
                                    <span className="px-2.5 py-1 bg-accent-amber/20 text-accent-amber text-xs font-medium rounded-full">
                                        {velocityList.length} pending
                                    </span>
                                </div>

                                {velocityList.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Check className="w-10 h-10 text-accent-green mx-auto mb-3 opacity-50" />
                                        <p className="text-sm text-gray-500">No pending approvals</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {velocityList.map((tx) => (
                                            <div key={tx.id} className="bg-dark-900 border border-dark-600 rounded-lg p-4 hover:border-dark-500 transition-colors">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="text-sm font-mono text-white">{tx.senderUpi}</span>
                                                            <span className={`px-2 py-0.5 text-xs font-medium rounded ${tx.riskLevel === 'Critical' ? 'bg-accent-red/20 text-accent-red' :
                                                                tx.riskLevel === 'High' ? 'bg-accent-amber/20 text-accent-amber' :
                                                                    'bg-yellow-500/20 text-yellow-500'
                                                                }`}>
                                                                {tx.riskLevel}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-4 text-xs text-gray-400">
                                                            <span>₹{tx.amount.toLocaleString()}</span>
                                                            <span>•</span>
                                                            <span>{tx.frequency}</span>
                                                            <span>•</span>
                                                            <span>{tx.timestamp}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 flex-shrink-0">
                                                        <button
                                                            onClick={() => handleVelocityAction(tx.id, 'allow')}
                                                            className="p-2 bg-accent-green/20 hover:bg-accent-green/30 text-accent-green rounded transition-colors"
                                                            title="Approve"
                                                        >
                                                            <Check className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleVelocityAction(tx.id, 'block')}
                                                            className="p-2 bg-accent-red/20 hover:bg-accent-red/30 text-accent-red rounded transition-colors"
                                                            title="Block"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* UPI Scanner */}
                            <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <Search className="w-5 h-5 text-accent-blue" />
                                    <h2 className="text-base font-semibold text-white">UPI Scanner</h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={upiInput}
                                            onChange={(e) => setUpiInput(e.target.value)}
                                            placeholder="merchant@ybl"
                                            className="w-full px-4 py-3 bg-dark-900 border border-dark-600 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue transition-colors text-sm font-mono"
                                            onKeyPress={(e) => e.key === 'Enter' && handleScanUpi()}
                                        />
                                        <button
                                            onClick={handleScanUpi}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-accent-blue hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors"
                                        >
                                            Scan
                                        </button>
                                    </div>

                                    <div className="border-2 border-dashed border-dark-600 rounded-lg p-6 text-center hover:border-dark-500 transition-colors cursor-pointer">
                                        <Upload className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                                        <p className="text-xs text-gray-500">Upload QR Code</p>
                                    </div>

                                    {scanResult && (
                                        <div className={`p-4 rounded-lg border ${scanResult.isFraud
                                            ? 'bg-accent-red/10 border-accent-red/30'
                                            : 'bg-accent-green/10 border-accent-green/30'
                                            }`}>
                                            <div className="flex items-start gap-3">
                                                {scanResult.isFraud ? (
                                                    <AlertTriangle className="w-5 h-5 text-accent-red flex-shrink-0 mt-0.5" />
                                                ) : (
                                                    <Shield className="w-5 h-5 text-accent-green flex-shrink-0 mt-0.5" />
                                                )}
                                                <div className="flex-1">
                                                    <h3 className={`font-semibold text-sm mb-1 ${scanResult.isFraud ? 'text-accent-red' : 'text-accent-green'
                                                        }`}>
                                                        {scanResult.isFraud ? 'Threat Detected' : 'Verified Safe'}
                                                    </h3>
                                                    {scanResult.isFraud && (
                                                        <p className="text-xs font-mono text-accent-red/90 mb-2">
                                                            Risk: {scanResult.riskScore}/100
                                                        </p>
                                                    )}
                                                    <p className="text-xs text-gray-400">
                                                        {scanResult.reason}
                                                    </p>
                                                    {scanResult.reportedBy > 0 && (
                                                        <p className="text-xs text-gray-500 mt-2">
                                                            {scanResult.reportedBy} reports
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Digital Sync */}
                            <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <Mail className="w-5 h-5 text-accent-blue" />
                                    <h2 className="text-base font-semibold text-white">Threat Intelligence</h2>
                                </div>

                                {!isSynced ? (
                                    <div className="text-center py-8">
                                        <button
                                            onClick={handleSync}
                                            disabled={isSyncing}
                                            className="px-6 py-2.5 bg-accent-blue hover:bg-blue-700 disabled:bg-dark-700 disabled:text-gray-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 mx-auto"
                                        >
                                            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                                            {isSyncing ? 'Syncing...' : 'Sync Messages'}
                                        </button>
                                        <p className="text-xs text-gray-600 mt-3">Scan email & SMS for threats</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                        {fraudAlerts.map((alert) => (
                                            <div key={alert.id} className="bg-dark-900 border border-dark-600 rounded-lg p-3 hover:border-dark-500 transition-colors">
                                                <div className="flex items-start justify-between gap-2 mb-2">
                                                    <div className="flex items-center gap-2">
                                                        {alert.source === 'SMS' ? (
                                                            <MessageSquare className="w-3.5 h-3.5 text-gray-500" />
                                                        ) : (
                                                            <Mail className="w-3.5 h-3.5 text-gray-500" />
                                                        )}
                                                        <span className="text-xs text-gray-500">{alert.source}</span>
                                                    </div>
                                                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${alert.severity === 'Malicious'
                                                        ? 'bg-accent-red/20 text-accent-red'
                                                        : 'bg-accent-amber/20 text-accent-amber'
                                                        }`}>
                                                        {alert.severity}
                                                    </span>
                                                </div>
                                                <p className="text-sm font-medium text-white mb-1">{alert.sender}</p>
                                                <p className="text-xs text-gray-400 line-clamp-2 mb-2">{alert.snippet}</p>
                                                <p className="text-xs text-gray-600">{alert.date}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>

                <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #374151;
          border-radius: 3px;
        }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #4b5563;
                }
            `}</style>
            </div>
        </div>
    );
};

export default Dashboard;
