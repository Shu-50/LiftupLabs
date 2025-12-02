import { useState } from 'react'
import { Link } from 'react-router-dom'
import apiService from '../services/api'

const LoginPage = ({ onLogin, onSwitchToRegister }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        keepSignedIn: false
    })
    const [isLoading, setIsLoading] = useState(false)
    const [showVerificationMessage, setShowVerificationMessage] = useState(false)
    const [isResending, setIsResending] = useState(false)
    const [resendSuccess, setResendSuccess] = useState(false)
    const [resendError, setResendError] = useState('')

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const result = await onLogin({
                email: formData.email,
                password: formData.password
            })

            if (!result.success) {
                if (result.requiresVerification) {
                    setShowVerificationMessage(true)
                } else {
                    alert(result.error || 'Login failed')
                }
            }
        } catch (error) {
            console.error('Login error:', error)
            alert('Login failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleEmailOTP = () => {
        alert('Email OTP functionality would be implemented here')
    }

    const handleGitHub = () => {
        alert('GitHub OAuth would be implemented here')
    }

    const resendVerificationEmail = async () => {
        if (!formData.email) {
            setResendError('Please enter your email address first')
            return
        }

        setIsResending(true)
        setResendError('')
        setResendSuccess(false)

        try {
            const data = await apiService.resendVerification(formData.email)

            if (data.success) {
                setResendSuccess(true)
                // Auto-hide success message after 5 seconds
                setTimeout(() => {
                    setResendSuccess(false)
                }, 5000)
            } else {
                setResendError(data.message || 'Failed to send verification email')
            }
        } catch (error) {
            console.error('Resend error:', error)
            setResendError(error.response?.data?.message || 'Network error. Please try again.')
        } finally {
            setIsResending(false)
        }
    }

    return (
        <div className="min-h-screen bg-orange-50 flex">
            {/* Left Sidebar */}
            <div className="w-64 bg-orange-100 border-r border-orange-200 flex flex-col">
                {/* Logo */}
                <div className="p-4 border-b border-orange-200">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">L</span>
                        </div>
                        <span className="font-semibold text-orange-900">Liftuplabs</span>
                    </div>
                </div>

                {/* Search */}
                <div className="p-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full px-3 py-2 bg-white border border-orange-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                        />
                        <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 px-2">
                    <div className="text-xs font-medium text-orange-700 px-2 mb-2">Main</div>
                    <nav className="space-y-1">
                        {[
                            { label: 'Home', icon: '🏠' },
                            { label: 'Events & Competitions', icon: '🎯' },
                            { label: 'Notes & PYQs', icon: '📝' },
                            { label: 'Courses & Lectures', icon: '📚' },
                            { label: 'Institutions & Hosts', icon: '🏛️' },
                            { label: 'Community', icon: '👥' },
                            { label: 'Career & Guidance', icon: '💼' },
                            { label: 'About / Contact', icon: '📞' }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-3 px-3 py-2 text-sm text-orange-700 opacity-60"
                            >
                                <span>{item.icon}</span>
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </nav>
                </div>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-orange-200 space-y-2">
                    <div className="flex items-center space-x-2 px-3 py-2 text-sm text-orange-700 opacity-60">
                        <span>📚</span>
                        <span>My Library</span>
                    </div>
                    <div className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium opacity-60 text-center">
                        📤 Upload Notes
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white border-b border-orange-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <span className="text-orange-700 font-medium">Welcome</span>
                        <div className="flex items-center space-x-4">
                            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                                BETA
                            </span>
                            <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">👤</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Login Content */}
                <main className="flex-1 p-6 flex items-center justify-center">
                    <div className="max-w-4xl w-full">
                        <div className="bg-white rounded-lg p-8 border border-orange-200">
                            <div className="flex items-center justify-between mb-6">
                                <h1 className="text-3xl font-bold text-orange-900">Sign in or Create account</h1>
                                <div className="flex items-center space-x-4">
                                    <button className="flex items-center space-x-2 px-4 py-2 border border-orange-300 rounded-lg text-orange-700 hover:bg-orange-50">
                                        <span>🔒</span>
                                        <span>Privacy</span>
                                    </button>
                                    <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                                        <span>❓</span>
                                        <span>Need Help</span>
                                    </button>
                                </div>
                            </div>

                            <p className="text-gray-700 mb-8">Access events, resources, and your learning hub</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Login Form */}
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-semibold text-gray-900">Login</h2>
                                        <span className="text-gray-500">Welcome back</span>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {showVerificationMessage && (
                                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                                                <div className="flex items-start space-x-3">
                                                    <span className="text-yellow-500 text-xl">⚠️</span>
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-yellow-800">Email Verification Required</h4>
                                                        <p className="text-yellow-700 text-sm mt-1">
                                                            Please verify your email address before logging in. Check your inbox for the verification email.
                                                        </p>

                                                        {/* Success Message */}
                                                        {resendSuccess && (
                                                            <div className="mt-3 bg-green-50 border border-green-200 rounded p-2">
                                                                <p className="text-green-700 text-sm">
                                                                    ✅ Verification email sent! Please check your inbox.
                                                                </p>
                                                            </div>
                                                        )}

                                                        {/* Error Message */}
                                                        {resendError && (
                                                            <div className="mt-3 bg-red-50 border border-red-200 rounded p-2">
                                                                <p className="text-red-700 text-sm">
                                                                    ❌ {resendError}
                                                                </p>
                                                            </div>
                                                        )}

                                                        <div className="mt-3 space-x-2">
                                                            <button
                                                                type="button"
                                                                onClick={resendVerificationEmail}
                                                                disabled={isResending}
                                                                className="text-yellow-800 hover:text-yellow-900 font-medium text-sm underline disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                {isResending ? '⏳ Sending...' : '📧 Resend Verification Email'}
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setShowVerificationMessage(false)
                                                                    setResendSuccess(false)
                                                                    setResendError('')
                                                                }}
                                                                className="text-yellow-600 hover:text-yellow-700 text-sm"
                                                            >
                                                                Dismiss
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                                                required
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    name="keepSignedIn"
                                                    checked={formData.keepSignedIn}
                                                    onChange={handleInputChange}
                                                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-300"
                                                />
                                                <span className="text-sm text-gray-600">Keep me signed in</span>
                                            </label>
                                            <Link to="/forgot-password" className="text-sm text-orange-600 hover:text-orange-700">
                                                Forgot password?
                                            </Link>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                                        >
                                            <span>👤</span>
                                            <span>{isLoading ? 'Signing in...' : 'Sign in'}</span>
                                        </button>

                                        <div className="text-center text-gray-500 text-sm">or</div>

                                        <button
                                            type="button"
                                            onClick={handleEmailOTP}
                                            className="w-full flex items-center justify-center space-x-2 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                        >
                                            <span>📧</span>
                                            <span>Continue with Email OTP</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleGitHub}
                                            className="w-full flex items-center justify-center space-x-2 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                        >
                                            <span>🐙</span>
                                            <span>Continue with GitHub</span>
                                        </button>
                                    </form>
                                </div>

                                {/* Register Form */}
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-semibold text-gray-900">Register</h2>
                                        <span className="text-gray-500">Create your Liftuplabs account</span>
                                    </div>

                                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                                        <p className="text-gray-600 mb-4">New to Liftuplabs?</p>
                                        <Link
                                            to="/register"
                                            className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 inline-block text-center"
                                        >
                                            Create Account
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center p-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                        <span className="text-orange-600 text-xl">🏆</span>
                                    </div>
                                    <h3 className="font-medium text-gray-900 mb-1">Track your events</h3>
                                    <p className="text-gray-600 text-sm">RSVPs, reminders, certificates</p>
                                </div>

                                <div className="text-center p-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                        <span className="text-orange-600 text-xl">📚</span>
                                    </div>
                                    <h3 className="font-medium text-gray-900 mb-1">Save Notes & PYQs</h3>
                                    <p className="text-gray-600 text-sm">Build your personal library</p>
                                </div>

                                <div className="text-center p-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                        <span className="text-orange-600 text-xl">💼</span>
                                    </div>
                                    <h3 className="font-medium text-gray-900 mb-1">Career guidance</h3>
                                    <p className="text-gray-600 text-sm">Mentors and opportunities</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default LoginPage