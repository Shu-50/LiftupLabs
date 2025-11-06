import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const EmailVerification = () => {
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('');
    const [isResending, setIsResending] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get('token');

        if (token) {
            verifyEmail(token);
        } else {
            setStatus('error');
            setMessage('Invalid verification link');
        }
    }, [location]);

    const verifyEmail = async (token) => {
        try {
            const data = await apiService.verifyEmail(token);

            if (data.success) {
                setStatus('success');
                setMessage(data.message);

                // Store user data and token
                if (data.data) {
                    localStorage.setItem('liftuplabs_user', JSON.stringify(data.data));
                }

                // Redirect to dashboard after 3 seconds
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            } else {
                setStatus('error');
                setMessage(data.message || 'Email verification failed');
            }
        } catch (error) {
            console.error('Verification error:', error);
            setStatus('error');
            setMessage('Network error. Please try again.');
        }
    };

    const resendVerification = async () => {
        const email = prompt('Please enter your email address:');
        if (!email) return;

        setIsResending(true);
        try {
            const data = await apiService.resendVerification(email);

            if (data.success) {
                alert('Verification email sent! Please check your inbox.');
            } else {
                alert(data.message || 'Failed to send verification email');
            }
        } catch (error) {
            console.error('Resend error:', error);
            alert('Network error. Please try again.');
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
                {status === 'verifying' && (
                    <>
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Email</h2>
                        <p className="text-gray-600">Please wait while we verify your email address...</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="text-green-500 text-6xl mb-4">✅</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h2>
                        <p className="text-gray-600 mb-4">{message}</p>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                            <p className="text-green-800 text-sm">
                                🎉 Welcome to LiftupLabs! You'll be redirected to the homepage in a few seconds.
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                        >
                            Go to Homepage
                        </button>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="text-red-500 text-6xl mb-4">❌</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h2>
                        <p className="text-gray-600 mb-6">{message}</p>

                        <div className="space-y-3">
                            <button
                                onClick={resendVerification}
                                disabled={isResending}
                                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                            >
                                {isResending ? 'Sending...' : 'Resend Verification Email'}
                            </button>

                            <button
                                onClick={() => navigate('/login')}
                                className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                            >
                                Back to Login
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default EmailVerification;