import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import apiService from '../services/api'

const ResetPassword = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const token = searchParams.get('token')

    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isVerifying, setIsVerifying] = useState(true)
    const [tokenValid, setTokenValid] = useState(false)
    const [resetSuccess, setResetSuccess] = useState(false)
    const [error, setError] = useState('')
    const [userEmail, setUserEmail] = useState('')

    // Verify token on component mount
    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setError('Invalid reset link. Please request a new password reset.')
                setIsVerifying(false)
                return
            }

            try {
                const response = await apiService.verifyResetToken(token)

                if (response.success && response.valid) {
                    setTokenValid(true)
                    setUserEmail(response.email)
                } else {
                    setError('This reset link is invalid or has expired. Please request a new one.')
                }
            } catch (error) {
                console.error('Token verification error:', error)
                setError('This reset link is invalid or has expired. Please request a new one.')
            } finally {
                setIsVerifying(false)
            }
        }

        verifyToken()
    }, [token])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        // Validate passwords
        if (formData.newPassword.length < 6) {
            setError('Password must be at least 6 characters long')
            return
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        setIsLoading(true)

        try {
            const response = await apiService.resetPassword(token, formData.newPassword)

            if (response.success) {
                setResetSuccess(true)
                // Redirect to login after 3 seconds
                setTimeout(() => {
                    navigate('/login')
                }, 3000)
            } else {
                setError(response.message || 'Failed to reset password')
            }
        } catch (error) {
            console.error('Reset password error:', error)
            setError(error.response?.data?.message || 'Failed to reset password. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    // Show loading state while verifying token
    if (isVerifying) {
        return (
            <div className="min-h-screen bg-orange-50 flex items-center justify-center p-6">
                <div className="max-w-md w-full">
                    <div className="bg-white rounded-lg p-8 border border-orange-200 shadow-lg text-center">
                        <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
                            <span className="text-white font-bold text-2xl">L</span>
                        </div>
                        <p className="text-gray-700">Verifying reset link...</p>
                    </div>
                </div>
            </div>
        )
    }

    // Show error if token is invalid
    if (!tokenValid && !isVerifying) {
        return (
            <div className="min-h-screen bg-orange-50 flex items-center justify-center p-6">
                <div className="max-w-md w-full">
                    <div className="bg-white rounded-lg p-8 border border-orange-200 shadow-lg">
                        <div className="text-center mb-6">
                            <div className="text-red-500 text-6xl mb-4">❌</div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Reset Link</h1>
                            <p className="text-gray-700 mb-6">{error}</p>
                            <div className="space-y-3">
                                <Link
                                    to="/forgot-password"
                                    className="block w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors text-center"
                                >
                                    Request New Reset Link
                                </Link>
                                <Link
                                    to="/login"
                                    className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center"
                                >
                                    Back to Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
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
                        <h1 className="text-2xl font-bold text-orange-900">Reset Your Password</h1>
                    </div>

                    {!resetSuccess ? (
                        <>
                            <p className="text-gray-700 text-center mb-6">
                                Enter a new password for <strong>{userEmail}</strong>
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
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleInputChange}
                                        placeholder="Enter new password"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                                        required
                                        minLength={6}
                                    />
                                    <p className="text-gray-500 text-xs mt-1">
                                        Must be at least 6 characters long
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        placeholder="Confirm new password"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                                        required
                                        minLength={6}
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
                                            <span>Resetting Password...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>🔒</span>
                                            <span>Reset Password</span>
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
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Password Reset Successful!</h2>
                            <p className="text-gray-700 mb-6">
                                Your password has been successfully reset. You can now log in with your new password.
                            </p>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                                <p className="text-green-800 text-sm">
                                    Redirecting to login page in 3 seconds...
                                </p>
                            </div>
                            <Link
                                to="/login"
                                className="block w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors text-center"
                            >
                                Go to Login Now
                            </Link>
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

export default ResetPassword