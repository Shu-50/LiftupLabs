import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import apiService from '../services/api';
import { useNotification } from '../context/NotificationContext';

const RazorpayPayment = memo(({ 
    event, 
    registrationData, 
    onSuccess, 
    onFailure, 
    onClose 
}) => {
    const { showSuccess, showError } = useNotification();
    const [loading, setLoading] = useState(false);
    const [paymentData, setPaymentData] = useState(null);
    const [showQR, setShowQR] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);

    // Fixed amount per registration (not multiplied by team size)
    const totalAmount = useMemo(() => {
        return event.registration?.fee?.amount || 0;
    }, [event.registration?.fee?.amount]);

    // Load Razorpay script dynamically
    useEffect(() => {
        const loadRazorpayScript = () => {
            return new Promise((resolve) => {
                // Check if already loaded
                if (window.Razorpay) {
                    setRazorpayLoaded(true);
                    resolve(true);
                    return;
                }

                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.async = true;
                script.onload = () => {
                    setRazorpayLoaded(true);
                    resolve(true);
                };
                script.onerror = () => {
                    showError('Failed to load payment gateway');
                    resolve(false);
                };
                document.body.appendChild(script);
            });
        };

        loadRazorpayScript();

        // Cleanup on unmount
        return () => {
            // Script remains in DOM for reuse
        };
    }, [showError]);

    // Create payment order
    useEffect(() => {
        const createOrder = async () => {
            setLoading(true);
            try {
                const response = await apiService.createPaymentOrder(
                    event._id,
                    registrationData
                );
                setPaymentData(response.data);
            } catch (error) {
                console.error('Order creation error:', error);
                showError(error.message || 'Failed to create payment order');
                onFailure?.(error);
            } finally {
                setLoading(false);
            }
        };

        createOrder();
    }, [event._id, registrationData, showError, onFailure]);

    // Handle payment verification
    const handlePaymentSuccess = useCallback(async (response) => {
        setLoading(true);
        try {
            const verifyResponse = await apiService.verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
            });

            showSuccess('Payment successful! Registration confirmed.');
            onSuccess?.(verifyResponse.data);
        } catch (error) {
            console.error('Payment verification error:', error);
            showError(error.message || 'Payment verification failed');
            onFailure?.(error);
        } finally {
            setLoading(false);
        }
    }, [showSuccess, showError, onSuccess, onFailure]);

    // Open Razorpay checkout
    const openRazorpayCheckout = useCallback(() => {
        if (!razorpayLoaded || !paymentData) {
            showError('Payment gateway not ready. Please try again.');
            return;
        }

        const options = {
            key: paymentData.key, // Backend returns 'key', not 'razorpayKeyId'
            amount: paymentData.amount, // Already in paise from backend, don't multiply again
            currency: paymentData.currency,
            name: 'LiftupLabs',
            description: `Registration for ${event.title}`,
            order_id: paymentData.orderId,
            handler: handlePaymentSuccess,
            prefill: {
                name: registrationData.teamName || '',
                email: registrationData.alternateEmail || '',
                contact: registrationData.phone || ''
            },
            notes: {
                eventId: event._id,
                eventTitle: event.title
            },
            theme: {
                color: '#EA580C' // Orange theme
            },
            modal: {
                ondismiss: () => {
                    console.log('Payment cancelled by user');
                }
            }
        };

        const razorpay = new window.Razorpay(options);
        
        razorpay.on('payment.failed', (response) => {
            console.error('Payment failed:', response.error);
            showError(`Payment failed: ${response.error.description}`);
            onFailure?.(response.error);
        });

        razorpay.open();
    }, [razorpayLoaded, paymentData, event, registrationData, handlePaymentSuccess, showError, onFailure]);

    if (loading && !paymentData) {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-8 max-w-md w-full">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600 mx-auto mb-4"></div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Creating Payment Order...</h3>
                        <p className="text-gray-600">Please wait while we prepare your payment</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-2 sm:p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 z-10">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Complete Payment</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 text-2xl sm:text-3xl w-8 h-8 flex items-center justify-center"
                            disabled={loading}
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    {/* Event Details */}
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 sm:p-4">
                        <h3 className="font-semibold text-orange-900 mb-2 text-sm sm:text-base">{event.title}</h3>
                        <div className="text-xs sm:text-sm text-orange-800 space-y-1">
                            <p>📅 {new Date(event.dateTime?.start).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}</p>
                            <p>📍 {event.location?.city}, {event.location?.state}</p>
                            {registrationData.teamSize > 1 && (
                                <p>👥 Team Size: {registrationData.teamSize} members</p>
                            )}
                        </div>
                    </div>

                    {/* Payment Amount */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm text-green-700">Registration Fee</p>
                                <p className="text-2xl sm:text-3xl font-bold text-green-900">₹{totalAmount}</p>
                                <p className="text-xs text-green-600 mt-1">
                                    Fixed fee per registration
                                </p>
                            </div>
                            <div className="text-3xl sm:text-4xl">💳</div>
                        </div>
                    </div>

                    {/* Payment Methods Tabs */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="flex border-b border-gray-200">
                            <button
                                onClick={() => setShowQR(false)}
                                className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-colors ${
                                    !showQR
                                        ? 'bg-orange-600 text-white'
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                All Methods
                            </button>
                            <button
                                onClick={() => setShowQR(true)}
                                className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-colors ${
                                    showQR
                                        ? 'bg-orange-600 text-white'
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                UPI QR Code
                            </button>
                        </div>

                        <div className="p-4 sm:p-6">
                            {!showQR ? (
                                <div className="text-center space-y-3 sm:space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base mb-3 sm:mb-4">
                                        Click below to pay using any of these methods:
                                    </p>
                                    <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                                        <div className="bg-gray-50 p-2 sm:p-3 rounded-lg text-xs sm:text-sm">
                                            <span className="font-medium">💳</span> Cards
                                        </div>
                                        <div className="bg-gray-50 p-2 sm:p-3 rounded-lg text-xs sm:text-sm">
                                            <span className="font-medium">📱</span> UPI
                                        </div>
                                        <div className="bg-gray-50 p-2 sm:p-3 rounded-lg text-xs sm:text-sm">
                                            <span className="font-medium">🏦</span> Netbanking
                                        </div>
                                        <div className="bg-gray-50 p-2 sm:p-3 rounded-lg text-xs sm:text-sm">
                                            <span className="font-medium">👛</span> Wallets
                                        </div>
                                    </div>
                                    <button
                                        onClick={openRazorpayCheckout}
                                        disabled={loading || !razorpayLoaded}
                                        className="w-full bg-orange-600 text-white px-4 sm:px-6 py-3 sm:py-3.5 rounded-lg text-sm sm:text-base font-semibold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px]"
                                    >
                                        {loading ? 'Processing...' : 'Proceed to Payment'}
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center space-y-3 sm:space-y-4">
                                    <p className="text-gray-700 text-sm sm:text-base mb-3 sm:mb-4">
                                        Scan this QR code with any UPI app to pay
                                    </p>
                                    {paymentData?.qrCode && (
                                        <div className="flex justify-center mb-3 sm:mb-4">
                                            <div className="bg-white p-3 sm:p-4 rounded-lg border-2 border-gray-200">
                                                <img 
                                                    src={paymentData.qrCode} 
                                                    alt="Payment QR Code"
                                                    className="w-48 h-48 sm:w-64 sm:h-64"
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex flex-wrap justify-center gap-2 mb-3 sm:mb-4">
                                        <span className="bg-purple-100 text-purple-800 px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                                            Google Pay
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                                            PhonePe
                                        </span>
                                        <span className="bg-cyan-100 text-cyan-800 px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                                            Paytm
                                        </span>
                                        <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                                            BHIM
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-500">
                                        Payment will be verified automatically
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Security Badge */}
                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600">
                        <span>🔒</span>
                        <span>Secured by Razorpay</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="w-full px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-lg text-sm sm:text-base hover:bg-gray-100 disabled:opacity-50 transition-colors min-h-[44px]"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
});

RazorpayPayment.displayName = 'RazorpayPayment';

export default RazorpayPayment;
