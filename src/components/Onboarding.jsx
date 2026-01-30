import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, Lock } from 'lucide-react';
import { bankOptions } from '../mockData';

const Onboarding = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        mobile: '',
        bank: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Required';
        }

        if (!formData.mobile.trim()) {
            newErrors.mobile = 'Required';
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = 'Invalid format';
        }

        if (!formData.bank) {
            newErrors.bank = 'Required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            localStorage.setItem('fraudDetectionUser', JSON.stringify(formData));
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-dark-900 flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-dark-800 to-dark-900 p-12 flex-col justify-between relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-accent-blue rounded flex items-center justify-center">
                            <Shield className="w-6 h-6 text-white" strokeWidth={2.5} />
                        </div>
                        <span className="text-xl font-semibold text-white">FraudGuard</span>
                    </div>

                    <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                        Real-time Fraud<br />Detection Platform
                    </h1>
                    <p className="text-gray-400 text-lg">
                        AI-powered transaction monitoring and threat intelligence for financial institutions.
                    </p>
                </div>

                {/* Hero Image - Full Screen 3D */}
                <div className="absolute inset-0 flex items-center justify-center z-0">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <img
                            src="/images/hero.png"
                            alt="Fraud Detection Platform"
                            className="w-full h-full object-cover opacity-40"
                            style={{
                                transform: 'perspective(1000px) rotateY(-5deg)',
                                filter: 'drop-shadow(0 25px 50px rgba(37, 99, 235, 0.3))',
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-dark-800 via-transparent to-dark-900"></div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="mb-8">
                        <div className="lg:hidden flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-accent-blue rounded flex items-center justify-center">
                                <Shield className="w-6 h-6 text-white" strokeWidth={2.5} />
                            </div>
                            <span className="text-xl font-semibold text-white">FraudGuard</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Access Dashboard</h2>
                        <p className="text-gray-400">Enter your credentials to continue</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 bg-dark-800 border ${errors.fullName ? 'border-accent-red' : 'border-dark-600'
                                    } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-blue transition-colors`}
                                placeholder=""
                            />
                            {errors.fullName && (
                                <p className="mt-1.5 text-xs text-accent-red">{errors.fullName}</p>
                            )}
                        </div>

                        {/* Mobile Number */}
                        <div>
                            <label htmlFor="mobile" className="block text-sm font-medium text-gray-300 mb-2">
                                Mobile Number
                            </label>
                            <input
                                type="tel"
                                id="mobile"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                maxLength={10}
                                className={`w-full px-4 py-3 bg-dark-800 border ${errors.mobile ? 'border-accent-red' : 'border-dark-600'
                                    } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent-blue transition-colors font-mono`}
                                placeholder=""
                            />
                            {errors.mobile && (
                                <p className="mt-1.5 text-xs text-accent-red">{errors.mobile}</p>
                            )}
                        </div>

                        {/* Bank Selection */}
                        <div>
                            <label htmlFor="bank" className="block text-sm font-medium text-gray-300 mb-2">
                                Bank
                            </label>
                            <select
                                id="bank"
                                name="bank"
                                value={formData.bank}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 bg-dark-800 border ${errors.bank ? 'border-accent-red' : 'border-dark-600'
                                    } rounded-lg text-white focus:outline-none focus:border-accent-blue transition-colors appearance-none cursor-pointer`}
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 1rem center',
                                }}
                            >
                                <option value="" className="bg-dark-800">Select bank</option>
                                {bankOptions.map((bank) => (
                                    <option key={bank} value={bank} className="bg-dark-800">
                                        {bank}
                                    </option>
                                ))}
                            </select>
                            {errors.bank && (
                                <p className="mt-1.5 text-xs text-accent-red">{errors.bank}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-accent-blue hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group mt-8"
                        >
                            <Lock className="w-4 h-4" />
                            <span>Secure Access</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-dark-700">
                        <p className="text-xs text-gray-500 text-center">
                            Protected by 256-bit encryption • SOC 2 Type II Certified
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
