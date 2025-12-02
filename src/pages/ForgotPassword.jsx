import { useState } from 'react'
import { Link } from 'react-router-dom'
import apiService from '../services/api'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const response = await apiService.forgotPassword(email)

            if (response.success) {
                setEmailSent(true)
            } else {
                setError(response.message || 'Failed to send reset email')
            }
        } catch (error) {
            console.error('Forgot password error:', error)
            setError(error.response?.data?.message || 'Failed to send reset email. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-orange-50 flex items-center justify-center p-6">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-lg p-8 border border-orange-200 shadow-lg">
                    {/* Logo */}
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-2xl">L</span>
                        </div>
                        <h1 className="text-2xl font-bold text-orange-900">Forgot Password?</h1>
                    </div>

                    {!emailSent ? (
                        <>
                            <p className="text-gray-700 text-center mb-6">
                                Enter your email address and we'll send you a link to reset your password.
                            </p>

                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                    <div className="flex items-start space-x-3">
                                        <span className="text-red-500 text-xl">⚠️</span>
                                        <div className="flex-1">
                                            <p className="text-red-700 text-sm">{error}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="animate-spin">⏳</span>
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>📧</span>
                                            <span>Send Reset Link</span>
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <Link
                                    to="/login"
                                    className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                                >
                                    ← Back to Login
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="text-center">
                            <div className="text-green-500 text-6xl mb-4">✅</div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Check Your Email</h2>
                            <p className="text-gray-700 mb-6">
                                We've sent a password reset link to <strong>{email}</strong>
                            </p>
                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                                <h3 className="font-semibold text-orange-900 mb-2">Next Steps:</h3>
                                <ol className="text-left text-orange-800 space-y-1 text-sm">
                                    <li>1. Check your email inbox (and spam folder)</li>
                                    <li>2. Click the password reset link</li>
                                    <li>3. Create a new password</li>
                                </ol>
                            </div>
                            <p className="text-gray-600 text-sm mb-6">
                                The reset link will expire in 1 hour for security reasons.
                            </p>
                            <div className="space-y-3">
                                <button
                                    onClick={() => {
                                        setEmailSent(false)
                                        setEmail('')
                                        setError('')
                                    }}
                                    className="w-full border border-orange-300 text-orange-700 py-3 rounded-lg font-medium hover:bg-orange-50 transition-colors"
                                >
                                    Try Another Email
                                </button>
                                <Link
                                    to="/login"
                                    className="block w-full bg-gray-500 text-white py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors text-center"
                                >
                                    Back to Login
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Help Section */}
                <div className="mt-6 text-center">
                    <p className="text-gray-600 text-sm">
                        Need help?{' '}
                        <a href="mailto:support@liftuplabs.in" className="text-orange-600 hover:text-orange-700 font-medium">
                            Contact Support
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword